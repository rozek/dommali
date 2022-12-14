  type Primitive     = null | undefined | boolean | number | string // | symbol | bigint
  type PlainObject   = Record<string,Primitive>

/**** make some existing types indexable ****/

  interface Indexable { [Key:string]:any }

  type indexableFunction    = Function    & Indexable
  type indexableElement     = Element     & Indexable
  type indexableHTMLElement = HTMLElement & Indexable
  type indexableEvent       = Event       & Indexable

/**** ValueIsNumber ****/

  function ValueIsNumber (Value:any):boolean {
    return (typeof Value === 'number') || (Value instanceof Number)
  }

/**** ValueIsString ****/

  function ValueIsString (Value:any):boolean {
    return (typeof Value === 'string') || (Value instanceof String)
  }

/**** ValueIsFunction ****/

  function ValueIsFunction (Value:any):boolean {
    return (typeof Value === 'function')
  }

/**** ValueIsEventNameWithSelector ****/

  const NameWithSelectorPattern = /^[a-z$_][a-z$_0-9]*([-.:][a-z$_0-9]+)*@.*$/i

  function ValueIsEventNameWithSelector (Value:any):boolean {
    return (
      (typeof Value === 'string') || (Value instanceof String)
    ) && NameWithSelectorPattern.test(Value as string)
  }

/**** ValueIsArray ****/

  const ValueIsArray = Array.isArray

/**** asArray ****/

  function asArray (Value:any):any[] {
    return Array.prototype.slice.call(Value)
  }

/**** ValueIsHTMLElement ****/

  function ValueIsHTMLElement (Value:any):boolean {
    return (Value instanceof HTMLElement)
  }

/**** asHTMLElement ****/

  function asHTMLElement (Candidate:Element):HTMLElement|undefined {
    return (ValueIsHTMLElement(Candidate) ? Candidate as HTMLElement : undefined)
  }

/**** asListOfHTMLElements ****/

  function asListOfHTMLElements (Candidates:Element[]):HTMLElement[] {
    return Candidates.filter(
      (Candidate) => ValueIsHTMLElement(Candidate)
    ) as HTMLElement[]
  }

/**** ValueIsEmptyObject ****/

  let hasOwnProperty = Object.prototype.hasOwnProperty
  function ValueIsEmptyObject (Value:any):boolean {
    for (let Key in Value) {
      if (hasOwnProperty.call(Value,Key)) { return false }
    }
    return true
  }

/**** CamelCased ****/

  function CamelCased (Text:string):string {
    return Text.replace(/-[a-z]/ig, (Match) => Match[1].toUpperCase())
  }

/**** DisplayDefaultFor ****/

  const DisplayDefaultSet:{ [TagName:string]:string } = {}

  function DisplayDefaultFor (TagName:string):string {
    if (TagName in DisplayDefaultSet) { return DisplayDefaultSet[TagName] }

    let auxElement = document.createElement(TagName)
    document.body.appendChild(auxElement)
      let DisplayDefault = getComputedStyle(auxElement).display
      if (DisplayDefault === 'none') { DisplayDefault = 'block' }

      DisplayDefaultSet[TagName] = DisplayDefault
    document.body.removeChild(auxElement)

    return DisplayDefault
  }
