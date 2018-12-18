# About

## Goals
- Learning the syntax, creating a project, and building it should be easy - regardless
of your familiarity with Rust.

- Complete documentation that always matches the current version. Getting examples working, and
 starting a project should be painless, and require nothing beyond this guide.
 
- Expressive, flexible vew syntax that's easy to read and write.


## A note on view syntax
This project takes a different approach to describing how to display DOM elements 
than others. It neither uses completely natural (ie macro-free) Rust code, nor
an HTML-like abstraction (eg JSX or templates). My intent is to make the code close 
to natural Rust, while streamlining the syntax in a way suited for creating 
a visual layout with minimal repetition. The macros used here are thin wrappers
for constructors, and don't conceal much. Specifically, the element-creation macros
allow for accepting a variable number of arguments, and the attrs/style marcros are 
essentially HashMap literals, with wrappers that let el macros know to distinguish
them.

The relative lack of resemblance to HTML be offputting at first, but the learning
curve is shallow, and I think the macro syntax used to create elements, attributes etc
is close-enough to normal Rust syntax that it's easy to reason about how the code
should come together, without compartmentalizing it into logic code and display code.
 This lack of separation
in particlar is a subjective, controversial decision, but I think the benefits 
are worth it.


## Where to start if you're familiar with existing frontend frameworks
The [todomvc example](https://github.com/David-OConnor/seed/tree/master/examples/todomvc) is an implementation of the [TodoMVC project](http://todomvc.com/),
which has example code in my frameworks that do the same thing. Compare the example in this
project to one on that page that uses a framework you're familiar with.

## Suggestions? Critique? Submit an issue or pull request on Github

## Influences
This project is strongly influenced by Elm, React, and Redux. The overall layout
of Seed apps mimicks that of The Elm Architecture.


## Why another entry in a saturated field?

### There are already several Rust/WASM frameworks; why add another?

My goal is for this to be easy to pick up from looking at a tutorial or documentation, regardless of your
level of experience with Rust. I'm distinguising this package through clear examples
and documentation (see goals above), and using `wasm-bindgen` internally. I started this
project after being unable to get existing frameworks to work
due to lack of documented examples, and inconsistency between documentation and 
published versions. My intent is for anyone who's proficient in a frontend
framework to get a standalone app working in the browser within a few minutes, using just the 
quickstart guide.

Seed approaches HTML-display syntax differently from existing packages: 
rather than use an HTML-like markup similar to JSX, 
it uses Rust builtin types, thinly-wrapped by a macro for each DOM element.
This decision may not appeal to everyone, 
but I think it integrates more naturally with the language.

### Why build a frontend in Rust over Elm or Javascript-based frameworks?

You may prefer writing in Rust, and using packages from Cargo vis npm. Getting started with
this framework will, in most cases be faster, and require less config and setup overhead than
with JS frameworks. You like the advantages of compile-time error-checking.

You may choose 
this approach over Elm if you're already comfortable with Rust, want the performance 
benefits, or don't want to code business logic in a purely-functional langauge.

Compared with React, you may appreciate the consistency of how to write apps:
There's no distinction between logic and display code; no restrictions on comments;
no distinction between components and normal functions. The API is
flexible, and avoids OOP boilerplate.

I also hope that config, building, and dependency-management is cleaner with Cargo and
wasm-bindgen than with npm.

### Shoutouts
 - The [WASM-Bindgen](https://github.com/rustwasm/wasm-bindgen) team: 
 For building the tools this project relies on
 - Alex Chrichton, for being extraodinarily helpful in the Rust / WASM community
 - The [Elm](https://elm-lang.org/) team: For creating and standardizing the Elm architecture
 - Denis Kolodin: for creating the inspirational [Yew framework](https://github.com/DenisKolodin/yew)
 - Utkarsh Kukreti, for through his [Draco repo](https://github.com/utkarshkukreti/draco), 
 helping me understand how wasm-bindgen's
 closure system can be used to update state.
 - Tim Robinson, for being very helpful on the [Rust Gitter](https://gitter.im/rust-lang/rust).

### Features to add
 - Router
 - High-level fetch API
 - Composable or mergable styles and attrs
 - Virtual DOM optimization 
 - Docs/tutorial website example to replace this readme
 - High-level CSS-grid/Flexbox API ?
 
 ### Bugs to fix
 - Text renders above children instead of below
 
 ## Reference
- [wasm-bindgen guide](https://rustwasm.github.io/wasm-bindgen/introduction.html)
- [Mozilla MDN web docs](https://developer.mozilla.org/en-US/)
- [web-sys api](https://rustwasm.github.io/wasm-bindgen/api/web_sys/) (A good partner for the MDN docs - most DOM items have web-sys equivalents used internally)
- [Rust book](https://doc.rust-lang.org/book/index.html)
- [Rust standard library api](https://doc.rust-lang.org/std/)
- [Seed's API docs](https://docs.rs/seed)
- [Learn Rust](https://www.rust-lang.org/learn)
