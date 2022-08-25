/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**** ValueIsString ****/
function ValueIsString(Value) {
    return (typeof Value === 'string') || (Value instanceof String);
}
/**** ValueIsArray ****/
var ValueIsArray = Array.isArray;
/**** asArray ****/
function asArray(Value) {
    return Array.prototype.slice.call(Value);
}
/**** ValueIsEmptyObject ****/
var hasOwnProperty = Object.prototype.hasOwnProperty;
function ValueIsEmptyObject(Value) {
    for (var Key in Value) {
        if (hasOwnProperty.call(Value, Key)) {
            return false;
        }
    }
    return true;
}
/**** CamelCased ****/
function CamelCased(Text) {
    return Text.replace(/-[a-z]/ig, function (Match) { return Match[1].toUpperCase(); });
}
/**** DisplayDefaultFor ****/
var DisplayDefaultSet = {};
function DisplayDefaultFor(TagName) {
    if (TagName in DisplayDefaultSet) {
        return DisplayDefaultSet[TagName];
    }
    var auxElement = document.createElement(TagName);
    document.body.appendChild(auxElement);
    var DisplayDefault = getComputedStyle(auxElement).display;
    if (DisplayDefault === 'none') {
        DisplayDefault = 'block';
    }
    DisplayDefaultSet[TagName] = DisplayDefault;
    document.body.removeChild(auxElement);
    return DisplayDefault;
}
var DOMMaLi = /** @class */ (function () {
    function DOMMaLi() {
        this.Subjects = [];
    }
    /**** ready - similar to jQuery.ready ****/
    DOMMaLi.ready = function (FunctionToCall) {
        if (DOMisReady && !ReadyFunctionsAreRunning) {
            FunctionToCall(); // may fail!
        }
        else {
            ReadyFunctionsToCall.push(FunctionToCall);
        }
        return this;
    };
    Object.defineProperty(DOMMaLi.prototype, "length", {
        /**** get length ****/
        get: function () {
            return this.Subjects.length;
        },
        enumerable: false,
        configurable: true
    });
    /**** size ****/
    DOMMaLi.prototype.size = function () {
        return this.Subjects.length;
    };
    /**** isEmpty ****/
    DOMMaLi.prototype.isEmpty = function () {
        return (this.Subjects.length === 0);
    };
    /**** subjects ****/
    DOMMaLi.prototype.subjects = function () {
        return this.Subjects.slice();
    };
    /**** subject ****/
    DOMMaLi.prototype.subject = function (Index) {
        return this.Subjects[Index];
    };
    /**** indexOf ****/
    DOMMaLi.prototype.indexOf = function (Value) {
        if (Value instanceof DOMMaLi) {
            Value = Value.Subjects[0];
            if (Value == null) {
                return -1;
            }
        }
        return this.Subjects.indexOf(Value);
    };
    /**** slice ****/
    DOMMaLi.prototype.slice = function (start, end) {
        return new _DOMMaLi(this.Subjects.slice(start, end));
    };
    /**** first ****/
    DOMMaLi.prototype.first = function () {
        return new _DOMMaLi(this.Subjects[0]);
    };
    /**** last ****/
    DOMMaLi.prototype.last = function () {
        return new _DOMMaLi(this.Subjects[this.Subjects.length - 1]);
    };
    /**** eq ****/
    DOMMaLi.prototype.eq = function (Index) {
        return new _DOMMaLi(this.Subjects[Index]);
    };
    /**** forEach ****/
    DOMMaLi.prototype.forEach = function (Callback) {
        var _this = this;
        this.Subjects.forEach(function (Subject, Index) {
            Callback(new _DOMMaLi(Subject), Index, _this);
        });
        return this;
    };
    /**** filter ****/
    DOMMaLi.prototype.filter = function (SelectorOrCallback) {
        var _this = this;
        if (typeof SelectorOrCallback === 'function') {
            return new _DOMMaLi(this.Subjects.filter(function (Subject, Index) {
                return SelectorOrCallback(new _DOMMaLi(Subject), Index, _this);
            }));
        }
        else {
            return new _DOMMaLi(this.Subjects.filter(function (Subject) {
                return Subject.matches(SelectorOrCallback);
            }));
        }
    };
    /**** matches ****/
    DOMMaLi.prototype.matches = function (Selector) {
        return this.Subjects.every(function (Subject) { return Subject.matches(Selector); });
    };
    /**** find ****/
    DOMMaLi.prototype.find = function (Selector) {
        return new _DOMMaLi(this.Subjects.length === 0
            ? undefined
            : asArray(this.Subjects[0].querySelectorAll(Selector)));
    };
    /**** findFirst ****/
    DOMMaLi.prototype.findFirst = function (Selector) {
        return new _DOMMaLi((this.Subjects.length === 0)
            ? undefined
            : this.Subjects[0].querySelector(Selector));
    };
    /**** parent ****/
    DOMMaLi.prototype.parent = function () {
        return new _DOMMaLi(this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].parentElement);
    };
    /**** closest ****/
    DOMMaLi.prototype.closest = function (Selector) {
        return new _DOMMaLi(this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].closest(Selector));
    };
    /**** isAttached ****/
    DOMMaLi.prototype.isAttached = function () {
        return (this.Subjects.length === 0
            ? false
            : document.contains(this.Subjects[0]));
    };
    /**** contains ****/
    DOMMaLi.prototype.contains = function (Candidate) {
        var _this = this;
        return ((this.Subjects.length === 0) || (Candidate.Subjects.length === 0)
            ? false
            : Candidate.Subjects.every(function (Candidate) { return _this.Subjects[0].contains(Candidate); }));
    };
    /**** children ****/
    DOMMaLi.prototype.children = function (Selector) {
        var ChildElements = (this.Subjects.length === 0
            ? []
            : asArray(this.Subjects[0].children));
        if (Selector != null) {
            ChildElements = ChildElements.filter(function (Subject) { return Subject.matches(Selector); });
        }
        return new _DOMMaLi(ChildElements);
    };
    /**** firstChild ****/
    DOMMaLi.prototype.firstChild = function (Selector) {
        if (this.Subjects.length === 0) {
            return new _DOMMaLi();
        }
        if (Selector == null) {
            return new _DOMMaLi(this.Subjects[0].firstElementChild);
        }
        else {
            return new _DOMMaLi(asArray(this.Subjects[0].children).find(function (Subject) { return Subject.matches(Selector); }));
        }
    };
    /**** lastChild ****/
    DOMMaLi.prototype.lastChild = function (Selector) {
        if (this.Subjects.length === 0) {
            return new _DOMMaLi();
        }
        if (Selector == null) {
            return new _DOMMaLi(this.Subjects[0].lastElementChild);
        }
        else {
            var ChildElements = asArray(this.Subjects[0].children);
            for (var i = ChildElements.length - 1; i >= 0; i--) {
                if (ChildElements[i].matches(Selector)) {
                    return new _DOMMaLi(ChildElements[i]);
                }
            }
            return new _DOMMaLi();
        }
    };
    /**** prev ****/
    DOMMaLi.prototype.prev = function (Selector) {
        if (this.Subjects.length === 0) {
            return new _DOMMaLi();
        }
        if (Selector == null) {
            return new _DOMMaLi(this.Subjects[0].previousElementSibling);
        }
        else {
            var Sibling = this.Subjects[0].previousElementSibling;
            while (Sibling != null) {
                if (Sibling.matches(Selector)) {
                    return new _DOMMaLi(Sibling);
                }
                Sibling = Sibling.previousElementSibling;
            }
            return new _DOMMaLi();
        }
    };
    /**** next ****/
    DOMMaLi.prototype.next = function (Selector) {
        if (this.Subjects.length === 0) {
            return new _DOMMaLi();
        }
        if (Selector == null) {
            return new _DOMMaLi(this.Subjects[0].nextElementSibling);
        }
        else {
            var Sibling = this.Subjects[0].nextElementSibling;
            while (Sibling != null) {
                if (Sibling.matches(Selector)) {
                    return new _DOMMaLi(Sibling);
                }
                Sibling = Sibling.nextElementSibling;
            }
            return new _DOMMaLi();
        }
    };
    /**** positionInViewport - CONSIDERING transforms! ****/
    DOMMaLi.prototype.positionInViewport = function () {
        if (this.Subjects.length === 0) {
            return undefined;
        }
        var Bounds = this.Subjects[0].getBoundingClientRect();
        return { left: Bounds.left, top: Bounds.top };
    };
    /**** positionInParent - without taking transforms into account ****/
    DOMMaLi.prototype.positionInParent = function () {
        if ((this.Subjects.length === 0) ||
            (this.Subjects[0].parentElement == null) ||
            (!(this.Subjects[0] instanceof HTMLElement))) {
            return undefined;
        }
        var Subject = this.Subjects[0];
        return (Subject instanceof HTMLElement
            ? { left: Subject.offsetLeft, top: Subject.offsetTop }
            : undefined);
    };
    /**** positionOnPage - without taking transforms into account ****/
    DOMMaLi.prototype.positionOnPage = function () {
        if (this.Subjects.length === 0) {
            return undefined;
        }
        var Element = this.Subjects[0], left = 0, top = 0;
        while (Element instanceof HTMLElement) {
            left += Element.offsetLeft;
            top += Element.offsetTop;
            Element = Element.offsetParent;
        }
        return { left: left, top: top };
    };
    // see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
    // and https://jsbin.com/kimaxojufe/1/edit?css,js,console,output
    /**** width - without taking transforms into account ****/
    DOMMaLi.prototype.width = function (newValue) {
        if (newValue === undefined) {
            var Subject = this.Subjects[0];
            if (Subject instanceof HTMLElement) {
                return Subject.offsetWidth;
            }
            else {
                return undefined;
            }
        }
        else {
            this.Subjects.forEach(function (Subject) {
                if (Subject instanceof HTMLElement) {
                    Subject.style.width = newValue + 'px';
                }
            });
            return this;
        }
    };
    /**** height - without taking transforms into account ****/
    DOMMaLi.prototype.height = function (newValue) {
        if (newValue === undefined) {
            var Subject = this.Subjects[0];
            if (Subject instanceof HTMLElement) {
                return Subject.offsetHeight;
            }
            else {
                return undefined;
            }
        }
        else {
            this.Subjects.forEach(function (Subject) {
                if (Subject instanceof HTMLElement) {
                    Subject.style.height = newValue + 'px';
                }
            });
            return this;
        }
    };
    /**** innerWidth/Height - without taking transforms into account ****/
    DOMMaLi.prototype.innerWidth = function () {
        return (this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].clientWidth);
    };
    DOMMaLi.prototype.innerHeight = function () {
        return (this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].clientHeight);
    };
    /**** renderWidth/Height - CONSIDERING transforms ****/
    DOMMaLi.prototype.renderWidth = function () {
        return (this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].getBoundingClientRect().width);
    };
    DOMMaLi.prototype.renderHeight = function () {
        return (this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].getBoundingClientRect().height);
    };
    /**** scrollLeft/Top/Width/Height ****/
    DOMMaLi.prototype.scrollLeft = function (newValue) {
        if (newValue === undefined) {
            return (this.Subjects.length === 0
                ? undefined
                : this.Subjects[0].scrollLeft);
        }
        else {
            this.Subjects.forEach(function (Subject) {
                Subject.scrollLeft = newValue;
            });
            return this;
        }
    };
    DOMMaLi.prototype.scrollTop = function (newValue) {
        if (newValue === undefined) {
            return (this.Subjects.length === 0
                ? undefined
                : this.Subjects[0].scrollTop);
        }
        else {
            this.Subjects.forEach(function (Subject) {
                Subject.scrollTop = newValue;
            });
            return this;
        }
    };
    DOMMaLi.prototype.scrollWidth = function () {
        return (this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].scrollWidth);
    };
    DOMMaLi.prototype.scrollHeight = function () {
        return (this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].scrollHeight);
    };
    /**** scrollTo ****/
    DOMMaLi.prototype.scrollTo = function (x, y, Mode) {
        if (Mode === void 0) { Mode = 'auto'; }
        var Options = { left: x, top: y, behavior: Mode };
        this.Subjects.forEach(function (Subject) {
            Subject.scrollTo(Options);
        });
        return this;
    };
    /**** show ****/
    DOMMaLi.prototype.show = function () {
        this.Subjects.forEach(function (Subject) {
            if (Subject instanceof HTMLElement) {
                var computedStyle = getComputedStyle(Subject);
                if (computedStyle.display !== 'none') {
                    return;
                }
                if (Subject['_preservedDisplay'] != null) {
                    Subject.style.display = Subject['_preservedDisplay']; // may set to ''
                }
                if (computedStyle.display === 'none') {
                    Subject.style.display = DisplayDefaultFor(Subject.tagName);
                }
            }
        });
        return this;
    };
    /**** hide ****/
    DOMMaLi.prototype.hide = function () {
        this.Subjects.forEach(function (Subject) {
            if (Subject instanceof HTMLElement) {
                var computedStyle = getComputedStyle(Subject);
                if (computedStyle.display === 'none') {
                    return;
                }
                Subject['_preservedDisplay'] = Subject.style.display; // may be ''
                Subject.style.display = 'none';
            }
        });
        return this;
    };
    /**** hasClass ****/
    DOMMaLi.prototype.hasClass = function (Classes) {
        if (this.Subjects.length === 0) {
            return false;
        }
        Classes = Classes.trim().replace(/\s+/g, ' ');
        if (Classes === '') {
            return false;
        }
        var ClassList = this.Subjects[0].classList;
        return Classes.split(' ').every(function (Class) { return ClassList.contains(Class); });
    };
    /**** addClass ****/
    DOMMaLi.prototype.addClass = function (Classes) {
        return this._processClasses(Classes, 'add');
    };
    /**** toggleClass ****/
    DOMMaLi.prototype.toggleClass = function (Classes) {
        return this._processClasses(Classes, 'toggle');
    };
    /**** removeClass ****/
    DOMMaLi.prototype.removeClass = function (Classes) {
        return this._processClasses(Classes, 'remove');
    };
    /**** _processClasses ****/
    DOMMaLi.prototype._processClasses = function (Classes, Method) {
        if (this.Subjects.length === 0) {
            return this;
        }
        Classes = Classes.trim().replace(/\s+/g, ' ');
        if (Classes === '') {
            return this;
        }
        var ClassesToProcess = Classes.split(' ');
        this.Subjects.forEach(function (Subject) {
            var ClassList = Subject.classList;
            ClassesToProcess.forEach(function (Class) { return ClassList[Method](Class); });
        });
        return this;
    };
    /**** append ****/
    DOMMaLi.prototype.append = function (Content) {
        return this._insert(Content, 'append');
    };
    /**** prepend ****/
    DOMMaLi.prototype.prepend = function (Content) {
        return this._insert(Content, 'prepend');
    };
    /**** insertAfter ****/
    DOMMaLi.prototype.insertAfter = function (Content) {
        Content._insert(this, 'after');
        return this;
    };
    /**** insertBefore ****/
    DOMMaLi.prototype.insertBefore = function (Content) {
        Content._insert(this, 'before');
        return this;
    };
    /**** _insert ****/
    DOMMaLi.prototype._insert = function (Content, Method) {
        if (this.Subjects.length === 0) {
            return this;
        }
        if (!(Content instanceof DOMMaLi)) {
            Content = new _DOMMaLi(Content);
        }
        if (Content.Subjects.length === 0) {
            return this;
        }
        this.Subjects.forEach(function (Subject) {
            Subject[Method].apply(Subject, Content.Subjects);
        });
        return this;
    };
    /**** replaceWith ****/
    DOMMaLi.prototype.replaceWith = function (Replacement) {
        if (this.Subjects.length === 0) {
            return;
        }
        if (!(Replacement instanceof DOMMaLi)) {
            Replacement = new _DOMMaLi(Replacement);
        }
        if (Replacement.Subjects.length === 0) {
            this.remove();
            return;
        }
        var Subject = this.Subjects[0];
        Subject.replaceWith.apply(Subject, Replacement.Subjects);
    };
    /**** remove ****/
    DOMMaLi.prototype.remove = function () {
        if (this.Subjects.length === 0) {
            return this;
        }
        this.Subjects.forEach(function (Subject) {
            Subject.remove();
        });
        return this;
    };
    /**** prop ****/
    DOMMaLi.prototype.prop = function (Property, newValue) {
        if (newValue === undefined) {
            return (this.Subjects.length === 0
                ? undefined
                : this.Subjects[0][Property]);
        }
        else {
            this.Subjects.forEach(function (Subject) {
                Subject[Property] = newValue;
            });
            return this;
        }
    };
    /**** hasProp ****/
    DOMMaLi.prototype.hasProp = function (Property) {
        return (this.Subjects.length === 0
            ? false
            : Property in this.Subjects[0]);
    };
    /**** removeProp ****/
    DOMMaLi.prototype.removeProp = function (Property) {
        this.Subjects.forEach(function (Subject) {
            delete Subject[Property];
        });
        return this;
    };
    /**** data - not restricted to strings ****/
    DOMMaLi.prototype.data = function (Key, newValue) {
        if (newValue === undefined) {
            return ((this.Subjects.length === 0) || (this.Subjects[0]['_data'] == null)
                ? undefined
                : this.Subjects[0]['_data'][Key]);
        }
        else {
            this.Subjects.forEach(function (Subject) {
                if (Subject['_data'] == null) {
                    Subject['_data'] = Object.create(null);
                }
                Subject['_data'][Key] = newValue;
            });
            return this;
        }
    };
    /**** hasData ****/
    DOMMaLi.prototype.hasData = function (Key) {
        return ((this.Subjects.length > 0) &&
            (this.Subjects[0]['_data'] != null) &&
            (Key in this.Subjects[0]['_data']));
    };
    /**** removeData ****/
    DOMMaLi.prototype.removeData = function (Key) {
        this.Subjects.forEach(function (Subject) {
            if (Subject['_data'] != null) {
                delete Subject['_data'][Key];
            }
        });
        return this;
    };
    /**** attr ****/
    DOMMaLi.prototype.attr = function (Attribute, newValue) {
        if (newValue === undefined) {
            if (this.Subjects.length === 0) {
                return undefined;
            }
            var Value = this.Subjects[0].getAttribute(Attribute);
            return (Value === null ? undefined : Value);
        }
        else {
            if (newValue === null) {
                return this.removeAttr(Attribute);
            }
            this.Subjects.forEach(function (Subject) {
                Subject.setAttribute(Attribute, newValue);
            });
            return this;
        }
    };
    /**** hasAttr ****/
    DOMMaLi.prototype.hasAttr = function (Attribute) {
        return (this.Subjects.length === 0
            ? false
            : this.Subjects[0].hasAttribute(Attribute));
    };
    /**** removeAttr ****/
    DOMMaLi.prototype.removeAttr = function (Attribute) {
        this.Subjects.forEach(function (Subject) {
            Subject.removeAttribute(Attribute);
        });
        return this;
    };
    /**** css ****/
    DOMMaLi.prototype.css = function (PropertyOrListOrSet, newValue) {
        if (newValue === undefined) {
            switch (true) {
                case (typeof PropertyOrListOrSet === 'string'):
                    if (this.Subjects.length === 0) {
                        return undefined;
                    }
                    var computedStyles_1 = window.getComputedStyle(this.Subjects[0]);
                    return computedStyles_1[CamelCased(PropertyOrListOrSet)];
                case ValueIsArray(PropertyOrListOrSet):
                    if (this.Subjects.length === 0) {
                        return undefined;
                    }
                    computedStyles_1 = window.getComputedStyle(this.Subjects[0]);
                    var Result_1 = {};
                    PropertyOrListOrSet.forEach(function (Property) {
                        Result_1[Property] = computedStyles_1[CamelCased(Property)];
                    });
                    return Result_1;
                default:
                    if (this.Subjects.length === 0) {
                        return this;
                    }
                    var _loop_1 = function (Property) {
                        if (PropertyOrListOrSet.hasOwnProperty(Property)) {
                            newValue = PropertyOrListOrSet[Property];
                            Property = CamelCased(Property);
                            this_1.Subjects.forEach(function (Subject) {
                                if (Subject instanceof HTMLElement) {
                                    Subject.style[Property] = newValue;
                                }
                            });
                        }
                    };
                    var this_1 = this;
                    for (var Property in PropertyOrListOrSet) {
                        _loop_1(Property);
                    }
                    return this;
            }
        }
        else {
            if (typeof PropertyOrListOrSet === 'string') {
                var Property_1 = CamelCased(PropertyOrListOrSet);
                this.Subjects.forEach(function (Subject) {
                    if (Subject instanceof HTMLElement) {
                        Subject.style[Property_1] = newValue;
                    }
                });
                return this;
            }
            else {
                throw new TypeError('single attribute name expected');
            }
        }
    };
    /**** html ****/
    DOMMaLi.prototype.html = function (newValue) {
        if (newValue === undefined) {
            return (this.Subjects.length === 0
                ? undefined
                : this.Subjects[0].innerHTML);
        }
        else {
            if (newValue === null) {
                newValue = '';
            }
            this.Subjects.forEach(function (Subject) {
                Subject.innerHTML = newValue;
            });
            return this;
        }
    };
    /**** text ****/
    DOMMaLi.prototype.text = function (newValue) {
        if (newValue === undefined) {
            return ((this.Subjects.length === 0) || !(this.Subjects[0] instanceof HTMLElement)
                ? undefined
                : this.Subjects[0].innerText);
        }
        else {
            if (newValue === null) {
                newValue = '';
            }
            this.Subjects.forEach(function (Subject) {
                if (Subject instanceof HTMLElement) {
                    Subject.innerText = newValue;
                }
            });
            return this;
        }
    };
    /**** appendText ****/
    DOMMaLi.prototype.appendText = function (Value) {
        this.Subjects.forEach(function (Subject) {
            Subject.insertAdjacentText('beforeend', Value);
        });
        return this;
    };
    /**** prependText ****/
    DOMMaLi.prototype.prependText = function (Value) {
        this.Subjects.forEach(function (Subject) {
            Subject.insertAdjacentText('afterbegin', Value);
        });
        return this;
    };
    /**** on ****/
    DOMMaLi.prototype.on = function (Events, SelectorOrHandler, DataOrHandler, Handler) {
        if (this.Subjects.length === 0) {
            return this;
        }
        return this._registerEventHandler(Events, SelectorOrHandler, DataOrHandler, Handler);
    };
    /**** once ****/
    DOMMaLi.prototype.once = function (Events, SelectorOrHandler, DataOrHandler, Handler) {
        if (this.Subjects.length === 0) {
            return this;
        }
        return this._registerEventHandler(Events, SelectorOrHandler, DataOrHandler, Handler, 'once');
    };
    /**** _registerEventHandler ****/
    DOMMaLi.prototype._registerEventHandler = function (Events, SelectorOrHandler, DataOrHandler, Handler, once) {
        var ArgList = asArray(arguments).slice(1);
        Events = Events.trim().replace(/\s+/g, ' ');
        if (Events === '') {
            return this;
        }
        var Selector = (ValueIsString(ArgList[0])
            ? ArgList.shift().trim()
            : (ArgList[0] == null ? ArgList.shift() || '' : '')); // '' means: no selector
        var Data = (typeof ArgList[1] === 'function'
            ? ArgList.shift()
            : undefined);
        Handler = ArgList.shift();
        return this.__registerEventHandler(Events, Selector, Data, Handler, once);
    };
    /**** __registerEventHandler - on DOM element rather than DOMMaLi object ****/
    DOMMaLi.prototype.__registerEventHandler = function (Events, Selector, Data, Handler, once) {
        var _this = this;
        function actualHandler(Event) {
            switch (Selector) {
                case '':
                    break;
                case '@this':
                    if (Event.target !== Event.currentTarget) {
                        return;
                    }
                    break;
                default:
                    if (!Event.target.matches(Selector)) {
                        return;
                    }
            }
            if (Data != null) {
                Event.data = Data;
            }
            if (once) {
                (new _DOMMaLi(Event.currentTarget))._unregisterAllEventHandlersMatching(Event.type, Selector, Handler);
            }
            var ArgList = [Event].concat(Event['_extraParameters']);
            if (Handler.apply(new _DOMMaLi(Event.currentTarget), ArgList) === false) {
                Event.stopPropagation();
                Event.preventDefault();
            }
        }
        actualHandler['isFor'] = Handler;
        Events.split(' ').forEach(function (Event) {
            _this.Subjects.forEach(function (Subject) {
                var EventRegistry = Subject['_EventRegistry'];
                if (EventRegistry == null) {
                    EventRegistry = Subject['_EventRegistry'] = Object.create(null);
                }
                var EntriesForEvent = EventRegistry[Event];
                if (EntriesForEvent == null) {
                    EntriesForEvent = EventRegistry[Event] = Object.create(null);
                }
                var EntriesForSelector = EntriesForEvent[Selector];
                if (EntriesForSelector == null) {
                    EntriesForSelector = EntriesForEvent[Selector] = [];
                }
                EntriesForSelector.push(actualHandler);
                Subject.addEventListener(Event, actualHandler);
            });
        });
        return this;
    };
    /**** off ****/
    DOMMaLi.prototype.off = function (Events, SelectorOrHandler, Handler) {
        if (this.Subjects.length === 0) {
            return this;
        }
        var ArgList = asArray(arguments).slice(1);
        Events = (Events || '').trim().replace(/\s+/g, ' ');
        if (Events === '') {
            this._unregisterAllEventHandlersMatching();
            return this;
        }
        var Selector = (ValueIsString(ArgList[0])
            ? ArgList.shift().trim()
            : (ArgList[0] === null ? ArgList.shift() || '' : undefined)); // "null" means: no selector, "undefined" means: any selector
        if (Selector === undefined) {
            this._unregisterAllEventHandlersMatching(Events);
            return this;
        }
        Handler = ArgList.shift();
        if (Handler == null) {
            this._unregisterAllEventHandlersMatching(Events, Selector);
            return this;
        }
        this._unregisterAllEventHandlersMatching(Events, Selector, Handler);
        return this;
    };
    /**** _unregisterAllEventHandlersMatching ****/
    DOMMaLi.prototype._unregisterAllEventHandlersMatching = function (Events, Selector, Handler) {
        var _this = this;
        this.Subjects.forEach(function (Subject) {
            var EventRegistry = Subject['_EventRegistry'];
            if (EventRegistry == null) {
                return;
            }
            if (Events == null) { // unregister any event handlers
                for (var Event_1 in EventRegistry) {
                    _this._unregisterHandlersForEventMatching(Subject, EventRegistry, Event_1, Selector, Handler);
                }
            }
            else { // unregister handlers for the given events only
                Events.split(' ').forEach(function (Event) {
                    _this._unregisterHandlersForEventMatching(Subject, EventRegistry, Event, Selector, Handler);
                });
            }
            if (ValueIsEmptyObject(EventRegistry)) {
                delete Subject['_EventRegistry'];
            }
        });
        return this;
    };
    /**** _unregisterHandlersForEventMatching ****/
    DOMMaLi.prototype._unregisterHandlersForEventMatching = function (Subject, EventRegistry, Event, Selector, Handler) {
        var EntriesForEvent = EventRegistry[Event];
        if (EntriesForEvent != null) {
            if (Selector == null) {
                for (var Selector_1 in EntriesForEvent) {
                    this._unregisterHandlersForEventSelectorsMatching(Subject, EntriesForEvent, Event, Selector_1, Handler);
                }
            }
            else {
                this._unregisterHandlersForEventSelectorsMatching(Subject, EntriesForEvent, Event, Selector, Handler);
            }
            if (ValueIsEmptyObject(EntriesForEvent)) {
                delete EventRegistry[Event];
            }
        }
    };
    /**** _unregisterHandlersForEventSelectorsMatching ****/
    DOMMaLi.prototype._unregisterHandlersForEventSelectorsMatching = function (Subject, EntriesForEvent, Event, Selector, Handler) {
        var EntriesForSelector = EntriesForEvent[Selector];
        if (EntriesForSelector != null) {
            if (Handler == null) {
                EntriesForSelector.forEach(function (actualHandler) {
                    // @ts-ignore TypeScript does not allow JS functions here, but that's wrong
                    Subject.removeEventListener(Event, actualHandler);
                });
                EntriesForSelector.length = 0;
            }
            else {
                EntriesForSelector.every(function (actualHandler, Index) {
                    if (actualHandler['isFor'] === Handler) {
                        // @ts-ignore TypeScript does not allow JS functions here, but that's wrong
                        Subject.removeEventListener(Event, actualHandler);
                        EntriesForSelector.splice(Index, 1);
                        return false;
                    }
                    return true;
                });
            }
            if (EntriesForSelector.length === 0) {
                delete EntriesForEvent[Selector];
            }
        }
    };
    /**** trigger ****/
    DOMMaLi.prototype.trigger = function (Event, extraParameters) {
        if (this.Subjects.length === 0) {
            return true;
        }
        if (ValueIsString(Event)) {
            Event = new CustomEvent(Event, { bubbles: true, cancelable: true });
        }
        if (extraParameters != null) {
            Event['_extraParameters'] = (ValueIsArray(extraParameters)
                ? extraParameters.slice()
                : [extraParameters]);
        }
        return this.Subjects.reduce(function (Result, Subject) {
            return Subject.dispatchEvent(Event) && Result;
        }, true);
    };
    /**** focus ****/
    DOMMaLi.prototype.focus = function () {
        if ((this.Subjects.length > 0) && (this.Subjects[0] instanceof HTMLElement)) {
            this.Subjects[0].focus();
        }
        return this;
    };
    /**** blur ****/
    DOMMaLi.prototype.blur = function () {
        if ((this.Subjects.length > 0) && (this.Subjects[0] instanceof HTMLElement)) {
            this.Subjects[0].blur();
        }
        return this;
    };
    /**** hasFocus ****/
    DOMMaLi.prototype.hasFocus = function () {
        return (document.activeElement === this.Subjects[0]);
    };
    /**** transition ****/
    DOMMaLi.prototype.transition = function (Settings, Options) {
        if (this.Subjects.length === 0) {
            return this;
        }
        if (ValueIsEmptyObject(Settings)) {
            return this;
        }
        Options = Object.assign({}, {
            delay: '0ms', duration: '400ms', easing: 'linear',
            cleanup: true
        }, Options);
        var TransitProps = '';
        for (var Key in Settings) {
            if (Settings.hasOwnProperty(Key)) {
                TransitProps += (TransitProps === '' ? '' : ',') + Key;
            }
        }
        var TransitDuration = (ValueIsString(Options.duration) ? Options.duration : (Options.duration + 'ms'));
        var TransitDelay = (ValueIsString(Options.delay) ? Options.delay : (Options.delay + 'ms'));
        if (Options.cleanup == true) {
            this.Subjects.forEach(function (Subject) {
                if (Subject instanceof HTMLElement) {
                    var previousTransition_1 = window.getComputedStyle(Subject).transition;
                    Subject.addEventListener('transitionend', function (Event) {
                        Subject.style.transition = previousTransition_1;
                    }, { once: true });
                }
            });
        }
        this.Subjects.forEach(function (Subject) {
            if (Subject instanceof HTMLElement) {
                Subject.style.transitionProperty = TransitProps;
                Subject.style.transitionDelay = TransitDelay;
                Subject.style.transitionDuration = TransitDuration;
                // @ts-ignore no, "Options" is never undefined
                Subject.style.transitionTimingFunction = Options.easing;
                for (var Key in Settings) {
                    if (Settings.hasOwnProperty(Key)) {
                        var newValue = Settings[Key];
                        var Property = CamelCased(Key);
                        Subject.style[Property] = newValue;
                    }
                }
            }
        });
        return this;
    };
    return DOMMaLi;
}());
/**** apply any synonyms ****/
Object.assign(DOMMaLi.prototype, {
    renderPositionInViewport: DOMMaLi.prototype.positionInViewport,
    layoutPositionInParent: DOMMaLi.prototype.positionInParent,
    layoutPositionOnPage: DOMMaLi.prototype.positionOnPage,
    layoutWidth: DOMMaLi.prototype.width,
    layoutHeight: DOMMaLi.prototype.height,
    outerWidth: DOMMaLi.prototype.width,
    outerHeight: DOMMaLi.prototype.height,
});
/**** startup function handling ****/
var DOMisReady = (document.readyState !== 'loading');
if (!DOMisReady) {
    window.addEventListener('DOMContentLoaded', function () {
        DOMisReady = true;
        invokeAllReadyFunctionsToCall();
    });
}
/**** invokeAllReadyFunctionsToCall ****/
// ReadyFunctionsToCall may be extended while invokeAllReadyFunctionsToCall is running!
var ReadyFunctionsToCall = [];
var ReadyFunctionsAreRunning = false;
function invokeAllReadyFunctionsToCall() {
    ReadyFunctionsAreRunning = true;
    for (var i = 0; i < ReadyFunctionsToCall.length; i++) {
        try {
            ReadyFunctionsToCall[i]();
        }
        catch (signal) {
            console.error('registered dommali "ready" handler failed with ', signal);
        }
    }
    ReadyFunctionsAreRunning = false;
}
var _DOMMaLi = /** @class */ (function (_super) {
    __extends(_DOMMaLi, _super);
    function _DOMMaLi(Value) {
        var _this = _super.call(this) || this;
        switch (true) {
            case (Value == null):
                _this.Subjects = [];
                break;
            case ValueIsArray(Value):
                _this.Subjects = Value; // important: array REFERENCE!
                break;
            case ValueIsString(Value):
                if (Value.startsWith('<')) {
                    var Template = document.createElement('template');
                    Template.innerHTML = Value;
                    _this.Subjects = asArray(Template.content.children);
                }
                else {
                    _this.Subjects = asArray(document.querySelectorAll(Value));
                }
                break;
            case (Value instanceof _DOMMaLi):
                _this.Subjects = Value.Subjects.slice();
                break;
            case (Value instanceof Element):
                _this.Subjects = [Value];
                break;
            default:
                throw new TypeError('unsupported "dommali" constructor argument');
        }
        return _this;
    }
    return _DOMMaLi;
}(DOMMaLi));
function dommali(Value) {
    switch (true) {
        case (typeof Value === 'function'):
            return DOMMaLi.ready(Value);
        case ValueIsArray(Value):
            return new _DOMMaLi(asArray(Value));
        default:
            return new _DOMMaLi(Value);
    }
}
Object.assign(dommali, { ready: DOMMaLi.ready });

export { dommali as default };
//# sourceMappingURL=dommali.esm.js.map