/**** unhashed - convert #<id> into [id="<id>"] ****/

  function unhashed (Selector:string):string {
    return (
      Selector.startsWith('#')
      ? '[id="' + Selector.slice(1) + '"]' // not perfect
      : Selector
    )
  }


  abstract class DOMMaLi {
    protected Subjects:Element[] = []

  /**** ready - similar to jQuery.ready ****/

    static ready (
      this:typeof DOMMaLi, FunctionToCall:Function
    ):typeof DOMMaLi {
      if (DOMisReady && ! ReadyFunctionsAreRunning) {
        FunctionToCall()                                            // may fail!
      } else {
        ReadyFunctionsToCall.push(FunctionToCall)
      }
      return this
    }

  /**** textWidth ****/

    private static readonly _relevantSettings_for_textWidth = [
      'font-family', 'font-size', 'font-weight', 'font-style', 'font-variant',
      'font-variant-caps', 'font-variant-numeric', 'font-variant-alternates',
      'font-variant-ligatures', 'font-variant-east-asian', 'font-stretch',
      'font-kerning', 'font-size-adjust', 'font-synthesis', 'font-language-override',
      'white-space', 'letter-spacing', 'word-spacing', 'text-indent',
      'text-transform'
    ]

    private static _auxiliarySpan:DOMMaLi

    static textWidth (Text:string, TemplateOrSettings?:any):number {
      if (DOMisReady) {
        if (_DOMMaLi._auxiliarySpan == null) {
          let auxiliarySpan = document.createElement('span')
            auxiliarySpan.style.visibility = 'hidden'
          document.body.appendChild(auxiliarySpan)

          _DOMMaLi._auxiliarySpan = dommali(auxiliarySpan) as DOMMaLi
        }

        let auxiliarySpan = _DOMMaLi._auxiliarySpan

        auxiliarySpan.css({   // reset settings that could influence measurement
          width:'auto', 'min-width':0, 'max-width':'none',
          margin:0, padding:0, border:'none', font:'normal',
          'white-space':'normal', 'letter-spacing':'normal', 'word-spacing':'normal',
          'text-indent':0, 'text-transform':'none'
        })

        if (TemplateOrSettings) {
          let Settings:{[Key:string]:string}
          switch (true) {
            case (typeof TemplateOrSettings === 'object') && (
              (Object.getPrototypeOf(TemplateOrSettings) === Object.prototype) ||
              (Object.getPrototypeOf(TemplateOrSettings) ==  null)
            ):
              Settings = TemplateOrSettings
              break
            case TemplateOrSettings instanceof DOMMaLi:
            case TemplateOrSettings instanceof Element:
// @ts-ignore allow assignment to "Settings"
              Settings = window.getComputedStyle(
// @ts-ignore dommali(...) does return a DOMMaLi instance
                dommali(TemplateOrSettings).subject(0)
              )
              break
            default:
              throw new TypeError('DOMMaLi instance, HTML element or settings expected')
          }

          _DOMMaLi._relevantSettings_for_textWidth.forEach((relevantSetting) => {
            const ValueOfSetting = Settings[relevantSetting]
            if (ValueOfSetting != null) {
              auxiliarySpan.css(relevantSetting,ValueOfSetting)
            }
          })
        }

// @ts-ignore "auxiliarySpan" is defined and "text" returns it
        return auxiliarySpan.text(Text).width()   // performs actual measurement
      } else {
        return NaN
      }
    }

  /**** textHeight ****/

    private static readonly _relevantSettings_for_textHeight = [
      'font-family', 'font-size', 'font-weight', 'font-style', 'font-variant',
      'font-variant-caps', 'font-variant-numeric', 'font-variant-alternates',
      'font-variant-ligatures', 'font-variant-east-asian', 'font-stretch',
      'font-kerning', 'font-size-adjust', 'font-synthesis', 'font-language-override',
      'white-space', 'letter-spacing', 'word-spacing', 'text-indent',
      'text-transform', 'word-break', 'line-break', 'line-height',
      'width'                               // width may be explicitly specified
    ]

    private static _auxiliaryDiv:DOMMaLi

    static textHeight (Text:string, TemplateOrSettings?:any):number {
      if (DOMisReady) {
        if (_DOMMaLi._auxiliaryDiv == null) {
          let auxiliaryDiv = document.createElement('div')
            auxiliaryDiv.style.visibility = 'hidden'
          document.body.appendChild(auxiliaryDiv)

          _DOMMaLi._auxiliaryDiv = dommali(auxiliaryDiv) as DOMMaLi
        }

        let auxiliaryDiv = _DOMMaLi._auxiliaryDiv

        auxiliaryDiv.css({    // reset settings that could influence measurement
          width:'auto', 'min-width':0, 'max-width':'none',
          margin:0, padding:0, border:'none', font:'normal',
          'white-space':'normal', 'letter-spacing':'normal', 'word-spacing':'normal',
          'text-indent':0, 'text-transform':'none'
        })

        if (TemplateOrSettings) {
          let Settings:{[Key:string]:string}
          switch (true) {
            case (typeof TemplateOrSettings === 'object') && (
              (Object.getPrototypeOf(TemplateOrSettings) === Object.prototype) ||
              (Object.getPrototypeOf(TemplateOrSettings) ==  null)
            ):
              Settings = TemplateOrSettings
              break
            case TemplateOrSettings instanceof DOMMaLi:
            case TemplateOrSettings instanceof Element:
// @ts-ignore allow assignment to "Settings"
              Settings = window.getComputedStyle(
// @ts-ignore dommali(...) does return a DOMMaLi instance
                dommali(TemplateOrSettings).subject(0)
              )
              break
            default:
              throw new TypeError('DOMMaLi instance, HTML element or settings expected')
          }

          _DOMMaLi._relevantSettings_for_textHeight.forEach((relevantSetting) => {
            const ValueOfSetting = Settings[relevantSetting]
            if (ValueOfSetting != null) {
              auxiliaryDiv.css(relevantSetting,ValueOfSetting)
            }
          })
        }

// @ts-ignore "auxiliaryDiv" is defined and "text" returns it
        return auxiliaryDiv.text(Text).height()   // performs actual measurement
      } else {
        return NaN
      }
    }

  /**** extraParametersOfEvent ****/

    static extraParametersOfEvent (Event:Event):any[] {
      let extraParameters = (Event as indexableEvent)['_extraParameters']
      return (Array.isArray(extraParameters) ? extraParameters.slice() : [])
    }


  /**** get length ****/

    get length ():number {
      return this.Subjects.length
    }

  /**** size ****/

    size (this:DOMMaLi):number {
      return this.Subjects.length
    }

  /**** isEmpty ****/

    isEmpty (this:DOMMaLi):boolean {
      return (this.Subjects.length === 0)
    }

  /**** subjects ****/

    subjects (this:DOMMaLi):Element[] {
      return this.Subjects.slice()
    }

  /**** subject ****/

    subject (this:DOMMaLi, Index:number):Element|undefined {
      return this.Subjects[Index]
    }

  /**** indexOf ****/

    indexOf (this:DOMMaLi, Value:Element|DOMMaLi):number {
      if (Value instanceof DOMMaLi) {
        Value = Value.Subjects[0]
        if (Value == null) { return -1 }
      }
      return this.Subjects.indexOf(Value)
    }

  /**** slice ****/

    slice (this:DOMMaLi, start?:number, end?:number):DOMMaLi {
      return new _DOMMaLi(this.Subjects.slice(start,end))
    }

  /**** first ****/

    first (this:DOMMaLi):DOMMaLi {
      return new _DOMMaLi(this.Subjects[0])
    }

  /**** last ****/

    last (this:DOMMaLi):DOMMaLi {
      return new _DOMMaLi(this.Subjects[this.Subjects.length-1])
    }

  /**** eq ****/

    eq (this:DOMMaLi, Index:number):DOMMaLi {
      return new _DOMMaLi(this.Subjects[Index])
    }

  /**** forEach ****/

    forEach (this:DOMMaLi, Callback:Function):DOMMaLi {
      this.Subjects.forEach((Subject:Element, Index:number) => {
        Callback(new _DOMMaLi(Subject), Index, this)
      })
      return this
    }

  /**** filter ****/

    filter (this:DOMMaLi, SelectorOrCallback:string|String|Function):DOMMaLi {
      if (typeof SelectorOrCallback === 'function') {
        return new _DOMMaLi(
          this.Subjects.filter((Subject:Element, Index:number) => {
            return (SelectorOrCallback as Function)(
              new _DOMMaLi(Subject), Index, this
            )
          })
        )
      } else {
        return new _DOMMaLi(
          this.Subjects.filter((Subject:Element) => {
            return Subject.matches(unhashed(SelectorOrCallback as string))
          })
        )
      }
    }

  /**** tagName ****/

    tagName (this:DOMMaLi):string|undefined {
      return (
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].tagName.toLowerCase()
      )
    }

  /**** matches ****/

    matches (this:DOMMaLi, Selector:string|String):boolean {
      return this.Subjects.every(
        (Subject:Element) => Subject.matches(unhashed(Selector as string))
      )
    }

  /**** is ****/

    is (this:DOMMaLi, Value:string|String|_DOMMaLi|Element):boolean {
      switch (true) {
        case ValueIsString(Value):
          return this.matches(unhashed(Value as string))
        case (Value instanceof _DOMMaLi):
          let Candidate = Value as _DOMMaLi
          return (
            (this.Subjects.length === Candidate.Subjects.length) &&
            this.Subjects.every(
              (Element,Index) => (Candidate.Subjects[Index] === Element)
            )
          )
          break
        case (Value instanceof Element):
          return (
            (this.Subjects.length === 1) &&
            (this.Subjects[0]     === Value)
          )
        default:
          return false
      }
    }

  /**** find ****/

    find (this:DOMMaLi, Selector:string|String):DOMMaLi {
      return new _DOMMaLi(
        this.Subjects.length === 0
        ? undefined
        : asArray(this.Subjects[0].querySelectorAll(unhashed(Selector as string)))
      )
    }

  /**** findFirst ****/

    findFirst (this:DOMMaLi, Selector:string|String):DOMMaLi {
      return new _DOMMaLi(
        (this.Subjects.length === 0)
        ? undefined
        : this.Subjects[0].querySelector(unhashed(Selector as string)) as Element
      )
    }

  /**** parent ****/

    parent (this:DOMMaLi):DOMMaLi {
      return new _DOMMaLi(
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].parentElement
      )
    }

  /**** closest ****/

    closest (this:DOMMaLi, Selector:string|String):DOMMaLi {
      return new _DOMMaLi(
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].closest(unhashed(Selector as string))
      )
    }

  /**** isAttached ****/

    isAttached (this:DOMMaLi):boolean {
      return (
        this.Subjects.length === 0
        ? false
        : document.contains(this.Subjects[0])
      )
    }

  /**** contains ****/

    contains (this:DOMMaLi, Candidate:DOMMaLi):boolean {
      return (
        (this.Subjects.length === 0) || (Candidate.Subjects.length === 0)
        ? false
        : Candidate.Subjects.every((Candidate) => this.Subjects[0].contains(Candidate))
      )
    }

  /**** children ****/

    children (this:DOMMaLi, Selector?:string|String):DOMMaLi {
      let ChildElements = (
        this.Subjects.length === 0
        ? []
        : asArray(this.Subjects[0].children)
      )

      if (Selector != null) {
        ChildElements = ChildElements.filter(
          (Subject:Element) => Subject.matches(unhashed(Selector as string))
        )
      }

      return new _DOMMaLi(ChildElements)
    }

  /**** firstChild ****/

    firstChild (this:DOMMaLi, Selector?:string|String):DOMMaLi {
      if (this.Subjects.length === 0) {
        return new _DOMMaLi()
      }

      if (Selector == null) {
        return new _DOMMaLi(this.Subjects[0].firstElementChild)
      } else {
        return new _DOMMaLi(
          asArray(this.Subjects[0].children).find(
            (Subject:Element) => Subject.matches(unhashed(Selector as string))
          )
        )
      }
    }

  /**** lastChild ****/

    lastChild (this:DOMMaLi, Selector?:string|String):DOMMaLi {
      if (this.Subjects.length === 0) {
        return new _DOMMaLi()
      }

      if (Selector == null) {
        return new _DOMMaLi(this.Subjects[0].lastElementChild)
      } else {
        let ChildElements = asArray(this.Subjects[0].children)

        for (let i = ChildElements.length-1; i >= 0; i--) {
          if (ChildElements[i].matches(unhashed(Selector as string))) {
            return new _DOMMaLi(ChildElements[i])
          }
        }
        return new _DOMMaLi()
      }
    }

  /**** prev ****/

    prev (this:DOMMaLi, Selector?:string|String):DOMMaLi {
      if (this.Subjects.length === 0) {
        return new _DOMMaLi()
      }

      if (Selector == null) {
        return new _DOMMaLi(this.Subjects[0].previousElementSibling)
      } else {
        let Sibling = this.Subjects[0].previousElementSibling
          while (Sibling != null) {
            if (Sibling.matches(unhashed(Selector as string))) {
              return new _DOMMaLi(Sibling)
            }
            Sibling = Sibling.previousElementSibling
          }
        return new _DOMMaLi()
      }
    }

  /**** next ****/

    next (this:DOMMaLi, Selector?:string|String):DOMMaLi {
      if (this.Subjects.length === 0) {
        return new _DOMMaLi()
      }

      if (Selector == null) {
        return new _DOMMaLi(this.Subjects[0].nextElementSibling)
      } else {
        let Sibling = this.Subjects[0].nextElementSibling
          while (Sibling != null) {
            if (Sibling.matches(unhashed(Selector as string))) {
              return new _DOMMaLi(Sibling)
            }
            Sibling = Sibling.nextElementSibling
          }
        return new _DOMMaLi()
      }
    }

  /**** positionInViewport - CONSIDERING transforms! ****/

    positionInViewport (this:DOMMaLi):{ left:number,top:number }|undefined {
      if (this.Subjects.length === 0) {
        return undefined
      }

      let Bounds = this.Subjects[0].getBoundingClientRect()
      return { left:Bounds.left, top:Bounds.top }
    }

  /**** positionInParent - without taking transforms into account ****/

    positionInParent (this:DOMMaLi):{ left:number,top:number }|undefined {
      if (
        (this.Subjects.length === 0) ||
        (this.Subjects[0].parentElement == null) ||
        (! (this.Subjects[0] instanceof HTMLElement))
      ) {
        return undefined
      }

      let Subject = this.Subjects[0]
      return (
        Subject instanceof HTMLElement
        ? { left:Subject.offsetLeft, top: Subject.offsetTop }
        : undefined
      )
    }

  /**** positionOnPage - without taking transforms into account ****/

    positionOnPage (this:DOMMaLi):{ left:number,top:number }|undefined {
      if (this.Subjects.length === 0) {
        return undefined
      }

      let Bounds = this.Subjects[0].getBoundingClientRect()
      return {
        left:Bounds.left + document.body.scrollLeft,
        top: Bounds.top  + document.body.scrollTop
      }
    }

