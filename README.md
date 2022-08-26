# dommali #

a lightweight DOM manipulation library with jQuery-inspired "fluent" API

The use of jQuery makes DOM manipulation code compact and legible - but it is a rather large library with many no longer required features. The idea behind `dommali` (pronounced "dom-ma-li") is to create a thin layer on top of the API of modern browsers (excluding MS IE and "classic" MS Edge!) that still allows code to be as concise as jQuery would do.

`dommali` was inspired by [nanoJS](https://github.com/vladocar/nanoJS) and [femtoJS](https://github.com/vladocar/femtoJS) - and like those, its implementation is so simple that it is not too difficult to add new methods or remove unwanted ones in order to enhance functionality or reduce size.

**Important: `dommali` is no drop-in replacement for jQuery!** If you need something like that, look for [Zepto.js](https://github.com/ZeptoJS/Zepto.js), [Cash](https://github.com/fabiospampinato/cash), [UmbrellaJS](https://github.com/franciscop/umbrella), [Chibi](https://github.com/kylebarrow/chibi) or similar

The most notable differences between `dommali` and jQuery (or a look-alike) are:

* iterator callback functions do not bind `this` to the DOM element just processed, instead they get a corresponding `dommali` object as their first argument - as a consequence, "fat arrow" functions may more easily serve as callbacks
* methods retrieving the current size and position of a DOM element have specific names which makes their intention more obvious particularly for casual programmers: f.e., `positionInViewport` vs. `positionInParent` vs. `positionOnPage`
* additionally, some methods have names (or synonyms) which indicate whether they return _layout_ or _render_ measures: _layout_ positions and dimensions are used by the browser layout engine and do not consider any [CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) applied to DOM elements, whereas _render_ measures take such transforms into account
* `dommali` does not define its own event object - nowadays. creating DOM events is so simple that there is just no need for a wrapper. It _does_, however, support `extraParameters` passed when triggering an event and Event `data` specified while registering an event handler
* event handler registrations support the special "selector" `@this` which effectively limits handler invocations to events directly triggered on elements with the given handler themselves - ignoring any bubbling events
* `dommali` does not support CSS _animations_ but animated CSS transitions - and those are really simple

**NPM users**: please consider the [Github README](https://github.com/rozek/dommali/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

> Just a small note: if you like this module and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), so that I know which of my repositories to take most care of.

## Overview ##

Here are the methods provided by `dommali` in alphabetical order:

<table><tbody>
  <tr>
    <td style="width:33%"><a href="#dommali"><code>dommali()</code></a><br>&nbsp;<br><a href="#ready"><code>DomMaLi.ready()</code></a><br>&nbsp;<br><a href="#addClass"><code>addClass()</code></a><br><a href="#append"><code>append()</code></a><br><a href="#appendText"><code>appendText()</code></a><br><a href="#attr"><code>attr()</code></a><br><a href="#blur"><code>blur()</code></a><br><a href="#children"><code>children()</code></a><br><a href="#closest"><code>closest()</code></a><br><a href="#contains"><code>contains()</code></a><br><a href="#css"><code>css()</code></a><br><a href="#data"><code>data()</code></a><br><a href="#eq"><code>eq()</code></a><br><a href="#filter"><code>filter()</code></a><br><a href="#find"><code>find()</code></a><br><a href="#findFirst"><code>findFirst()</code></a><br><a href="#first"><code>first()</code></a><br><a href="#firstChild"><code>firstChild()</code></a><br><a href="#focus"><code>focus()</code></a><br><a href="#focusedElement"><code>focusedElement()</code></a><br><a href="#forEach"><code>forEach()</code></a><br><a href="#hasAttr"><code>hasAttr()</code></a><br><a href="#hasClass"><code>hasClass()</code></a><br><a href="#hasData"><code>hasData()</code></a><br><a href="#hasProp"><code>hasProp()</code></a><br><a href="#height"><code>height()</code></a></td>
    <td style="width:33%"><a href="#hide"><code>hide()</code></a><br><a href="#html"><code>html()</code></a><br><a href="#indexOf"><code>indexOf()</code></a><br><a href="#innerHeight"><code>innerHeight()</code></a><br><a href="#innerWidth"><code>innerWidth()</code></a><br><a href="#insertAfter"><code>insertAfter()</code></a><br><a href="#insertBefore"><code>insertBefore()</code></a><br><a href="#isAttached"><code>isAttached()</code></a><br><a href="#isFocused"><code>isFocused()</code></a><br><a href="#last"><code>last()</code></a><br><a href="#lastChild"><code>lastChild()</code></a><br><a href="#layoutHeight"><code>layoutHeight()</code></a><br><a href="#layoutPositionInParent"><code>layoutPositionInParent()</code></a><br><a href="#layoutPositionOnPage"><code>layoutPositionOnPage()</code></a><br><a href="#layoutWidth"><code>layoutWidth()</code></a><br><a href="#length"><code>get length()</code></a><br><a href="#matches"><code>matches()</code></a><br><a href="#next"><code>next()</code></a><br><a href="#off"><code>off()</code></a><br><a href="#on"><code>on()</code></a><br><a href="#once"><code>once()</code></a><br><a href="#outerHeight"><code>outerHeight()</code></a><br><a href="#outerWidth"><code>outerWidth()</code></a><br><a href="#parent"><code>parent()</code></a><br><a href="#positionInParent"><code>positionInParent()</code></a><br><a href="#positionInViewport"><code>positionInViewport()</code></a><br><a href="#positionOnPage"><code>positionOnPage()</code></a><br><a href="#prepend"><code>prepend()</code></a></td>
    <td style="width:33%"><a href="#prependText"><code>prependText()</code></a><br><a href="#prev"><code>prev()</code></a><br><a href="#prop"><code>prop()</code></a><br><a href="#remove"><code>remove()</code></a><br><a href="#removeAttr"><code>removeAttr()</code></a><br><a href="#removeClass"><code>removeClass()</code></a><br><a href="#removeData"><code>removeData()</code></a><br><a href="#removeProp"><code>removeProp()</code></a><br><a href="#renderHeight"><code>renderHeight()</code></a><br><a href="#renderPositionInViewport"><code>renderPositionInViewport()</code></a><br><a href="#renderWidth"><code>renderWidth()</code></a><br><a href="#replaceWith"><code>replaceWith()</code></a><br><a href="#scrollHeight"><code>scrollHeight()</code></a><br><a href="#scrollLeft"><code>scrollLeft()</code></a><br><a href="#scrollTo"><code>scrollTo()</code></a><br><a href="#scrollTop"><code>scrollTop()</code></a><br><a href="#scrollWidth"><code>scrollWidth()</code></a><br><a href="#show"><code>show()</code></a><br><a href="#size isEmpty"><code>size isEmpty()</code></a><br><a href="#slice"><code>slice()</code></a><br><a href="#subject"><code>subject()</code></a><br><a href="#subjects"><code>subjects()</code></a><br><a href="#text"><code>text()</code></a><br><a href="#toggleClass"><code>toggleClass()</code></a><br><a href="#transition"><code>transition()</code></a><br><a href="#trigger"><code>trigger()</code></a><br><a href="#width"><code>width()</code></a></td>
  </tr>
</tbody></table>

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

Similar to jQuery, `dommali` objects (i.e., instances of type `DOMMaLi`) represent collections of zero, one or multiple DOM elements. Internally, these elements may not be listed in document order unless they have been found by a CSS query or retrieved as the children of another element. While `dommali` objects may represent DOM elements of any type, some methods only work on items of type `HTMLElement` (other elements will be ignored) -  those methods are explicitly marked in their description.

The signatures shown below are those used by TypeScript

### Factory Function ###

* **`dommali():DOMMaLi`**<br>returns a new empty `dommali` object, i.e., one that represents no DOM element
* **`dommali(startup:Function):typeof DOMMaLi`**<br>is a shortcut for `DOMMaLi.ready(startup)` (see below)
* **`dommali(selector:string):DOMMaLi`**<br>returns a `dommali` object representing all DOM elements matching the given CSS selector
* **`dommali(html:string):DOMMaLi`**<br>returns a new `dommali` object representing all DOM elements created from the given HTML code
* **`dommali(element:Element):DOMMaLi`**<br>returns a new `dommali` object representing the given DOM element
* **`dommali(elements:Element[]):DOMMaLi`**<br>returns a new `dommali` object representing the given DOM elements (in the given order)
* **`dommali(bridge:DOMMaLi):DOMMaLi`**<br>returns a duplicate of the given `dommali` object

### Class Method ###

* **`DOMMaLi.ready(startup:Function):typeof DOMMaLi`**<br>registers a function which is to be called as soon as the DOM is ready (i.e., all DOM elements are present although images and other resources may not be completely loaded). If the DOM is ready at the moment the startup functions wants to be registered, it will be invoked immediately. It is safe to register new startup functions at any time - even while they are being executed

### Object Inspection ###

* **`get length ():number`**<br>contains the number of DOM elements represented by this `dommali` object
* **`size ():number`**<br>returns the number of DOM elements represented by this `dommali` object
* **`isEmpty ():boolean`**<br>returns `true` if this `dommali` object does not represent any DOM element - or `false` otherwise
* **`subjects ():Element[]`**<br>returns a copy of the list of DOM elements represented by this `dommali` object
* **`subject (Index:number):Element|undefined`**<br>returns the single item found at index `Index` in the list of DOM elements represented by this `dommali` object - or `undefined` if no such item exists
* **`indexOf (Value:Element|DOMMaLi):number`**<br>looks for the given DOM element or the first element represented by the _given_ `dommali` object in the list of DOM elements represented by _this_ `dommali` object and returns its index - or `-1` if the element can not be found

### Element Extraction ###

* **`slice (start?:number, end?:number):DOMMaLi`**<br>returns a new `dommali` object representing all items from the list of DOM elements represented by _this_ `dommali` object starting at index `start` and ending before index `end` (or until the end of the list, if `end` was omitted). If both `start` and `end` are missing, _this_ `dommali` object is simply duplicated
* **`first ():DOMMaLi`**<br>returns a new `dommali` object representing the first element from the list of DOM elements represented by _this_ `dommali` object - or any empty `dommali` object if _this_ one is empty as well
* **`last ():DOMMaLi`**<br>returns a new `dommali` object representing the last element from the list of DOM elements represented by _this_ `dommali` object - or any empty `dommali` object if _this_ one is empty as well
* **`eq (Index:number):DOMMaLi`**<br>returns a new `dommali` object representing the element at index `Index` from the list of DOM elements represented by _this_ `dommali` object - or any empty `dommali` object if no such element exists

### Content Iterators ###

* **`forEach (Callback:(Item:DOMMaLi, Index:number, Container:DOMMaLi) => any):DOMMaLi`**<br>iterates over all DOM elements represented by _this_ `dommali` object and invokes the given `Callback` function with the following arguments:<br>a `dommali` object representing the current DOM element, its index in the list of DOM elements represented by _this_ `dommali` object and that object itself. **In contrast to jQuery and many other similar libraries, `this` is _not_ bound to the current DOM element - this simplifies the use of "fat arrow" functions as callbacks**
* **`filter (Selector:string|String):DOMMaLi`**<br>returns a new `dommali` object representing only those DOM elements from _this_ `dommali` object which match the given CSS selector 
* **`filter (Callback:(Item:DOMMaLi, Index:number, Container:DOMMaLi) => boolean):DOMMaLi`**<br>returns a new `dommali` object representing only those DOM elements from _this_ `dommali` object for which the given `Callback` function returns true. This function is invoked with the following arguments:<br>a `dommali` object representing the current DOM element, its index in the list of DOM elements represented by _this_ `dommali` object and that object itself. **In contrast to jQuery and many other similar libraries, `this` is _not_ bound to the current DOM element - this simplifies the use of "fat arrow" functions as callbacks**

### CSS Queries ###

* **`matches (Selector:string|String):boolean`**<br>returns `true` if the first DOM element represented by this `dommali` object matches the given CSS selector - or `false` otherwise
* **`find (Selector:string|String):DOMMaLi`**<br>returns a new (and possibly empty) `dommali` object representing all those DOM elements within the scope of this `dommali` object that match the given CSS selector
* **`findFirst (Selector:string|String):DOMMaLi`**<br>returns a new (and possibly empty) `dommali` object representing the first DOM element within the scope of this `dommali` object that matches the given CSS selector

### Position and Size ###

* **`positionInViewport ():{ left:number,top:number }|undefined`**<br>returns the _rendering_ position of the first DOM element represented by _this_ `dommali` object relative to the current viewport (or `undefined` if _this_ `dommali` object is empty)
* **`renderPositionInViewport ():{ left:number,top:number }|undefined`**<br>is just a synonym for `positionInViewport`, emphasizing the fact, that the _rendering_ position is returned (which depends of CSS transforms for that DOM element)
* **`positionInParent ():{ left:number,top:number }|undefined`**<br>returns the _layout_ position of the first HTML element represented by _this_ `dommali` object relative to its "offset parent" (or `undefined` if either _this_ `dommali` object is empty, its first element is not an **HTML element** or no offset parent could be found)
* **`layoutPositionInParent ():{ left:number,top:number }|undefined`**<br>is just a synonym for `positionInParent`, emphasizing the fact, that the _layout_ position is returned (which is independent of any DOM element CSS transforms)
* **`positionOnPage ():{ left:number,top:number }|undefined`**<br>returns the _layout_ position of the first DOM element represented by _this_ `dommali` object relative to the document (or `undefined` if _this_ `dommali` object is empty or its first element is not an **HTML element**)
* **`layoutPositionOnPage ():{ left:number,top:number }|undefined`**<br>is just a synonym for `positionOnPage`, emphasizing the fact, that the _layout_ position is returned (which is independent of any DOM element CSS transforms)
* **`width (newValue?:number):number|DOMMaLi|undefined`**<br>if no `newValue` is given, this method returns the _layout_ width of the first DOM element represented by _this_ `dommali` object (or `undefined` if _this_ `dommali` object is empty or its first element is not an **HTML element**). Otherwise, the _layout_ width of all **HTML elements** represented by _this_ `dommali` object is set to the `newValue` pixels
* **`height (newValue?:number):number|DOMMaLi|undefined`**<br>if no `newValue` is given, this method returns the _layout_ height of the first DOM element represented by _this_ `dommali` object (or `undefined` if _this_ `dommali` object is empty or its first element is not an **HTML element**). Otherwise, the _layout_ height of all **HTML elements** represented by _this_ `dommali` object is set to the `newValue` pixels
* **`layoutWidth (newValue?:number):number|DOMMaLi|undefined`**<br>is just a synonym for `width`, emphasizing the fact, that the _layout_ width is returned or set (which is independent of any DOM element CSS transforms)
* **`layoutHeight (newValue?:number):number|DOMMaLi|undefined`**<br>is just a synonym for `height`, emphasizing the fact, that the _layout_ height is returned or set (which is independent of any DOM element CSS transforms)
* **`outerWidth (newValue?:number):number|DOMMaLi|undefined`**<br>is just a synonym for `width`, emphasizing the fact, that the returned width includes the element's padding and border
* **`outerHeight (newValue?:number):number|DOMMaLi|undefined`**<br>is just a synonym for `height`, emphasizing the fact, that the returned height includes the element's padding and border
* **`renderWidth ():number|undefined`**<br>returns the _render_ width of the first DOM element represented by _this_ `dommali` object (or `undefined` if _this_ `dommali` object is empty). The result is affected by any CSS transforms for that element
* **`renderHeight ():number|undefined`**<br>returns the _render_ height of the first DOM element represented by _this_ `dommali` object (or `undefined` if _this_ `dommali` object is empty). The result is affected by any CSS transforms for that element
* **`innerWidth ():number|undefined`**<br>returns the "inner" _layout_ width of the first DOM element represented by _this_ `dommali` object (or `undefined` if _this_ `dommali` object is empty) without border, padding and scrollbars
* **`innerHeight ():number|undefined`**<br>returns the "inner" _layout_ height of the first DOM element represented by _this_ `dommali` object (or `undefined` if _this_ `dommali` object is empty) without border, padding and scrollbars

### DOM Hierarchy ###

* **`parent ():DOMMaLi`**<br>returns a new `dommali` object representing the "parent" of the first DOM element represented by _this_ `dommali` object (or an empty `dommali` object if this one is empty as well)
* **`closest (Selector:string|String):DOMMaLi`**<br>returns a new `dommali` object representing the innermost element among the first DOM element represented by _this_ `dommali` object and its parents, that matches the given `Selector` (or an empty `dommali` object if either this one is empty or no matching DOM element could be found)
* **`isAttached ():boolean`**<br>returns `true`, if the first DOM element represented by _this_ `dommali` object is part of the document - or `false` otherwise
* **`contains (Candidate:DOMMaLi):boolean`**<br>returns `true`, if the first DOM element represented by _this_ `dommali` object contains the first DOM element represented by the given `Candidate` - or `false` otherwise
* **`children (Selector?:string|String):DOMMaLi`**<br>if `Selector` is missing, this method returns a new `dommali` object representing all direct "children" of the first DOM element represented by _this_ `dommali` object. Otherwise, the new `dommali` object represents only those children which also match the given CSS `Selector`
* **`firstChild (Selector?:string|String):DOMMaLi`**<br>if `Selector` is missing, this method returns a new `dommali` object representing the first direct "child" of the first DOM element represented by _this_ `dommali` object. Otherwise, the new `dommali` object represents the first child which also matches the given CSS `Selector`
* **`lastChild (Selector?:string|String):DOMMaLi`**<br>if `Selector` is missing, this method returns a new `dommali` object representing the last direct "child" of the first DOM element represented by _this_ `dommali` object. Otherwise, the new `dommali` object represents the last child which also matches the given CSS `Selector`
* **`prev (Selector?:string|String):DOMMaLi`**<br>if `Selector` is missing, this method returns a new `dommali` object representing the immediately preceding "sibling" of the first DOM element represented by _this_ `dommali` object - i.e., the direct child of that element's parent, which immediately precedes it. Otherwise, the new `dommali` object represents the nearest preceding "sibling" which also matches the given CSS `Selector`
* **`next (Selector?:string|String):DOMMaLi`**<br>if `Selector` is missing, this method returns a new `dommali` object representing the immediately following "sibling" of the first DOM element represented by _this_ `dommali` object - i.e., the direct child of that element's parent, which immediately follows it. Otherwise, the new `dommali` object represents the nearest following "sibling" which also matches the given CSS `Selector`

### Visibility ###

* **`show ():DOMMaLi`**<br>makes all **HTML elements** represented by _this_ `dommali` object (potentially) visible by setting their CSS property `display` to a value different from `none` - if possible, `dommali` tries to restore any setting that was active before an element was hidden. Otherwise, it uses the default setting for the given element tag - or `block` if all fails
* **`hide ():DOMMaLi`**<br>makes all **HTML elements** represented by _this_ `dommali` object invisible by setting their CSS property `display` to `none`

### Scrolling ###

* **`scrollLeft (newValue?:number):number|DOMMaLi|undefined`**<br>if no `newValue` is given, this method returns the number of pixels by which the first DOM element represented by this `dommali` object is scrolled from its left edge (or `undefined` if this `dommali` object is empty) Otherwise, it scrolls all DOM elements represented by this `dommali` object to a position `newValue` pixels from their left edge
* **`scrollTop (newValue?:number):number|DOMMaLi|undefined`**<br>if no `newValue` is given, this method returns the number of pixels by which the first DOM element represented by this `dommali` object is scrolled from its top edge (or `undefined` if this `dommali` object is empty) Otherwise, it scrolls all DOM elements represented by this `dommali` object to a position `newValue` pixels from their top edge
* **`scrollWidth ():number|undefined`**<br>returns the width of the contents of the first DOM element represented by this `dommali` object (or `undefined` if this `dommali` object is empty), including content not visible due to an overflow
* **`scrollHeight ():number|undefined`**<br>returns the height of the contents of the first DOM element represented by this `dommali` object (or `undefined` if this `dommali` object is empty), including content not visible due to an overflow
* **`scrollTo (x:number, y:number, Mode:'instant'|'smooth'|'auto' = 'auto'):DOMMaLi`**<br>scrolls all DOM elements represented by this `dommali` object to a position `x` pixels from their left and `y` pixels from their top edge. If given, `Mode` specifies whether the scrolling should animate smoothly or happen instantly in a single jump

### CSS Class Management ###

* **`hasClass (Classes:string):boolean`**<br>returns `true` if the first DOM element represented by this `dommali` object is associated with all (space-separated) CSS classes given by `Classes` - or `false` otherwise
* **`addClass (Classes:string):DOMMaLi`**<br>associates all DOM elements represented by this `dommali` object with the (space-separated) CSS classes given by `Classes`
* **`toggleClass (Classes:string):DOMMaLi`**<br>toggles the association of all DOM elements represented by this `dommali` object with the (space-separated) CSS classes given by `Classes`
* **`removeClass (Classes:string):DOMMaLi`**<br>removes the association of all DOM elements represented by this `dommali` object with the (space-separated) CSS classes given by `Classes`

### Insertion and Removal ###

* **`append (Content:string|String|DOMMaLi|Element|Element[]):DOMMaLi`**<br>if `Content` contains HTML code, this method inserts the DOM elements repeatedly created based on `Content` at the end of every DOM element represented by this `dommali` object - otherwise the DOM elements given by `Content` are inserted at the end of the _first_ DOM element represented by this `dommali` object only. `Content` may contain HTML code, CSS selectors, one or multiple DOM elements or another `dommali` object
* **`prepend (Content:string|String|DOMMaLi|Element|Element[]):DOMMaLi`**<br>if `Content` contains HTML code, this method inserts the DOM elements repeatedly created based on `Content` at the beginning of every DOM element represented by this `dommali` object - otherwise the DOM elements given by `Content` are inserted at the beginning of the _first_ DOM element represented by this `dommali` object only. `Content` may contain HTML code, CSS selectors, one or multiple DOM elements or another `dommali` object
* **`insertAfter (Content:DOMMaLi):DOMMaLi`**<br>inserts all DOM elements represented by this `dommali` object after the first DOM element represented by the given `Content`. `Content` may contain HTML code, CSS selectors, one or multiple DOM elements or another `dommali` object
* **`insertBefore (Content:DOMMaLi):DOMMaLi`**<br>inserts all DOM elements represented by this `dommali` object before the first DOM element represented by the given `Content`. `Content` may contain HTML code, CSS selectors, one or multiple DOM elements or another `dommali` object
* **`replaceWith (Replacement:string|String|DOMMaLi|Element|Element[]):void`**<br>if `Content` contains HTML code, this method replaces every DOM element represented by this `dommali` object by the DOM elements repeatedly created based on `Content` - otherwise the _first_ DOM element represented by this `dommali` object is replaced by the DOM elements given by `Content`. `Content` may contain HTML code, CSS selectors, one or multiple DOM elements or another `dommali` object
* **`remove ():DOMMaLi`**<br>removes all DOM elements represented by this `dommali` object

### Properties ###

* **`prop (Property:string, newValue?:any):DOMMaLi|any|undefined`**<br>if no `newValue` is given, this method returns the value of property `Property` of the first DOM element represented by this `dommali` object (or `undefined` if this `dommali` object is empty). Otherwise, property `Property` of all DOM elements represented by this `dommali` object is set to `newValue`
* **`hasProp (Property:string):boolean`**<br>returns `true` if property `Property` is found in the _first_ DOM element represented by this `dommali` object - or `false` otherwise
* **`removeProp (Property:string):DOMMaLi`**<br>removes property `Property` from all DOM elements represented by this `dommali` object

### Data ###

* **`data (Key:string, newValue?:any):DOMMaLi|any|undefined`**<br>if no `newValue` is given, this method returns the value of data entry `Key` of the first DOM element represented by this `dommali` object (or `undefined` if this `dommali` object is empty). Otherwise, data entry `Key` of all DOM elements represented by this `dommali` object is set to `newValue`. **Data entries are custom values of any JavaScript type stored in DOM elements without polluting their namespace or overwriting DOM element properties or methods**
* **`hasData (Key:string):boolean`**<br>returns `true` if data entry `Key` is found in the _first_ DOM element represented by this `dommali` object - or `false` otherwise
* **`removeData (Key:string):DOMMaLi`**<br>removes data entry `Key` from all DOM elements represented by this `dommali` object

### Attributes ###

* **`attr (Attribute:string, newValue?:any):DOMMaLi|string|undefined`**<br>if no `newValue` is given, this method returns the value of HTML attribute `Attribute` of the first DOM element represented by this `dommali` object (or `undefined` if this `dommali` object is empty). Otherwise, the HTML attribute `Attribute` of all DOM elements represented by this `dommali` object is set to `newValue`
* **`hasAttr (Attribute:string):boolean`**<br>returns `true` if HTML attribute `Attribute` is found in the _first_ DOM element represented by this `dommali` object - or `false` otherwise
* **`removeAttr (Attribute:string):DOMMaLi`**<br>removes HTML attribute `Attribute` from all DOM elements represented by this `dommali` object

### CSS ###

* **`css (Property:string|string, newValue?:string):DOMMaLi|string|undefined`**<br>if no `newValue` is given, this method returns the _computed_ value of CSS property `Property` of the first DOM element represented by this `dommali` object (or `undefined` if this `dommali` object is empty). Otherwise, the CSS property `Property` of all DOM elements represented by this `dommali` object is set to `newValue`
* **`css (PropertyList:string[]):PlainObject|undefined`**<br>returns the _computed_ values of all CSS properties given by `PropertyList` of the first DOM element represented by this `dommali` object as a plain JavaScript object with the given property names as keys (or `undefined` if this `dommali` object is empty)
* **`css (PropertySet:PlainObject):DOMMaLi`**<br>sets the CSS properties given by the keys of `PropertySet` of all DOM elements represented by this `dommali` object to the values specified in `PropertySet`

### Contents ###

* **`html (newValue?:string):DOMMaLi|string|undefined`**<br>if no `newValue` is given, this method returns the _inner HTML_ of the first DOM element represented by this `dommali` object (or `undefined` if this `dommali` object is empty). Otherwise, the _inner HTML_ of all DOM elements represented by this `dommali` object is set to `newValue`
* **`text (newValue?:string):DOMMaLi|string|undefined`**<br>if no `newValue` is given, this method returns the _inner text_ of the first DOM element represented by this `dommali` object (or `undefined` if this `dommali` object is empty). Otherwise, the _inner text_ of all DOM elements represented by this `dommali` object is set to `newValue`
* **`appendText (Value:string):DOMMaLi`**<br>inserts the text given by `Value` after the _inner text_ of all DOM elements represented by this `dommali` object
* **`prependText (Value:string):DOMMaLi`**<br>inserts the text given by `Value` before the _inner text_ of all DOM elements represented by this `dommali` object

### Event Handling ###

* **`on (Events:string, Handler:Function):DOMMaLi`**<br>registers the given event handler `Handler` for every event in the (space-separated) list given by `Events` in all DOM elements represented by this `dommali` object. `Handler` will be invoked whenever one of the given `Events` is triggered on one of these DOM elements themselves or one of their descendants (if the event is allowed to "bubble"). If `Handler` returns the explicit value `false`, `Event.stopPropagation()` and `Event.preventDefault()` are called for the current event
* **`on (Events:string, Selector:string|String|null, Handler:Function):DOMMaLi`**<br>registers the given event handler `Handler` as a "delegated event handler" for every event in the (space-separated) list given by `Events` in all DOM elements represented by this `dommali` object. `Handler` will be invoked whenever one of the given `Events` is triggered on one of these DOM elements themselves or one of their descendants (if the event is allowed to "bubble") - provided that the original event target matches the given CSS `Selector`. Setting `Selector` to `null` simply skips the matching. If `Handler` returns the explicit value `false`, `Event.stopPropagation()` and `Event.preventDefault()` are called for the current event
* **`on (Events:string, Selector:string|String|null, Data:any, Handler:Function):DOMMaLi`**<br>registers the given event handler `Handler` (as a "delegated event handler" if `Selector` is not `null`) for every event in the (space-separated) list given by `Events` in all DOM elements represented by this `dommali` object. `Handler` will be invoked whenever one of the given `Events` is triggered on one of these DOM elements themselves or one of their descendants (if the event is allowed to "bubble") - provided that the original event target matches the given CSS `Selector`. Additionally, property `data` of the incoming event is set to `Data` before the registered handler is called. Setting `Selector` to `null` simply skips the matching. If `Handler` returns the explicit value `false`, `Event.stopPropagation()` and `Event.preventDefault()` are called for the current event
* **`once (Events:string, Handler:Function):DOMMaLi`**<br>behaves like `once(Events,Handler)`, but automatically unregisters the given `Handler` upon its first invocation
* **`once (Events:string, Selector:string|String|null, Handler:Function):DOMMaLi`**<br>behaves like `once(Events,Selector,Handler)`, but automatically unregisters the given `Handler` upon its first invocation
* **`once (Events:string, Selector:string|String|null, Data:any, Handler:Function):DOMMaLi`**<br>behaves like `once(Events,Selector,Data,Handler)`, but automatically unregisters the given `Handler` upon its first invocation
* **`off ():DOMMaLi`**<br>unregisters all event handlers registered in all DOM elements represented by this `dommali` object
* **`off (Events:string):DOMMaLi`**<br>unregisters all event handlers registered for every event in the (space-separated) list given by `Events` in all DOM elements represented by this `dommali` object
* **`off (Events:string, Selector:string|String|null):DOMMaLi`**<br>unregisters all event handlers registered as delegated event handlers with CSS selector `Selector` for every event in the (space-separated) list given by `Events` in all DOM elements represented by this `dommali` object
* **`off (Events:string, Selector:string|String|null, Handler:Function):DOMMaLi`**<br>unregisters the given `Handler` registered as delegated event handler with CSS selector `Selector` for every event in the (space-separated) list given by `Events` in all DOM elements represented by this `dommali` object
* **`trigger (Event:string|Event, extraParameters?:any[]):boolean`**<br>fires the given `Event` on all DOM elements represented by this `dommali` object. If `Event` is given as a string, a `CustomEvent` of type `Event` is created and fired. The optional argument `extraParameters` may be a single value or a list of values which are passed as additional arguments (after the event object itself) to the Handler. `trigger` returns `false` if at least one of the invoked event handlers called `Event.preventDefault()` or `true` otherwise

### Focus Handling ###

* **`focus ():DOMMaLi`**<br>grants the keyboard focus to the first DOM element represented by this `dommali` object - provided that this is an **HTML element** and is allowed to be focused. Otherwise, `focus` does nothing
* **`blur ():DOMMaLi`**<br>removes the keyboard focus from the first DOM element represented by this `dommali` object - provided that this is an **HTML element** and is currently focused. Otherwise, `blur` does nothing
* **`hasFocus ():boolean`**<br>returns `true`, if the first DOM element represented by this `dommali` object currently owns the keyboard focus - or `false` otherwise
* **`focusedElement ():DOMMaLi`**<br>returns a (possible empty) `dommali` object representing the DOM element which currently owns the keyboard focus

### CSS Transitions ###

* **`transition (Settings:PlainObject, Options?:PlainObject):DOMMaLi`**<br>**HTML elements**

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
