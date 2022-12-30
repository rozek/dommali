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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**** ValueIsNumber ****/
function ValueIsNumber(Value) {
    return (typeof Value === 'number') || (Value instanceof Number);
}
/**** ValueIsString ****/
function ValueIsString(Value) {
    return (typeof Value === 'string') || (Value instanceof String);
}
/**** ValueIsFunction ****/
function ValueIsFunction(Value) {
    return (typeof Value === 'function');
}
/**** ValueIsEventNameWithSelector ****/
var NameWithSelectorPattern = /^[a-z$_][a-z$_0-9]*([-.:][a-z$_0-9]*)*@.*$/i;
function ValueIsEventNameWithSelector(Value) {
    return ((typeof Value === 'string') || (Value instanceof String)) && NameWithSelectorPattern.test(Value);
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
/**** unhashed - convert #<id> into [id="<id>"] ****/
function unhashed(Selector) {
    return (Selector.startsWith('#')
        ? '[id="' + Selector.slice(1) + '"]' // not perfect
        : Selector);
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
    DOMMaLi.textWidth = function (Text, TemplateOrSettings) {
        if (DOMisReady) {
            if (_DOMMaLi._auxiliarySpan == null) {
                var auxiliarySpan_1 = document.createElement('span');
                auxiliarySpan_1.style.visibility = 'hidden';
                document.body.appendChild(auxiliarySpan_1);
                _DOMMaLi._auxiliarySpan = dommali(auxiliarySpan_1);
            }
            var auxiliarySpan_2 = _DOMMaLi._auxiliarySpan;
            auxiliarySpan_2.css({
                width: 'auto', 'min-width': 0, 'max-width': 'none',
                margin: 0, padding: 0, border: 'none', font: 'normal',
                'white-space': 'normal', 'letter-spacing': 'normal', 'word-spacing': 'normal',
                'text-indent': 0, 'text-transform': 'none'
            });
            if (TemplateOrSettings) {
                var Settings_1;
                switch (true) {
                    case (typeof TemplateOrSettings === 'object') && ((Object.getPrototypeOf(TemplateOrSettings) === Object.prototype) ||
                        (Object.getPrototypeOf(TemplateOrSettings) == null)):
                        Settings_1 = TemplateOrSettings;
                        break;
                    case TemplateOrSettings instanceof DOMMaLi:
                    case TemplateOrSettings instanceof Element:
                        // @ts-ignore allow assignment to "Settings"
                        Settings_1 = window.getComputedStyle(
                        // @ts-ignore dommali(...) does return a DOMMaLi instance
                        dommali(TemplateOrSettings).subject(0));
                        break;
                    default:
                        throw new TypeError('DOMMaLi instance, HTML element or settings expected');
                }
                _DOMMaLi._relevantSettings_for_textWidth.forEach(function (relevantSetting) {
                    var ValueOfSetting = Settings_1[relevantSetting];
                    if (ValueOfSetting != null) {
                        auxiliarySpan_2.css(relevantSetting, ValueOfSetting);
                    }
                });
            }
            // @ts-ignore "auxiliarySpan" is defined and "text" returns it
            return auxiliarySpan_2.text(Text).width(); // performs actual measurement
        }
        else {
            return NaN;
        }
    };
    DOMMaLi.textHeight = function (Text, TemplateOrSettings) {
        if (DOMisReady) {
            if (_DOMMaLi._auxiliaryDiv == null) {
                var auxiliaryDiv_1 = document.createElement('div');
                auxiliaryDiv_1.style.visibility = 'hidden';
                document.body.appendChild(auxiliaryDiv_1);
                _DOMMaLi._auxiliaryDiv = dommali(auxiliaryDiv_1);
            }
            var auxiliaryDiv_2 = _DOMMaLi._auxiliaryDiv;
            auxiliaryDiv_2.css({
                width: 'auto', 'min-width': 0, 'max-width': 'none',
                margin: 0, padding: 0, border: 'none', font: 'normal',
                'white-space': 'normal', 'letter-spacing': 'normal', 'word-spacing': 'normal',
                'text-indent': 0, 'text-transform': 'none'
            });
            if (TemplateOrSettings) {
                var Settings_2;
                switch (true) {
                    case (typeof TemplateOrSettings === 'object') && ((Object.getPrototypeOf(TemplateOrSettings) === Object.prototype) ||
                        (Object.getPrototypeOf(TemplateOrSettings) == null)):
                        Settings_2 = TemplateOrSettings;
                        break;
                    case TemplateOrSettings instanceof DOMMaLi:
                    case TemplateOrSettings instanceof Element:
                        // @ts-ignore allow assignment to "Settings"
                        Settings_2 = window.getComputedStyle(
                        // @ts-ignore dommali(...) does return a DOMMaLi instance
                        dommali(TemplateOrSettings).subject(0));
                        break;
                    default:
                        throw new TypeError('DOMMaLi instance, HTML element or settings expected');
                }
                _DOMMaLi._relevantSettings_for_textHeight.forEach(function (relevantSetting) {
                    var ValueOfSetting = Settings_2[relevantSetting];
                    if (ValueOfSetting != null) {
                        auxiliaryDiv_2.css(relevantSetting, ValueOfSetting);
                    }
                });
            }
            // @ts-ignore "auxiliaryDiv" is defined and "text" returns it
            return auxiliaryDiv_2.text(Text).height(); // performs actual measurement
        }
        else {
            return NaN;
        }
    };
    /**** extraParametersOfEvent ****/
    DOMMaLi.extraParametersOfEvent = function (Event) {
        var extraParameters = Event['_extraParameters'];
        return (Array.isArray(extraParameters) ? extraParameters.slice() : []);
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
                return Subject.matches(unhashed(SelectorOrCallback));
            }));
        }
    };
    /**** tagName ****/
    DOMMaLi.prototype.tagName = function () {
        return (this.Subjects.length === 0
            ? undefined
            : this.Subjects[0].tagName.toLowerCase());
    };
    /**** matches ****/
    DOMMaLi.prototype.matches = function (Selector) {
        return this.Subjects.every(function (Subject) { return Subject.matches(unhashed(Selector)); });
    };
    /**** is ****/
    DOMMaLi.prototype.is = function (Value) {
        switch (true) {
            case ValueIsString(Value):
                return this.matches(unhashed(Value));
            case (Value instanceof _DOMMaLi):
                var Candidate_1 = Value;
                return ((this.Subjects.length === Candidate_1.Subjects.length) &&
                    this.Subjects.every(function (Element, Index) { return (Candidate_1.Subjects[Index] === Element); }));
            case (Value instanceof Element):
                return ((this.Subjects.length === 1) &&
                    (this.Subjects[0] === Value));
            default:
                return false;
        }
    };
    /**** find ****/
    DOMMaLi.prototype.find = function (Selector) {
        return new _DOMMaLi(this.Subjects.length === 0
            ? undefined
            : asArray(this.Subjects[0].querySelectorAll(unhashed(Selector))));
    };
    /**** findFirst ****/
    DOMMaLi.prototype.findFirst = function (Selector) {
        return new _DOMMaLi((this.Subjects.length === 0)
            ? undefined
            : this.Subjects[0].querySelector(unhashed(Selector)));
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
            : this.Subjects[0].closest(unhashed(Selector)));
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
            ChildElements = ChildElements.filter(function (Subject) { return Subject.matches(unhashed(Selector)); });
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
            return new _DOMMaLi(asArray(this.Subjects[0].children).find(function (Subject) { return Subject.matches(unhashed(Selector)); }));
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
                if (ChildElements[i].matches(unhashed(Selector))) {
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
                if (Sibling.matches(unhashed(Selector))) {
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
                if (Sibling.matches(unhashed(Selector))) {
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
        var Bounds = this.Subjects[0].getBoundingClientRect();
        return {
            left: Bounds.left + document.body.scrollLeft,
            top: Bounds.top + document.body.scrollTop
        };
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
        var _this = this;
        if (this.Subjects.length === 0) {
            return this;
        }
        var Contents = (Content instanceof DOMMaLi
            ? Content
            : new _DOMMaLi(Content));
        if (Contents.Subjects.length === 0) {
            return this;
        }
        if (ValueIsString(Content) && Content.startsWith('<')) {
            this.Subjects.forEach(function (Subject, Index) {
                Subject[Method].apply(Subject, Contents.Subjects);
                if (Index < _this.Subjects.length - 1) {
                    Contents = new _DOMMaLi(Content);
                }
            });
        }
        else {
            this.Subjects[0][Method].apply(this.Subjects[0], Contents.Subjects);
        }
        return this;
    };
    /**** replaceWith ****/
    DOMMaLi.prototype.replaceWith = function (Replacement) {
        var _this = this;
        if (this.Subjects.length === 0) {
            return;
        }
        var Replacements = (Replacement instanceof DOMMaLi
            ? Replacement
            : new _DOMMaLi(Replacement));
        if (Replacements.Subjects.length === 0) {
            this.remove();
            return;
        }
        if (ValueIsString(Replacement) && Replacement.startsWith('<')) {
            this.Subjects.forEach(function (Subject, Index) {
                Subject.replaceWith.apply(Subject, Replacements.Subjects);
                if (Index < _this.Subjects.length - 1) {
                    Replacements = new _DOMMaLi(Replacement);
                }
            });
        }
        else {
            this.Subjects[0].replaceWith.apply(this.Subjects[0], Replacements.Subjects);
        }
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
    /**** val ****/
    DOMMaLi.prototype.val = function (newValue) {
        if (newValue === undefined) {
            if (this.Subjects.length === 0) {
                return undefined;
            }
            // @ts-ignore assume presence of "value" property
            var Value = this.Subjects[0].value;
            return (Value === null ? undefined : Value);
        }
        else {
            this.Subjects.forEach(function (Subject) {
                // @ts-ignore assume presence of "value" property
                Subject.value = newValue;
            });
            return this;
        }
    };
    /**** css ****/
    DOMMaLi.prototype.css = function (PropertyOrListOrSet, newValue) {
        if (newValue === undefined) {
            var computedStyles_1;
            switch (true) {
                case (typeof PropertyOrListOrSet === 'string'):
                    if (this.Subjects.length === 0) {
                        return undefined;
                    }
                    computedStyles_1 = window.getComputedStyle(this.Subjects[0]);
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
        var EventList;
        if (ValueIsEventNameWithSelector(Events)) {
            var AtIndex = Events.indexOf('@');
            EventList = [Events.slice(0, AtIndex)];
            Selector = Events.slice(AtIndex + 1);
            if (Selector === 'this') {
                Selector = '@this';
            } // special case
        }
        else {
            EventList = Events.split(' ');
        }
        EventList.forEach(function (Event) {
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
        var EventList;
        if (ValueIsEventNameWithSelector(Events)) {
            var AtIndex = Events.indexOf('@');
            EventList = [Events.slice(0, AtIndex)];
            Selector = Events.slice(AtIndex + 1);
        }
        else {
            EventList = (Events == null ? [] : Events.split(' '));
        }
        this.Subjects.forEach(function (Subject) {
            var EventRegistry = Subject['_EventRegistry'];
            if (EventRegistry == null) {
                return;
            }
            if (EventList.length === 0) { // unregister any event handlers
                for (var Event_1 in EventRegistry) {
                    _this._unregisterHandlersForEventMatching(Subject, EventRegistry, Event_1, Selector, Handler);
                }
            }
            else { // unregister handlers for the given events only
                EventList.forEach(function (Event) {
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
    /**** waitFor ****/
    DOMMaLi.prototype.waitFor = function () {
        var EventsOrTimeout = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            EventsOrTimeout[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var EventList, Timeout;
            var _this = this;
            return __generator(this, function (_a) {
                EventList = [];
                Timeout = -1;
                EventsOrTimeout.forEach(function (EventOrTimeout) {
                    switch (true) {
                        case ValueIsString(EventOrTimeout):
                            EventList.push(EventOrTimeout);
                            break;
                        case ValueIsNumber(EventOrTimeout):
                            Timeout = Math.max(0, Math.round(EventOrTimeout));
                            break;
                        default: throw new TypeError('event name (with opt. selector) or timeout expected');
                    }
                });
                if (!isFinite(Timeout)) {
                    Timeout = 0;
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var Target = _this;
                        var Timer;
                        var StartTime;
                        function cleanupFrom(Event) {
                            EventList.forEach(function (EventSpec) { return Target.off(EventSpec, cleanupFrom); });
                            if (Event == null) { // timeout occurred
                                resolve(Date.now() - StartTime);
                            }
                            else { // event occurred before timeout
                                clearTimeout(Timer);
                                resolve(Event);
                            }
                        }
                        EventList.forEach(function (EventSpec) { return Target.on(EventSpec, cleanupFrom); });
                        if (Timeout > 0) {
                            StartTime = Date.now();
                            Timer = setTimeout(cleanupFrom, Timeout);
                        }
                    })];
            });
        });
    };
    /**** repeatUntil ****/
    DOMMaLi.prototype.repeatUntil = function () {
        var EventsOrTimeoutOrLoopBody = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            EventsOrTimeoutOrLoopBody[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var EventList, Timeout, LoopBody;
            var _this = this;
            return __generator(this, function (_a) {
                EventList = [];
                Timeout = -1;
                EventsOrTimeoutOrLoopBody.forEach(function (Argument) {
                    switch (true) {
                        case ValueIsString(Argument):
                            EventList.push(Argument);
                            break;
                        case ValueIsNumber(Argument):
                            Timeout = Math.max(0, Math.round(Argument));
                            break;
                        case ValueIsFunction(Argument):
                            LoopBody = Argument;
                            break;
                        default: throw new TypeError('event name (with opt. selector) or timeout or loop body expected');
                    }
                });
                // @ts-ignore: TypeScript bug? the thrown compiler error is rubbish
                if (LoopBody == null) {
                    throw new TypeError('no loop body function given');
                }
                if (!isFinite(Timeout)) {
                    Timeout = 0;
                }
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        function processEventOrTimeout(Event) {
                            EventList.forEach(function (EventSpec) { return Target.off(EventSpec, processEventOrTimeout); });
                            if (Event === undefined) { // timeout occurred
                                Result = Date.now() - StartTime;
                            }
                            else { // event occurred before timeout
                                clearTimeout(Timer);
                                Result = Event;
                            }
                        }
                        var Target, Result, Timer, StartTime, LoopResult, Signal_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    Target = this;
                                    Result = undefined;
                                    EventList.forEach(function (EventSpec) { return Target.on(EventSpec, processEventOrTimeout); });
                                    if (Timeout > 0) {
                                        StartTime = Date.now();
                                        Timer = setTimeout(processEventOrTimeout, Timeout);
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 6, , 7]);
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, LoopBody()];
                                case 3:
                                    LoopResult = _a.sent();
                                    if (LoopResult !== undefined) {
                                        Result = LoopResult;
                                    } // "break"
                                    _a.label = 4;
                                case 4:
                                    if (Result === undefined) return [3 /*break*/, 2];
                                    _a.label = 5;
                                case 5:
                                    resolve(Result);
                                    return [3 /*break*/, 7];
                                case 6:
                                    Signal_1 = _a.sent();
                                    processEventOrTimeout(null);
                                    reject(Signal_1);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**** HandlersForEvent ****/
    DOMMaLi.prototype.HandlersForEvent = function (Event) {
        var Result = [];
        Event = Event.trim().replace(/\s+/g, ' ');
        if (Event === '') {
            throw new TypeError('no "Event" given');
        }
        if (/\s/.test(Event)) {
            throw new TypeError('multiple "Events" given');
        }
        var Subject = this.Subjects[0];
        if (Subject == null) {
            return Result;
        }
        var EventRegistry = Subject['_EventRegistry'];
        if (EventRegistry == null) {
            return Result;
        }
        var EntriesForEvent = EventRegistry[Event];
        if (EntriesForEvent == null) {
            return Result;
        }
        for (var Selector in EntriesForEvent) {
            Result = Result.concat(EntriesForEvent[Selector]);
        }
        return Result;
    };
    /**** trigger ****/
    DOMMaLi.prototype.trigger = function (Event, extraParameters, bubbles) {
        if (bubbles === void 0) { bubbles = true; }
        if (this.Subjects.length === 0) {
            return true;
        }
        if (ValueIsString(Event)) {
            Event = new CustomEvent(Event, { bubbles: bubbles, cancelable: true });
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
    /**** focusedElement ****/
    DOMMaLi.prototype.focusedElement = function () {
        return new _DOMMaLi(document.activeElement);
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
    /**** textWidth ****/
    DOMMaLi._relevantSettings_for_textWidth = [
        'font-family', 'font-size', 'font-weight', 'font-style', 'font-variant',
        'font-variant-caps', 'font-variant-numeric', 'font-variant-alternates',
        'font-variant-ligatures', 'font-variant-east-asian', 'font-stretch',
        'font-kerning', 'font-size-adjust', 'font-synthesis', 'font-language-override',
        'white-space', 'letter-spacing', 'word-spacing', 'text-indent',
        'text-transform'
    ];
    /**** textHeight ****/
    DOMMaLi._relevantSettings_for_textHeight = [
        'font-family', 'font-size', 'font-weight', 'font-style', 'font-variant',
        'font-variant-caps', 'font-variant-numeric', 'font-variant-alternates',
        'font-variant-ligatures', 'font-variant-east-asian', 'font-stretch',
        'font-kerning', 'font-size-adjust', 'font-synthesis', 'font-language-override',
        'white-space', 'letter-spacing', 'word-spacing', 'text-indent',
        'text-transform', 'word-break', 'line-break', 'line-height',
        'width' // width may be explicitly specified
    ];
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
                    _this.Subjects = asArray(document.querySelectorAll(unhashed(Value)));
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
Object.assign(dommali, {
    ready: DOMMaLi.ready,
    textWidth: DOMMaLi.textWidth, textHeight: DOMMaLi.textHeight,
    extraParametersOfEvent: DOMMaLi.extraParametersOfEvent
});

export { dommali as default };
//# sourceMappingURL=dommali.esm.js.map