// see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
// and https://jsbin.com/kimaxojufe/1/edit?css,js,console,output

  /**** width - without taking transforms into account ****/

    width (this:DOMMaLi, newValue?:number):number|DOMMaLi|undefined {
      if (newValue === undefined) {
        let Subject = this.Subjects[0]
        if (Subject instanceof HTMLElement) {
          return (Subject as HTMLElement).offsetWidth
        } else {
          return undefined
        }
      } else {
        this.Subjects.forEach((Subject:Element) => {
          if (Subject instanceof HTMLElement) {
            Subject.style.width = newValue + 'px'
          }
        })
        return this
      }
    }

  /**** height - without taking transforms into account ****/

    height (this:DOMMaLi, newValue?:number):number|DOMMaLi|undefined {
      if (newValue === undefined) {
        let Subject = this.Subjects[0]
        if (Subject instanceof HTMLElement) {
          return (Subject as HTMLElement).offsetHeight
        } else {
          return undefined
        }
      } else {
        this.Subjects.forEach((Subject:Element) => {
          if (Subject instanceof HTMLElement) {
            Subject.style.height = newValue + 'px'
          }
        })
        return this
      }
    }

  /**** innerWidth/Height - without taking transforms into account ****/

    innerWidth (this:DOMMaLi):number|undefined {
      return (
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].clientWidth
      )
    }

    innerHeight (this:DOMMaLi):number|undefined {
      return (
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].clientHeight
      )
    }

  /**** renderWidth/Height - CONSIDERING transforms ****/

    renderWidth (this:DOMMaLi):number|undefined {
      return (
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].getBoundingClientRect().width
      )
    }

    renderHeight (this:DOMMaLi):number|undefined {
      return (
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].getBoundingClientRect().height
      )
    }

  /**** scrollLeft/Top/Width/Height ****/

    scrollLeft (this:DOMMaLi, newValue?:number):number|DOMMaLi|undefined {
      if (newValue === undefined) {
        return (
          this.Subjects.length === 0
          ? undefined
          : this.Subjects[0].scrollLeft
        )
      } else {
        this.Subjects.forEach((Subject:Element) => {
          Subject.scrollLeft = newValue
        })
        return this
      }
    }

    scrollTop (this:DOMMaLi, newValue?:number):number|DOMMaLi|undefined {
      if (newValue === undefined) {
        return (
          this.Subjects.length === 0
          ? undefined
          : this.Subjects[0].scrollTop
        )
      } else {
        this.Subjects.forEach((Subject:Element) => {
          Subject.scrollTop = newValue
        })
        return this
      }
    }

    scrollWidth (this:DOMMaLi):number|undefined {
      return (
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].scrollWidth
      )
    }

    scrollHeight (this:DOMMaLi):number|undefined {
      return (
        this.Subjects.length === 0
        ? undefined
        : this.Subjects[0].scrollHeight
      )
    }

  /**** scrollTo ****/

    scrollTo (
      this:DOMMaLi, x:number, y:number, Mode:'instant'|'smooth'|'auto' = 'auto'
    ):DOMMaLi {
      let Options = { left:x, top:y, behavior:Mode } as ScrollToOptions

      this.Subjects.forEach((Subject:Element) => {
        Subject.scrollTo(Options)
      })

      return this
    }

  /**** show ****/

    show (this:DOMMaLi):DOMMaLi {
      this.Subjects.forEach((Subject:indexableElement) => {
        if (Subject instanceof HTMLElement) {
          let computedStyle = getComputedStyle(Subject)
          if (computedStyle.display !== 'none') { return }

          if ((Subject as Indexable)['_preservedDisplay'] != null) {
            Subject.style.display = (Subject as Indexable)['_preservedDisplay']// may set to ''
          }

          if (computedStyle.display === 'none') {
            Subject.style.display = DisplayDefaultFor(Subject.tagName)
          }
        }
      })
      return this
    }

  /**** hide ****/

    hide (this:DOMMaLi):DOMMaLi {
      this.Subjects.forEach((Subject:Element) => {
        if (Subject instanceof HTMLElement) {
          let computedStyle = getComputedStyle(Subject)
          if (computedStyle.display === 'none') { return }

          (Subject as Indexable)['_preservedDisplay'] = Subject.style.display // may be ''
          Subject.style.display = 'none'
        }
      })
      return this
    }

  /**** hasClass ****/

    hasClass (this:DOMMaLi, Classes:string):boolean {
      if (this.Subjects.length === 0) {
        return false
      }

      Classes = Classes.trim().replace(/\s+/g,' ')
      if (Classes === '') { return false }

      let ClassList = this.Subjects[0].classList
      return Classes.split(' ').every((Class:string) => ClassList.contains(Class))
    }

  /**** addClass ****/

    addClass (this:DOMMaLi, Classes:string):DOMMaLi {
      return this._processClasses(Classes,'add')
    }

  /**** toggleClass ****/

    toggleClass (this:DOMMaLi, Classes:string):DOMMaLi {
      return this._processClasses(Classes,'toggle')
    }

  /**** removeClass ****/

    removeClass (this:DOMMaLi, Classes:string):DOMMaLi {
      return this._processClasses(Classes,'remove')
    }

  /**** _processClasses ****/

    private _processClasses (
      this:DOMMaLi, Classes:string, Method:'add'|'toggle'|'remove'
    ):DOMMaLi {
      if (this.Subjects.length === 0) {
        return this
      }

      Classes = Classes.trim().replace(/\s+/g,' ')
      if (Classes === '') { return this }

      const ClassesToProcess = Classes.split(' ')

      this.Subjects.forEach((Subject:Element) => {
        let ClassList = Subject.classList
        ClassesToProcess.forEach((Class) => ClassList[Method](Class))
      })

      return this
    }

  /**** append ****/

    append (this:DOMMaLi, Content:string|String|DOMMaLi|Element|Element[]):DOMMaLi {
      return this._insert(Content,'append')
    }

  /**** prepend ****/

    prepend (this:DOMMaLi, Content:string|String|DOMMaLi|Element|Element[]):DOMMaLi {
      return this._insert(Content,'prepend')
    }

  /**** insertAfter ****/

    insertAfter (this:DOMMaLi, Content:DOMMaLi):DOMMaLi {
      Content._insert(this,'after')
      return this
    }

  /**** insertBefore ****/

    insertBefore (this:DOMMaLi, Content:DOMMaLi):DOMMaLi {
      Content._insert(this,'before')
      return this
    }

  /**** _insert ****/

    private _insert (
      this:DOMMaLi, Content:string|String|DOMMaLi|Element|Element[],
      Method:'append'|'prepend'|'after'|'before'
    ):DOMMaLi {
      if (this.Subjects.length === 0) {
        return this
      }

      let Contents:DOMMaLi = (
        Content instanceof DOMMaLi
        ? Content as DOMMaLi
        : new _DOMMaLi(Content)
      )
      if (Contents.Subjects.length === 0) { return this }

      if (ValueIsString(Content) && (Content as string).startsWith('<')) {
        this.Subjects.forEach((Subject:Element, Index:number) => {
          Subject[Method].apply(Subject,Contents.Subjects)
          if (Index < this.Subjects.length-1) {
            Contents = new _DOMMaLi(Content as string)
          }
        })
      } else {
        this.Subjects[0][Method].apply(this.Subjects[0],Contents.Subjects)
      }

      return this
    }

  /**** replaceWith ****/

    replaceWith (
      this:DOMMaLi, Replacement:string|String|DOMMaLi|Element|Element[]
    ):void {
      if (this.Subjects.length === 0) { return }

      let Replacements:DOMMaLi = (
        Replacement instanceof DOMMaLi
        ? Replacement as DOMMaLi
        : new _DOMMaLi(Replacement)
      )
      if (Replacements.Subjects.length === 0) { this.remove(); return }

      if (ValueIsString(Replacement) && (Replacement as string).startsWith('<')) {
        this.Subjects.forEach((Subject:Element, Index:number) => {
          Subject.replaceWith.apply(Subject,Replacements.Subjects)
          if (Index < this.Subjects.length-1) {
            Replacements = new _DOMMaLi(Replacement as string)
          }
        })
      } else {
        this.Subjects[0].replaceWith.apply(this.Subjects[0],Replacements.Subjects)
      }
    }

  /**** remove ****/

    remove (this:DOMMaLi):DOMMaLi {
      if (this.Subjects.length === 0) {
        return this
      }

      this.Subjects.forEach((Subject:Element) => {
        Subject.remove()
      })

      return this
    }

  /**** prop ****/

    prop (
      this:DOMMaLi, Property:string, newValue?:any
    ):DOMMaLi|any|undefined {
      if (newValue === undefined) {
        return (
          this.Subjects.length === 0
          ? undefined
          : (this.Subjects[0] as Indexable)[Property]
        )
      } else {
        this.Subjects.forEach((Subject:Indexable) => {
          Subject[Property] = newValue
        })
        return this
      }
    }

  /**** hasProp ****/

    hasProp (this:DOMMaLi, Property:string):boolean {
      return (
        this.Subjects.length === 0
        ? false
        : Property in this.Subjects[0]
      )
    }

  /**** removeProp ****/

    removeProp (this:DOMMaLi, Property:string):DOMMaLi {
      this.Subjects.forEach((Subject:Indexable) => {
        delete Subject[Property]
      })
      return this
    }

  /**** data - not restricted to strings ****/

    data (
      this:DOMMaLi, Key:string, newValue?:any
    ):DOMMaLi|any|undefined {
      if (newValue === undefined) {
        return (
          (this.Subjects.length === 0) || ((this.Subjects[0] as Indexable)['_data'] == null)
          ? undefined
          : (this.Subjects[0] as Indexable)['_data'][Key]
        )
      } else {
        this.Subjects.forEach((Subject:Indexable) => {
          if (Subject['_data'] == null) {
            Subject['_data'] = Object.create(null)
          }
          Subject['_data'][Key] = newValue
        })
        return this
      }
    }

  /**** hasData ****/

    hasData (this:DOMMaLi, Key:string):boolean {
      return (
        (this.Subjects.length > 0) &&
        ((this.Subjects[0] as Indexable)['_data'] != null) &&
        (Key in (this.Subjects[0] as Indexable)['_data'])
      )
    }

  /**** removeData ****/

    removeData (this:DOMMaLi, Key:string):DOMMaLi {
      this.Subjects.forEach((Subject:Indexable) => {
        if (Subject['_data'] != null) {
          delete Subject['_data'][Key]
        }
      })
      return this
    }

  /**** attr ****/

    attr (
      this:DOMMaLi, Attribute:string, newValue?:any
    ):DOMMaLi|string|undefined {
      if (newValue === undefined) {
        if (this.Subjects.length === 0) { return undefined }

        let Value = this.Subjects[0].getAttribute(Attribute)
        return (Value === null ? undefined : Value)
      } else {
        if (newValue === null) {
          return this.removeAttr(Attribute)
        }

        this.Subjects.forEach((Subject:Element) => {
          Subject.setAttribute(Attribute,newValue)
        })
        return this
      }
    }

  /**** hasAttr ****/

    hasAttr (this:DOMMaLi, Attribute:string):boolean {
      return (
        this.Subjects.length === 0
        ? false
        : this.Subjects[0].hasAttribute(Attribute)
      )
    }

  /**** removeAttr ****/

    removeAttr (this:DOMMaLi, Attribute:string):DOMMaLi {
      this.Subjects.forEach((Subject:Element) => {
        Subject.removeAttribute(Attribute)
      })
      return this
    }

  /**** val ****/

    val (
      this:DOMMaLi, newValue?:any|null
    ):DOMMaLi|string|undefined {
      if (newValue === undefined) {
        if (this.Subjects.length === 0) { return undefined }

// @ts-ignore assume presence of "value" property
        let Value = this.Subjects[0].value
        return (Value === null ? undefined : Value)
      } else {
        this.Subjects.forEach((Subject:Element) => {
// @ts-ignore assume presence of "value" property
          Subject.value = newValue
        })
        return this
      }
    }

  /**** css ****/

    css (
      this:DOMMaLi, PropertyOrListOrSet:string|string[]|PlainObject, newValue?:string
    ):DOMMaLi|string|PlainObject|undefined {
      if (newValue === undefined) {
        let computedStyles:any
        switch (true) {
          case (typeof PropertyOrListOrSet === 'string'):
            if (this.Subjects.length === 0) { return undefined }

            computedStyles = window.getComputedStyle(this.Subjects[0]) as Indexable
            return computedStyles[CamelCased(PropertyOrListOrSet as string)]
          case ValueIsArray(PropertyOrListOrSet):
            if (this.Subjects.length === 0) { return undefined }

            computedStyles = window.getComputedStyle(this.Subjects[0])
            let Result:PlainObject = {}
              ;(PropertyOrListOrSet as string[]).forEach((Property:string) => {
                Result[Property] = computedStyles[CamelCased(Property)]
              })
            return Result
          default:
            if (this.Subjects.length === 0) { return this }

            for (let Property in PropertyOrListOrSet as PlainObject) {
              if (PropertyOrListOrSet.hasOwnProperty(Property)) {
                newValue = (PropertyOrListOrSet as PlainObject)[Property] as string
                Property = CamelCased(Property)

                this.Subjects.forEach((Subject:Element) => {
                  if (Subject instanceof HTMLElement) {
                    (Subject.style as Indexable)[Property] = newValue
                  }
                })
              }
            }
            return this
        }
      } else {
        if (typeof PropertyOrListOrSet === 'string') {
          let Property = CamelCased(PropertyOrListOrSet as string)
            this.Subjects.forEach((Subject:Element) => {
              if (Subject instanceof HTMLElement) {
                (Subject.style as Indexable)[Property] = newValue
              }
            })
          return this
        } else {
          throw new TypeError('single attribute name expected')
        }
      }
    }

  /**** html ****/

    html (this:DOMMaLi, newValue?:string):DOMMaLi|string|undefined {
      if (newValue === undefined) {
        return (
          this.Subjects.length === 0
          ? undefined
          : this.Subjects[0].innerHTML
        )
      } else {
        if (newValue === null) { newValue = '' }

        this.Subjects.forEach((Subject:Element) => {
          Subject.innerHTML = newValue as string
        })
        return this
      }
    }

  /**** text ****/

    text (this:DOMMaLi, newValue?:string):DOMMaLi|string|undefined {
      if (newValue === undefined) {
        return (
          (this.Subjects.length === 0) || ! (this.Subjects[0] instanceof HTMLElement)
          ? undefined
          : this.Subjects[0].innerText
        )
      } else {
        if (newValue === null) { newValue = '' }

        this.Subjects.forEach((Subject:Element) => {
          if (Subject instanceof HTMLElement) {
            Subject.innerText = newValue as string
          }
        })
        return this
      }
    }

  /**** appendText ****/

    appendText (this:DOMMaLi, Value:string):DOMMaLi {
      this.Subjects.forEach((Subject:Element) => {
        Subject.insertAdjacentText('beforeend',Value)
      })
      return this
    }

  /**** prependText ****/

    prependText (this:DOMMaLi, Value:string):DOMMaLi {
      this.Subjects.forEach((Subject:Element) => {
        Subject.insertAdjacentText('afterbegin',Value)
      })
      return this
    }

  /**** on ****/

    on (
      this:DOMMaLi, Events:string, SelectorOrHandler:string|String|null|Function,
      DataOrHandler?:any, Handler?:Function
    ):DOMMaLi {
      if (this.Subjects.length === 0) { return this }

      return this._registerEventHandler(
        Events,SelectorOrHandler,DataOrHandler,Handler
      )
    }

  /**** once ****/

    once (
      this:DOMMaLi, Events:string, SelectorOrHandler:string|String|null|Function,
      DataOrHandler?:any, Handler?:Function
    ):DOMMaLi {
      if (this.Subjects.length === 0) { return this }

      return this._registerEventHandler(
        Events,SelectorOrHandler,DataOrHandler,Handler, 'once'
      )
    }

  /**** _registerEventHandler ****/

    private _registerEventHandler (
      this:DOMMaLi, Events:string, SelectorOrHandler?:string|String|null|Function,
      DataOrHandler?:any, Handler?:Function, once?:'once'
    ):DOMMaLi {
      let ArgList = asArray(arguments).slice(1)

      Events = Events.trim().replace(/\s+/g,' ')
      if (Events === '') { return this }

      let Selector:string = (
        ValueIsString(ArgList[0])
        ? (ArgList.shift() as string).trim()
        : (ArgList[0] == null ? ArgList.shift() || '' : '')
      )                                                 // '' means: no selector

      let Data:any = (
        typeof ArgList[1] === 'function'
        ? ArgList.shift()
        : undefined
      )

      Handler = ArgList.shift() as Function

      return this.__registerEventHandler(
        Events,Selector,Data,Handler, once
      )
    }

  /**** __registerEventHandler - on DOM element rather than DOMMaLi object ****/

    private __registerEventHandler (
      this:DOMMaLi, Events:string, Selector:string|String, Data:any,
      Handler:Function, once?:'once'
    ):DOMMaLi {
      function actualHandler (Event:indexableEvent) {
        switch (Selector) {
          case '':
            break
          case '@this':
            if (Event.target !== Event.currentTarget) { return }
            break
          default:
            if (! (Event.target as Element).matches(Selector as string)) { return }
        }

        if (Data != null) { Event.data = Data }

        if (once) {
          (new _DOMMaLi(Event.currentTarget as Element))._unregisterAllEventHandlersMatching(
            Event.type,Selector,Handler
          )
        }

        let ArgList = [Event].concat(Event['_extraParameters'])
        if (Handler.apply(new _DOMMaLi(Event.currentTarget as Element),ArgList) === false) {
          Event.stopPropagation()
          Event.preventDefault()
        }
      }
      (actualHandler as indexableFunction)['isFor'] = Handler

      let EventList:string[]
      if (ValueIsEventNameWithSelector(Events)) {
        let AtIndex = Events.indexOf('@')
        EventList = [Events.slice(0,AtIndex)]
        Selector  = Events.slice(AtIndex+1)
          if (Selector === 'this') { Selector = '@this' }        // special case
      } else {
        EventList = Events.split(' ')
      }

      EventList.forEach((Event:string) => {
        this.Subjects.forEach((Subject:indexableElement) => {
          let EventRegistry:Indexable = Subject['_EventRegistry']
          if (EventRegistry == null) {
            EventRegistry = Subject['_EventRegistry'] = Object.create(null)
          }

          let EntriesForEvent:Indexable = EventRegistry[Event]
          if (EntriesForEvent == null) {
            EntriesForEvent = EventRegistry[Event] = Object.create(null)
          }

          let EntriesForSelector:Function[] = EntriesForEvent[Selector as string]
          if (EntriesForSelector == null) {
            EntriesForSelector = EntriesForEvent[Selector as string] = []
          }

          EntriesForSelector.push(actualHandler)
          Subject.addEventListener(Event,actualHandler)
        })
      })

      return this
    }

  /**** off ****/

    off (
      this:DOMMaLi, Events?:string, SelectorOrHandler?:string|String|null|Function,
      Handler?:Function
    ):DOMMaLi {
      if (this.Subjects.length === 0) { return this }

      let ArgList = asArray(arguments).slice(1)

      Events = (Events || '').trim().replace(/\s+/g,' ')
      if (Events === '') {
        this._unregisterAllEventHandlersMatching()
        return this
      }

      let Selector:string = (
        ValueIsString(ArgList[0])
        ? (ArgList.shift() as string).trim()
        : (ArgList[0] === null ? ArgList.shift() || '' : undefined)
      )            // "null" means: no selector, "undefined" means: any selector

      Handler = ArgList.shift()
      if (Handler == null) {
        this._unregisterAllEventHandlersMatching(Events,Selector)
        return this
      }

      this._unregisterAllEventHandlersMatching(Events,Selector,Handler)

      return this
    }

  /**** _unregisterAllEventHandlersMatching ****/

    private _unregisterAllEventHandlersMatching (
      this:DOMMaLi, Events?:string, Selector?:string|String|null, Handler?:Function
    ):DOMMaLi {
      let EventList:string[]
      if (ValueIsEventNameWithSelector(Events)) {
        let AtIndex = (Events as string).indexOf('@')
        EventList = [(Events as string).slice(0,AtIndex)]
        Selector  = (Events as string).slice(AtIndex+1)
      } else {
        EventList = (Events == null ? [] : Events.split(' '))
      }

      this.Subjects.forEach((Subject:indexableElement) => {
        let EventRegistry:Indexable = Subject['_EventRegistry']
        if (EventRegistry == null) { return }

        if (EventList.length === 0) {           // unregister any event handlers
          for (let Event in EventRegistry) {
            this._unregisterHandlersForEventMatching(
              Subject,EventRegistry, Event,Selector,Handler
            )
          }
        } else {                // unregister handlers for the given events only
          EventList.forEach((Event:string) => {
            this._unregisterHandlersForEventMatching(
              Subject,EventRegistry, Event,Selector,Handler
            )
          })
        }

        if (ValueIsEmptyObject(EventRegistry)) {
          delete Subject['_EventRegistry']
        }
      })
      return this
    }

  /**** _unregisterHandlersForEventMatching ****/

    private _unregisterHandlersForEventMatching (
      Subject:Element, EventRegistry:any,
      Event:string, Selector?:string|String|null, Handler?:Function
    ):void {
      let EntriesForEvent:Indexable = EventRegistry[Event]
      if (EntriesForEvent != null) {
        if (Selector == null) {
          for (let Selector in EntriesForEvent) {
            this._unregisterHandlersForEventSelectorsMatching(
              Subject,EntriesForEvent, Event,Selector,Handler
            )
          }
        } else {
          this._unregisterHandlersForEventSelectorsMatching(
            Subject,EntriesForEvent, Event,Selector,Handler
          )
        }

        if (ValueIsEmptyObject(EntriesForEvent)) {
          delete EventRegistry[Event]
        }
      }
    }

  /**** _unregisterHandlersForEventSelectorsMatching ****/

    private _unregisterHandlersForEventSelectorsMatching (
      Subject:Element, EntriesForEvent:any,
      Event:string, Selector:string|String, Handler?:Function
    ):void {
      let EntriesForSelector:Function[] = EntriesForEvent[Selector as string]
      if (EntriesForSelector != null) {
        if (Handler == null) {
          EntriesForSelector.forEach((actualHandler:Function) => {
// @ts-ignore TypeScript does not allow JS functions here, but that's wrong
            Subject.removeEventListener(Event,actualHandler)
          })
          EntriesForSelector.length = 0
        } else {
          EntriesForSelector.every((actualHandler:indexableFunction, Index:number) => {
            if (actualHandler['isFor'] === Handler) {
// @ts-ignore TypeScript does not allow JS functions here, but that's wrong
              Subject.removeEventListener(Event,actualHandler)
              EntriesForSelector.splice(Index,1)
              return false
            }
            return true
          })
        }

        if (EntriesForSelector.length === 0) {
          delete EntriesForEvent[Selector as string]
        }
      }
    }

  /**** waitFor ****/

    async waitFor (
      this:DOMMaLi, ...EventsOrTimeout:(string|number)[]
    ):Promise<any> {
      let EventList:string[] = []
      let Timeout:number     = -1

      if (EventsOrTimeout.length === 0) {
        return 0
      }

      EventsOrTimeout.forEach((EventOrTimeout:string|number) => {
        switch (true) {
          case ValueIsString(EventOrTimeout):
            EventList.push(EventOrTimeout as string)
            break
          case ValueIsNumber(EventOrTimeout):
            Timeout = Math.max(0,Math.round(EventOrTimeout as number))
            break
          default: throw new TypeError(
            'event name (with opt. selector) or timeout expected'
          )
        }
      })

      if (! isFinite(Timeout)) { Timeout = 0 }

      return new Promise((resolve,reject) => {
        let Target = this

        let Timer:any
        let StartTime:number

        function cleanupFrom (Event:any) {
          EventList.forEach((EventSpec) => Target.off(EventSpec,cleanupFrom))
          if (Event == null) {                               // timeout occurred
            resolve(Date.now()-StartTime)
          } else {                              // event occurred before timeout
            clearTimeout(Timer)
            resolve(Event)
          }
        }

        EventList.forEach((EventSpec) => Target.on(EventSpec,cleanupFrom))

        if (Timeout >= 0) {
          StartTime = Date.now()
          Timer = setTimeout(cleanupFrom,Timeout)
        }
      })
    }

  /**** repeatUntil ****/

    async repeatUntil (
      this:DOMMaLi, ...EventsOrTimeoutOrLoopBody:(string|number|Function)[]
    ):Promise<any> {
      let EventList:string[] = []
      let Timeout:number     = -1
      let LoopBody:Function

      EventsOrTimeoutOrLoopBody.forEach((Argument:string|number|Function) => {
        switch (true) {
          case ValueIsString(Argument):
            EventList.push(Argument as string)
            break
          case ValueIsNumber(Argument):
            Timeout = Math.max(0,Math.round(Argument as number))
            break
          case ValueIsFunction(Argument):
            LoopBody = Argument as Function
            break
          default: throw new TypeError(
            'event name (with opt. selector) or timeout or loop body expected'
          )
        }
      })

// @ts-ignore: TypeScript bug? the thrown compiler error is rubbish
      if (LoopBody == null) {
        throw new TypeError('no loop body function given')
      }

      if (! isFinite(Timeout)) { Timeout = 0 }

      return new Promise(async (resolve,reject) => {
        let Target     = this
        let Result:any = undefined

        let Timer:any
        let StartTime:number

        function processEventOrTimeout (Event:any) {
          EventList.forEach((EventSpec) => Target.off(EventSpec,processEventOrTimeout))
          if (Event === undefined) {                         // timeout occurred
            Result = Date.now()-StartTime
          } else {                              // event occurred before timeout
            clearTimeout(Timer)
            Result = Event
          }
        }

        EventList.forEach((EventSpec) => Target.on(EventSpec,processEventOrTimeout))

        if (Timeout >= 0) {
          StartTime = Date.now()
          Timer = setTimeout(processEventOrTimeout,Timeout)
        }

        try {
          do {
            let LoopResult = await LoopBody()
            if (LoopResult !== undefined) { Result = LoopResult }     // "break"
          } while (Result === undefined)

          resolve(Result)
        } catch (Signal) {
          processEventOrTimeout(null)
          reject(Signal)
        }
      })
    }

  /**** HandlersForEvent ****/

    HandlersForEvent (this:DOMMaLi, Event:string):Function[] {
      let Result:Function[] = []
        Event = Event.trim().replace(/\s+/g,' ')
        if (Event === '')     { throw new TypeError('no "Event" given') }
        if (/\s/.test(Event)) { throw new TypeError('multiple "Events" given') }

        let Subject = this.Subjects[0]
        if (Subject == null) { return Result }

        let EventRegistry:Indexable = (Subject as indexableElement)['_EventRegistry']
        if (EventRegistry == null) { return Result }

        let EntriesForEvent:Indexable = EventRegistry[Event]
        if (EntriesForEvent == null) { return Result }

        for (let Selector in EntriesForEvent) {
          Result = Result.concat(EntriesForEvent[Selector as string])
        }
      return Result
    }

  /**** trigger ****/

    trigger (
      this:DOMMaLi, Event:string|Event, extraParameters?:any, bubbles = true
    ):boolean {
      if (this.Subjects.length === 0) { return true }

      if (ValueIsString(Event)) {
        Event = new CustomEvent(Event as string, { bubbles, cancelable:true })
      }

      if (extraParameters != null) {
        (Event as indexableEvent)['_extraParameters'] = (
          ValueIsArray(extraParameters)
          ? extraParameters.slice()
          : [extraParameters]
        )
      }

      return this.Subjects.reduce(
        (Result:boolean,Subject:Element) => {
          return Subject.dispatchEvent(Event as Event) && Result
        }, true
      )
    }

  /**** focus ****/

    focus (this:DOMMaLi):DOMMaLi {
      if ((this.Subjects.length > 0) && (this.Subjects[0] instanceof HTMLElement)) {
        this.Subjects[0].focus()
      }
      return this
    }

  /**** blur ****/

    blur (this:DOMMaLi):DOMMaLi {
      if ((this.Subjects.length > 0) && (this.Subjects[0] instanceof HTMLElement)) {
        this.Subjects[0].blur()
      }
      return this
    }

  /**** hasFocus ****/

    hasFocus (this:DOMMaLi):boolean {
      return (document.activeElement === this.Subjects[0])
    }

  /**** focusedElement ****/

    focusedElement (this:DOMMaLi):DOMMaLi{
      return new _DOMMaLi(document.activeElement)
    }

  /**** transition ****/

    transition (
      this:DOMMaLi, Settings:PlainObject, Options?:PlainObject
    ):DOMMaLi {
      if (this.Subjects.length === 0)   { return this }
      if (ValueIsEmptyObject(Settings)) { return this }

      Options = Object.assign({}, {
        delay:'0ms', duration:'400ms', easing:'linear',
        cleanup:true
      }, Options)

      let TransitProps = ''
      for (let Key in Settings) {
        if (Settings.hasOwnProperty(Key)) {
          TransitProps += (TransitProps === '' ? '' : ',') + Key
        }
      }

      let TransitDuration = (
        ValueIsString(Options.duration) ? Options.duration : (Options.duration + 'ms')
      )

      let TransitDelay = (
        ValueIsString(Options.delay) ? Options.delay : (Options.delay + 'ms')
      )

      if (Options.cleanup == true) {
        this.Subjects.forEach((Subject) => {
          if (Subject instanceof HTMLElement) {
            let previousTransition = window.getComputedStyle(Subject).transition

            Subject.addEventListener('transitionend', (Event) => {
              Subject.style.transition = previousTransition
            }, { once:true })
          }
        })
      }

      this.Subjects.forEach((Subject) => {
        if (Subject instanceof HTMLElement) {
          Subject.style.transitionProperty       = TransitProps    as string
          Subject.style.transitionDelay          = TransitDelay    as string
          Subject.style.transitionDuration       = TransitDuration as string
// @ts-ignore no, "Options" is never undefined
          Subject.style.transitionTimingFunction = Options.easing  as string

          for (let Key in Settings) {
            if (Settings.hasOwnProperty(Key)) {
              let newValue = (Settings as PlainObject)[Key] as string
              let Property = CamelCased(Key)

              ;(Subject.style as Indexable)[Property] = newValue
            }
          }
        }
      })

      return this
    }
  }

