# dommali #

a lightweight DOM manipulation library with jQuery-inspired "fluent" API

The use of jQuery makes DOM manipulation code compact and legible - but it is a rather large library with many no longer required features. The idea behind `dommali` is to create a thin layer on top of the API of modern browsers (excluding MS IE and "classic" MS Edge!) that still allows code to be as concise as jQuery would do.

`dommali` was inspired by [nanoJS](https://github.com/vladocar/nanoJS) and [femtoJS](https://github.com/vladocar/femtoJS) - and like those, its implementation is so simple that it is not too difficult to add new methods or remove unwanted ones in order to enhance functionality or reduce size.

> Important: `dommali` is no drop-in replacement for jQuery! If you need something like that, look for [Zepto.js](https://github.com/ZeptoJS/Zepto.js), [Cash](https://github.com/fabiospampinato/cash), [UmbrellaJS](https://github.com/franciscop/umbrella), [Chibi](https://github.com/kylebarrow/chibi) or similar

**NPM users**: please consider the [Github README](https://github.com/rozek/dommali/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

> Just a small note: if you like this module and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), so that I know which of my repositories to take most care of.

## Installation ##

`dommali` may be used as an ECMAScript module (ESM), a CommonJS or AMD module or from a global variable.

You may either install the package into your build environment using [NPM](https://docs.npmjs.com/) with the command

```
npm install dommali
```

or load the plain script file directly

```html
<script src="https://unpkg.com/dommali"></script>
```

## Access ##

How to access the package depends on the type of module you prefer

* ESM (or Svelte): `import dommali from 'dommali'`
* CommonJS: `const dommali = require('dommali')`
* AMD: `require(['dommali'], (dommali) => {...})`

Alternatively, you may access the global variable `dommali` directly.

## Usage within Svelte ##

For Svelte, it is recommended to import the package in a module context. From then on, its exports may be used as usual:

```html
<script context="module">
  import dommali from 'dommali'
</script>

<script>
  const $ = dommali // make "dommali" calls look like "jQuery" ones
  $(document.body).html('<h1>Hello, World!</h1>')
</script>
```

## Usage as ECMAscript, CommonJS or AMD Module (or as a global Variable) ##

Let's assume that you already "required" or "imported" (or simply loaded) the module according to your local environment. In that case, you may use it as follows:

```javascript
const $ = dommali // make "dommali" calls look like "jQuery" ones
$(document.body).html('<h1>Hello, World!</h1>')
```

## API Reference ##

The signatures shown are those used by TypeScript

### Factory Function ###

* **`dommali():DOMMaLi`**<br>
* **`dommali(startup:Function):typeof DOMMaLi`**<br>
* **`dommali(selector:string):DOMMaLi`**<br>
* **`dommali(html:string):DOMMaLi`**<br>
* **`dommali(element:Element):DOMMaLi`**<br>
* **`dommali(elements:Element[]):DOMMaLi`**<br>
* **`dommali(bridge:DOMMaLi):DOMMaLi`**<br>

### Class Method ###

* **`DOMMaLi.ready(startup:Function):typeof DOMMaLi`**<br>

### Object Inspection ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Element Extraction ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Content Iterators ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### CSS Queries ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Position and Size ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### DOM Hierarchy ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Visibility ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### CSS Class Management ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Insertion and Removal ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Properties ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Data ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Attributes ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### CSS ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Contents ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Event Handling ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### Focus Handling ###

* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>
* **`dommali():DOMMaLi`**<br>

### CSS Transitions ###

* **`dommali():DOMMaLi`**<br>

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
