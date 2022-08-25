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

* **`get length ():number`**<br>
* **`size ():number`**<br>
* **`isEmpty ():boolean`**<br>
* **`subjects ():Element[]`**<br>
* **`subject (Index:number):Element|undefined`**<br>
* **`indexOf (Value:Element|DOMMaLi):number`**<br>

### Element Extraction ###

* **`slice (start?:number, end?:number):DOMMaLi`**<br>
* **`first ():DOMMaLi`**<br>
* **`last ():DOMMaLi`**<br>
* **`eq (Index:number):DOMMaLi`**<br>

### Content Iterators ###

* **`forEach (Callback:Function):DOMMaLi`**<br>
* **`filter (SelectorOrCallback:string|String|Function):DOMMaLi`**<br>

### CSS Queries ###

* **`matches (Selector:string|String):boolean`**<br>
* **`find (Selector:string|String):DOMMaLi`**<br>
* **`findFirst (Selector:string|String):DOMMaLi`**<br>

### Position and Size ###

* **`positionInViewport ():{ left:number,top:number }|undefined`**<br>
* **`renderPositionInViewport ():{ left:number,top:number }|undefined`**<br>
* **`positionInParent ():{ left:number,top:number }|undefined`**<br>
* **`LayoutositionInParent ():{ left:number,top:number }|undefined`**<br>
* **`positionOnPage ():{ left:number,top:number }|undefined`**<br>
* **`layoutPositionOnPage ():{ left:number,top:number }|undefined`**<br>
* **`width (newValue?:number):number|DOMMaLi|undefined`**<br>
* **`height (newValue?:number):number|DOMMaLi|undefined`**<br>
* **`layoutWidth (newValue?:number):number|DOMMaLi|undefined`**<br>
* **`layoutHeight (newValue?:number):number|DOMMaLi|undefined`**<br>
* **`outerWidth (newValue?:number):number|DOMMaLi|undefined`**<br>
* **`outerHeight (newValue?:number):number|DOMMaLi|undefined`**<br>
* **`renderWidth (newValue?:number):number|DOMMaLi|undefined`**<br>
* **`renderWeight (newValue?:number):number|DOMMaLi|undefined`**<br>

### DOM Hierarchy ###

* **`parent ():DOMMaLi`**<br>
* **`closest (Selector:string|String):DOMMaLi`**<br>
* **`isAttached ():boolean`**<br>
* **`contains (Candidate:DOMMaLi):boolean`**<br>
* **`children (Selector?:string|String):DOMMaLi`**<br>
* **`firstChild (Selector?:string|String):DOMMaLi`**<br>
* **`lastChild (Selector?:string|String):DOMMaLi`**<br>
* **`prev (Selector?:string|String):DOMMaLi`**<br>
* **`next (Selector?:string|String):DOMMaLi`**<br>

### Visibility ###

* **`show (DisplaySetting?:string):DOMMaLi`**<br>
* **`hide ():DOMMaLi`**<br>

### Scrolling ###

* **`scrollLeft ():number|undefined`**<br>
* **`scrollTop ():number|undefined`**<br>
* **`scrollRight ():number|undefined`**<br>
* **`scrollBottom ():number|undefined`**<br>
* **`scrollTo (x:number, y:number, Mode:'instant'|'smooth'|'auto' = 'auto'):DOMMaLi`**<br>

### CSS Class Management ###

* **`hasClass (Classes:string):boolean`**<br>
* **`addClass (Classes:string):DOMMaLi`**<br>
* **`toggleClass (Classes:string):DOMMaLi`**<br>
* **`removeClass (Classes:string):DOMMaLi`**<br>

### Insertion and Removal ###

* **`append (Content:string|String|DOMMaLi|Element|Element[]):DOMMaLi`**<br>
* **`prepend (Content:string|String|DOMMaLi|Element|Element[]):DOMMaLi`**<br>
* **`insertAfter (Content:DOMMaLi):DOMMaLi`**<br>
* **`insertBefore (Content:DOMMaLi):DOMMaLi`**<br>
* **`replaceWith (Replacement:string|String|DOMMaLi|Element|Element[]):void`**<br>
* **`remove ():DOMMaLi`**<br>

### Properties ###

* **`prop (Property:string, newValue?:any):DOMMaLi|any|undefined`**<br>
* **`hasProp (Property:string):boolean`**<br>
* **`removeProp (Property:string):DOMMaLi`**<br>

### Data ###

* **`data (Key:string, newValue?:any):DOMMaLi|any|undefined`**<br>
* **`hasData (Key:string):boolean`**<br>
* **`removeData (Key:string):DOMMaLi`**<br>

### Attributes ###

* **`attr (Attribute:string, newValue?:any):DOMMaLi|string|undefined`**<br>
* **`hasAttr (Attribute:string):boolean`**<br>
* **`removeAttr (Attribute:string):DOMMaLi`**<br>

### CSS ###

* **`css (Property:string|string, newValue?:string):DOMMaLi|string|undefined`**<br>
* **`css (PropertyList:string[]):PlainObject|undefined`**<br>
* **`css (PropertySet:PlainObject):DOMMaLi`**<br>

### Contents ###

* **`html (newValue?:string):DOMMaLi|string|undefined`**<br>
* **`text (newValue?:string):DOMMaLi|string|undefined`**<br>
* **`appendText (Value:string):DOMMaLi`**<br>
* **`prependText (Value:string):DOMMaLi`**<br>

### Event Handling ###

* **`on (Events:string, Handler:Function):DOMMaLi`**<br>
* **`on (Events:string, Selector:string|String|null, Handler:Function):DOMMaLi`**<br>
* **`on (Events:string, Selector:string|String|null, Data:any, Handler:Function):DOMMaLi`**<br>
* **`once (Events:string, Handler:Function):DOMMaLi`**<br>
* **`once (Events:string, Selector:string|String|null, Handler:Function):DOMMaLi`**<br>
* **`once (Events:string, Selector:string|String|null, Data:any, Handler:Function):DOMMaLi`**<br>
* **`off ():DOMMaLi`**<br>
* **`off (Events:string):DOMMaLi`**<br>
* **`off (Events:string, Selector:string|String|null):DOMMaLi`**<br>
* **`off (Events:string, Selector:string|String|null, Handler:Function):DOMMaLi`**<br>
* **`trigger (Event:string|Event, extraParameters?:any):boolean`**<br>

### Focus Handling ###

* **`focus ():DOMMaLi`**<br>
* **`blur ():DOMMaLi`**<br>
* **`hasFocus ():boolean`**<br>

### CSS Transitions ###

* **`transition (Settings:PlainObject, Options?:PlainObject):DOMMaLi`**<br>

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
