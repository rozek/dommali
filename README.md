# dommali #

a lightweight DOM manipulation library with jQuery-inspired "fluent" API

The use of jQuery makes DOM manipulation code compact and legible - but it is a rather large library with many no longer required features. The idea behind `dommali` is to create a thin layer on top of the API of modern browsers (excluding MS IE and "classic" MS Edge!) that still allows code to be as concise as jQuery would do.

`dommali` was inspired by [nanoJS](https://github.com/vladocar/nanoJS) and [femtoJS](https://github.com/vladocar/femtoJS) - and like those, its implementation is so simple that it is not too difficult to add new methods or remove unwanted ones in order to enhance functionality or reduce size.

> Important: `dommali` is no drop-in replacement for jQuery! If you need something like that, look for [Zepto.js](https://github.com/ZeptoJS/Zepto.js), [Cash](https://github.com/fabiospampinato/cash), [UmbrellaJS](https://github.com/franciscop/umbrella), [Chibi](https://github.com/kylebarrow/chibi) or similar





## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/dommali/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
