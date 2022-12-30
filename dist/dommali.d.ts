declare type Primitive = null | undefined | boolean | number | string;
declare type PlainObject = Record<string, Primitive>;
declare abstract class DOMMaLi {
    protected Subjects: Element[];
    /**** ready - similar to jQuery.ready ****/
    static ready(this: typeof DOMMaLi, FunctionToCall: Function): typeof DOMMaLi;
    /**** textWidth ****/
    private static readonly _relevantSettings_for_textWidth;
    private static _auxiliarySpan;
    static textWidth(Text: string, TemplateOrSettings?: any): number;
    /**** textHeight ****/
    private static readonly _relevantSettings_for_textHeight;
    private static _auxiliaryDiv;
    static textHeight(Text: string, TemplateOrSettings?: any): number;
    /**** extraParametersOfEvent ****/
    static extraParametersOfEvent(Event: Event): any[];
    /**** get length ****/
    get length(): number;
    /**** size ****/
    size(this: DOMMaLi): number;
    /**** isEmpty ****/
    isEmpty(this: DOMMaLi): boolean;
    /**** subjects ****/
    subjects(this: DOMMaLi): Element[];
    /**** subject ****/
    subject(this: DOMMaLi, Index: number): Element | undefined;
    /**** indexOf ****/
    indexOf(this: DOMMaLi, Value: Element | DOMMaLi): number;
    /**** slice ****/
    slice(this: DOMMaLi, start?: number, end?: number): DOMMaLi;
    /**** first ****/
    first(this: DOMMaLi): DOMMaLi;
    /**** last ****/
    last(this: DOMMaLi): DOMMaLi;
    /**** eq ****/
    eq(this: DOMMaLi, Index: number): DOMMaLi;
    /**** forEach ****/
    forEach(this: DOMMaLi, Callback: Function): DOMMaLi;
    /**** filter ****/
    filter(this: DOMMaLi, SelectorOrCallback: string | String | Function): DOMMaLi;
    /**** tagName ****/
    tagName(this: DOMMaLi): string | undefined;
    /**** matches ****/
    matches(this: DOMMaLi, Selector: string | String): boolean;
    /**** is ****/
    is(this: DOMMaLi, Value: string | String | _DOMMaLi | Element): boolean;
    /**** find ****/
    find(this: DOMMaLi, Selector: string | String): DOMMaLi;
    /**** findFirst ****/
    findFirst(this: DOMMaLi, Selector: string | String): DOMMaLi;
    /**** parent ****/
    parent(this: DOMMaLi): DOMMaLi;
    /**** closest ****/
    closest(this: DOMMaLi, Selector: string | String): DOMMaLi;
    /**** isAttached ****/
    isAttached(this: DOMMaLi): boolean;
    /**** contains ****/
    contains(this: DOMMaLi, Candidate: DOMMaLi): boolean;
    /**** children ****/
    children(this: DOMMaLi, Selector?: string | String): DOMMaLi;
    /**** firstChild ****/
    firstChild(this: DOMMaLi, Selector?: string | String): DOMMaLi;
    /**** lastChild ****/
    lastChild(this: DOMMaLi, Selector?: string | String): DOMMaLi;
    /**** prev ****/
    prev(this: DOMMaLi, Selector?: string | String): DOMMaLi;
    /**** next ****/
    next(this: DOMMaLi, Selector?: string | String): DOMMaLi;
    /**** positionInViewport - CONSIDERING transforms! ****/
    positionInViewport(this: DOMMaLi): {
        left: number;
        top: number;
    } | undefined;
    /**** positionInParent - without taking transforms into account ****/
    positionInParent(this: DOMMaLi): {
        left: number;
        top: number;
    } | undefined;
    /**** positionOnPage - without taking transforms into account ****/
    positionOnPage(this: DOMMaLi): {
        left: number;
        top: number;
    } | undefined;
    /**** width - without taking transforms into account ****/
    width(this: DOMMaLi, newValue?: number): number | DOMMaLi | undefined;
    /**** height - without taking transforms into account ****/
    height(this: DOMMaLi, newValue?: number): number | DOMMaLi | undefined;
    /**** innerWidth/Height - without taking transforms into account ****/
    innerWidth(this: DOMMaLi): number | undefined;
    innerHeight(this: DOMMaLi): number | undefined;
    /**** renderWidth/Height - CONSIDERING transforms ****/
    renderWidth(this: DOMMaLi): number | undefined;
    renderHeight(this: DOMMaLi): number | undefined;
    /**** scrollLeft/Top/Width/Height ****/
    scrollLeft(this: DOMMaLi, newValue?: number): number | DOMMaLi | undefined;
    scrollTop(this: DOMMaLi, newValue?: number): number | DOMMaLi | undefined;
    scrollWidth(this: DOMMaLi): number | undefined;
    scrollHeight(this: DOMMaLi): number | undefined;
    /**** scrollTo ****/
    scrollTo(this: DOMMaLi, x: number, y: number, Mode?: 'instant' | 'smooth' | 'auto'): DOMMaLi;
    /**** show ****/
    show(this: DOMMaLi): DOMMaLi;
    /**** hide ****/
    hide(this: DOMMaLi): DOMMaLi;
    /**** hasClass ****/
    hasClass(this: DOMMaLi, Classes: string): boolean;
    /**** addClass ****/
    addClass(this: DOMMaLi, Classes: string): DOMMaLi;
    /**** toggleClass ****/
    toggleClass(this: DOMMaLi, Classes: string): DOMMaLi;
    /**** removeClass ****/
    removeClass(this: DOMMaLi, Classes: string): DOMMaLi;
    /**** _processClasses ****/
    private _processClasses;
    /**** append ****/
    append(this: DOMMaLi, Content: string | String | DOMMaLi | Element | Element[]): DOMMaLi;
    /**** prepend ****/
    prepend(this: DOMMaLi, Content: string | String | DOMMaLi | Element | Element[]): DOMMaLi;
    /**** insertAfter ****/
    insertAfter(this: DOMMaLi, Content: DOMMaLi): DOMMaLi;
    /**** insertBefore ****/
    insertBefore(this: DOMMaLi, Content: DOMMaLi): DOMMaLi;
    /**** _insert ****/
    private _insert;
    /**** replaceWith ****/
    replaceWith(this: DOMMaLi, Replacement: string | String | DOMMaLi | Element | Element[]): void;
    /**** remove ****/
    remove(this: DOMMaLi): DOMMaLi;
    /**** prop ****/
    prop(this: DOMMaLi, Property: string, newValue?: any): DOMMaLi | any | undefined;
    /**** hasProp ****/
    hasProp(this: DOMMaLi, Property: string): boolean;
    /**** removeProp ****/
    removeProp(this: DOMMaLi, Property: string): DOMMaLi;
    /**** data - not restricted to strings ****/
    data(this: DOMMaLi, Key: string, newValue?: any): DOMMaLi | any | undefined;
    /**** hasData ****/
    hasData(this: DOMMaLi, Key: string): boolean;
    /**** removeData ****/
    removeData(this: DOMMaLi, Key: string): DOMMaLi;
    /**** attr ****/
    attr(this: DOMMaLi, Attribute: string, newValue?: any): DOMMaLi | string | undefined;
    /**** hasAttr ****/
    hasAttr(this: DOMMaLi, Attribute: string): boolean;
    /**** removeAttr ****/
    removeAttr(this: DOMMaLi, Attribute: string): DOMMaLi;
    /**** val ****/
    val(this: DOMMaLi, newValue?: any | null): DOMMaLi | string | undefined;
    /**** css ****/
    css(this: DOMMaLi, PropertyOrListOrSet: string | string[] | PlainObject, newValue?: string): DOMMaLi | string | PlainObject | undefined;
    /**** html ****/
    html(this: DOMMaLi, newValue?: string): DOMMaLi | string | undefined;
    /**** text ****/
    text(this: DOMMaLi, newValue?: string): DOMMaLi | string | undefined;
    /**** appendText ****/
    appendText(this: DOMMaLi, Value: string): DOMMaLi;
    /**** prependText ****/
    prependText(this: DOMMaLi, Value: string): DOMMaLi;
    /**** on ****/
    on(this: DOMMaLi, Events: string, SelectorOrHandler: string | String | null | Function, DataOrHandler?: any, Handler?: Function): DOMMaLi;
    /**** once ****/
    once(this: DOMMaLi, Events: string, SelectorOrHandler: string | String | null | Function, DataOrHandler?: any, Handler?: Function): DOMMaLi;
    /**** _registerEventHandler ****/
    private _registerEventHandler;
    /**** __registerEventHandler - on DOM element rather than DOMMaLi object ****/
    private __registerEventHandler;
    /**** off ****/
    off(this: DOMMaLi, Events?: string, SelectorOrHandler?: string | String | null | Function, Handler?: Function): DOMMaLi;
    /**** _unregisterAllEventHandlersMatching ****/
    private _unregisterAllEventHandlersMatching;
    /**** _unregisterHandlersForEventMatching ****/
    private _unregisterHandlersForEventMatching;
    /**** _unregisterHandlersForEventSelectorsMatching ****/
    private _unregisterHandlersForEventSelectorsMatching;
    /**** waitFor ****/
    waitFor(this: DOMMaLi, ...EventsOrTimeout: (string | number)[]): Promise<any>;
    /**** repeatUntil ****/
    repeatUntil(this: DOMMaLi, ...EventsOrTimeoutOrLoopBody: (string | number | Function)[]): Promise<any>;
    /**** HandlersForEvent ****/
    HandlersForEvent(this: DOMMaLi, Event: string): Function[];
    /**** trigger ****/
    trigger(this: DOMMaLi, Event: string | Event, extraParameters?: any, bubbles?: boolean): boolean;
    /**** focus ****/
    focus(this: DOMMaLi): DOMMaLi;
    /**** blur ****/
    blur(this: DOMMaLi): DOMMaLi;
    /**** hasFocus ****/
    hasFocus(this: DOMMaLi): boolean;
    /**** focusedElement ****/
    focusedElement(this: DOMMaLi): DOMMaLi;
    /**** transition ****/
    transition(this: DOMMaLi, Settings: PlainObject, Options?: PlainObject): DOMMaLi;
}
declare class _DOMMaLi extends DOMMaLi {
    constructor(Value?: string | String | DOMMaLi | Element | Element[] | null | undefined);
}
export default function dommali(Value: Function | string | String | DOMMaLi | Element | Element[]): DOMMaLi | typeof DOMMaLi;
export {};