/**** apply any synonyms ****/

  Object.assign(DOMMaLi.prototype, {
    renderPositionInViewport: DOMMaLi.prototype.positionInViewport,
    layoutPositionInParent:   DOMMaLi.prototype.positionInParent,
    layoutPositionOnPage:     DOMMaLi.prototype.positionOnPage,

    layoutWidth:  DOMMaLi.prototype.width,
    layoutHeight: DOMMaLi.prototype.height,

    outerWidth:  DOMMaLi.prototype.width,
    outerHeight: DOMMaLi.prototype.height,
  })

/**** startup function handling ****/

  let DOMisReady = (document.readyState !== 'loading')
  if (! DOMisReady) {
    window.addEventListener('DOMContentLoaded', () => {
      DOMisReady = true
      invokeAllReadyFunctionsToCall()
    })
  }

/**** invokeAllReadyFunctionsToCall ****/
// ReadyFunctionsToCall may be extended while invokeAllReadyFunctionsToCall is running!

  const ReadyFunctionsToCall:Function[] = []
  let ReadyFunctionsAreRunning:boolean  = false

  function invokeAllReadyFunctionsToCall ():void {
    ReadyFunctionsAreRunning = true
      for (let i = 0; i < ReadyFunctionsToCall.length; i++) {
        try {
          ReadyFunctionsToCall[i]()
        } catch (signal) {
          console.error('registered dommali "ready" handler failed with ',signal)
        }
      }
    ReadyFunctionsAreRunning = false
  }

  class _DOMMaLi extends DOMMaLi {
    constructor (Value?:string|String|DOMMaLi|Element|Element[]|null|undefined) {
      super()

      switch (true) {
        case (Value == null):
          this.Subjects = []
          break
        case ValueIsArray(Value):
          this.Subjects = Value as Element[]      // important: array REFERENCE!
          break
        case ValueIsString(Value):
          if ((Value as string).startsWith('<')) {
            const Template = document.createElement('template')
              Template.innerHTML = Value as string
            this.Subjects = asArray(Template.content.children)
          } else {
            this.Subjects = asArray(document.querySelectorAll(unhashed(Value as string)))
          }
          break
        case (Value instanceof _DOMMaLi):
          this.Subjects = (Value as _DOMMaLi).Subjects.slice()
          break
        case (Value instanceof Element):
          this.Subjects = [Value as Element]
          break
        default:
          throw new TypeError('unsupported "dommali" constructor argument')
      }
    }
  }

  export default function dommali (
    Value:Function|string|String|DOMMaLi|Element|Element[]
  ):DOMMaLi|typeof DOMMaLi {
    switch (true) {
      case (typeof Value === 'function'):
        return DOMMaLi.ready(Value as Function)
      case ValueIsArray(Value):
        return new _DOMMaLi(asArray(Value as Element[]))
      default:
        return new _DOMMaLi(Value as any)
    }
  }

  Object.assign(dommali, {
    ready:DOMMaLi.ready,
    textWidth:DOMMaLi.textWidth, textHeight:DOMMaLi.textHeight,
    extraParametersOfEvent:DOMMaLi.extraParametersOfEvent
  })

/**** always also provide DOMMaLi as a global ****/

  let global = (new Function('return this'))()
  global.dommali = dommali
