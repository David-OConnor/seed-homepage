(function() {
    const __exports = {};
    let wasm;

    /**
    * @returns {void}
    */
    __exports.render = function() {
        return wasm.render();
    };

    const heap = new Array(32);

    heap.fill(undefined);

    heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function init(module) {

    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__widl_instanceof_Node = function(arg0) {
        return getObject(arg0) instanceof Node;
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__widl_f_set_inner_html_Element = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).innerHTML = varg1;
    };
    imports.wbg.__widl_f_child_nodes_Node = function(arg0) {
        return addHeapObject(getObject(arg0).childNodes);
    };
    imports.wbg.__widl_f_length_NodeList = function(arg0) {
        return getObject(arg0).length;
    };
    imports.wbg.__wbg_resolve_3e3c14963c939fcd = function(arg0) {
        return addHeapObject(Promise.resolve(getObject(arg0)));
    };
    imports.wbg.__wbg_then_ad0b568733866d25 = function(arg0, arg1, arg2) {
        return addHeapObject(getObject(arg0).then(getObject(arg1), getObject(arg2)));
    };
    imports.wbg.__widl_f_insert_before_Node = function(arg0, arg1, arg2) {
        try {
            return addHeapObject(getObject(arg0).insertBefore(getObject(arg1), getObject(arg2)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_remove_child_Node = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).removeChild(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_replace_child_Node = function(arg0, arg1, arg2) {
        try {
            return addHeapObject(getObject(arg0).replaceChild(getObject(arg1), getObject(arg2)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_cancel_animation_frame_Window = function(arg0, arg1) {
        try {
            getObject(arg0).cancelAnimationFrame(arg1);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_value_HTMLInputElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).value = varg1;
    };
    imports.wbg.__widl_instanceof_HTMLSelectElement = function(arg0) {
        return getObject(arg0) instanceof HTMLSelectElement;
    };
    imports.wbg.__widl_f_set_value_HTMLSelectElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).value = varg1;
    };
    imports.wbg.__widl_instanceof_HTMLProgressElement = function(arg0) {
        return getObject(arg0) instanceof HTMLProgressElement;
    };
    imports.wbg.__widl_instanceof_HTMLOptionElement = function(arg0) {
        return getObject(arg0) instanceof HTMLOptionElement;
    };
    imports.wbg.__widl_f_set_value_HTMLOptionElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).value = varg1;
    };
    imports.wbg.__widl_f_set_value_HTMLProgressElement = function(arg0, arg1) {
        getObject(arg0).value = arg1;
    };
    imports.wbg.__widl_instanceof_HTMLButtonElement = function(arg0) {
        return getObject(arg0) instanceof HTMLButtonElement;
    };
    imports.wbg.__widl_f_set_value_HTMLButtonElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).value = varg1;
    };
    imports.wbg.__widl_instanceof_HTMLDataElement = function(arg0) {
        return getObject(arg0) instanceof HTMLDataElement;
    };
    imports.wbg.__widl_f_set_value_HTMLDataElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).value = varg1;
    };
    imports.wbg.__widl_instanceof_HTMLMeterElement = function(arg0) {
        return getObject(arg0) instanceof HTMLMeterElement;
    };
    imports.wbg.__widl_instanceof_HTMLLIElement = function(arg0) {
        return getObject(arg0) instanceof HTMLLIElement;
    };
    imports.wbg.__widl_f_set_value_HTMLMeterElement = function(arg0, arg1) {
        getObject(arg0).value = arg1;
    };
    imports.wbg.__widl_instanceof_HTMLOutputElement = function(arg0) {
        return getObject(arg0) instanceof HTMLOutputElement;
    };
    imports.wbg.__widl_f_set_value_HTMLOutputElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).value = varg1;
    };
    imports.wbg.__widl_instanceof_HTMLParamElement = function(arg0) {
        return getObject(arg0) instanceof HTMLParamElement;
    };
    imports.wbg.__widl_f_set_value_HTMLParamElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).value = varg1;
    };
    imports.wbg.__widl_f_set_value_HTMLLIElement = function(arg0, arg1) {
        getObject(arg0).value = arg1;
    };
    imports.wbg.__widl_f_set_checked_HTMLInputElement = function(arg0, arg1) {
        getObject(arg0).checked = arg1 !== 0;
    };
    imports.wbg.__widl_instanceof_HTMLMenuItemElement = function(arg0) {
        return getObject(arg0) instanceof HTMLMenuItemElement;
    };
    imports.wbg.__widl_f_set_checked_HTMLMenuItemElement = function(arg0, arg1) {
        getObject(arg0).checked = arg1 !== 0;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(varg0);
    };
    imports.wbg.__widl_f_error_1_ = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__widl_instanceof_HTMLInputElement = function(arg0) {
        return getObject(arg0) instanceof HTMLInputElement;
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        return addHeapObject(new Error());
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).stack);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);

        varg0 = varg0.slice();
        wasm.__wbindgen_free(arg0, arg1 * 1);

        console.error(varg0);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        return addHeapObject(getObject(arg0));
    };
    imports.wbg.__widl_instanceof_Window = function(arg0) {
        return getObject(arg0) instanceof Window;
    };
    imports.wbg.__widl_f_create_element_Document = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            return addHeapObject(getObject(arg0).createElement(varg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_create_text_node_Document = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        return addHeapObject(getObject(arg0).createTextNode(varg1));
    };
    imports.wbg.__widl_instanceof_Element = function(arg0) {
        return getObject(arg0) instanceof Element;
    };
    imports.wbg.__widl_f_get_attribute_Element = function(ret, arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        const val = getObject(arg0).getAttribute(varg1);
        const retptr = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__widl_f_remove_attribute_Element = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            getObject(arg0).removeAttribute(varg1);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_attribute_Element = function(arg0, arg1, arg2, arg3, arg4) {
        let varg1 = getStringFromWasm(arg1, arg2);
        let varg3 = getStringFromWasm(arg3, arg4);
        try {
            getObject(arg0).setAttribute(varg1, varg3);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_tag_name_Element = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).tagName);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__widl_f_add_event_listener_with_callback_EventTarget = function(arg0, arg1, arg2, arg3) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            getObject(arg0).addEventListener(varg1, getObject(arg3));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_remove_event_listener_with_callback_EventTarget = function(arg0, arg1, arg2, arg3) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            getObject(arg0).removeEventListener(varg1, getObject(arg3));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_type_HTMLInputElement = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).type);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__widl_instanceof_HTMLTextAreaElement = function(arg0) {
        return getObject(arg0) instanceof HTMLTextAreaElement;
    };
    imports.wbg.__widl_f_set_value_HTMLTextAreaElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).value = varg1;
    };
    imports.wbg.__widl_f_append_child_Node = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).appendChild(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_node_type_Node = function(arg0) {
        return getObject(arg0).nodeType;
    };
    imports.wbg.__widl_f_first_child_Node = function(arg0) {

        const val = getObject(arg0).firstChild;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_next_sibling_Node = function(arg0) {

        const val = getObject(arg0).nextSibling;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_get_NodeList = function(arg0, arg1) {

        const val = getObject(arg0)[arg1 >>> 0];
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_document_Window = function(arg0) {

        const val = getObject(arg0).document;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__wbg_call_3d24f4e03e010931 = function(arg0, arg1, arg2) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1), getObject(arg2)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_new_9a63f36b37c30713 = function(arg0, arg1) {
        let cbarg0 = function(arg0, arg1) {
            let a = this.a;
            this.a = 0;
            try {
                return this.f(a, this.b, addHeapObject(arg0), addHeapObject(arg1));

            } finally {
                this.a = a;

            }

        };
        cbarg0.f = wasm.__wbg_function_table.get(45);
        cbarg0.a = arg0;
        cbarg0.b = arg1;
        try {
            return addHeapObject(new Promise(cbarg0.bind(cbarg0)));
        } finally {
            cbarg0.a = cbarg0.b = 0;

        }
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        return false;
    };
    imports.wbg.__wbg_then_1469c8cdb2c56f2f = function(arg0, arg1) {
        return addHeapObject(getObject(arg0).then(getObject(arg1)));
    };
    imports.wbg.__wbg_newnoargs_8d1797b163dbc9fb = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(new Function(varg0));
    };
    imports.wbg.__wbg_call_836fa928f74337e5 = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg0);
        if (typeof(obj) !== 'string') return 0;
        const ptr = passStringToWasm(obj);
        getUint32Memory()[arg1 / 4] = WASM_VECTOR_LEN;
        return ptr;
    };
    imports.wbg.__wbindgen_debug_string = function(ret, arg0) {

        const retptr = passStringToWasm(debugString(getObject(arg0)));
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        throw new Error(varg0);
    };
    imports.wbg.__widl_f_request_animation_frame_Window = function(arg0, arg1) {
        try {
            return getObject(arg0).requestAnimationFrame(getObject(arg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_target_Event = function(arg0) {

        const val = getObject(arg0).target;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_closest_Element = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {

            const val = getObject(arg0).closest(varg1);
            return isLikeNone(val) ? 0 : addHeapObject(val);

        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_prevent_default_Event = function(arg0) {
        getObject(arg0).preventDefault();
    };
    imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(JSON.parse(varg0));
    };
    imports.wbg.__widl_f_history_Window = function(arg0) {
        try {
            return addHeapObject(getObject(arg0).history);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_push_state_with_url_History = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        let varg2 = getStringFromWasm(arg2, arg3);
        let varg4 = arg4 == 0 ? undefined : getStringFromWasm(arg4, arg5);
        try {
            getObject(arg0).pushState(getObject(arg1), varg2, varg4);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_instanceof_PopStateEvent = function(arg0) {
        return getObject(arg0) instanceof PopStateEvent;
    };
    imports.wbg.__widl_f_state_PopStateEvent = function(arg0) {
        return addHeapObject(getObject(arg0).state);
    };
    imports.wbg.__widl_f_get_element_by_id_Document = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);

        const val = getObject(arg0).getElementById(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_location_Window = function(arg0) {
        return addHeapObject(getObject(arg0).location);
    };
    imports.wbg.__widl_f_pathname_Location = function(ret, arg0) {
        try {

            const retptr = passStringToWasm(getObject(arg0).pathname);
            const retlen = WASM_VECTOR_LEN;
            const mem = getUint32Memory();
            mem[ret / 4] = retptr;
            mem[ret / 4 + 1] = retlen;

        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_hash_Location = function(ret, arg0) {
        try {

            const retptr = passStringToWasm(getObject(arg0).hash);
            const retlen = WASM_VECTOR_LEN;
            const mem = getUint32Memory();
            mem[ret / 4] = retptr;
            mem[ret / 4 + 1] = retlen;

        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_search_Location = function(ret, arg0) {
        try {

            const retptr = passStringToWasm(getObject(arg0).search);
            const retlen = WASM_VECTOR_LEN;
            const mem = getUint32Memory();
            mem[ret / 4] = retptr;
            mem[ret / 4 + 1] = retlen;

        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbindgen_cb_forget = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__widl_f_set_text_content_Node = function(arg0, arg1, arg2) {
        let varg1 = arg1 == 0 ? undefined : getStringFromWasm(arg1, arg2);
        getObject(arg0).textContent = varg1;
    };
    imports.wbg.__widl_f_text_content_Node = function(ret, arg0) {
        const val = getObject(arg0).textContent;
        const retptr = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__widl_f_get_attribute_names_Element = function(arg0) {
        return addHeapObject(getObject(arg0).getAttributeNames());
    };
    imports.wbg.__wbg_forEach_0288520733c2c530 = function(arg0, arg1, arg2) {
        let cbarg1 = function(arg0, arg1, arg2) {
            let a = this.a;
            this.a = 0;
            try {
                return this.f(a, this.b, addHeapObject(arg0), arg1, addHeapObject(arg2));

            } finally {
                this.a = a;

            }

        };
        cbarg1.f = wasm.__wbg_function_table.get(39);
        cbarg1.a = arg1;
        cbarg1.b = arg2;
        try {
            getObject(arg0).forEach(cbarg1.bind(cbarg1));
        } finally {
            cbarg1.a = cbarg1.b = 0;

        }
    };
    imports.wbg.__widl_f_namespace_uri_Element = function(ret, arg0) {
        const val = getObject(arg0).namespaceURI;
        const retptr = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__widl_f_create_element_ns_Document = function(arg0, arg1, arg2, arg3, arg4) {
        let varg1 = arg1 == 0 ? undefined : getStringFromWasm(arg1, arg2);
        let varg3 = getStringFromWasm(arg3, arg4);
        try {
            return addHeapObject(getObject(arg0).createElementNS(varg1, varg3));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_instanceof_HTMLElement = function(arg0) {
        return getObject(arg0) instanceof HTMLElement;
    };
    imports.wbg.__widl_f_focus_HTMLElement = function(arg0) {
        try {
            getObject(arg0).focus();
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbindgen_closure_wrapper257 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(34);
        const d = wasm.__wbg_function_table.get(35);
        const b = arg1;
        const cb = function(arg0) {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b, addHeapObject(arg0));

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };
    imports.wbg.__wbindgen_closure_wrapper3417 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(83);
        const d = wasm.__wbg_function_table.get(84);
        const b = arg1;
        const cb = function(arg0) {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b, arg0);

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };
    imports.wbg.__wbindgen_closure_wrapper3414 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(80);
        const d = wasm.__wbg_function_table.get(81);
        const b = arg1;
        const cb = function(arg0) {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b, addHeapObject(arg0));

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

self.wasm_bindgen = Object.assign(init, __exports);

})();
