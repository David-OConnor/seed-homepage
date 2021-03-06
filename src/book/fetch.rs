pub fn text() -> String {
r#####"
<h1 id="http-requests-fetch">HTTP Requests (fetch)</h1>
<p>We use the <a href="https://docs.rs/seed/0.4.2/seed/fetch/struct.Request.html">seed::Request</a> struct to make HTTP requests in the browser, wrapping the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>. To use this, we need to include <code>futures = "^0.1.26"</code> in <code>Cargo.toml</code>. The <a href="https://docs.rs/seed/0.4.2/seed/fetch/index.html">Fetch module</a> is standalone: It can be used with any wasm-bindgen program.</p>
<h2 id="receiving-data">Receiving data</h2>
<p>Example, where we update the state on initial load (similar to the <a href="https://github.com/David-OConnor/seed/tree/master/examples/server_interaction">server_interaction example</a> ) from a server. It demonstrates a <code>GET</code> request, and deserializing JSON data. The <code>server_interaction</code> example contains more sample code.</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode rust"><code class="sourceCode rust"><span id="cb1-1"><a href="#cb1-1"></a><span class="kw">use</span> <span class="pp">futures::</span>Future;</span>
<span id="cb1-2"><a href="#cb1-2"></a><span class="kw">use</span> <span class="pp">serde::</span><span class="op">{</span>Serialize, Deserialize<span class="op">}</span>;</span>
<span id="cb1-3"><a href="#cb1-3"></a></span>
<span id="cb1-4"><a href="#cb1-4"></a><span class="at">#[</span>derive<span class="at">(</span><span class="bu">Clone</span><span class="at">,</span> Serialize<span class="at">,</span> Deserialize<span class="at">)]</span></span>
<span id="cb1-5"><a href="#cb1-5"></a><span class="kw">pub</span> <span class="kw">struct</span> Commit <span class="op">{</span></span>
<span id="cb1-6"><a href="#cb1-6"></a>    <span class="kw">pub</span> sha: <span class="dt">String</span>,</span>
<span id="cb1-7"><a href="#cb1-7"></a><span class="op">}</span></span>
<span id="cb1-8"><a href="#cb1-8"></a></span>
<span id="cb1-9"><a href="#cb1-9"></a><span class="at">#[</span>derive<span class="at">(</span><span class="bu">Clone</span><span class="at">,</span> Serialize<span class="at">,</span> Deserialize<span class="at">)]</span></span>
<span id="cb1-10"><a href="#cb1-10"></a><span class="kw">pub</span> <span class="kw">struct</span> Branch <span class="op">{</span></span>
<span id="cb1-11"><a href="#cb1-11"></a>    <span class="kw">pub</span> name: <span class="dt">String</span>,</span>
<span id="cb1-12"><a href="#cb1-12"></a>    <span class="kw">pub</span> commit: Commit,</span>
<span id="cb1-13"><a href="#cb1-13"></a><span class="op">}</span></span>
<span id="cb1-14"><a href="#cb1-14"></a></span>
<span id="cb1-15"><a href="#cb1-15"></a><span class="at">#[</span>derive<span class="at">(</span><span class="bu">Clone</span><span class="at">)]</span></span>
<span id="cb1-16"><a href="#cb1-16"></a><span class="kw">enum</span> Msg <span class="op">{</span></span>
<span id="cb1-17"><a href="#cb1-17"></a>    DataFetched(<span class="pp">seed::fetch::</span>ResponseDataResult&lt;Branch&gt;),</span>
<span id="cb1-18"><a href="#cb1-18"></a></span>
<span id="cb1-19"><a href="#cb1-19"></a><span class="op">}</span></span>
<span id="cb1-20"><a href="#cb1-20"></a></span>
<span id="cb1-21"><a href="#cb1-21"></a><span class="kw">fn</span> fetch_data() -&gt; <span class="kw">impl</span> Future&lt;Item = Msg, Error = Msg&gt; <span class="op">{</span></span>
<span id="cb1-22"><a href="#cb1-22"></a>    <span class="kw">let</span> url = <span class="st">&quot;https://api.github.com/repos/david-oconnor/seed/branches/master&quot;</span>;</span>
<span id="cb1-23"><a href="#cb1-23"></a>    <span class="pp">Request::</span>new(url.into()).fetch_json_data(<span class="pp">Msg::</span>DataFetched)</span>
<span id="cb1-24"><a href="#cb1-24"></a><span class="op">}</span></span>
<span id="cb1-25"><a href="#cb1-25"></a></span>
<span id="cb1-26"><a href="#cb1-26"></a><span class="kw">fn</span> update(msg: Msg, model: &amp;<span class="kw">mut</span> Model, orders: &amp;<span class="kw">mut</span> <span class="kw">impl</span> Orders&lt;Msg&gt;) <span class="op">{</span></span>
<span id="cb1-27"><a href="#cb1-27"></a>    <span class="kw">match</span> msg <span class="op">{</span></span>
<span id="cb1-28"><a href="#cb1-28"></a>        <span class="pp">Msg::</span>DataFetched(<span class="cn">Ok</span>(branch)) =&gt; model.branch = branch,</span>
<span id="cb1-29"><a href="#cb1-29"></a></span>
<span id="cb1-30"><a href="#cb1-30"></a>        <span class="pp">Msg::</span>DataFetched(<span class="cn">Err</span>(fail_reason)) =&gt; <span class="op">{</span></span>
<span id="cb1-31"><a href="#cb1-31"></a>            <span class="pp">error!</span>(<span class="pp">format!</span>(</span>
<span id="cb1-32"><a href="#cb1-32"></a>                <span class="st">&quot;Fetch error - Fetching repository info failed - {:#?}&quot;</span>,</span>
<span id="cb1-33"><a href="#cb1-33"></a>                fail_reason</span>
<span id="cb1-34"><a href="#cb1-34"></a>            ));</span>
<span id="cb1-35"><a href="#cb1-35"></a>            orders.skip();</span>
<span id="cb1-36"><a href="#cb1-36"></a>        <span class="op">}</span></span>
<span id="cb1-37"><a href="#cb1-37"></a>    <span class="op">}</span></span>
<span id="cb1-38"><a href="#cb1-38"></a><span class="op">}</span></span>
<span id="cb1-39"><a href="#cb1-39"></a></span>
<span id="cb1-40"><a href="#cb1-40"></a><span class="kw">fn</span> view(model: &amp;Model) -&gt; Node&lt;Msg&gt; <span class="op">{</span></span>
<span id="cb1-41"><a href="#cb1-41"></a>    <span class="pp">div!</span><span class="op">[</span><span class="pp">format!</span>(</span>
<span id="cb1-42"><a href="#cb1-42"></a>        <span class="st">&quot;Repo info: Name: {}, SHA: {}&quot;</span>,</span>
<span id="cb1-43"><a href="#cb1-43"></a>        model.branch.name, model.branch.commit.sha</span>
<span id="cb1-44"><a href="#cb1-44"></a>    )<span class="op">]</span></span>
<span id="cb1-45"><a href="#cb1-45"></a><span class="op">}</span></span>
<span id="cb1-46"><a href="#cb1-46"></a></span>
<span id="cb1-47"><a href="#cb1-47"></a><span class="kw">fn</span> init(_: Url, orders: &amp;<span class="kw">mut</span> <span class="kw">impl</span> Orders&lt;Msg&gt;) -&gt; Init&lt;Model&gt; <span class="op">{</span></span>
<span id="cb1-48"><a href="#cb1-48"></a>    orders.perform_cmd(fetch_data());</span>
<span id="cb1-49"><a href="#cb1-49"></a>    <span class="pp">Init::</span>new(<span class="pp">Model::</span><span class="kw">default</span>())</span>
<span id="cb1-50"><a href="#cb1-50"></a><span class="op">}</span></span>
<span id="cb1-51"><a href="#cb1-51"></a></span>
<span id="cb1-52"><a href="#cb1-52"></a><span class="at">#[</span>wasm_bindgen<span class="at">]</span></span>
<span id="cb1-53"><a href="#cb1-53"></a><span class="kw">pub</span> <span class="kw">fn</span> render() <span class="op">{</span></span>
<span id="cb1-54"><a href="#cb1-54"></a>    <span class="kw">let</span> app = <span class="pp">seed::App::</span>build(init, update, view)</span>
<span id="cb1-55"><a href="#cb1-55"></a>        .finish()</span>
<span id="cb1-56"><a href="#cb1-56"></a>        .run();</span>
<span id="cb1-57"><a href="#cb1-57"></a></span>
<span id="cb1-58"><a href="#cb1-58"></a>    app.update(<span class="pp">Msg::</span>FetchData);</span>
<span id="cb1-59"><a href="#cb1-59"></a><span class="op">}</span></span></code></pre></div>
<p>On page load, we trigger an update in the <code>init</code> function using <code>Msg::FetchData</code>, which points the <code>update</code> via <code>orders.perform_cmd</code> and a function we’ve created called <code>fetch_data</code>. This allows state to be update asynchronosly, when the request is complete. <code>skip()</code> is a convenience method that sets <code>Update::ShouldRender</code> to <code>Skip</code>; sending the request doesn’t trigger a render. We pattern-match the response in the <code>update</code> function’s<code>DataFetched</code> arm: If successful, we update the model. If not, we display an error in the console using the <code>error!</code> macro.</p>
<p>We’ve set up nested structs that have fields matching the names of the JSON fields of the response, which <code>Serde</code> deserializes the response into, through the <code>fetch_json</code> method of <code>Request</code>. Note that even though more data than what’s contained in our Branch struct is included in the response, Serde automatically applies only the info matching our struct’s fields.</p>
<p>If we wish to trigger this update from a normal event instead of on load, we can do something like this:</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode rust"><code class="sourceCode rust"><span id="cb2-1"><a href="#cb2-1"></a><span class="kw">fn</span> view(model: &amp;Model) -&gt; <span class="dt">Vec</span>&lt;Node&lt;Msg&gt;&gt; <span class="op">{</span></span>
<span id="cb2-2"><a href="#cb2-2"></a>    <span class="pp">vec!</span><span class="op">[</span></span>
<span id="cb2-3"><a href="#cb2-3"></a>        <span class="pp">div!</span><span class="op">[</span><span class="pp">format!</span>(</span>
<span id="cb2-4"><a href="#cb2-4"></a>            <span class="st">&quot;Repo info: Name: {}, SHA: {}&quot;</span>,</span>
<span id="cb2-5"><a href="#cb2-5"></a>            model.branch.name, model.branch.commit.sha</span>
<span id="cb2-6"><a href="#cb2-6"></a>        )<span class="op">]</span>,</span>
<span id="cb2-7"><a href="#cb2-7"></a>        <span class="pp">button!</span><span class="op">[</span> raw_ev(<span class="pp">Ev::</span>Click, <span class="kw">move</span> |_| <span class="pp">Msg::</span>FetchData), <span class="st">&quot;Update&quot;</span><span class="op">]</span></span>
<span id="cb2-8"><a href="#cb2-8"></a>    <span class="op">]</span></span>
<span id="cb2-9"><a href="#cb2-9"></a><span class="op">}</span></span></code></pre></div>
<h2 id="sending-data">Sending data</h2>
<p>Example showing a POST request where we send data to a server and receive the response, and a header:</p>
<div class="sourceCode" id="cb3"><pre class="sourceCode rust"><code class="sourceCode rust"><span id="cb3-1"><a href="#cb3-1"></a><span class="at">#[</span>derive<span class="at">(</span>Serialize<span class="at">)]</span></span>
<span id="cb3-2"><a href="#cb3-2"></a><span class="kw">struct</span> RequestBody <span class="op">{</span></span>
<span id="cb3-3"><a href="#cb3-3"></a>    <span class="kw">pub</span> name: <span class="dt">String</span>,</span>
<span id="cb3-4"><a href="#cb3-4"></a>    <span class="kw">pub</span> email: <span class="dt">String</span>,</span>
<span id="cb3-5"><a href="#cb3-5"></a>    <span class="kw">pub</span> message: <span class="dt">String</span>,</span>
<span id="cb3-6"><a href="#cb3-6"></a><span class="op">}</span></span>
<span id="cb3-7"><a href="#cb3-7"></a></span>
<span id="cb3-8"><a href="#cb3-8"></a><span class="at">#[</span>derive<span class="at">(</span><span class="bu">Debug</span><span class="at">,</span> <span class="bu">Clone</span><span class="at">,</span> Deserialize<span class="at">)]</span></span>
<span id="cb3-9"><a href="#cb3-9"></a><span class="kw">struct</span> ResponseBody <span class="op">{</span></span>
<span id="cb3-10"><a href="#cb3-10"></a>    <span class="kw">pub</span> success: <span class="dt">bool</span>,</span>
<span id="cb3-11"><a href="#cb3-11"></a><span class="op">}</span></span>
<span id="cb3-12"><a href="#cb3-12"></a></span>
<span id="cb3-13"><a href="#cb3-13"></a><span class="at">#[</span>derive<span class="at">(</span><span class="bu">Clone</span><span class="at">)]</span></span>
<span id="cb3-14"><a href="#cb3-14"></a><span class="kw">enum</span> Msg <span class="op">{</span></span>
<span id="cb3-15"><a href="#cb3-15"></a>    SendMessage,</span>
<span id="cb3-16"><a href="#cb3-16"></a>    MessageSent(<span class="pp">seed::fetch::</span>ResponseDataResult&lt;ResponseBody&gt;),</span>
<span id="cb3-17"><a href="#cb3-17"></a><span class="op">}</span></span>
<span id="cb3-18"><a href="#cb3-18"></a></span>
<span id="cb3-19"><a href="#cb3-19"></a><span class="kw">fn</span> update(msg: Msg, model: &amp;<span class="kw">mut</span> Model, orders: &amp;<span class="kw">mut</span> <span class="kw">impl</span> Orders&lt;Msg&gt;) <span class="op">{</span></span>
<span id="cb3-20"><a href="#cb3-20"></a>    <span class="kw">match</span> msg <span class="op">{</span></span>
<span id="cb3-21"><a href="#cb3-21"></a>        <span class="pp">Msg::</span>SendMessage =&gt; <span class="op">{</span></span>
<span id="cb3-22"><a href="#cb3-22"></a>            orders.skip().perform_cmd(send_message());</span>
<span id="cb3-23"><a href="#cb3-23"></a>        <span class="op">}</span></span>
<span id="cb3-24"><a href="#cb3-24"></a></span>
<span id="cb3-25"><a href="#cb3-25"></a>        <span class="pp">Msg::</span>MessageSent(<span class="cn">Ok</span>(response_data)) =&gt; <span class="op">{</span></span>
<span id="cb3-26"><a href="#cb3-26"></a>            <span class="pp">log!</span>(<span class="pp">format!</span>(<span class="st">&quot;Response data: {:#?}&quot;</span>, response_data));</span>
<span id="cb3-27"><a href="#cb3-27"></a>            orders.skip();</span>
<span id="cb3-28"><a href="#cb3-28"></a>        <span class="op">}</span></span>
<span id="cb3-29"><a href="#cb3-29"></a></span>
<span id="cb3-30"><a href="#cb3-30"></a>        <span class="pp">Msg::</span>MessageSent(<span class="cn">Err</span>(fail_reason)) =&gt; <span class="op">{</span></span>
<span id="cb3-31"><a href="#cb3-31"></a>            <span class="pp">error!</span>(<span class="pp">format!</span>(</span>
<span id="cb3-32"><a href="#cb3-32"></a>                <span class="st">&quot;Fetch error - Sending message failed - {:#?}&quot;</span>,</span>
<span id="cb3-33"><a href="#cb3-33"></a>                fail_reason</span>
<span id="cb3-34"><a href="#cb3-34"></a>            ));</span>
<span id="cb3-35"><a href="#cb3-35"></a>            orders.skip();</span>
<span id="cb3-36"><a href="#cb3-36"></a>        <span class="op">}</span></span>
<span id="cb3-37"><a href="#cb3-37"></a>    <span class="op">}</span></span>
<span id="cb3-38"><a href="#cb3-38"></a><span class="op">}</span></span>
<span id="cb3-39"><a href="#cb3-39"></a></span>
<span id="cb3-40"><a href="#cb3-40"></a><span class="kw">fn</span> send_message() -&gt; <span class="kw">impl</span> Future&lt;Item = Msg, Error = Msg&gt; <span class="op">{</span></span>
<span id="cb3-41"><a href="#cb3-41"></a>    <span class="kw">let</span> message = RequestBody <span class="op">{</span></span>
<span id="cb3-42"><a href="#cb3-42"></a>        name: <span class="st">&quot;Mark Watney&quot;</span>.into(),</span>
<span id="cb3-43"><a href="#cb3-43"></a>        email: <span class="st">&quot;mark@crypt.kk&quot;</span>.into(),</span>
<span id="cb3-44"><a href="#cb3-44"></a>        message: <span class="st">&quot;I wanna be like Iron Man&quot;</span>.into(),</span>
<span id="cb3-45"><a href="#cb3-45"></a>    <span class="op">}</span>;</span>
<span id="cb3-46"><a href="#cb3-46"></a></span>
<span id="cb3-47"><a href="#cb3-47"></a>    <span class="pp">Request::</span>new(CONTACT_URL)</span>
<span id="cb3-48"><a href="#cb3-48"></a>        .method(<span class="pp">Method::</span>Post)</span>
<span id="cb3-49"><a href="#cb3-49"></a>        .send_json(&amp;message)</span>
<span id="cb3-50"><a href="#cb3-50"></a>        .fetch_json_data(<span class="pp">Msg::</span>MessageSent)</span>
<span id="cb3-51"><a href="#cb3-51"></a><span class="op">}</span></span>
<span id="cb3-52"><a href="#cb3-52"></a></span>
<span id="cb3-53"><a href="#cb3-53"></a><span class="kw">fn</span> view(model: &amp;Model) -&gt; Node&lt;Msg&gt; <span class="op">{</span></span>
<span id="cb3-54"><a href="#cb3-54"></a>    <span class="pp">button!</span><span class="op">[</span></span>
<span id="cb3-55"><a href="#cb3-55"></a>        simple_ev(<span class="pp">Ev::</span>Click, <span class="pp">Msg::</span>SendMessage),</span>
<span id="cb3-56"><a href="#cb3-56"></a>        <span class="st">&quot;Send an urgent message (see console log)&quot;</span></span>
<span id="cb3-57"><a href="#cb3-57"></a>    <span class="op">]</span></span>
<span id="cb3-58"><a href="#cb3-58"></a><span class="op">}</span></span></code></pre></div>
<p>Reference the <code>Request</code> API docs (linked above) for a full list of methods available to configure the request, and links to the <code>MDN</code> docs describing them. (eg: <code>credentials</code>, <code>mode</code>, <code>integrity</code>)</p>
"#####.into()
}