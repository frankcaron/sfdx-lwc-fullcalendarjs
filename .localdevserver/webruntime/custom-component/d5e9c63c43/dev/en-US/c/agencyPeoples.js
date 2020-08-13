Webruntime.define('lwc/agencyPeoples', ['lwc', 'lightning/configProvider'], function (lwc, configProvider) { 'use strict';

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        fid: api_scoped_frag_id,
        h: api_element
      } = $api;
      return [api_element("svg", {
        className: $cmp.computedClass,
        attrs: {
          "focusable": "false",
          "data-key": $cmp.name,
          "aria-hidden": "true"
        },
        key: 1
      }, [api_element("use", {
        attrs: {
          "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
        },
        key: 0
      }, [])])];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    tmpl.stylesheetTokens = {
      hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
      shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
    };

    var dir = 'ltr';

    const proto = {
      add(className) {
        if (typeof className === 'string') {
          this[className] = true;
        } else {
          Object.assign(this, className);
        }

        return this;
      },

      invert() {
        Object.keys(this).forEach(key => {
          this[key] = !this[key];
        });
        return this;
      },

      toString() {
        return Object.keys(this).filter(key => this[key]).join(' ');
      }

    };
    function classSet(config) {
      if (typeof config === 'string') {
        const key = config;
        config = {};
        config[key] = true;
      }

      return Object.assign(Object.create(proto), config);
    }

    /**
     * Takes label strings with placeholder params (`{0}`) and updates the label with given `args`
     * @param {string} str - any label string requiring injections of other strings/params (e.g., 'foo {0}')
     * @param  {string|array} arguments - string(s) to be injected into the `string` param
     * @returns {string} fully replaced string, e.g., '{0} is a {1}' -> 'Hal Jordan is a Green Lantern'
     */
    function formatLabel(str) {
      const args = Array.prototype.slice.call(arguments, 1);
      let replacements = args;

      if (Array.isArray(args[0])) {
        [replacements] = args;
      }

      return str.replace(/{(\d+)}/g, (match, i) => {
        return replacements[i];
      });
    }

    function assert(condition, message) {
      {
        if (!condition) {
          throw new Error(message);
        }
      }
    }

    /**
    An emitter implementation based on the Node.js EventEmitter API:
    https://nodejs.org/dist/latest-v6.x/docs/api/events.html#events_class_eventemitter
    **/
    class EventEmitter {
      constructor() {
        this.registry = {};
      }
      /**
      Registers a listener on the emitter
      @method EventEmitter#on
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/


      on(name, listener) {
        this.registry[name] = this.registry[name] || [];
        this.registry[name].push(listener);
        return this;
      }
      /**
      Registers a listener on the emitter that only executes once
      @method EventEmitter#once
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/


      once(name, listener) {
        const doOnce = function () {
          listener.apply(null, arguments);
          this.removeListener(name, doOnce);
        }.bind(this);

        this.on(name, doOnce);
        return this;
      }
      /**
      Synchronously calls each listener registered with the specified event
      @method EventEmitter#emit
      @param {String} name - The name of the event
      @return {Boolean} - Returns `true` if the event had listeners, `false` otherwise
      **/


      emit(name) {
        const args = Array.prototype.slice.call(arguments, 1);
        const listeners = this.registry[name];
        let count = 0;

        if (listeners) {
          listeners.forEach(listener => {
            count += 1;
            listener.apply(null, args);
          });
        }

        return count > 0;
      }
      /**
      Removes the specified `listener` from the listener array for the event named `name`
      @method EventEmitter#removeListener
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/


      removeListener(name, listener) {
        const listeners = this.registry[name];

        if (listeners) {
          for (let i = 0, len = listeners.length; i < len; i += 1) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              return this;
            }
          }
        }

        return this;
      }

    }

    var salesforceLocale = 'en-US';

    /**
     * Utility function to generate an unique guid.
     * used on state objects to provide a performance aid when iterating
     * through the items and marking them for render
     * @returns {String} an unique string ID
     */
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function classListMutation(classList, config) {
      Object.keys(config).forEach(key => {
        if (typeof key === 'string' && key.length) {
          if (config[key]) {
            classList.add(key);
          } else {
            classList.remove(key);
          }
        }
      });
    }

    /**
    A string normalization utility for attributes.
    @param {String} value - The value to normalize.
    @param {Object} config - The optional configuration object.
    @param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
    @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
    @return {String} - The normalized value.
    **/
    function normalizeString(value, config = {}) {
      const {
        fallbackValue = '',
        validValues,
        toLowerCase = true
      } = config;
      let normalized = typeof value === 'string' && value.trim() || '';
      normalized = toLowerCase ? normalized.toLowerCase() : normalized;

      if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
      }

      return normalized;
    }
    /**
    A boolean normalization utility for attributes.
    @param {Any} value - The value to normalize.
    @return {Boolean} - The normalized value.
    **/

    function normalizeBoolean(value) {
      return typeof value === 'string' || !!value;
    }
    /**
    A aria attribute normalization utility.
    @param {Any} value - A single aria value or an array of aria values
    @return {String} - A space separated list of aria values
    **/

    function normalizeAriaAttribute(value) {
      let arias = Array.isArray(value) ? value : [value];
      arias = arias.map(ariaValue => {
        if (typeof ariaValue === 'string') {
          return ariaValue.replace(/\s+/g, ' ').trim();
        }

        return '';
      }).filter(ariaValue => !!ariaValue);
      return arias.length > 0 ? arias.join(' ') : null;
    }

    const keyCodes = {
      tab: 9,
      backspace: 8,
      enter: 13,
      escape: 27,
      space: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46,
      shift: 16
    }; // Acceptable values are defined here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    // remove this function when IE11 support is dropped

    function normalizeKeyValue(value) {
      switch (value) {
        case 'Spacebar':
          return ' ';

        case 'Esc':
          return 'Escape';

        case 'Del':
          return 'Delete';

        case 'Left':
          return 'ArrowLeft';

        case 'Right':
          return 'ArrowRight';

        case 'Down':
          return 'ArrowDown';

        case 'Up':
          return 'ArrowUp';

        default:
          return value;
      }
    }
    const buffer = {};
    /**
     * Runs an action and passes the string of buffered keys typed within a short time period.
     * Use for type-ahead like functionality in menus, lists, comboboxes, and similar components.
     *
     * @param {CustomEvent} event A keyboard event
     * @param {Function} action function to run, it's passed the buffered text
     */

    function runActionOnBufferedTypedCharacters(event, action) {
      const letter = event.key;

      if (letter.length > 1) {
        // Not an individual character/letter, but rather a special code (like Shift, Backspace, etc.)
        return;
      } // If we were going to clear what keys were typed, don't yet.


      if (buffer._clearBufferId) {
        clearTimeout(buffer._clearBufferId);
      }

      buffer._keyBuffer = buffer._keyBuffer || [];

      buffer._keyBuffer.push(letter);

      const matchText = buffer._keyBuffer.join('').toLowerCase();

      action(matchText); // eslint-disable-next-line @lwc/lwc/no-async-operation

      buffer._clearBufferId = setTimeout(() => {
        buffer._keyBuffer = [];
      }, 700);
    }

    const isIE11 = isIE11Test(navigator);
    const isChrome = isChromeTest(navigator);
    const isSafari = isSafariTest(navigator); // The following functions are for tests only

    function isIE11Test(navigator) {
      // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
      return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    }
    function isChromeTest(navigator) {
      // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }
    function isSafariTest(navigator) {
      // via https://stackoverflow.com/questions/49872111/detect-safari-and-stop-script
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    /**
     * Set an attribute on an element, if it's a normal element
     * it will use setAttribute, if it's an LWC component
     * it will use the public property
     *
     * @param {HTMLElement} element The element to act on
     * @param {String} attribute the attribute to set
     * @param {Any} value the value to set
     */
    function smartSetAttribute(element, attribute, value) {
      if (element.tagName.match(/^LIGHTNING/i)) {
        attribute = attribute.replace(/-\w/g, m => m[1].toUpperCase());
        element[attribute] = value ? value : null;
      } else if (value) {
        element.setAttribute(attribute, value);
      } else {
        element.removeAttribute(attribute);
      }
    }

    const CONTENT_SEPARATOR = '\n';
    /**
    <template>
        <span lwc:dom="manual" class="visually-hidden"></span>
        <input>
    </template>

    class Foo extends LightningElement {
        constructor() {
            super();
            this.ariaObserver = new ContentMutation(this);
        }

        @track ariaLabeledbyValue = '';

        @api
        get ariaLabeledby() {
            return this.ariaLabeledbyValue; // whatever they set, is what they get back.
        }
        set ariaLabeledby(refs) {
            this.ariaLabeledbyValue = refs;
            this.ariaObserver.link('input', 'aria-labeledby', refs, 'span.visually-hidden');
        }

        renderedCallback() {
            this.ariaObserver.sync();
        }
    }
    **/

    function getAttr(elm, attr) {
      if (elm.tagName.match(/lightning/i)) {
        return elm[attr];
      }

      return elm.getAttribute(attr);
    }

    function extractElements(root, selector) {
      if (typeof selector !== 'string' || selector === '') {
        return [];
      }

      return [].slice.call(root.querySelectorAll(selector));
    }

    function extractContent(elements) {
      return elements.map(element => element.textContent).filter(text => text.length).join(CONTENT_SEPARATOR);
    }

    function splitIds(ids) {
      return (ids + '').trim().split(/\s+/);
    }

    function hashIds(ids) {
      return (ids + '').trim().split(/\s+/).reduce((r, v) => {
        r[v] = 1;
        return r;
      }, {});
    } // this method should check each individual id from computedIds
    // against the existing value of the attrName on elm, and dupe
    // them, and add the new ones.


    function addAriaRefWhenNeeded(elm, attrName, computedIds) {
      const newIds = splitIds(computedIds);
      const oldIds = getAttr(elm, attrName) || '';
      const oldIdsHash = hashIds(oldIds);
      const suffix = [];

      for (let i = 0; i < newIds.length; i += 1) {
        if (!oldIdsHash[newIds[i]]) {
          suffix.push(newIds[i]);
        }
      }

      if (suffix.length !== 0) {
        smartSetAttribute(elm, attrName, oldIds + (oldIds.length === 0 ? '' : ' ') + suffix.join(' '));
      }
    } // this method should check each individual id from computedIds
    // against the existing value of the attrName on elm, and remove
    // them when possible in preparation for some new values.


    function removeAriaRefWhenPossible(elm, attrName, computedIds) {
      const newIds = splitIds(computedIds);
      const oldIds = getAttr(elm, attrName) || '';
      const oldIdsHash = hashIds(oldIds);
      const newValues = [];

      for (let i = 0; i < newIds.length; i += 1) {
        if (!oldIdsHash[newIds[i]]) {
          newValues.push(newIds[i]);
        }
      }

      smartSetAttribute(elm, attrName, newValues.join(' '));
    }

    class ContentMutation {
      constructor(component) {
        this.template = component.template;
        this.isNative = this.template.constructor.toString().match(/\[native code\]/);
        this.state = {};
        this.liveIds = {};
        this.guid = guid();
      }

      connectLiveIdRef(refs, callback) {
        const selector = (refs + '').trim().split(/\s+/).map(ref => `[id*="${ref}"]`).join(',');
        const liveId = {
          selector,
          callback
        };
        this.liveIds[refs] = liveId;
      }

      link(innerSelector, attrName, ids, placeholderContainerSelector) {
        let attrState = this.state[attrName];

        if (attrState) {
          // note: we don't support linking to a different innerSelector,
          // attrName, or placeholderContainerSelector
          if (!this.isNative) {
            const elm = this.template.querySelector(innerSelector);

            if (elm) {
              // removing the old ids if possible before setting the new ones
              removeAriaRefWhenPossible(elm, attrName, attrState.ids);
            }

            attrState.ids = ids;
          }
        } else {
          attrState = this.state[attrName] = {
            ids,
            innerSelector,
            placeholderContainerSelector
          };
        }

        if (this.isNative) {
          attrState.outerSelector = (ids + '').trim().split(/\s+/).map(ref => `#${ref}`).join(',');
          attrState.placeholder = document.createElement('span');
          attrState.placeholder.id = `auto-link-${attrName}-${this.guid}`;
        }

        if (this.template.host.parentNode) {
          this.privateUpdate(attrName);
        }
      }

      sync() {
        if (!this.template.host.parentNode) {
          throw new Error(`Invalid sync invocation. It can only be invoked during renderedCallback().`);
        }

        if (this.isNative && !this.mo) {
          this.privateConnect();
        }

        for (const attrName in this.state) {
          if (Object.prototype.hasOwnProperty.call(this.state, attrName)) {
            this.privateUpdate(attrName);
          }
        } // live idRef feature is a no-op in native


        if (!this.isNative) {
          this.privateUpdateLiveIds();
        }
      }

      privateExtractIds(elements) {
        return elements.map(el => {
          return el.getAttribute('id');
        }).join(' ');
      }

      privateUpdateLiveIds() {
        const root = this.template.host.getRootNode(); // if not connected do nothing

        if (!root) {
          return;
        }

        for (const liveId in this.liveIds) {
          if (Object.prototype.hasOwnProperty.call(this.liveIds, liveId)) {
            const thisId = this.liveIds[liveId];

            if (!thisId.elements) {
              // element refs are cached
              thisId.elements = Array.prototype.slice.call(root.querySelectorAll(thisId.selector));
            }

            const newIds = this.privateExtractIds(thisId.elements); // only fire calback if the value changed

            if (newIds !== thisId.ids) {
              thisId.callback(newIds);
              thisId.ids = newIds;
            }
          }
        }
      }

      privateUpdate(attrName) {
        const {
          innerSelector
        } = this.state[attrName];
        const elm = this.template.querySelector(innerSelector);

        if (!elm) {
          return; // nothing to update
        }

        let computedIds;

        if (this.isNative) {
          const {
            outerSelector,
            content,
            placeholder,
            placeholderContainerSelector
          } = this.state[attrName];
          const newContent = extractContent(extractElements(this.root, outerSelector));

          if (content !== newContent) {
            this.state[attrName].content = placeholder.textContent = newContent;
          }

          if (!placeholder.parentNode) {
            // inserting the placeholder once
            const container = this.template.querySelector(placeholderContainerSelector);

            if (container) {
              container.appendChild(placeholder);
            }
          }

          computedIds = placeholder.id;
        } else {
          computedIds = this.state[attrName].ids;
        }

        addAriaRefWhenNeeded(elm, attrName, computedIds);
      }

      privateConnect() {
        // caching root ref
        this.root = this.template.host.getRootNode(); // creating the observer once

        const mo = new MutationObserver(() => {
          if (!this.template.host.parentNode) {
            return; // do nothing when the template is not connected
          }

          this.sync();
        });
        mo.observe(this.root, {
          characterData: true,
          childList: true,
          subtree: true
        });
      }

    }

    /**
     * @param {HTMLElement} element Element to act on
     * @param {Object} values values and attributes to set, if the value is
     *                        falsy it the attribute will be removed
     */

    function synchronizeAttrs(element, values) {
      if (!element) {
        return;
      }

      const attributes = Object.keys(values);
      attributes.forEach(attribute => {
        smartSetAttribute(element, attribute, values[attribute]);
      });
    }
    /**
     * Get the actual DOM id for an element
     * @param {HTMLElement|String} el The element to get the id for (string will just be returned)
     *
     * @returns {String} The DOM id or null
     */

    function getRealDOMId(el) {
      if (el && typeof el === 'string') {
        return el;
      } else if (el) {
        return el.getAttribute('id');
      }

      return null;
    }
    function isUndefinedOrNull(value) {
      return value === null || value === undefined;
    }
    function isNotUndefinedOrNull(value) {
      return !isUndefinedOrNull(value);
    }
    const DEFAULT_ZINDEX_BASELINE = 9000;
    /**
     * Returns the zIndex baseline from slds zIndex variable --lwc-zIndexModal.
     * @returns {Number} zIndex baseline
     */

    function getZIndexBaseline() {
      const value = (window.getComputedStyle(document.documentElement) || document.documentElement.style).getPropertyValue('--lwc-zIndexModal');
      const base = parseInt(value, 10);
      return isNaN(base) ? DEFAULT_ZINDEX_BASELINE : base;
    }
    /**
     *
     * Decorates an input element to fire an "input"
     * event when the value is directly set.
     *
     * @param {HTMLElement} element The element to decorate.
     *
     */

    function decorateInputForDragon(element) {
      const valuePropertyDescriptor = getInputValuePropertyDescriptor(element);
      Object.defineProperty(element, 'value', {
        set(value) {
          valuePropertyDescriptor.set.call(this, value);
          this.dispatchEvent(new CustomEvent('input'));
        },

        get: valuePropertyDescriptor.get,
        enumerable: true,
        configurable: true
      });
    }

    function getInputValuePropertyDescriptor(element) {
      return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value');
    }

    function setDecoratedDragonInputValueWithoutEvent(element, value) {
      const valuePropertyDescriptor = getInputValuePropertyDescriptor(element);
      return valuePropertyDescriptor.set.call(element, value);
    }

    var _tmpl$1 = void 0;

    // Taken from https://github.com/jonathantneal/svg4everybody/pull/139
    // Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
    const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
    const inIframe = window.top !== window.self;
    const isIframeInEdge = isEdgeUA && inIframe;
    var isIframeInEdge$1 = lwc.registerComponent(isIframeInEdge, {
      tmpl: _tmpl$1
    });

    // Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
    function fetchSvg(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr);
            }
          }
        };
      });
    }

    // Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
    // Modify at your own risk!

    const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
    const webkitUA = /\bAppleWebKit\/(\d+)\b/;
    const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
    const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
    const supportsSvg = !isIE && !isIframeInEdge$1;
    var supportsSvg$1 = lwc.registerComponent(supportsSvg, {
      tmpl: _tmpl$1
    });

    /**
    This polyfill injects SVG sprites into the document for clients that don't
    fully support SVG. We do this globally at the document level for performance
    reasons. This causes us to lose namespacing of IDs across sprites. For example,
    if both #image from utility sprite and #image from doctype sprite need to be
    rendered on the page, both end up as #image from the doctype sprite (last one
    wins). SLDS cannot change their image IDs due to backwards-compatibility
    reasons so we take care of this issue at runtime by adding namespacing as we
    polyfill SVG elements.

    For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
    replace the "#approval" id with "#${namespace}-approval" and a similar
    operation is done on the corresponding symbol element.
    **/
    const svgTagName = /svg/i;

    const isSvgElement = el => el && svgTagName.test(el.nodeName);

    const requestCache = {};
    const symbolEls = {};
    const svgFragments = {};
    const spritesContainerId = 'slds-svg-sprites';
    let spritesEl;
    function polyfill(el) {
      if (!supportsSvg$1 && isSvgElement(el)) {
        if (!spritesEl) {
          spritesEl = document.createElement('svg');
          spritesEl.xmlns = 'http://www.w3.org/2000/svg';
          spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
          spritesEl.style.display = 'none';
          spritesEl.id = spritesContainerId;
          document.body.insertBefore(spritesEl, document.body.childNodes[0]);
        }

        Array.from(el.getElementsByTagName('use')).forEach(use => {
          // We access the href differently in raptor and in aura, probably
          // due to difference in the way the svg is constructed.
          const src = use.getAttribute('xlink:href') || use.getAttribute('href');

          if (src) {
            // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
            // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
            const parts = src.split('#');
            const url = parts[0];
            const id = parts[1];
            const namespace = url.replace(/[^\w]/g, '-');
            const href = `#${namespace}-${id}`;

            if (url.length) {
              // set the HREF value to no longer be an external reference
              if (use.getAttribute('xlink:href')) {
                use.setAttribute('xlink:href', href);
              } else {
                use.setAttribute('href', href);
              } // only insert SVG content if it hasn't already been retrieved


              if (!requestCache[url]) {
                requestCache[url] = fetchSvg(url);
              }

              requestCache[url].then(svgContent => {
                // create a document fragment from the svgContent returned (is parsed by HTML parser)
                if (!svgFragments[url]) {
                  const svgFragment = document.createRange().createContextualFragment(svgContent);
                  svgFragments[url] = svgFragment;
                }

                if (!symbolEls[href]) {
                  const svgFragment = svgFragments[url];
                  const symbolEl = svgFragment.querySelector(`#${id}`);
                  symbolEls[href] = true;
                  symbolEl.id = `${namespace}-${id}`;
                  spritesEl.appendChild(symbolEl);
                }
              });
            }
          }
        });
      }
    }

    const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
    const underscoreRe = /_/g;
    let pathPrefix;
    const tokenNameMap = Object.assign(Object.create(null), {
      action: 'lightning.actionSprite',
      custom: 'lightning.customSprite',
      doctype: 'lightning.doctypeSprite',
      standard: 'lightning.standardSprite',
      utility: 'lightning.utilitySprite'
    });
    const tokenNameMapRtl = Object.assign(Object.create(null), {
      action: 'lightning.actionSpriteRtl',
      custom: 'lightning.customSpriteRtl',
      doctype: 'lightning.doctypeSpriteRtl',
      standard: 'lightning.standardSpriteRtl',
      utility: 'lightning.utilitySpriteRtl'
    });
    const defaultTokenValueMap = Object.assign(Object.create(null), {
      'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
      'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
    });

    const getDefaultBaseIconPath = (category, nameMap) => defaultTokenValueMap[nameMap[category]];

    const getBaseIconPath = (category, direction) => {
      const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
      return configProvider.getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap);
    };

    const getMatchAtIndex = index => iconName => {
      const result = validNameRe.exec(iconName);
      return result ? result[index] : '';
    };

    const getCategory = getMatchAtIndex(1);
    const getName = getMatchAtIndex(2);
    const isValidName = iconName => validNameRe.test(iconName);
    const getIconPath = (iconName, direction = 'ltr') => {
      pathPrefix = pathPrefix !== undefined ? pathPrefix : configProvider.getPathPrefix();

      if (isValidName(iconName)) {
        const baseIconPath = getBaseIconPath(getCategory(iconName), direction);

        if (baseIconPath) {
          // This check was introduced the following MS-Edge issue:
          // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9655192/
          // If and when this get fixed, we can safely remove this block of code.
          if (isIframeInEdge$1) {
            // protocol => 'https:' or 'http:'
            // host => hostname + port
            const origin = `${window.location.protocol}//${window.location.host}`;
            return `${origin}${pathPrefix}${baseIconPath}#${getName(iconName)}`;
          }

          return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
        }
      }

      return '';
    };
    const computeSldsClass = iconName => {
      if (isValidName(iconName)) {
        const category = getCategory(iconName);
        const name = getName(iconName).replace(underscoreRe, '-');
        return `slds-icon-${category}-${name}`;
      }

      return '';
    };

    class LightningPrimitiveIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.iconName = void 0;
        this.src = void 0;
        this.svgClass = void 0;
        this.size = 'medium';
        this.variant = void 0;
        this.privateIconSvgTemplates = configProvider.getIconSvgTemplates();
      }

      get inlineSvgProvided() {
        return !!this.privateIconSvgTemplates;
      }

      renderedCallback() {
        if (this.iconName !== this.prevIconName && !this.inlineSvgProvided) {
          this.prevIconName = this.iconName;
          const svgElement = this.template.querySelector('svg');
          polyfill(svgElement);
        }
      }

      get href() {
        return this.src || getIconPath(this.iconName, dir);
      }

      get name() {
        return getName(this.iconName);
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      get normalizedVariant() {
        // NOTE: Leaving a note here because I just wasted a bunch of time
        // investigating why both 'bare' and 'inverse' are supported in
        // lightning-primitive-icon. lightning-icon also has a deprecated
        // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
        // that no classes should be applied. So this component needs to
        // support both 'bare' and 'inverse' while lightning-icon only needs to
        // support 'inverse'.
        return normalizeString(this.variant, {
          fallbackValue: '',
          validValues: ['bare', 'error', 'inverse', 'warning', 'success']
        });
      }

      get computedClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const classes = classSet(this.svgClass);

        if (normalizedVariant !== 'bare') {
          classes.add('slds-icon');
        }

        switch (normalizedVariant) {
          case 'error':
            classes.add('slds-icon-text-error');
            break;

          case 'warning':
            classes.add('slds-icon-text-warning');
            break;

          case 'success':
            classes.add('slds-icon-text-success');
            break;

          case 'inverse':
          case 'bare':
            break;

          default:
            // if custom icon is set, we don't want to set
            // the text-default class
            if (!this.src) {
              classes.add('slds-icon-text-default');
            }

        }

        if (normalizedSize !== 'medium') {
          classes.add(`slds-icon_${normalizedSize}`);
        }

        return classes.toString();
      }

      resolveTemplate() {
        const name = this.iconName;

        if (isValidName(name)) {
          const [spriteName, iconName] = name.split(':');
          const template = this.privateIconSvgTemplates[`${spriteName}_${iconName}`];

          if (template) {
            return template;
          }
        }

        return _tmpl;
      }

      render() {
        if (this.inlineSvgProvided) {
          return this.resolveTemplate();
        }

        return _tmpl;
      }

    }

    lwc.registerDecorators(LightningPrimitiveIcon, {
      publicProps: {
        iconName: {
          config: 0
        },
        src: {
          config: 0
        },
        svgClass: {
          config: 0
        },
        size: {
          config: 0
        },
        variant: {
          config: 0
        }
      },
      fields: ["privateIconSvgTemplates"]
    });

    var _lightningPrimitiveIcon = lwc.registerComponent(LightningPrimitiveIcon, {
      tmpl: _tmpl
    });

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        h: api_element
      } = $api;
      return [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.state.iconName,
          "size": $cmp.size,
          "variant": $cmp.variant,
          "src": $cmp.state.src
        },
        key: 0
      }, []), $cmp.alternativeText ? api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 1
      }, [api_dynamic($cmp.alternativeText)]) : null];
    }

    var _tmpl$2 = lwc.registerTemplate(tmpl$1);
    tmpl$1.stylesheets = [];
    tmpl$1.stylesheetTokens = {
      hostAttribute: "lightning-icon_icon-host",
      shadowAttribute: "lightning-icon_icon"
    };

    /**
     * Represents a visual element that provides context and enhances usability.
     */

    class LightningIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.state = {};
        this.alternativeText = void 0;
      }

      /**
       * A uri path to a custom svg sprite, including the name of the resouce,
       * for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart
       * @type {string}
       */
      get src() {
        return this.privateSrc;
      }

      set src(value) {
        this.privateSrc = value; // if value is not present, then we set the state back
        // to the original iconName that was passed
        // this might happen if the user sets a custom icon, then
        // decides to revert back to SLDS by removing the src attribute

        if (!value) {
          this.state.iconName = this.iconName;
          this.classList.remove('slds-icon-standard-default');
        } // if isIE11 and the src is set
        // we'd like to show the 'standard:default' icon instead
        // for performance reasons.


        if (value && isIE11) {
          this.setDefault();
          return;
        }

        this.state.src = value;
      }
      /**
       * The Lightning Design System name of the icon.
       * Names are written in the format 'utility:down' where 'utility' is the category,
       * and 'down' is the specific icon to be displayed.
       * @type {string}
       * @required
       */


      get iconName() {
        return this.privateIconName;
      }

      set iconName(value) {
        this.privateIconName = value; // if src is set, we don't need to validate
        // iconName

        if (this.src) {
          return;
        }

        if (isValidName(value)) {
          const isAction = getCategory(value) === 'action'; // update classlist only if new iconName is different than state.iconName
          // otherwise classListMutation receives class:true and class: false and removes slds class

          if (value !== this.state.iconName) {
            classListMutation(this.classList, {
              'slds-icon_container_circle': isAction,
              [computeSldsClass(value)]: true,
              [computeSldsClass(this.state.iconName)]: false
            });
          }

          this.state.iconName = value;
        } else {
          console.warn(`<lightning-icon> Invalid icon name ${value}`); // eslint-disable-line no-console
          // Invalid icon names should render a blank icon. Remove any
          // classes that might have been previously added.

          classListMutation(this.classList, {
            'slds-icon_container_circle': false,
            [computeSldsClass(this.state.iconName)]: false
          });
          this.state.iconName = undefined;
        }
      }
      /**
       * The size of the icon. Options include xx-small, x-small, small, medium, or large.
       * The default is medium.
       * @type {string}
       * @default medium
       */


      get size() {
        return normalizeString(this.state.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      set size(value) {
        this.state.size = value;
      }
      /**
       * The variant changes the appearance of a utility icon.
       * Accepted variants include inverse, success, warning, and error.
       * Use the inverse variant to implement a white fill in utility icons on dark backgrounds.
       * @type {string}
       */


      get variant() {
        return normalizeVariant(this.state.variant, this.state.iconName);
      }

      set variant(value) {
        this.state.variant = value;
      }

      connectedCallback() {
        this.classList.add('slds-icon_container');
      }

      setDefault() {
        this.state.src = undefined;
        this.state.iconName = 'standard:default';
        this.classList.add('slds-icon-standard-default');
      }

    }

    lwc.registerDecorators(LightningIcon, {
      publicProps: {
        alternativeText: {
          config: 0
        },
        src: {
          config: 3
        },
        iconName: {
          config: 3
        },
        size: {
          config: 3
        },
        variant: {
          config: 3
        }
      },
      track: {
        state: 1
      }
    });

    var _lightningIcon = lwc.registerComponent(LightningIcon, {
      tmpl: _tmpl$2
    });

    function normalizeVariant(variant, iconName) {
      // Unfortunately, the `bare` variant was implemented to do what the
      // `inverse` variant should have done. Keep this logic for as long as
      // we support the `bare` variant.
      if (variant === 'bare') {
        // TODO: Deprecation warning using strippable assertion
        variant = 'inverse';
      }

      if (getCategory(iconName) === 'utility') {
        return normalizeString(variant, {
          fallbackValue: '',
          validValues: ['error', 'inverse', 'warning', 'success']
        });
      }

      return 'inverse';
    }

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        h: api_element,
        d: api_dynamic,
        s: api_slot
      } = $api;
      return [api_element("article", {
        className: $cmp.computedWrapperClassNames,
        key: 14
      }, [api_element("header", {
        classMap: {
          "slds-card__header": true,
          "slds-grid": true
        },
        key: 9
      }, [api_element("div", {
        classMap: {
          "slds-media": true,
          "slds-media_center": true,
          "slds-has-flexi-truncate": true
        },
        key: 6
      }, [$cmp.hasIcon ? api_element("div", {
        classMap: {
          "slds-media__figure": true
        },
        key: 1
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "iconName": $cmp.iconName,
          "size": "small"
        },
        key: 0
      }, [])]) : null, api_element("div", {
        classMap: {
          "slds-media__body": true,
          "slds-truncate": true
        },
        key: 5
      }, [api_element("h2", {
        key: 4
      }, [api_element("span", {
        classMap: {
          "slds-text-heading_small": true
        },
        key: 3
      }, [$cmp.hasStringTitle ? api_dynamic($cmp.title) : null, !$cmp.hasStringTitle ? api_slot("title", {
        attrs: {
          "name": "title"
        },
        key: 2
      }, [], $slotset) : null])])])]), api_element("div", {
        classMap: {
          "slds-no-flex": true
        },
        key: 8
      }, [api_slot("actions", {
        attrs: {
          "name": "actions"
        },
        key: 7
      }, [], $slotset)])]), api_element("div", {
        classMap: {
          "slds-card__body": true
        },
        key: 11
      }, [api_slot("", {
        key: 10
      }, [], $slotset)]), $cmp.showFooter ? api_element("div", {
        classMap: {
          "slds-card__footer": true
        },
        key: 13
      }, [api_slot("footer", {
        attrs: {
          "name": "footer"
        },
        key: 12
      }, [], $slotset)]) : null])];
    }

    var _tmpl$3 = lwc.registerTemplate(tmpl$2);
    tmpl$2.slots = ["title", "actions", "", "footer"];
    tmpl$2.stylesheets = [];
    tmpl$2.stylesheetTokens = {
      hostAttribute: "lightning-card_card-host",
      shadowAttribute: "lightning-card_card"
    };

    function isNarrow(variant) {
      return typeof variant === 'string' && variant.toLowerCase() === 'narrow';
    }
    function isBase(variant) {
      return typeof variant === 'string' && variant.toLowerCase() === 'base';
    }

    /**
     * Cards apply a container around a related grouping of information.
     * @slot title Placeholder for the card title, which can be represented by a header or h1 element.
     * The title is displayed at the top of the card, to the right of the icon.
     * Alternatively, use the title attribute if you don't need to pass in extra markup in your title.
     * @slot actions Placeholder for actionable components, such as lightning-button or lightning-button-menu.
     * Actions are displayed on the top right corner of the card next to the title.
     * @slot footer Placeholder for the card footer, which is displayed at the bottom of the card and is usually optional.
     * For example, the footer can display a "View All" link to navigate to a list view.
     * @slot default Placeholder for your content in the card body.
     */

    class LightningCard extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.title = void 0;
        this.iconName = void 0;
        this.privateVariant = 'base';
        this.showFooter = true;
      }

      set variant(value) {
        if (isNarrow(value) || isBase(value)) {
          this.privateVariant = value;
        } else {
          this.privateVariant = 'base';
        }
      }
      /**
       * The variant changes the appearance of the card.
       * Accepted variants include base or narrow.
       * This value defaults to base.
       *
       * @type {string}
       * @default base
       */


      get variant() {
        return this.privateVariant;
      }

      renderedCallback() {
        // initial check for no items
        if (this.footerSlot) {
          this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
      }

      get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
      }

      get computedWrapperClassNames() {
        return classSet('slds-card').add({
          'slds-card_narrow': isNarrow(this.privateVariant)
        });
      }

      get hasIcon() {
        return !!this.iconName;
      }

      get hasStringTitle() {
        return !!this.title;
      }

    }

    lwc.registerDecorators(LightningCard, {
      publicProps: {
        title: {
          config: 0
        },
        iconName: {
          config: 0
        },
        variant: {
          config: 3
        }
      },
      track: {
        privateVariant: 1,
        showFooter: 1
      }
    });

    var _lightningCard = lwc.registerComponent(LightningCard, {
      tmpl: _tmpl$3
    });

    function tmpl$3($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("button", {
        className: $cmp.computedButtonClass,
        attrs: {
          "name": $cmp.name,
          "accesskey": $cmp.computedAccessKey,
          "title": $cmp.computedTitle,
          "type": $cmp.normalizedType,
          "value": $cmp.value,
          "aria-label": $cmp.computedAriaLabel,
          "aria-expanded": $cmp.computedAriaExpanded,
          "aria-live": $cmp.computedAriaLive,
          "aria-atomic": $cmp.computedAriaAtomic
        },
        props: {
          "disabled": $cmp.disabled
        },
        key: 2,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonFocus)),
          "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonBlur))
        }
      }, [$cmp.showIconLeft ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.iconName,
          "svgClass": $cmp.computedIconClass,
          "variant": "bare"
        },
        key: 0
      }, []) : null, api_dynamic($cmp.label), $cmp.showIconRight ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.iconName,
          "svgClass": $cmp.computedIconClass,
          "variant": "bare"
        },
        key: 1
      }, []) : null])];
    }

    var _tmpl$4 = lwc.registerTemplate(tmpl$3);
    tmpl$3.stylesheets = [];
    tmpl$3.stylesheetTokens = {
      hostAttribute: "lightning-button_button-host",
      shadowAttribute: "lightning-button_button"
    };

    function tmpl$4($api, $cmp, $slotset, $ctx) {
      return [];
    }

    var _tmpl$5 = lwc.registerTemplate(tmpl$4);
    tmpl$4.stylesheets = [];
    tmpl$4.stylesheetTokens = {
      hostAttribute: "lightning-primitiveButton_primitiveButton-host",
      shadowAttribute: "lightning-primitiveButton_primitiveButton"
    };

    const ARIA_DESCRIBEDBY = 'aria-describedby';
    const ARIA_CONTROLS = 'aria-controls';
    /**
     * Primitive for button, buttonIcon and buttonIconStateful
     */

    class LightningPrimitiveButton extends lwc.LightningElement {
      /**
       * Specifies whether this button should be displayed in a disabled state.
       * Disabled buttons can't be clicked. This value defaults to false.
       *
       * @type {boolean}
       * @default false
       */
      get disabled() {
        return this.state.disabled;
      }

      set disabled(value) {
        this.state.disabled = normalizeBoolean(value);
      }

      set accessKey(value) {
        this.state.accesskey = value;
      }
      /**
       * Specifies a shortcut key to activate or focus an element.
       *
       * @type {string}
       */


      get accessKey() {
        return this.state.accesskey;
      }

      get computedAccessKey() {
        return this.state.accesskey;
      }
      /**
       * Displays tooltip text when the mouse cursor moves over the element.
       *
       * @type {string}
       */


      get title() {
        return this.state.title;
      }

      set title(value) {
        this.state.title = value;
      }
      /**
       * Label describing the button to assistive technologies.
       *
       * @type {string}
       */


      get ariaLabel() {
        return this.state.ariaLabel;
      }

      set ariaLabel(value) {
        this.state.ariaLabel = value;
      }

      get computedAriaLabel() {
        return this.state.ariaLabel;
      }
      /**
       * A space-separated list of element IDs that provide descriptive labels for the button.
       *
       * @type {string}
       */


      get ariaDescribedBy() {
        return this.state.ariaDescribedBy;
      }

      set ariaDescribedBy(value) {
        this.state.ariaDescribedBy = value;
        const button = this.template.querySelector('button');
        synchronizeAttrs(button, {
          [ARIA_DESCRIBEDBY]: value
        });
      }
      /**
       * A space-separated list of element IDs whose presence or content is controlled by this button.
       *
       * @type {string}
       */


      get ariaControls() {
        return this.state.ariaControls;
      }

      set ariaControls(value) {
        this.state.ariaControls = value;
        const button = this.template.querySelector('button');
        synchronizeAttrs(button, {
          [ARIA_CONTROLS]: value
        });
      }
      /**
       * Indicates whether an element that the button controls is expanded or collapsed.
       * Valid values are 'true' or 'false'. The default value is undefined.
       *
       * @type {string}
       * @default undefined
       */


      get ariaExpanded() {
        return this.state.ariaExpanded;
      }

      set ariaExpanded(value) {
        this.state.ariaExpanded = normalizeString(value, {
          fallbackValue: undefined,
          validValues: ['true', 'false']
        });
      }

      get computedAriaExpanded() {
        return this.state.ariaExpanded || null;
      }

      set ariaLive(value) {
        this.state.ariaLive = value;
      }
      /**
       * Indicates that the button can be updated when it doesn't have focus.
       * Valid values are 'polite', 'assertive', or 'off'. The polite value causes assistive
       * technologies to notify users of updates at a low priority, generally without interrupting.
       * The assertive value causes assistive technologies to notify users immediately,
       * potentially clearing queued speech updates.
       *
       * @type {string}
       */


      get ariaLive() {
        return this.state.ariaLive;
      }

      get computedAriaLive() {
        return this.state.ariaLive;
      }
      /**
       * Indicates whether assistive technologies present all, or only parts of,
       * the changed region. Valid values are 'true' or 'false'.
       *
       * @type {string}
       */


      get ariaAtomic() {
        return this.state.ariaAtomic || null;
      }

      set ariaAtomic(value) {
        this.state.ariaAtomic = normalizeString(value, {
          fallbackValue: undefined,
          validValues: ['true', 'false']
        });
      }

      get computedAriaAtomic() {
        return this.state.ariaAtomic || null;
      }
      /**
       * Sets focus on the element.
       */


      focus() {}

      constructor() {
        super(); // Workaround for an IE11 bug where click handlers on button ancestors
        // receive the click event even if the button element has the `disabled`
        // attribute set.

        this._initialized = false;
        this.state = {
          accesskey: null,
          ariaAtomic: null,
          ariaControls: null,
          ariaDescribedBy: null,
          ariaExpanded: null,
          ariaLabel: null,
          ariaLive: null,
          disabled: false
        };

        if (isIE11) {
          this.template.addEventListener('click', event => {
            if (this.disabled) {
              event.stopImmediatePropagation();
            }
          });
        }
      }

      renderedCallback() {
        if (!this._initialized) {
          const button = this.template.querySelector('button');
          synchronizeAttrs(button, {
            [ARIA_CONTROLS]: this.state.ariaControls,
            [ARIA_DESCRIBEDBY]: this.state.ariaDescribedBy
          });
          this._initialized = true;
        }
      }

    }

    lwc.registerDecorators(LightningPrimitiveButton, {
      publicProps: {
        disabled: {
          config: 3
        },
        accessKey: {
          config: 3
        },
        title: {
          config: 3
        },
        ariaLabel: {
          config: 3
        },
        ariaDescribedBy: {
          config: 3
        },
        ariaControls: {
          config: 3
        },
        ariaExpanded: {
          config: 3
        },
        ariaLive: {
          config: 3
        },
        ariaAtomic: {
          config: 3
        }
      },
      publicMethods: ["focus"],
      track: {
        state: 1
      },
      fields: ["_initialized"]
    });

    var LightningPrimitiveButton$1 = lwc.registerComponent(LightningPrimitiveButton, {
      tmpl: _tmpl$5
    });

    /**
     * A clickable element used to perform an action.
     */

    class LightningButton extends LightningPrimitiveButton$1 {
      constructor(...args) {
        super(...args);
        this.name = void 0;
        this.value = void 0;
        this.label = void 0;
        this.variant = 'neutral';
        this.iconName = void 0;
        this.iconPosition = 'left';
        this.type = 'button';
        this.title = null;
        this._order = null;
      }

      render() {
        return _tmpl$4;
      }

      get computedButtonClass() {
        return classSet('slds-button').add({
          'slds-button_neutral': this.normalizedVariant === 'neutral',
          'slds-button_brand': this.normalizedVariant === 'brand',
          'slds-button_outline-brand': this.normalizedVariant === 'brand-outline',
          'slds-button_destructive': this.normalizedVariant === 'destructive',
          'slds-button_text-destructive': this.normalizedVariant === 'destructive-text',
          'slds-button_inverse': this.normalizedVariant === 'inverse',
          'slds-button_success': this.normalizedVariant === 'success',
          'slds-button_first': this._order === 'first',
          'slds-button_middle': this._order === 'middle',
          'slds-button_last': this._order === 'last'
        }).toString();
      }

      get computedTitle() {
        return this.title;
      }

      get normalizedVariant() {
        return normalizeString(this.variant, {
          fallbackValue: 'neutral',
          validValues: ['base', 'neutral', 'brand', 'brand-outline', 'destructive', 'destructive-text', 'inverse', 'success']
        });
      }

      get normalizedType() {
        return normalizeString(this.type, {
          fallbackValue: 'button',
          validValues: ['button', 'reset', 'submit']
        });
      }

      get normalizedIconPosition() {
        return normalizeString(this.iconPosition, {
          fallbackValue: 'left',
          validValues: ['left', 'right']
        });
      }

      get showIconLeft() {
        return this.iconName && this.normalizedIconPosition === 'left';
      }

      get showIconRight() {
        return this.iconName && this.normalizedIconPosition === 'right';
      }

      get computedIconClass() {
        return classSet('slds-button__icon').add({
          'slds-button__icon_left': this.normalizedIconPosition === 'left',
          'slds-button__icon_right': this.normalizedIconPosition === 'right'
        }).toString();
      }

      handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleButtonBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
      }
      /**
       * Sets focus on the button.
       */


      focus() {
        if (this._connected) {
          this.template.querySelector('button').focus();
        }
      }
      /**
       * Clicks the button.
       */


      click() {
        if (this._connected) {
          this.template.querySelector('button').click();
        }
      }
      /**
       * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
       * @param {String} order -  The order string (first, middle, last)
       */


      setOrder(order) {
        this._order = order;
      }
      /**
       * Once we are connected, we fire a register event so the button-group (or other) component can register
       * the buttons.
       */


      connectedCallback() {
        this._connected = true;
        const privatebuttonregister = new CustomEvent('privatebuttonregister', {
          bubbles: true,
          detail: {
            callbacks: {
              setOrder: this.setOrder.bind(this),
              setDeRegistrationCallback: deRegistrationCallback => {
                this._deRegistrationCallback = deRegistrationCallback;
              }
            }
          }
        });
        this.dispatchEvent(privatebuttonregister);
      }

      disconnectedCallback() {
        this._connected = false;

        if (this._deRegistrationCallback) {
          this._deRegistrationCallback();
        }
      }

    }

    LightningButton.delegatesFocus = true;

    lwc.registerDecorators(LightningButton, {
      publicProps: {
        name: {
          config: 0
        },
        value: {
          config: 0
        },
        label: {
          config: 0
        },
        variant: {
          config: 0
        },
        iconName: {
          config: 0
        },
        iconPosition: {
          config: 0
        },
        type: {
          config: 0
        }
      },
      publicMethods: ["focus", "click"],
      track: {
        title: 1,
        _order: 1
      }
    });

    var _lightningButton = lwc.registerComponent(LightningButton, {
      tmpl: _tmpl$4
    });
    LightningButton.interopMap = {
      exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true
      }
    };

    function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: block;}") : (hostSelector + " {display: block;}")) + "\n[dir=\"rtl\"] input[type=\"tel\"]" + shadowSelector + " {direction: ltr;text-align: right;unicode-bidi: embed;}\n";
    }
    var _implicitStylesheets$1 = [stylesheet$1];

    function tmpl$5($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        h: api_element
      } = $api;
      return [api_element("div", {
        classMap: {
          "slds-form-element__icon": true
        },
        key: 3
      }, [api_element("button", {
        classMap: {
          "slds-button": true,
          "slds-button_icon": true
        },
        attrs: {
          "type": "button"
        },
        key: 2
      }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "svgClass": $cmp.computedSvgClass,
          "iconName": $cmp.iconName,
          "variant": "bare"
        },
        key: 0
      }, []), api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 1
      }, [api_dynamic($cmp.i18n.buttonAlternativeText)])])])];
    }

    var _tmpl$6 = lwc.registerTemplate(tmpl$5);
    tmpl$5.stylesheets = [];
    tmpl$5.stylesheetTokens = {
      hostAttribute: "lightning-helptext_helptext-host",
      shadowAttribute: "lightning-helptext_helptext"
    };

    var labelButtonAlternativeText = 'Help';

    const POSITION_ATTR_NAME = 'data-position-id';

    class BrowserWindow {
      get window() {
        if (!this._window) {
          this._window = window; // JTEST/Ingtegration: getComputedStyle may be null

          if (!this.window.getComputedStyle) {
            this.window.getComputedStyle = node => {
              return node.style;
            };
          }
        }

        return this._window;
      }

      mockWindow(value) {
        // For test, allow mock window.
        this._window = value;
      }

      get documentElement() {
        assert(this.window.document, 'Missing window.document');
        return this.window.document.documentElement;
      }

      get MutationObserver() {
        return this.window.MutationObserver;
      }

      isWindow(element) {
        return element && element.toString() === '[object Window]';
      }

    }

    const WindowManager = new BrowserWindow();

    function isShadowRoot(node) {
      return node && node.nodeType === 11;
    }

    function enumerateParent(elem, stopEl, checker) {
      // document.body is not necessarily a body tag, because of the (very rare)
      // case of a frameset.
      if (!elem || elem === stopEl || elem === document.body) {
        return null;
      } // if overflow is auto and overflow-y is also auto,
      // however in firefox the opposite is not true


      try {
        // getComputedStyle throws an exception
        // if elem is not an element
        // (can happen during unrender)
        const computedStyle = WindowManager.window.getComputedStyle(elem);

        if (!computedStyle) {
          return null;
        }

        if (checker(computedStyle)) {
          return elem;
        }

        return enumerateParent(isShadowRoot(elem.parentNode) ? elem.parentNode.host : elem.parentNode, stopEl, checker);
      } catch (e) {
        return null;
      }
    }

    function getScrollableParent(elem, stopEl) {
      return enumerateParent(elem, stopEl, computedStyle => {
        const overflow = computedStyle['overflow-y'];
        return overflow === 'auto' || overflow === 'scroll';
      });
    }

    function queryOverflowHiddenParent(elem, stopEl) {
      return enumerateParent(elem, stopEl, computedStyle => {
        return computedStyle['overflow-x'] === 'hidden' || computedStyle['overflow-y'] === 'hidden';
      });
    }

    function isInDom(el) {
      if (el === WindowManager.window) {
        return true;
      }

      if (!isShadowRoot(el.parentNode) && el.parentNode && el.parentNode.tagName && el.parentNode.tagName.toUpperCase() === 'BODY') {
        return true;
      }

      if (isShadowRoot(el.parentNode) && el.parentNode.host) {
        return isInDom(el.parentNode.host);
      }

      if (el.parentNode) {
        return isInDom(el.parentNode);
      }

      return false;
    }
    function isDomNode(obj) {
      return obj.nodeType && (obj.nodeType === 1 || obj.nodeType === 11);
    }
    function timeout(time) {
      return new Promise(resolve => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
          resolve();
        }, time);
      });
    }
    function getPositionTarget(element) {
      return element.tagName === 'TEXTAREA' ? isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode : element;
    }
    let lastId = 1000000;
    function generateUniqueSelector() {
      return `lgcp-${lastId++}`;
    }
    function normalizeElement(element) {
      const selector = generateUniqueSelector();
      element.setAttribute(POSITION_ATTR_NAME, selector);
      element = // eslint-disable-next-line @lwc/lwc/no-document-query
      document.querySelector(`[${POSITION_ATTR_NAME}="${selector}"]`) || element;
      return element;
    }

    function isInsideOverlay(element, modalOnly) {
      if (!element) {
        return {
          isInside: false,
          overlay: null
        };
      }

      if (element.classList && (element.classList.contains('uiModal') || element.localName === 'lightning-dialog' || !modalOnly && element.classList.contains('uiPanel'))) {
        return {
          isInside: true,
          overlay: element
        };
      }

      if (!element.parentNode) {
        return {
          isInside: false,
          overlay: null
        };
      }

      return isInsideOverlay(isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode, modalOnly);
    }

    function isInsideModal(element) {
      return isInsideOverlay(element, true);
    }
    function normalizePosition(element, nextIndex, target, alignWidth) {
      // Set element position to fixed
      // 1. element is inside overlay
      // or 2. When element isn't align with target's width, and target's parent has overflow-x:hidden setting.
      const isFixed = isInsideOverlay(element).isInside || !alignWidth && queryOverflowHiddenParent(target, WindowManager.window);
      element.style.position = isFixed ? 'fixed' : 'absolute';
      element.style.zIndex = nextIndex || 0;
      element.style.left = '-9999px'; // Avoid flicker
      // we always position from the left, but in RTL mode Omakase swaps left and right properties.
      // To always allow positioning from the left we set right to auto so position library can do its work.

      element.style.right = 'auto';
      element.style.top = '0px'; // Avoid flicker

      return element;
    }
    function requestAnimationFrameAsPromise() {
      return new Promise(resolve => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => resolve());
      });
    }

    const Direction = {
      Center: 'center',
      Middle: 'middle',
      Right: 'right',
      Left: 'left',
      Bottom: 'bottom',
      Top: 'top',
      Default: 'default'
    };
    const VerticalMap = {
      top: Direction.Top,
      bottom: Direction.Bottom,
      center: Direction.Middle
    };
    const HorizontalMap = {
      left: Direction.Left,
      right: Direction.Right,
      center: Direction.Center
    };
    const FlipMap = {
      left: Direction.Right,
      right: Direction.Left,
      top: Direction.Bottom,
      bottom: Direction.Top,
      center: Direction.Center,
      default: Direction.Right
    };

    function getWindowSize() {
      return {
        width: WindowManager.window.innerWidth || document.body.clientWidth || 0,
        height: WindowManager.window.innerHeight || document.body.clientHeight || 0
      };
    }

    function normalizeDirection(direction, defaultValue) {
      return normalizeString(direction, {
        fallbackValue: defaultValue || Direction.Default,
        validValues: [Direction.Center, Direction.Right, Direction.Left, Direction.Bottom, Direction.Top, Direction.Middle, Direction.Default]
      });
    }
    function mapToHorizontal(value) {
      value = normalizeDirection(value, Direction.Left);
      return HorizontalMap[value];
    }
    function mapToVertical(value) {
      value = normalizeDirection(value, Direction.Left);
      return VerticalMap[value];
    }
    function flipDirection(value) {
      value = normalizeDirection(value, Direction.Left);
      return FlipMap[value];
    } // TODO: Remove, not currently in use.
    function checkFlipPossibility(element, target, leftAsBoundary) {
      const viewPort = getWindowSize();
      const elemRect = element.getBoundingClientRect();
      const referenceElemRect = target.getBoundingClientRect();
      const height = typeof elemRect.height !== 'undefined' ? elemRect.height : elemRect.bottom - elemRect.top;
      const width = typeof elemRect.width !== 'undefined' ? elemRect.width : elemRect.right - elemRect.left; // TODO: We'll need to revisit the leftAsBoundary config property. Either we'll need a better
      // name to cover the RTL language cases and maybe open up the possibility of bounding the
      // element to the target in both the horizontal and vertical directions.
      // The boundary shrinks the available area to the edge of the target rather than the viewport.

      let rightAsBoundary = false;

      if (document.dir === 'rtl') {
        rightAsBoundary = leftAsBoundary;
        leftAsBoundary = false;
      }

      const hasSpaceAbove = referenceElemRect.top >= height;
      const hasSpaceBelow = viewPort.height - referenceElemRect.bottom >= height; // Assuming left alignment is specified this tests if:
      // - there's room to accommodate the element with right alignment
      // - there's not enough room to accommodate the element with left alignment

      const shouldAlignToRight = referenceElemRect.right >= width && referenceElemRect.left + width > (rightAsBoundary ? referenceElemRect.right : viewPort.width); // Assuming right alignment is specified this tests if:
      // - there's room to accommodate the element with left alignment
      // - there's not enough room to accommodate the element with right alignment

      const shouldAlignToLeft = referenceElemRect.left + width <= viewPort.width && referenceElemRect.right - width < (leftAsBoundary ? referenceElemRect.left : 0); // Assuming center alignment, does the viewport have space to fit half of the element around
      // the target?

      const centerOverflow = {
        left: referenceElemRect.left - width * 0.5 < 0,
        right: referenceElemRect.right + width * 0.5 > viewPort.width,
        top: referenceElemRect.top - height * 0.5 < 0,
        bottom: referenceElemRect.bottom + height * 0.5 > viewPort.height
      };
      return {
        shouldAlignToLeft,
        shouldAlignToRight,
        hasSpaceAbove,
        hasSpaceBelow,
        centerOverflow
      };
    }

    class Transformer {
      constructor(pad, boxDirections, transformX, transformY) {
        this.pad = pad || 0;
        this.boxDirections = boxDirections || {
          left: true,
          right: true
        };

        this.transformX = transformX || function () {};

        this.transformY = transformY || function () {};
      }

      transform() {// no-op
      }

    }

    class TopTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          top: this.transformY(targetBox.top, targetBox, elementBox) + this.pad
        };
      }

    }

    class BottomTransFormer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          top: this.transformY(targetBox.top, targetBox, elementBox) - elementBox.height - this.pad
        };
      }

    }

    class CenterTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          left: Math.floor(this.transformX(targetBox.left, targetBox, elementBox) - 0.5 * elementBox.width)
        };
      }

    }

    class MiddleTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          top: Math.floor(0.5 * (2 * targetBox.top + targetBox.height - elementBox.height))
        };
      }

    }

    class LeftTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          left: this.transformX(targetBox.left, targetBox, elementBox) + this.pad
        };
      }

    }

    class RightTransformer extends Transformer {
      transform(targetBox, elementBox) {
        return {
          left: this.transformX(targetBox.left, targetBox, elementBox) - elementBox.width - this.pad
        };
      }

    }

    class BelowTransformer extends Transformer {
      transform(targetBox, elementBox) {
        const top = targetBox.top + targetBox.height + this.pad;
        return elementBox.top < top ? {
          top
        } : {};
      }

    }

    const MIN_HEIGHT = 36; // Minimum Line Height

    const MIN_WIDTH = 36;

    class ShrinkingBoxTransformer extends Transformer {
      transform(targetBox, elementBox) {
        const retBox = {};

        if (this.boxDirections.top && elementBox.top < targetBox.top + this.pad) {
          retBox.top = targetBox.top + this.pad;
          retBox.height = Math.max(elementBox.height - (retBox.top - elementBox.top), MIN_HEIGHT);
        }

        if (this.boxDirections.left && elementBox.left < targetBox.left + this.pad) {
          retBox.left = targetBox.left + this.pad;
          retBox.width = Math.max(elementBox.width - (retBox.left - elementBox.left), MIN_WIDTH);
        }

        if (this.boxDirections.right && elementBox.left + elementBox.width > targetBox.left + targetBox.width - this.pad) {
          retBox.right = targetBox.left + targetBox.width - this.pad;
          retBox.width = Math.max(retBox.right - (retBox.left || elementBox.left), MIN_WIDTH);
        }

        if (this.boxDirections.bottom && elementBox.top + elementBox.height > targetBox.top + targetBox.height - this.pad) {
          retBox.bottom = targetBox.top + targetBox.height - this.pad;
          retBox.height = Math.max(retBox.bottom - (retBox.top || elementBox.top), MIN_HEIGHT);
        }

        return retBox;
      }

    }

    class BoundingBoxTransformer extends Transformer {
      transform(targetBox, elementBox) {
        const retBox = {};

        if (this.boxDirections.top && elementBox.top < targetBox.top + this.pad) {
          retBox.top = targetBox.top + this.pad;
        }

        if (this.boxDirections.left && elementBox.left < targetBox.left + this.pad) {
          retBox.left = targetBox.left + this.pad;
        }

        if (this.boxDirections.right && elementBox.left + elementBox.width > targetBox.left + targetBox.width - this.pad) {
          retBox.left = targetBox.left + targetBox.width - elementBox.width - this.pad;
        }

        if (this.boxDirections.bottom && elementBox.top + elementBox.height > targetBox.top + targetBox.height - this.pad) {
          retBox.top = targetBox.top + targetBox.height - elementBox.height - this.pad;
        }

        return retBox;
      }

    }

    class InverseBoundingBoxTransformer extends Transformer {
      transform(targetBox, elementBox) {
        const retBox = {};

        if (this.boxDirections.left && targetBox.left - this.pad < elementBox.left) {
          retBox.left = targetBox.left - this.pad;
        }

        if (this.boxDirections.right && elementBox.left + elementBox.width < targetBox.left + targetBox.width + this.pad) {
          retBox.left = targetBox.width + this.pad - elementBox.width + targetBox.left;
        }

        if (this.boxDirections.top && targetBox.top < elementBox.top + this.pad) {
          retBox.top = targetBox.top - this.pad;
        }

        if (this.boxDirections.bottom && elementBox.top + elementBox.height < targetBox.top + targetBox.height + this.pad) {
          retBox.top = targetBox.height + this.pad - elementBox.height + targetBox.top;
        }

        return retBox;
      }

    }

    const TransformFunctions = {
      center(input, targetBox) {
        return Math.floor(input + 0.5 * targetBox.width);
      },

      right(input, targetBox) {
        return input + targetBox.width;
      },

      left(input) {
        return input;
      },

      bottom(input, targetBox) {
        return input + targetBox.height;
      }

    };
    const Transformers = {
      top: TopTransformer,
      bottom: BottomTransFormer,
      center: CenterTransformer,
      middle: MiddleTransformer,
      left: LeftTransformer,
      right: RightTransformer,
      below: BelowTransformer,
      'bounding box': BoundingBoxTransformer,
      'shrinking box': ShrinkingBoxTransformer,
      'inverse bounding box': InverseBoundingBoxTransformer,
      default: Transformer
    };
    function toTransformFunctions(value) {
      return TransformFunctions[value] || TransformFunctions.left;
    }

    class TransformBuilder {
      type(value) {
        this._type = value;
        return this;
      }

      align(horizontal, vertical) {
        this._transformX = toTransformFunctions(horizontal);
        this._transformY = toTransformFunctions(vertical);
        return this;
      }

      pad(value) {
        this._pad = parseInt(value, 10);
        return this;
      }

      boxDirections(value) {
        this._boxDirections = value;
        return this;
      }

      build() {
        const AConstructor = Transformers[this._type] ? Transformers[this._type] : Transformers[Direction.Default];
        return new AConstructor(this._pad || 0, this._boxDirections || {}, this._transformX || toTransformFunctions(Direction.left), this._transformY || toTransformFunctions(Direction.left));
      }

    }

    class Constraint {
      constructor(type, config) {
        const {
          target,
          element,
          pad,
          boxDirections
        } = config;
        const {
          horizontal,
          vertical
        } = config.targetAlign;
        this._element = element;
        this._targetElement = target;
        this.destroyed = false;
        this._transformer = new TransformBuilder().type(type).align(horizontal, vertical).pad(pad).boxDirections(boxDirections).build();
      }

      detach() {
        this._disabled = true;
      }

      attach() {
        this._disabled = false;
      }

      computeDisplacement() {
        if (!this._disabled) {
          this._targetElement.refresh();

          this._element.refresh();

          this._pendingBox = this._transformer.transform(this._targetElement, this._element);
        }

        return this;
      }

      computePosition() {
        const el = this._element;

        if (!this._disabled) {
          Object.keys(this._pendingBox).forEach(key => {
            el.setDirection(key, this._pendingBox[key]);
          });
        }

        return this;
      }

      destroy() {
        this._element.release();

        this._targetElement.release();

        this._disabled = true;
        this.destroyed = true;
      }

    }

    class ElementProxy {
      constructor(el, id) {
        this.id = id;
        this.width = 0;
        this.height = 0;
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this._dirty = false;
        this._node = null;
        this._releaseCb = null;

        if (!el) {
          throw new Error('Element missing');
        } // W-3262919
        // for some reason I cannot figure out sometimes the
        // window, which clearly a window object, is not the window object
        // this will correct that. It might be related to locker


        if (WindowManager.isWindow(el)) {
          el = WindowManager.window;
        }

        this._node = el;
        this.setupObserver();
        this.refresh();
      }

      setupObserver() {
        // this check is because phantomjs does not support
        // mutation observers. The consqeuence here
        // is that any browser without mutation observers will
        // fail to update dimensions if they changwe after the proxy
        // is created and the proxy is not not refreshed
        if (WindowManager.MutationObserver && !this._node.isObserved) {
          // Use mutation observers to invalidate cache. It's magic!
          this._observer = new WindowManager.MutationObserver(this.refresh.bind(this)); // do not observe the window

          if (!WindowManager.isWindow(this._node)) {
            this._observer.observe(this._node, {
              attributes: true,
              childList: true,
              characterData: true,
              subtree: true
            });

            this._node.isObserved = true;
          }
        }
      }

      setReleaseCallback(cb, scope) {
        const scopeObj = scope || this;
        this._releaseCb = cb.bind(scopeObj);
      }

      checkNodeIsInDom() {
        // if underlying DOM node is gone,
        // this proxy should be released
        if (!isInDom(this._node)) {
          return false;
        }

        return true;
      }

      refresh() {
        const w = WindowManager.window;

        if (!this.isDirty()) {
          if (!this.checkNodeIsInDom()) {
            return this.release();
          }

          let box, x, scrollTop, scrollLeft;

          if (typeof w.pageYOffset !== 'undefined') {
            scrollTop = w.pageYOffset;
            scrollLeft = w.pageXOffset;
          } else {
            scrollTop = w.scrollY;
            scrollLeft = w.scrollX;
          }

          if (!WindowManager.isWindow(this._node)) {
            // force paint
            // eslint-disable-next-line no-unused-vars
            const offsetHeight = this._node.offsetHeight;
            box = this._node.getBoundingClientRect(); // not using integers causes weird rounding errors
            // eslint-disable-next-line guard-for-in

            for (x in box) {
              this[x] = Math.floor(box[x]);
            }

            this.top = Math.floor(this.top + scrollTop);
            this.bottom = Math.floor(this.top + box.height);
            this.left = Math.floor(this.left + scrollLeft);
            this.right = Math.floor(this.left + box.width);
          } else {
            box = {};
            this.width = WindowManager.documentElement.clientWidth;
            this.height = WindowManager.documentElement.clientHeight;
            this.left = scrollLeft;
            this.top = scrollTop;
            this.right = WindowManager.documentElement.clientWidth + scrollLeft;
            this.bottom = WindowManager.documentElement.clientHeight;
          }

          this._dirty = false;
        }

        return this._dirty;
      }

      getNode() {
        return this._node;
      }

      isDirty() {
        return this._dirty;
      }

      bake() {
        const w = WindowManager.window;

        const absPos = this._node.getBoundingClientRect();

        const style = w.getComputedStyle(this._node) || this._node.style;

        const hasPageOffset = typeof w.pageYOffset !== 'undefined';
        const scrollTop = hasPageOffset ? w.pageYOffset : w.scrollY;
        const scrollLeft = hasPageOffset ? w.pageXOffset : w.scrollX;
        const originalLeft = style.left.match(/auto|fixed/) ? '0' : parseInt(style.left.replace('px', ''), 10);
        const originalTop = style.top.match(/auto|fixed/) ? '0' : parseInt(style.top.replace('px', ''), 10);
        const leftDif = Math.round(this.left - (absPos.left + scrollLeft));
        const topDif = this.top - (absPos.top + scrollTop);
        this._node.style.left = `${originalLeft + leftDif}px`;
        this._node.style.top = `${originalTop + topDif}px`;

        if (this._restoreSize) {
          // Only store the first height/width which is the original height/width.
          if (this.originalHeight === undefined) {
            this.originalHeight = this._node.style.height;
          }

          if (this.originalWidth === undefined) {
            this.originalWidth = this._node.style.width;
          }

          this._node.style.width = `${this.width}px`;
          this._node.style.height = `${this.height}px`;
        }

        this._dirty = false;
      }

      setDirection(direction, val) {
        this[direction] = val;
        this._dirty = true; // if size is changed, should restore the original size.

        if (direction === 'height' || direction === 'width') {
          this._restoreSize = true;
        }
      }

      release() {
        if (this._restoreSize) {
          this._node.style.width = this.originalWidth;
          this._node.style.height = this.originalHeight;

          if (this._removeMinHeight) {
            this._node.style.minHeight = '';
          }
        }

        if (this._releaseCb) {
          this._releaseCb(this);
        } // Due to https://github.com/salesforce/lwc/pull/1423
        // require to call disconnect explicitly.


        if (this._observer) {
          this._observer.disconnect();

          this._observer = null;
        }
      }

      querySelectorAll(selector) {
        return this._node.querySelectorAll(selector);
      }

    }

    class ProxyCache {
      constructor() {
        this.proxyCache = {};
      }

      get count() {
        return Object.keys(this.proxyCache).length;
      }

      releaseOrphanProxies() {
        for (const proxy in this.proxyCache) {
          if (!this.proxyCache[proxy].el.checkNodeIsInDom()) {
            this.proxyCache[proxy].el.release();
          }
        }
      }

      bakeOff() {
        for (const proxy in this.proxyCache) {
          if (this.proxyCache[proxy].el.isDirty()) {
            this.proxyCache[proxy].el.bake();
          }
        }
      }

      getReferenceCount(proxy) {
        const id = proxy.id;

        if (!id || !this.proxyCache[id]) {
          return 0;
        }

        return this.proxyCache[id].refCount;
      }

      release(proxy) {
        const proxyInstance = this.proxyCache[proxy.id];

        if (proxyInstance) {
          --proxyInstance.refCount;
        }

        if (proxyInstance && proxyInstance.refCount <= 0) {
          delete this.proxyCache[proxy.id];
        }
      }

      reset() {
        this.proxyCache = {};
      }

      create(element) {
        let key = 'window';

        if (!WindowManager.isWindow(element)) {
          key = element ? element.getAttribute(POSITION_ATTR_NAME) : null; // 1 - Node.ELEMENT_NODE, 11 - Node.DOCUMENT_FRAGMENT_NODE

          assert(key && element.nodeType && (element.nodeType !== 1 || element.nodeType !== 11), `Element Proxy requires an element and has property ${POSITION_ATTR_NAME}`);
        }

        if (this.proxyCache[key]) {
          this.proxyCache[key].refCount++;
          return this.proxyCache[key].el;
        }

        const newProxy = new ElementProxy(element, key);
        newProxy.setReleaseCallback(release, newProxy);
        this.proxyCache[key] = {
          el: newProxy,
          refCount: 1
        }; // run GC

        timeout(0).then(() => {
          this.releaseOrphanProxies();
        });
        return this.proxyCache[key].el;
      }

    }

    lwc.registerDecorators(ProxyCache, {
      fields: ["proxyCache"]
    });

    const elementProxyCache = new ProxyCache();
    function bakeOff() {
      elementProxyCache.bakeOff();
    }
    function release(proxy) {
      return elementProxyCache.release(proxy);
    }
    function createProxy(element) {
      return elementProxyCache.create(element);
    }

    class RepositionQueue {
      constructor() {
        this.callbacks = [];
        this.repositionScheduled = false;
        this._constraints = [];
        this.timeoutId = 0;
        this.lastIndex = getZIndexBaseline();
        this.eventsBound = false;
      }

      get nextIndex() {
        return this.lastIndex++;
      }

      get constraints() {
        return this._constraints;
      }

      set constraints(value) {
        this._constraints = this._constraints.concat(value);
      }

      dispatchRepositionCallbacks() {
        while (this.callbacks.length > 0) {
          this.callbacks.shift()();
        }
      }

      add(callback) {
        if (typeof callback === 'function') {
          this.callbacks.push(callback);
          return true;
        }

        return false;
      }

      scheduleReposition(callback) {
        if (this.timeoutId === 0) {
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          this.timeoutId = setTimeout(() => {
            this.reposition(callback);
          }, 10);
        }
      }

      reposition(callback) {
        // all the callbacks will be called
        if (typeof callback === 'function') {
          this.callbacks.push(callback);
        } // this is for throttling


        clearTimeout(this.timeoutId);
        this.timeoutId = 0; // this semaphore is to make sure
        // if reposition is called twice within one frame
        // we only run this once

        if (!this.repositionScheduled) {
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          requestAnimationFrame(() => {
            this.repositionScheduled = false; // this must be executed in order or constraints
            // will behave oddly

            this._constraints = this._constraints.filter(constraint => {
              if (!constraint.destroyed) {
                constraint.computeDisplacement().computePosition();
                return true;
              }

              return false;
            });
            bakeOff();
            this.dispatchRepositionCallbacks();
          });
          this.repositionScheduled = true;
        }
      }

      get repositioning() {
        if (!this._reposition) {
          this._reposition = this.scheduleReposition.bind(this);
        }

        return this._reposition;
      }

      bindEvents() {
        if (!this.eventsBound) {
          window.addEventListener('resize', this.repositioning);
          window.addEventListener('scroll', this.repositioning);
          this.eventsBound = true;
        }
      }

      detachEvents() {
        window.removeEventListener('resize', this.repositioning);
        window.removeEventListener('scroll', this.repositioning);
        this.eventsBound = false;
      }

      rebase(index) {
        if (this.lastIndex <= index) {
          this.lastIndex = index + 1;
        }
      }

    }

    lwc.registerDecorators(RepositionQueue, {
      fields: ["callbacks", "repositionScheduled", "_constraints", "timeoutId", "lastIndex", "eventsBound"]
    });

    const positionQueue = new RepositionQueue();
    function scheduleReposition(callback) {
      positionQueue.scheduleReposition(callback);
    }
    function bindEvents() {
      positionQueue.bindEvents();
    }
    function addConstraints(list) {
      positionQueue.constraints = list;
    }
    function reposition(callback) {
      positionQueue.reposition(callback);
    }
    function nextIndex() {
      return positionQueue.nextIndex;
    }
    function rebaseIndex(index) {
      return positionQueue.rebase(index);
    }

    class Relationship {
      constructor(config, constraintList, scrollableParent, observer) {
        this.config = config;
        this.constraintList = constraintList;
        this.scrollableParent = scrollableParent;
        this.observer = observer;
      }

      disable() {
        this.constraintList.forEach(constraintToDisable => {
          constraintToDisable.detach();
        });
      }

      enable() {
        this.constraintList.forEach(constraintToEnable => {
          constraintToEnable.attach();
        });
      }

      destroy() {
        if (this.config.removeListeners) {
          this.config.removeListeners();
          this.config.removeListeners = undefined;
        }

        while (this.constraintList.length > 0) {
          this.constraintList.pop().destroy();
        } // Clean up node appended to body of dom


        if (this.config.appendToBody && this.config.element) {
          // eslint-disable-next-line @lwc/lwc/no-document-query
          const nodeToRemove = document.querySelector(`[${POSITION_ATTR_NAME}="${this.config.element.getAttribute(POSITION_ATTR_NAME)}"]`);

          if (nodeToRemove) {
            nodeToRemove.parentNode.removeChild(nodeToRemove);
          }
        } // Due to https://github.com/salesforce/lwc/pull/1423
        // require to call disconnect explicitly.


        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      }

      reposition() {
        return new Promise(resolve => {
          reposition(() => {
            resolve();
          });
        });
      }

    }

    const DEFAULT_MIN_HEIGHT = '1.875rem';

    function setupObserver(config, scrollableParent) {
      const observedElement = config.element;
      let observer = null;

      if (WindowManager.MutationObserver && !observedElement.isObserved) {
        observer = new WindowManager.MutationObserver(() => {});
        observer.observe(observedElement, {
          attributes: true,
          subtree: true,
          childList: true
        });
        observedElement.isObserved = true;
      }

      if (scrollableParent) {
        scrollableParent.addEventListener('scroll', scheduleReposition);

        config.removeListeners = () => {
          scrollableParent.removeEventListener('scroll', scheduleReposition);
        };
      }

      return observer;
    }

    function validateConfig(config) {
      assert(config.element && isDomNode(config.element), 'Element is undefined or missing, or not a Dom Node');
      assert(config.target && (WindowManager.isWindow(config.target) || isDomNode(config.target)), 'Target is undefined or missing');
    }

    function createRelationship(config) {
      bindEvents();

      if (config.alignWidth && config.element.style.position === 'fixed') {
        config.element.style.width = config.target.getBoundingClientRect().width + 'px';
      }

      const constraintList = [];
      const scrollableParent = getScrollableParent(getPositionTarget(config.target), WindowManager.window); // This observer and the test for scrolling children
      // is so that if a panel contains a scroll we do not
      // proxy the events to the "parent"  (actually the target's parent)

      const observer = setupObserver(config, scrollableParent);

      if (config.appendToBody) {
        document.body.appendChild(config.element);
      }

      config.element = createProxy(config.element);
      config.target = createProxy(config.target); // Add horizontal constraint.

      const horizontalConfig = Object.assign({}, config);

      if (horizontalConfig.padLeft !== undefined) {
        horizontalConfig.pad = horizontalConfig.padLeft;
      } // Add vertical constraint.


      const verticalConfig = Object.assign({}, config);

      if (verticalConfig.padTop !== undefined) {
        verticalConfig.pad = verticalConfig.padTop;
      }

      constraintList.push(new Constraint(mapToHorizontal(config.align.horizontal), horizontalConfig));
      constraintList.push(new Constraint(mapToVertical(config.align.vertical), verticalConfig));
      const autoShrink = config.autoShrink.height || config.autoShrink.width;

      if (config.scrollableParentBound && scrollableParent) {
        const parent = normalizeElement(scrollableParent);
        const boxConfig = {
          element: config.element,
          enabled: config.enabled,
          target: createProxy(parent),
          align: {},
          targetAlign: {},
          pad: 3,
          boxDirections: {
            top: true,
            bottom: true,
            left: true,
            right: true
          }
        };

        if (autoShrink) {
          const style = boxConfig.element.getNode().style;

          if (!style.minHeight) {
            style.minHeight = config.minHeight;
            boxConfig.element._removeMinHeight = true;
          }

          boxConfig.boxDirections = {
            top: !!config.autoShrink.height,
            bottom: !!config.autoShrink.height,
            left: !!config.autoShrink.width,
            right: !!config.autoShrink.width
          };
          constraintList.push(new Constraint('shrinking box', boxConfig));
        } else {
          constraintList.push(new Constraint('bounding box', boxConfig));
        }
      }

      if (config.keepInViewport) {
        constraintList.push(new Constraint('bounding box', {
          element: config.element,
          enabled: config.enabled,
          target: createProxy(window),
          align: {},
          targetAlign: {},
          pad: 3,
          boxDirections: {
            top: true,
            bottom: true,
            left: true,
            right: true
          }
        }));
      }

      addConstraints(constraintList);
      reposition();
      return new Relationship(config, constraintList, scrollableParent, observer);
    }

    function isAutoFlipHorizontal(config) {
      return config.autoFlip || config.autoFlipHorizontal;
    }

    function isAutoFlipVertical(config) {
      return config.autoFlip || config.autoFlipVertical;
    }

    function normalizeAlignments(config, flipConfig) {
      const align = {
        horizontal: config.align.horizontal,
        vertical: config.align.vertical
      };
      const targetAlign = {
        horizontal: config.targetAlign.horizontal,
        vertical: config.targetAlign.vertical
      }; // Horizontal alignments flip for RTL languages.

      if (document.dir === 'rtl') {
        align.horizontal = flipDirection(align.horizontal);
        targetAlign.horizontal = flipDirection(targetAlign.horizontal);
      } // When using the autoFlip flags with center alignment, we change the element alignment to fit
      // within the viewport when it's detected that it overflows the edge of the viewport.


      let vFlip = false;

      if (isAutoFlipVertical(config)) {
        if (align.vertical === Direction.Bottom) {
          vFlip = !flipConfig.hasSpaceAbove && flipConfig.hasSpaceBelow;
        } else if (align.vertical === Direction.Top) {
          vFlip = flipConfig.hasSpaceAbove && !flipConfig.hasSpaceBelow;
        } else if (align.vertical === Direction.Center) {
          if (flipConfig.centerOverflow.top && !flipConfig.centerOverflow.bottom) {
            align.vertical = targetAlign.vertical = Direction.Top;
          } else if (flipConfig.centerOverflow.bottom && !flipConfig.centerOverflow.top) {
            align.vertical = targetAlign.vertical = Direction.Bottom;
          }
        }
      }

      let hFlip = false;

      if (isAutoFlipHorizontal(config)) {
        if (align.horizontal === Direction.Left) {
          hFlip = flipConfig.shouldAlignToRight;
        } else if (align.horizontal === Direction.Right) {
          hFlip = flipConfig.shouldAlignToLeft;
        } else if (align.horizontal === Direction.Center) {
          if (flipConfig.centerOverflow.left && !flipConfig.centerOverflow.right) {
            align.horizontal = targetAlign.horizontal = Direction.Left;
          } else if (flipConfig.centerOverflow.right && !flipConfig.centerOverflow.left) {
            align.horizontal = targetAlign.horizontal = Direction.Right;
          }
        }
      }

      return {
        align: {
          horizontal: hFlip ? flipDirection(align.horizontal) : normalizeDirection(align.horizontal, Direction.Left),
          vertical: vFlip ? flipDirection(align.vertical) : normalizeDirection(align.vertical, Direction.Top)
        },
        targetAlign: {
          horizontal: hFlip ? flipDirection(targetAlign.horizontal) : normalizeDirection(targetAlign.horizontal, Direction.Left),
          vertical: vFlip ? flipDirection(targetAlign.vertical) : normalizeDirection(targetAlign.vertical, Direction.Bottom)
        }
      };
    }

    function normalizeConfig(config) {
      config.align = config.align || {};
      config.targetAlign = config.targetAlign || {};
      const flipConfig = checkFlipPossibility(config.element, config.target, config.leftAsBoundary);
      const {
        align,
        targetAlign
      } = normalizeAlignments(config, flipConfig); // When inside modal, element may expand out of the viewport and be cut off.
      // So if inside modal, and don't have enough space above or below, will add bounding box rule.

      if (config.isInsideModal && !flipConfig.hasSpaceAbove && !flipConfig.hasSpaceBelow) {
        config.scrollableParentBound = true;
      }

      return {
        target: config.target,
        element: config.element,
        align,
        targetAlign,
        alignWidth: config.alignWidth,
        scrollableParentBound: config.scrollableParentBound,
        keepInViewport: config.keepInViewport,
        pad: config.pad,
        padTop: config.padTop,
        padLeft: config.padLeft,
        autoShrink: {
          height: config.autoShrink || config.autoShrinkHeight,
          width: config.autoShrink || config.autoShrinkWidth
        },
        minHeight: config.minHeight || DEFAULT_MIN_HEIGHT
      };
    }

    function toElement(root, target) {
      if (target && typeof target === 'string') {
        return root.querySelector(target);
      } else if (target && typeof target === 'function') {
        return target();
      }

      return target;
    }

    function startPositioning(root, config) {
      assert(root, 'Root is undefined or missing');
      assert(config, 'Config is undefined or missing');
      const node = normalizeElement(root);
      const target = toElement(node, config.target);
      const element = toElement(node, config.element); // when target/element is selector, there is chance, dom isn't present anymore.

      if (!target || !element) {
        return null;
      }

      config.target = normalizeElement(target);
      config.element = normalizeElement(element);
      const result = isInsideModal(config.element);
      config.isInsideModal = result.isInside; // stackManager will increase the zIndex too.
      // if detect inside modal, read modal zindex and rebase to it.

      if (config.isInsideModal && result.overlay) {
        const index = parseInt(result.overlay.style.zIndex, 10);
        rebaseIndex(index);
      } // Also should check if target inside modal too.


      const targetResult = isInsideModal(config.target);
      config.isInsideModal = targetResult.isInside; // if detect inside modal, read modal zindex and rebase to it.

      if (config.isInsideModal && targetResult.overlay) {
        const index = parseInt(targetResult.overlay.style.zIndex, 10);
        rebaseIndex(index);
      } // Element absolute / fixed must be set prior to getBoundingClientRect call or
      // the scrollable parent (usually due to uiModal/uiPanel) will push the page down.


      config.element = normalizePosition(config.element, nextIndex(), config.target, config.alignWidth);
      validateConfig(config);
      return createRelationship(normalizeConfig(config));
    }
    function stopPositioning(relationship) {
      if (relationship) {
        relationship.destroy();
      }
    }
    class AutoPosition {
      constructor(root) {
        this._autoPositionUpdater = null;
        this._root = root;
      }

      start(config) {
        return requestAnimationFrameAsPromise().then(() => {
          let promise = Promise.resolve();

          if (!this._autoPositionUpdater) {
            this._autoPositionUpdater = startPositioning(this._root, config);
          } else {
            promise = promise.then(() => {
              return this._autoPositionUpdater.reposition();
            });
          }

          return promise.then(() => {
            return this._autoPositionUpdater;
          });
        });
      }

      stop() {
        if (this._autoPositionUpdater) {
          stopPositioning(this._autoPositionUpdater);
          this._autoPositionUpdater = null;
        }

        return Promise.resolve();
      }

    }

    lwc.registerDecorators(AutoPosition, {
      fields: ["_autoPositionUpdater"]
    });

    function tmpl$6($api, $cmp, $slotset, $ctx) {
      const {
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-popover__body": true
        },
        context: {
          lwc: {
            dom: "manual"
          }
        },
        key: 0,
        on: {
          "mouseleave": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseLeave))
        }
      }, [])];
    }

    var _tmpl$7 = lwc.registerTemplate(tmpl$6);
    tmpl$6.stylesheets = [];
    tmpl$6.stylesheetTokens = {
      hostAttribute: "lightning-primitiveBubble_primitiveBubble-host",
      shadowAttribute: "lightning-primitiveBubble_primitiveBubble"
    };

    const DEFAULT_ALIGN = {
      horizontal: 'left',
      vertical: 'bottom'
    };

    class LightningPrimitiveBubble extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.state = {
          visible: false,
          contentId: ''
        };
        this.divElement = void 0;
      }

      get contentId() {
        return this.state.contentId;
      }

      set contentId(value) {
        this.state.contentId = value;

        if (this.state.inDOM) {
          this.divEl.setAttribute('id', this.state.contentId);
        }
      }

      connectedCallback() {
        this.updateClassList();
        this.state.inDOM = true;
      }

      disconnectedCallback() {
        this.state.inDOM = false;
      }

      renderedCallback() {
        // set content manually once rendered
        // - this is required to avoid the content update being in the wrong 'tick'
        this.setContentManually();
        this.setIdManually();
      }

      set content(value) {
        this.state.content = value;

        if (this.state.inDOM) {
          this.setContentManually();
        }
      }

      get content() {
        return this.state.content || '';
      }

      get align() {
        return this.state.align || DEFAULT_ALIGN;
      }

      set align(value) {
        this.state.align = value;
        this.updateClassList();
      }

      get visible() {
        return this.state.visible;
      }

      set visible(value) {
        this.state.visible = value;
        this.updateClassList();
      }

      setIdManually() {
        this.divElement = this.divElement ? this.divElement : this.template.querySelector('div');
        this.divElement.setAttribute('id', this.state.contentId);
      } // manually set the content value


      setContentManually() {
        /* manipulate DOM directly */
        this.template.querySelector('.slds-popover__body').textContent = this.state.content;
      } // compute class value for this bubble


      updateClassList() {
        const classes = classSet('slds-popover').add('slds-popover_tooltip'); // show or hide bubble

        classes.add({
          'slds-rise-from-ground': this.visible,
          'slds-fall-into-ground': !this.visible
        }); // apply the proper nubbin CSS class

        const {
          horizontal,
          vertical
        } = this.align;
        classes.add({
          'slds-nubbin_top-left': horizontal === 'left' && vertical === 'top',
          'slds-nubbin_top-right': horizontal === 'right' && vertical === 'top',
          'slds-nubbin_bottom-left': horizontal === 'left' && vertical === 'bottom',
          'slds-nubbin_bottom-right': horizontal === 'right' && vertical === 'bottom',
          'slds-nubbin_bottom': horizontal === 'center' && vertical === 'bottom',
          'slds-nubbin_top': horizontal === 'center' && vertical === 'top',
          'slds-nubbin_left': horizontal === 'left' && vertical === 'center',
          'slds-nubbin_right': horizontal === 'right' && vertical === 'center'
        });
        classListMutation(this.classList, classes);
      }

      handleMouseLeave() {
        this.visible = false;
      }

    }

    lwc.registerDecorators(LightningPrimitiveBubble, {
      publicProps: {
        contentId: {
          config: 3
        },
        content: {
          config: 3
        },
        align: {
          config: 3
        },
        visible: {
          config: 3
        }
      },
      track: {
        state: 1
      },
      fields: ["divElement"]
    });

    var LightningPrimitiveBubble$1 = lwc.registerComponent(LightningPrimitiveBubble, {
      tmpl: _tmpl$7
    });

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    const BUBBLE_ID = `salesforce-lightning-tooltip-bubble_${guid()}`;

    function isResizeObserverSupported() {
      return window.ResizeObserver != null;
    }

    function buildResizeObserver(callback) {
      if (isResizeObserverSupported()) {
        return new ResizeObserver(callback);
      }

      return {
        observe() {},

        unobserve() {}

      };
    }
    /**
     * Shared instance of a primitive bubble used as a tooltip by most components. This was originally
     * defined in the helptext component which is where the minWidth style came from.
     * TODO: We may want to revisit the minWidth style with the PO and/or UX.
     */


    let CACHED_BUBBLE_ELEMENT;

    function getCachedBubbleElement() {
      if (!CACHED_BUBBLE_ELEMENT) {
        CACHED_BUBBLE_ELEMENT = lwc.createElement('lightning-primitive-bubble', {
          is: LightningPrimitiveBubble$1
        });
        CACHED_BUBBLE_ELEMENT.contentId = BUBBLE_ID;
        CACHED_BUBBLE_ELEMENT.style.position = 'absolute';
        CACHED_BUBBLE_ELEMENT.style.minWidth = '75px'; // hide bubble element on create

        CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
        CACHED_BUBBLE_ELEMENT.addEventListener('transitionend', () => {
          // W-7201022 https://gus.lightning.force.com/lightning/r/ADM_Work__c/a07B00000079kNjIAI/view
          // The tooltip uses absolute positioning and visibility gets set to hidden to
          // hide it from view which means it's still part of the document layout.
          // If we don't hide the bubble it could stay on the page and accidentally scroll pages
          // in the console app after a tab switch, especially when the tab content lengths differ.
          if (!CACHED_BUBBLE_ELEMENT.visible) {
            CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
          }
        });
      }

      return CACHED_BUBBLE_ELEMENT;
    }

    const ARIA_DESCRIBEDBY$1 = 'aria-describedby';
    /**
     * Used as a position offset to compensate for the nubbin. The dimensions of the nubbin are not
     * included in the position library bounding box calculations. This is the size in pixels of the
     * nubbin.
     * TODO: We may want to measure this instead in cases it changes.
     */

    const NUBBIN_SIZE = 16;
    /**
     * Used in the calculation that moves the tooltip to a location that places the nubbin at the
     * center of the target element. This is the nubbin offset from the edge of the bubble in pixels
     * when using slds-nubbin_bottom-left or slds-nubbin_bottom-right.
     * TODO: We may want to measure this instead in case it changes.
     */

    const NUBBIN_OFFSET = 24;
    /**
     * Known tooltip types:
     * - info: used in cases where target already has click handlers such as button-icon
     * - toggle: used in cases where target only shows a tooltip such as helptext
     */

    const TooltipType = {
      Info: 'info',
      Toggle: 'toggle'
    };
    /**
     * Allows us to attach a tooltip to components. Typical usage is as follows:
     * - Create an instance of Tooltip
     * - Call Tooltip.initialize() to add the appropriate listeners to the element that needs a tooltip
     * See buttonIcon and buttonMenu for example usage.
     */

    class Tooltip {
      /**
       * A shared instance of primitiveBubble is used when an element is not specified in the config
       * object.
       * @param {string} value the content of the tooltip
       * @param {object} config specifies the root component, target element of the tooltip
       */
      constructor(value, config) {
        this._autoPosition = null;
        this._disabled = true;
        this._initialized = false;
        this._visible = false;
        this._config = {};
        assert(config.target, 'target for tooltip is undefined or missing');
        this.value = value;
        this._root = config.root;
        this._target = config.target;
        this._config = _objectSpread({}, config);
        this._config.align = config.align || {};
        this._config.targetAlign = config.targetAlign || {};
        this._type = normalizeString(config.type, {
          fallbackValue: TooltipType.Info,
          validValues: Object.values(TooltipType)
        }); // If a tooltip element is not given, fall back on the globally shared instance.

        this._element = config.element;

        if (!this._element) {
          this._element = getCachedBubbleElement;
          const bubbleElement = getCachedBubbleElement();

          if (bubbleElement.parentNode === null) {
            document.body.appendChild(bubbleElement);
          }
        }

        this.handleDocumentTouch = this.handleDocumentTouch.bind(this);
      }
      /**
       * Disables the tooltip.
       */


      detach() {
        this._disabled = true;
      }
      /**
       * Enables the tooltip.
       */


      attach() {
        this._disabled = false;
      }
      /**
       * Adds the appropriate event listeners to the target element to make the tooltip appear. Also
       * links the tooltip and target element via the aria-describedby attribute for screen readers.
       */


      initialize() {
        const target = this._target();

        if (!this._initialized && target) {
          switch (this._type) {
            case TooltipType.Toggle:
              this.addToggleListeners();
              break;

            case TooltipType.Info:
            default:
              this.addInfoListeners();
              break;
          }

          const ariaDescribedBy = normalizeAriaAttribute([target.getAttribute(ARIA_DESCRIBEDBY$1), this._element().contentId]);
          target.setAttribute(ARIA_DESCRIBEDBY$1, ariaDescribedBy);
          this._initialized = true;
        }
      }

      addInfoListeners() {
        const target = this._target();

        if (!this._initialized && target) {
          ['mouseenter', 'focus'].forEach(name => target.addEventListener(name, () => this.show())); // Unlike the tooltip in Aura, we want clicks and keys to dismiss the tooltip.

          ['mouseleave', 'blur', 'click', 'keydown'].forEach(name => target.addEventListener(name, event => this.hideIfNotSelfCover(event)));
        }
      }

      hideIfNotSelfCover(event) {
        if (event.type === 'mouseleave' && event.clientX && event.clientY) {
          // In any chance, if mouseleave is caused by tooltip itself, it would means
          // tooltip cover the target which mostly caused by dynamic resize of tooltip by CSS or JS.
          try {
            const elementMouseIsOver = document.elementFromPoint ? document.elementFromPoint(event.clientX, event.clientY) : null;

            if (elementMouseIsOver === this._element()) {
              if (!isResizeObserverSupported()) {
                this.startPositioning();
              }

              return;
            }
          } catch (ex) {// Jest Throw Exception
          }
        }

        this.hide();
      }

      handleDocumentTouch() {
        if (this._visible) {
          this.hide();
        }
      }

      addToggleListeners() {
        const target = this._target();

        if (!this._initialized && target) {
          target.addEventListener('touchstart', e => {
            e.stopPropagation();
            this.toggle();
          });
          ['mouseenter', 'focus'].forEach(name => target.addEventListener(name, () => this.show()));
          ['mouseleave', 'blur'].forEach(name => target.addEventListener(name, event => this.hideIfNotSelfCover(event)));
        }
      }

      get resizeObserver() {
        if (!this._resizeObserver) {
          this._resizeObserver = buildResizeObserver(() => {
            if (this._visible && this._autoPosition) {
              this.startPositioning();
            }
          });
        }

        return this._resizeObserver;
      }

      show() {
        if (this._disabled) {
          return;
        }

        this._visible = true;

        const tooltip = this._element();
        /* We only change the visibility of the cached bubble element here,
           for custom bubble elements, we expect them to react to `visible`
           property change */


        if (CACHED_BUBBLE_ELEMENT) {
          // Show cached bubble element
          CACHED_BUBBLE_ELEMENT.classList.remove('slds-hide');
        }

        tooltip.content = this._value;
        this.startPositioning();
        document.addEventListener('touchstart', this.handleDocumentTouch);
        this.resizeObserver.observe(tooltip);
      }

      hide() {
        this._visible = false;

        const tooltip = this._element();

        tooltip.visible = this._visible;
        this.stopPositioning();
        document.removeEventListener('touchstart', this.handleDocumentTouch);
        this.resizeObserver.unobserve(tooltip);
      }

      toggle() {
        if (this._visible) {
          this.hide();
        } else {
          this.show();
        }
      }

      get value() {
        return this._value;
      }

      set value(value) {
        this._value = value;
        this._disabled = !value;
      }

      get initialized() {
        return this._initialized;
      }

      get visible() {
        return this._visible;
      }

      startPositioning() {
        if (!this._autoPosition) {
          this._autoPosition = new AutoPosition(this._root);
        } // The lightning-helptext component was originally left aligned.


        const align = {
          horizontal: this._config.align.horizontal || Direction.Left,
          vertical: this._config.align.vertical || Direction.Bottom
        };
        const targetAlign = {
          horizontal: this._config.targetAlign.horizontal || Direction.Left,
          vertical: this._config.targetAlign.vertical || Direction.Top
        }; // Pads the tooltip so its nubbin is at the center of the target element.

        const targetBox = this._target().getBoundingClientRect();

        const padLeft = targetBox.width * 0.5 - NUBBIN_OFFSET;

        this._autoPosition.start({
          target: this._target,
          element: this._element,
          align,
          targetAlign,
          autoFlip: true,
          padTop: NUBBIN_SIZE,
          padLeft
        }).then(autoPositionUpdater => {
          // The calculation above may have flipped the alignment of the tooltip. When the
          // tooltip changes alignment we need to update the nubbin class to have it draw in
          // the appropriate place.
          if (autoPositionUpdater) {
            const tooltip = this._element();

            tooltip.align = autoPositionUpdater.config.align;
            tooltip.visible = this._visible;
          }
        });
      }

      stopPositioning() {
        if (this._autoPosition) {
          this._autoPosition.stop();
        }
      }

    }

    lwc.registerDecorators(Tooltip, {
      fields: ["_autoPosition", "_disabled", "_initialized", "_visible", "_config"]
    });

    const i18n = {
      buttonAlternativeText: labelButtonAlternativeText
    };
    const DEFAULT_ICON_NAME = 'utility:info';
    const DEFAULT_ICON_VARIANT = 'bare';
    /**
     * An icon with a text popover used for tooltips.
     */

    class LightningHelptext extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.state = {
          iconName: DEFAULT_ICON_NAME,
          iconVariant: DEFAULT_ICON_VARIANT
        };
        this._tooltip = null;
      }

      /**
       * Text to be shown in the popover.
       * @type {string}
       * @param {string} value - The plain text string for the tooltip
       */
      set content(value) {
        if (this._tooltip) {
          this._tooltip.value = value;
        } else if (value) {
          // Note that because the tooltip target is a child element it may not be present in the
          // dom during initial rendering.
          this._tooltip = new Tooltip(value, {
            root: this,
            target: () => this.template.querySelector('button'),
            type: TooltipType.Toggle
          });

          this._tooltip.initialize();
        }
      }

      get content() {
        return this._tooltip ? this._tooltip.value : undefined;
      }
      /**
       * The Lightning Design System name of the icon used as the visible element.
       * Names are written in the format 'utility:info' where 'utility' is the category,
       * and 'info' is the specific icon to be displayed.
       * The default is 'utility:info'.
       * @type {string}
       * @param {string} value the icon name to use
       * @default utility:info
       */


      set iconName(value) {
        this.state.iconName = value;
      }

      get iconName() {
        if (isValidName(this.state.iconName)) {
          return this.state.iconName;
        }

        return DEFAULT_ICON_NAME;
      }
      /**
       * Changes the appearance of the icon.
       * Accepted variants include inverse, warning, error.
       * @type {string}
       * @param {string} value the icon variant to use
       * @default bare
       */


      set iconVariant(value) {
        this.state.iconVariant = value;
      }

      get iconVariant() {
        // NOTE: Leaving a note here because I just wasted a bunch of time
        // investigating why both 'bare' and 'inverse' are supported in
        // lightning-primitive-icon. lightning-icon also has a deprecated
        // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
        // that no classes should be applied. So this component needs to
        // support both 'bare' and 'inverse' while lightning-icon only needs to
        // support 'inverse'.
        return normalizeString(this.state.iconVariant, {
          fallbackValue: DEFAULT_ICON_VARIANT,
          validValues: ['bare', 'error', 'inverse', 'warning']
        });
      }

      disconnectedCallback() {
        // W-6441609 helptext maybe destroyed first, and tooltip won't receive events to hide.
        if (this._tooltip && !this._tooltip.initialized) {
          this._tooltip.hide();
        }

        this._tooltip = null;
      }

      renderedCallback() {
        if (this._tooltip && !this._tooltip.initialized) {
          this._tooltip.initialize();
        }
      }

      get i18n() {
        return i18n;
      } // compute SVG CSS classes to apply to the icon


      get computedSvgClass() {
        const classes = classSet('slds-button__icon');

        switch (this.iconVariant) {
          case 'error':
            classes.add('slds-icon-text-error');
            break;

          case 'warning':
            classes.add('slds-icon-text-warning');
            break;

          case 'inverse':
          case 'bare':
            break;

          default:
            // if custom icon is set, we don't want to set
            // the text-default class
            classes.add('slds-icon-text-default');
        }

        return classes.toString();
      }

    }

    lwc.registerDecorators(LightningHelptext, {
      publicProps: {
        content: {
          config: 3
        },
        iconName: {
          config: 3
        },
        iconVariant: {
          config: 3
        }
      },
      track: {
        state: 1
      },
      fields: ["_tooltip"]
    });

    var _lightningHelptext = lwc.registerComponent(LightningHelptext, {
      tmpl: _tmpl$6
    });

    function stylesheet$2(hostSelector, shadowSelector, nativeShadow) {
      return "slot" + shadowSelector + " {display: inline-block;}\n";
    }
    var _implicitStylesheets$2 = [stylesheet$2];

    function tmpl$7($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot
      } = $api;
      return [api_slot("", {
        key: 0
      }, [], $slotset)];
    }

    var _tmpl$8 = lwc.registerTemplate(tmpl$7);
    tmpl$7.slots = [""];
    tmpl$7.stylesheets = [];

    if (_implicitStylesheets$2) {
      tmpl$7.stylesheets.push.apply(tmpl$7.stylesheets, _implicitStylesheets$2);
    }
    tmpl$7.stylesheetTokens = {
      hostAttribute: "lightning-primitiveFileDroppableZone_primitiveFileDroppableZone-host",
      shadowAttribute: "lightning-primitiveFileDroppableZone_primitiveFileDroppableZone"
    };

    class LightningPrimitiveFileDroppableZone extends lwc.LightningElement {
      get disabled() {
        return this._disabled || false;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);
      }

      get multiple() {
        return this._multiple || false;
      }

      set multiple(value) {
        this._multiple = normalizeBoolean(value);
      }

      constructor() {
        super();
        this._disabled = void 0;
        this._multiple = void 0;
        this.template.addEventListener('dragover', this.allowDrop.bind(this));
        this.template.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.template.addEventListener('drop', this.handleOnDrop.bind(this));
      }

      connectedCallback() {
        this.classList.add('slds-file-selector__dropzone');
      }

      setDragOver(dragOver) {
        this.classList.toggle('slds-has-drag-over', dragOver);
      }

      handleDragLeave() {
        this.setDragOver(false);
      }

      handleOnDrop(event) {
        event.preventDefault();
        this.setDragOver(false);

        if (this.disabled) {
          event.stopPropagation();
          return;
        }

        if (!this.meetsMultipleCriteria(event)) {
          event.stopPropagation();
        }
      }

      allowDrop(event) {
        event.preventDefault();

        if (!this.disabled) {
          this.setDragOver(true);
        }
      }

      meetsMultipleCriteria(dragEvent) {
        const files = dragEvent.dataTransfer.files;
        return !(files.length > 1 && !this.multiple);
      }

    }

    lwc.registerDecorators(LightningPrimitiveFileDroppableZone, {
      publicProps: {
        disabled: {
          config: 3
        },
        multiple: {
          config: 3
        }
      },
      track: {
        _disabled: 1,
        _multiple: 1
      }
    });

    var _lightningPrimitiveFileDroppableZone = lwc.registerComponent(LightningPrimitiveFileDroppableZone, {
      tmpl: _tmpl$8
    });

    function tmpl$8($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        gid: api_scoped_id,
        h: api_element,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5,
        _m6,
        _m7,
        _m8,
        _m9
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-color-picker__custom": true
        },
        key: 31
      }, [api_element("p", {
        classMap: {
          "slds-assistive-text": true
        },
        attrs: {
          "id": api_scoped_id("color-picker-instructions")
        },
        key: 0
      }, [api_dynamic($cmp.i18n.colorPickerInstructions)]), api_element("div", {
        classMap: {
          "slds-m-bottom_small": true
        },
        style: $cmp.gradientStyle,
        attrs: {
          "data-id": "color-gradient"
        },
        key: 4,
        on: {
          "mousedown": _m3 || ($ctx._m3 = api_bind($cmp.handleMouseDown))
        }
      }, [api_element("canvas", {
        attrs: {
          "width": $cmp.canvasRect.x,
          "height": $cmp.canvasRect.y
        },
        key: 1
      }, []), api_element("a", {
        classMap: {
          "slds-color-picker__range-indicator": true
        },
        styleMap: {
          "position": "absolute",
          "display": "inline"
        },
        attrs: {
          "data-id": "color-anchor",
          "href": "javascript:void(0)",
          "aria-live": "assertive",
          "aria-atomic": "true",
          "aria-describedby": `${api_scoped_id("color-picker-instructions")}`
        },
        key: 3,
        on: {
          "mousedrag": _m0 || ($ctx._m0 = api_bind($cmp.handlePreventDefault)),
          "mousedown": _m1 || ($ctx._m1 = api_bind($cmp.handlePreventDefault)),
          "keydown": _m2 || ($ctx._m2 = api_bind($cmp.handleKeydown))
        }
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 2
      }, [api_dynamic($cmp.computedSaturationAndBrightness)])])]), api_element("div", {
        classMap: {
          "slds-color-picker__hue-and-preview": true
        },
        key: 9
      }, [api_element("label", {
        classMap: {
          "slds-assistive-text": true
        },
        attrs: {
          "for": `${api_scoped_id("rainbow")}`
        },
        key: 5
      }, [api_dynamic($cmp.i18n.hueInput)]), api_element("input", {
        classMap: {
          "slds-color-picker__hue-slider": true
        },
        attrs: {
          "data-id": "hue-slider",
          "type": "range",
          "min": "0",
          "max": "360",
          "id": api_scoped_id("rainbow")
        },
        props: {
          "value": $cmp._hueValue
        },
        key: 6,
        on: {
          "mousedown": _m4 || ($ctx._m4 = api_bind($cmp.handleDrag)),
          "change": _m5 || ($ctx._m5 = api_bind($cmp.onChange))
        }
      }, []), api_element("span", {
        classMap: {
          "slds-swatch": true
        },
        style: $cmp.thumbnailStyle,
        attrs: {
          "data-id": "color-preview"
        },
        key: 8
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        attrs: {
          "aria-hidden": "true"
        },
        key: 7
      }, [api_dynamic($cmp._hex)])])]), api_element("div", {
        classMap: {
          "slds-color-picker__custom-inputs": true
        },
        key: 29
      }, [api_element("div", {
        classMap: {
          "slds-form-element": true,
          "slds-color-picker__input-custom-hex": true
        },
        key: 13
      }, [api_element("label", {
        classMap: {
          "slds-form-element__label": true
        },
        attrs: {
          "for": `${api_scoped_id("input")}`
        },
        key: 10
      }, [api_dynamic($cmp.i18n.hexLabel)]), api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 12
      }, [api_element("input", {
        classMap: {
          "slds-input": true
        },
        attrs: {
          "data-primary-input": true,
          "type": "text",
          "id": api_scoped_id("input"),
          "minlength": "4",
          "maxlength": "7",
          "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
          "placeholder": "#FFFFFF"
        },
        props: {
          "value": $cmp._hex
        },
        key: 11,
        on: {
          "change": _m6 || ($ctx._m6 = api_bind($cmp.handleHexChange))
        }
      }, [])])]), api_element("div", {
        classMap: {
          "slds-form-element": true
        },
        key: 18
      }, [api_element("label", {
        classMap: {
          "slds-form-element__label": true
        },
        attrs: {
          "for": `${api_scoped_id("red")}`
        },
        key: 15
      }, [api_element("abbr", {
        attrs: {
          "title": $cmp.i18n.redAbbr
        },
        key: 14
      }, [api_dynamic($cmp.i18n.rInput)])]), api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 17
      }, [api_element("input", {
        classMap: {
          "slds-input": true
        },
        attrs: {
          "type": "text",
          "id": api_scoped_id("red"),
          "data-color-name": "red",
          "placeholder": "255"
        },
        props: {
          "value": $cmp._rgb.red
        },
        key: 16,
        on: {
          "change": _m7 || ($ctx._m7 = api_bind($cmp.handleRgbChange))
        }
      }, [])])]), api_element("div", {
        classMap: {
          "slds-form-element": true
        },
        key: 23
      }, [api_element("label", {
        classMap: {
          "slds-form-element__label": true
        },
        attrs: {
          "for": `${api_scoped_id("green")}`
        },
        key: 20
      }, [api_element("abbr", {
        attrs: {
          "title": $cmp.i18n.greenAbbr
        },
        key: 19
      }, [api_dynamic($cmp.i18n.gInput)])]), api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 22
      }, [api_element("input", {
        classMap: {
          "slds-input": true
        },
        attrs: {
          "type": "text",
          "id": api_scoped_id("green"),
          "data-color-name": "green",
          "placeholder": "255"
        },
        props: {
          "value": $cmp._rgb.green
        },
        key: 21,
        on: {
          "change": _m8 || ($ctx._m8 = api_bind($cmp.handleRgbChange))
        }
      }, [])])]), api_element("div", {
        classMap: {
          "slds-form-element": true
        },
        key: 28
      }, [api_element("label", {
        classMap: {
          "slds-form-element__label": true
        },
        attrs: {
          "for": `${api_scoped_id("blue")}`
        },
        key: 25
      }, [api_element("abbr", {
        attrs: {
          "title": $cmp.i18n.blueAbbr
        },
        key: 24
      }, [api_dynamic($cmp.i18n.bInput)])]), api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 27
      }, [api_element("input", {
        classMap: {
          "slds-input": true
        },
        attrs: {
          "type": "text",
          "id": api_scoped_id("blue"),
          "data-color-name": "blue",
          "placeholder": "255"
        },
        props: {
          "value": $cmp._rgb.blue
        },
        key: 26,
        on: {
          "change": _m9 || ($ctx._m9 = api_bind($cmp.handleRgbChange))
        }
      }, [])])])]), $cmp._errorMessage ? api_element("div", {
        classMap: {
          "slds-form-element__help": true
        },
        attrs: {
          "aria-live": "assertive"
        },
        key: 30
      }, [api_dynamic($cmp._errorMessage)]) : null])];
    }

    var _tmpl$9 = lwc.registerTemplate(tmpl$8);
    tmpl$8.stylesheets = [];
    tmpl$8.stylesheetTokens = {
      hostAttribute: "lightning-colorPickerCustom_colorPickerCustom-host",
      shadowAttribute: "lightning-colorPickerCustom_colorPickerCustom"
    };

    var labelBInput = 'B';

    var labelBlueAbbr = 'Blue';

    var labelColorPickerInstructions = 'Use arrow keys to select a saturation and brightness, on an x and y axis.';

    var labelErrorMessage = 'Enter a valid hexadecimal value.';

    var labelGInput = 'G';

    var labelGreenAbbr = 'Green';

    var labelHexLabel = 'Hex';

    var labelHueInput = 'Select Hue';

    var labelRInput = 'R';

    var labelRedAbbr = 'Red';

    let idCounter = 0;
    function generateUniqueId(prefix = 'input') {
      idCounter++;
      return `${prefix}-${idCounter}`;
    }

    /**
     Represents an object which keeps track of a user's interacting state.
     @constructor InteractingState
     @param {Object} options - The options object.
     @param {Object} [options.duration=2000] - The number of milliseconds of idle time to wait before exiting the interacting state.
     @param {Object} [options.debounceInteraction=false] - Whether to debounce interaction to ignore consecutive leave-enter interactions.
     **/

    class InteractingState {
      constructor(options) {
        const duration = options && options.duration >= 0 ? options.duration : 2000;
        this.eventemitter = new EventEmitter();
        this._interacting = false;
        this._debouncedLeave = debounce(this.leave.bind(this), duration);
        this._debounceInteraction = options && options.debounceInteraction;
        this._interactedRecently = false;

        if (this._debounceInteraction) {
          // debounce leave until a short time later
          this._debouncedEmitLeave = debounce(() => {
            if (!this._interacting) {
              this._interactedRecently = false;
              this.eventemitter.emit('leave');
            }
          }, 200); // debounce enter until left

          this._debouncedEmitEnter = () => {
            if (!this._interactedRecently) {
              this._interactedRecently = true;
              this.eventemitter.emit('enter');
            }
          };
        }
      }
      /**
       Checks whether or not we are in the interacting state.
       @method InteractingState#isInteracting
       @return {Boolean} - Whether or not we are interacting.
       **/


      isInteracting() {
        return this._interacting;
      }
      /**
       Enters the interacting state.
       @method InteractingState#enter
       @returns {void}
       **/


      enter() {
        if (!this._interacting) {
          this._interacting = true;

          if (this._debounceInteraction) {
            this._debouncedEmitEnter();
          } else {
            this.eventemitter.emit('enter');
          }
        }
      }
      /**
       Registers a handler to execute when we enter the interacting state.
       @method InteractingState#onenter
       @param {Function} handler - The callback function.
       **/


      onenter(handler) {
        this.eventemitter.on('enter', handler);
      }
      /**
       Leaves the interacting state.
       @method InteractingState#leave
       @returns {void}
       **/


      leave() {
        if (this._interacting) {
          this._interacting = false;

          if (this._debounceInteraction) {
            this._debouncedEmitLeave();
          } else {
            this.eventemitter.emit('leave');
          }
        }
      }
      /**
       Registers a handler to execute when we leave the interacting state.
       @method InteractingState#onleave
       @param {Function} handler - The callback function.
       **/


      onleave(handler) {
        this.eventemitter.on('leave', handler);
      }
      /**
       Signals the start of the transition into the interacting state and
       schedules a transition out of the interacting state after an idle
       duration. Calling this method multiple times will reset the timer.
       @method InteractingState#interacting
       @returns {void}
       **/


      interacting() {
        this.enter();

        this._debouncedLeave();
      }

    }
    /**
     Creates a debounced function that delays invoking `func` until after
     `delay` milliseconds have elapsed since the last time the debounced
     function was invoked.
     @function debounce
     @param {Function} func - The function to debounce
     @param {Number} delay - The number of milliseconds to delay
     @param {Object} options - The options object
     @param {Boolean} options.leading - Specify invoking on the leading edge of the timeout
     @return {Function} - debounced function
     **/

    function debounce(func, delay, options) {
      const _options = options || {};

      let invokeLeading = _options.leading;
      let timer;
      return function debounced() {
        const args = Array.prototype.slice.apply(arguments);

        if (invokeLeading) {
          func.apply(this, args);
          invokeLeading = false;
        }

        clearTimeout(timer); // eslint-disable-next-line @lwc/lwc/no-async-operation

        timer = setTimeout(function () {
          func.apply(this, args);
          invokeLeading = _options.leading; // reset for next debounce sequence
        }, delay);
      };
    }

    var labelBadInput = 'Enter a valid value.';

    var labelPatternMismatch = 'Your entry does not match the allowed pattern.';

    var labelRangeOverflow = 'The number is too high.';

    var labelRangeUnderflow = 'The number is too low.';

    var labelStepMismatch = 'Your entry isn\'t a valid increment.';

    var labelTooLong = 'Your entry is too long.';

    var labelTooShort = 'Your entry is too short.';

    var labelTypeMismatch = 'You have entered an invalid format.';

    var labelValueMissing = 'Complete this field.';

    const constraintsSortedByPriority = ['customError', 'badInput', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'];
    const defaultLabels = {
      badInput: labelBadInput,
      customError: labelBadInput,
      patternMismatch: labelPatternMismatch,
      rangeOverflow: labelRangeOverflow,
      rangeUnderflow: labelRangeUnderflow,
      stepMismatch: labelStepMismatch,
      tooLong: labelTooLong,
      tooShort: labelTooShort,
      typeMismatch: labelTypeMismatch,
      valueMissing: labelValueMissing
    };

    function resolveBestMatch(validity) {
      let validityState;

      if (validity && validity.valid === false) {
        validityState = 'badInput';
        constraintsSortedByPriority.some(stateName => {
          if (validity[stateName] === true) {
            validityState = stateName;
            return true;
          }

          return false;
        });
      }

      return validityState;
    }

    function computeConstraint(valueProvider, constraint) {
      const provider = valueProvider[constraint];

      if (typeof provider === 'function') {
        return provider();
      }

      if (typeof provider === 'boolean') {
        return provider;
      }

      return false;
    } // We're doing the below to avoid exposing the constraintsProvider in the ValidityState


    function newValidityState(constraintsProvider) {
      class ValidityState {
        get valueMissing() {
          return computeConstraint(constraintsProvider, 'valueMissing');
        }

        get typeMismatch() {
          return computeConstraint(constraintsProvider, 'typeMismatch');
        }

        get patternMismatch() {
          return computeConstraint(constraintsProvider, 'patternMismatch');
        }

        get tooLong() {
          return computeConstraint(constraintsProvider, 'tooLong');
        }

        get tooShort() {
          return computeConstraint(constraintsProvider, 'tooShort');
        }

        get rangeUnderflow() {
          return computeConstraint(constraintsProvider, 'rangeUnderflow');
        }

        get rangeOverflow() {
          return computeConstraint(constraintsProvider, 'rangeOverflow');
        }

        get stepMismatch() {
          return computeConstraint(constraintsProvider, 'stepMismatch');
        }

        get customError() {
          return computeConstraint(constraintsProvider, 'customError');
        }

        get badInput() {
          return computeConstraint(constraintsProvider, 'badInput');
        }

        get valid() {
          return !(this.valueMissing || this.typeMismatch || this.patternMismatch || this.tooLong || this.tooShort || this.rangeUnderflow || this.rangeOverflow || this.stepMismatch || this.customError || this.badInput);
        }

      }

      return new ValidityState();
    }

    function buildSyntheticValidity(constraintProvider) {
      return Object.freeze(newValidityState(constraintProvider));
    }
    function getErrorMessage(validity, labelMap) {
      const key = resolveBestMatch(validity);

      if (key) {
        return labelMap[key] ? labelMap[key] : defaultLabels[key];
      }

      return '';
    }
    class FieldConstraintApi {
      constructor(inputComponentProvider, constraintProviders) {
        assert(typeof inputComponentProvider === 'function');
        this._inputComponentProvider = inputComponentProvider;
        this._constraintsProvider = Object.assign({}, constraintProviders);

        if (!this._constraintsProvider.customError) {
          this._constraintsProvider.customError = () => typeof this._customValidityMessage === 'string' && this._customValidityMessage !== '';
        }
      }

      get validity() {
        if (!this._constraint) {
          this._constraint = buildSyntheticValidity(this._constraintsProvider);
        }

        return this._constraint;
      }

      checkValidity() {
        const isValid = this.validity.valid;

        if (!isValid) {
          if (this.inputComponent) {
            this.inputComponent.dispatchEvent(new CustomEvent('invalid', {
              cancellable: true
            }));
          }
        }

        return isValid;
      }

      reportValidity(callback) {
        const valid = this.checkValidity(); // the input might have been removed from the DOM by the time we query it

        if (this.inputComponent) {
          this.inputComponent.classList.toggle('slds-has-error', !valid);

          if (callback) {
            callback(this.validationMessage);
          }
        }

        return valid;
      }

      setCustomValidity(message) {
        this._customValidityMessage = message;
      }

      get validationMessage() {
        return getErrorMessage(this.validity, {
          customError: this._customValidityMessage,
          badInput: this.inputComponent.messageWhenBadInput,
          patternMismatch: this.inputComponent.messageWhenPatternMismatch,
          rangeOverflow: this.inputComponent.messageWhenRangeOverflow,
          rangeUnderflow: this.inputComponent.messageWhenRangeUnderflow,
          stepMismatch: this.inputComponent.messageWhenStepMismatch,
          tooShort: this.inputComponent.messageWhenTooShort,
          tooLong: this.inputComponent.messageWhenTooLong,
          typeMismatch: this.inputComponent.messageWhenTypeMismatch,
          valueMissing: this.inputComponent.messageWhenValueMissing
        });
      }

      get inputComponent() {
        if (!this._inputComponentElement) {
          this._inputComponentElement = this._inputComponentProvider();
        }

        return this._inputComponentElement;
      }

    }
    class FieldConstraintApiWithProxyInput {
      constructor(inputComponent, overrides = {}, inputElementName = 'input') {
        this._inputComponent = inputComponent;
        this._overrides = overrides;
        this._proxyInput = document.createElement(inputElementName);
      }

      setInputAttributes(attributes) {
        this._attributes = attributes;

        this._attributeUpdater = attributeNames => {
          if (!attributes) {
            return;
          }

          if (typeof attributeNames === 'string') {
            this._setAttribute(attributeNames, attributes[attributeNames]());
          } else {
            attributeNames.forEach(attributeName => {
              this._setAttribute(attributeName, attributes[attributeName]());
            });
          }
        };

        return this._attributeUpdater;
      }

      get validity() {
        return this._constraintApi.validity;
      }

      checkValidity() {
        return this._constraintApi.checkValidity();
      }

      reportValidity(callback) {
        return this._constraintApi.reportValidity(callback);
      }

      setCustomValidity(message) {
        this._constraintApi.setCustomValidity(message);

        this._proxyInput.setCustomValidity(message);
      }

      get validationMessage() {
        return this._constraintApi.validationMessage;
      }

      _setAttribute(attributeName, value) {
        if (value !== null && value !== undefined && value !== false) {
          if (attributeName === 'value') {
            if (this._proxyInput.type === 'file') {
              // Can't set value on file
              return;
            }

            this._proxyInput.value = value;
          } else {
            this._proxyInput.setAttribute(attributeName, value);
          }
        } else {
          this._removeAttribute(attributeName);
        }
      }

      _removeAttribute(attributeName) {
        this._proxyInput.removeAttribute(attributeName);
      }

      get _constraintApi() {
        if (!this._privateConstraintApi) {
          this._updateAllAttributes();

          const computeConstraintWithProxyInput = constraintName => {
            const constraintOverride = this._overrides[constraintName];

            const isDisabledOrReadOnly = this._proxyInput.hasAttribute('disabled') || this._proxyInput.hasAttribute('readonly');

            if (typeof constraintOverride === 'function') {
              return !isDisabledOrReadOnly && constraintOverride();
            } // Firefox incorrectly computes rangeUnderflow for disabled and readonly inputs, so we're adding
            // a check here instead to always return false when the input has readonly or disabled attributes set


            return !isDisabledOrReadOnly && this._proxyInput.validity[constraintName];
          };

          const constraintsProvider = constraintsSortedByPriority.reduce((provider, constraint) => {
            provider[constraint] = computeConstraintWithProxyInput.bind(this, constraint);
            return provider;
          }, {});
          this._privateConstraintApi = new FieldConstraintApi(this._inputComponent, constraintsProvider);
        }

        return this._privateConstraintApi;
      }

      _updateAllAttributes() {
        if (this._attributes) {
          Object.entries(this._attributes).forEach(([key, valueFunction]) => {
            this._setAttribute(key, valueFunction());
          });
        }
      }

    }

    const VARIANT = {
      STANDARD: 'standard',
      LABEL_HIDDEN: 'label-hidden',
      LABEL_STACKED: 'label-stacked',
      LABEL_INLINE: 'label-inline'
    };
    /**
    A variant normalization utility for attributes.
    @param {Any} value - The value to normalize.
    @return {Boolean} - The normalized value.
    **/

    function normalizeVariant$1(value) {
      return normalizeString(value, {
        fallbackValue: VARIANT.STANDARD,
        validValues: [VARIANT.STANDARD, VARIANT.LABEL_HIDDEN, VARIANT.LABEL_STACKED, VARIANT.LABEL_INLINE]
      });
    }

    function isEmptyString(s) {
      return s === undefined || s === null || typeof s === 'string' && s.trim() === '';
    }

    function fullHexValue(hex) {
      if (Array.isArray(hex) && hex.length > 0) {
        hex = hex[0];
      }

      if (hex && hex.length <= 6 && hex.charAt(0) !== '#') {
        hex = '#' + hex;
      }

      const isInputValid = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

      if (!isInputValid) {
        hex = '#000000';
      } // Converting 3 digit hex color to 6 digit hex color


      if (hex.length === 4) {
        hex = '#' + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2) + hex.charAt(3) + hex.charAt(3);
      }

      return hex;
    }
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHexValue(hex));

      if (!result) {
        return null;
      }

      return {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
      };
    }
    function rgbToHex(rgb) {
      const r = rgb.red;
      const g = rgb.green;
      const b = rgb.blue;
      const bin = r << 16 | g << 8 | b;
      return function (hex) {
        return new Array(7 - hex.length).join('0') + hex;
      }(bin.toString(16).toUpperCase());
    }
    function rgbToHsl(rgb) {
      const r1 = rgb.red / 255;
      const g1 = rgb.green / 255;
      const b1 = rgb.blue / 255;
      const maxColor = Math.max(r1, g1, b1);
      const minColor = Math.min(r1, g1, b1); // Calculate L:

      let L = (maxColor + minColor) / 2;
      let S = 0;
      let H = 0;

      if (maxColor !== minColor) {
        // Calculate S:
        if (L < 0.5) {
          S = (maxColor - minColor) / (maxColor + minColor);
        } else {
          S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        } // Calculate H:


        if (r1 === maxColor) {
          const x = g1 - b1,
                y = maxColor - minColor;
          H = x / y;
        } else if (g1 === maxColor) {
          const x = b1 - r1,
                y = maxColor - minColor,
                z = x / y;
          H = 2.0 + z;
        } else {
          const x = r1 - g1,
                y = maxColor - minColor,
                z = x / y;
          H = 4.0 + z;
        }
      }

      L *= 100;
      S *= 100;
      H *= 60;

      if (H < 0) {
        H += 360;
      }

      const result = {
        hue: H,
        saturation: S,
        lightness: L
      };
      return result;
    }
    function rgbToPosition(rgb, canvas) {
      const hsv = rgbToHsv(rgb);
      const saturation = hsv.saturation / 100,
            brightness = hsv.brightness / 100;
      const x = canvas.x * saturation;
      const y = canvas.y * (1 - brightness);
      return {
        x,
        y
      };
    }
    function rgbToHsv(rgb) {
      const r = rgb.red / 255;
      const g = rgb.green / 255;
      const b = rgb.blue / 255;
      const max = Math.max(r, g, b),
            min = Math.min(r, g, b);
      const d = max - min,
            s = max === 0 ? 0 : d / max,
            v = max;
      let h, x, y;

      if (max === min) {
        h = 0;
      } else {
        switch (max) {
          case r:
            x = g - b;
            y = x / d;
            h = y + (g < b ? 6 : 0);
            break;

          case g:
            x = b - r;
            y = x / d;
            h = y + 2;
            break;

          case b:
            x = r - g;
            y = x / d;
            h = y + 4;
            break;
        }

        h /= 6;
      }

      const result = {
        hue: h * 360,
        saturation: s * 100,
        brightness: v * 100
      };
      return result;
    }

    const i18n$1 = {
      bInput: labelBInput,
      blueAbbr: labelBlueAbbr,
      colorPickerInstructions: labelColorPickerInstructions,
      errorMessage: labelErrorMessage,
      gInput: labelGInput,
      greenAbbr: labelGreenAbbr,
      hexLabel: labelHexLabel,
      hueInput: labelHueInput,
      rInput: labelRInput,
      redAbbr: labelRedAbbr
    };
    const CANVAS = {
      x: 198,
      y: 80
    };

    class LightningColorPickerCustom extends lwc.LightningElement {
      constructor() {
        super();
        this._hueValue = null;
        this._rgb = {
          red: '86',
          green: '121',
          blue: '192'
        };
        this._hex = '#5679C0';
        this._errorMessage = null;
        this._currentColor = null;
        this._initialized = false;
        this.uniqueId = generateUniqueId();
      }

      renderedCallback() {
        if (!this._initialized) {
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          requestAnimationFrame(() => {
            this.focus();
          });
          this.gradient();
          this.handleUpdateAnchor();
          this._initialized = true;
        }
      }

      get currentColor() {
        return this._currentColor;
      }

      set currentColor(value) {
        const fullHex = fullHexValue(value);
        this._currentColor = value;
        this._hex = fullHex;
        this._rgb = hexToRgb(fullHex);
      }

      focus() {
        this.anchorElement.focus();
      }

      get i18n() {
        return i18n$1;
      }

      get thumbnailStyle() {
        return `background: ${this._hex || 'hsl(220, 46%, 55%)'};`;
      }

      get gradientStyle() {
        return `background: ${this._hex || 'rgb(0, 85, 255)'}; position: relative;`;
      }

      get canvasRect() {
        return CANVAS;
      }

      get anchorElement() {
        return this.template.querySelector('*[data-id="color-anchor"]');
      }

      get thumbnailElement() {
        return this.template.querySelector('*[data-id="color-preview"]');
      }

      get gradientElement() {
        return this.template.querySelector('*[data-id="color-gradient"]');
      }

      get computedSaturationAndBrightness() {
        const rgb = this._rgb;
        const saturation = rgbToHsv(rgb).saturation || 0;
        const brightness = rgbToHsv(rgb).brightness || 0;
        return `Saturation: ${saturation.toFixed()}%. Brightness: ${brightness.toFixed()}%.`;
      }

      handlePreventDefault(event) {
        event.preventDefault();
      }

      selectColor(event) {
        this.dispatchEvent( // eslint-disable-next-line lightning-global/no-custom-event-bubbling
        new CustomEvent('updatecolor', {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: {
            color: event.target.innerText
          }
        }));
      }

      handleMouseDown(event) {
        event.preventDefault();
        this.onMouseDrag(event, true);
      }

      handleDrag(event) {
        this.onMouseDrag(event, false);
      }

      onChange() {
        this.rainbowCursor();
      }

      parseAndLimit(value) {
        let out = value;

        if (!value || parseInt(value, 10) < 0 || isNaN(value)) {
          out = 0;
        } else if (parseInt(value, 10) > 255) {
          out = 255;
        }

        return out;
      }

      handleRgbChange(event) {
        const target = event.currentTarget;
        const value = this.parseAndLimit(target.value); // Fix for no rerender on second bad value attempt

        target.value = value;
        const color = target.getAttribute('data-color-name');

        if (color === 'red') {
          this._rgb.red = value;
        } else if (color === 'green') {
          this._rgb.green = value;
        } else if (color === 'blue') {
          this._rgb.blue = value;
        }

        const rgb = this._rgb;
        const hue = rgbToHsl(rgb).hue;
        const position = this.rgbToPosition(rgb);
        const selectedColor = `#${rgbToHex(rgb)}`;
        this.updateRainbow(hue);
        this.setCanvasColor(hue);
        this.setCanvasCursor(position.x, position.y);
        this.updateSelectedColor(selectedColor);
      }

      handleHexChange(event) {
        const isInputValid = event.srcElement.validity.valid;

        if (isInputValid) {
          const selectedColor = fullHexValue(event.target.value);
          this.classList.remove('slds-has-error');
          this._errorMessage = null;
          const rgb = hexToRgb(selectedColor);
          this._rgb = rgb;
          const hue = rgbToHsl(rgb).hue;
          const position = this.rgbToPosition(rgb);
          this.updateRainbow(hue);
          this.setCanvasColor(hue);
          this.setCanvasCursor(position.x, position.y);
          this.updateSelectedColor(selectedColor);
        } else {
          event.srcElement.classList.add('slds-has-error');
          this._errorMessage = getErrorMessage(event.srcElement.validity, {
            patternMismatch: this.i18n.errorMessage
          });
        }
      }

      updateSelectedColor(selectedColor) {
        this.template.querySelector(`[data-primary-input]`).classList.remove('slds-has-error');
        this._errorMessage = null;
        this._hex = selectedColor;
        this.dispatchEvent( // eslint-disable-next-line lightning-global/no-custom-event-bubbling
        new CustomEvent('updateselectedcolor', {
          bubbles: true,
          composed: true,
          cancelable: true,
          detail: {
            color: selectedColor
          }
        }));
      }

      onMouseDrag(event, isGradientCursor) {
        const that = this;
        let drag = false;

        if (isGradientCursor) {
          this.getColorFromGradient(event);
        } else {
          this.rainbowCursor();
        }

        if (this._mousedown && this._mousemove && this._mouseup) {
          return;
        }

        that._mousedown = function () {
          drag = true;
          this._cursorActive = true;
        };

        that._mouseup = function () {
          drag = false;
          this._cursorActive = false;
          window.removeEventListener('mousedown', that._mousedown);
          window.removeEventListener('mouseup', that._mouseup);
          window.removeEventListener('mousemove', that._mousemove);
          that._mousedown = null;
          that._mouseup = null;
          that._mousemove = null;
        };

        that._mousemove = function (evt) {
          if (drag && isGradientCursor) {
            that.getColorFromGradient(evt);
          } else if (drag) {
            that.rainbowCursor();
          }
        };

        window.addEventListener('mousedown', that._mousedown);
        window.addEventListener('mouseup', that._mouseup);
        window.addEventListener('mousemove', that._mousemove);
      }

      gradient() {
        const hue = rgbToHsl(this._rgb).hue;
        this.canvasContext();
        this.setCanvasColor(hue);
        this.updateRainbow(hue);
      }

      getColorFromGradient(event) {
        let cursorPosition;

        if (event.type === 'keydown' && event.key !== 'Tab') {
          cursorPosition = this.gradientCursorPositionFromKeydown(event);
        } else if (event.type === 'mousedown' || event.type === 'mousemove') {
          cursorPosition = this.gradientCursorPosition(event);
        } else {
          return;
        }

        const x = cursorPosition.x;
        const y = cursorPosition.y; // Get the current HUE value and update the canvas & cursor

        this.setCanvasColor(this._hueValue); // set color from gradient

        this.setRGBValues(x, y);
      }

      rainbowCursor() {
        const rainbow = this.template.querySelector('*[data-id="hue-slider"]');
        const position = this._cachePosition || this.rgbToPosition(this._rgb);
        this.setCanvasColor(rainbow.value);
        this.setRGBValues(position.x, position.y);
        this.updateRainbow(rainbow.value);
      }

      updateRainbow(hue) {
        this._hueValue = hue;
      }

      handleUpdateAnchor() {
        const position = this._cachePosition || this.rgbToPosition(this._rgb);
        const anchor = this.anchorElement;
        const offset = anchor.offsetWidth / 2;
        const x = position.x - offset + 5;
        const y = position.y - offset - 5;
        const xPercent = x / this._canvas.width * 100;
        const yPercent = y / this._canvas.height * 100;
        anchor.style.left = `${xPercent}%`;
        anchor.style.top = `${yPercent}%`;
      }

      gradientCursorPosition(event) {
        const canvas = this._canvas;
        const gradientCanvas = canvas.getBoundingClientRect();
        let x = event.clientX - gradientCanvas.left;
        let y = event.clientY - gradientCanvas.top;

        if (x > gradientCanvas.width) {
          x = gradientCanvas.width - 1;
        }

        if (x < 0) {
          x = 0;
        }

        if (y > gradientCanvas.height) {
          y = gradientCanvas.height;
        }

        if (y < 0) {
          y = 0;
        }
        /*
         * Caching the position x & y in the component so that we can use it when moving the rainbow slider
         * instead of calculating the position of x & y each time.
         */


        this._cachePosition = {
          x,
          y
        };
        return {
          x,
          y
        };
      }

      gradientCursorPositionFromKeydown(event) {
        event.preventDefault();
        const canvas = this._canvas;
        const gradientCanvas = canvas.getBoundingClientRect();
        const keyCode = event.keyCode;
        let x, y;

        if (!this._cachePosition) {
          this._cachePosition = this.rgbToPosition(this._rgb);
        }

        const positionMap = {};
        positionMap[keyCodes.left] = {
          x: -1,
          y: 0
        };
        positionMap[keyCodes.up] = {
          x: 0,
          y: -1
        };
        positionMap[keyCodes.right] = {
          x: +1,
          y: 0
        };
        positionMap[keyCodes.down] = {
          x: 0,
          y: +1
        };
        const transform = positionMap[keyCode] ? positionMap[keyCode] : {
          x: 0,
          y: 0
        };
        x = this._cachePosition.x + transform.x;
        y = this._cachePosition.y + transform.y;

        if (x > gradientCanvas.width) {
          x = gradientCanvas.width - 1;
        }

        if (x < 0) {
          x = 0;
        }

        if (y > gradientCanvas.height) {
          y = gradientCanvas.height;
        }

        if (y < 0) {
          y = 0;
        }
        /*
         * Caching the position x & y in the component so that we can use it when moving the rainbow slider
         * instead of calculating the position of x & y each time.
         */


        this._cachePosition = {
          x,
          y
        };
        return {
          x,
          y
        };
      }

      setRGBValues(x, y) {
        const ctx = this._canvasCtx;
        const imageData = ctx.getImageData(x, y, 1, 1).data;
        const rgb = {
          red: imageData[0],
          green: imageData[1],
          blue: imageData[2]
        };
        const color = `#${rgbToHex(rgb)}`;
        this._rgb = rgb;
        this.updateSelectedColor(color);
        this.handleUpdateAnchor();
      }

      setCanvasColor(hue) {
        const ctx = this._canvasCtx; // don't map the gradient onto extreme left and right to make extremes have their max values

        const white = ctx.createLinearGradient(1, 0, this.canvasRect.x - 1, 0);
        white.addColorStop(0, 'rgb(255,255,255)');
        white.addColorStop(1, 'hsl(' + hue + ', 100%, 50%)');
        ctx.fillStyle = white;
        ctx.fillRect(0, 0, this.canvasRect.x, this.canvasRect.y); // starting y is the first line to avoid blending the black into the hue, thus
        // making extreme values unselectable

        const black = ctx.createLinearGradient(0, 1, 0, this.canvasRect.y);
        black.addColorStop(0, 'rgba(0,0,0,0)');
        black.addColorStop(1, 'rgb(0,0,0)');
        ctx.fillStyle = black;
        ctx.fillRect(0, 0, this.canvasRect.x, this.canvasRect.y);
      }

      setCanvasCursor(x, y) {
        const position = {
          x,
          y
        };
        const anchor = this.anchorElement;
        const offset = anchor.offsetWidth / 2;
        x = position.x - offset + 5;
        y = position.y - offset - 5;
        const xPercent = x / this._canvas.width * 100;
        const yPercent = y / this._canvas.height * 100;
        anchor.style.left = `${xPercent}%`;
        anchor.style.top = `${yPercent}%`;
      }

      canvasContext() {
        this._canvas = this.template.querySelector('canvas');
        this._canvasCtx = this._canvas.getContext('2d');
        this._cursorActive = false;
      }

      handleKeydown(event) {
        this.getColorFromGradient(event);
      }

      rgbToPosition(rgb) {
        return rgbToPosition(rgb, this.canvasRect);
      }

    }

    lwc.registerDecorators(LightningColorPickerCustom, {
      publicProps: {
        currentColor: {
          config: 3
        }
      },
      publicMethods: ["focus"],
      track: {
        _hueValue: 1,
        _rgb: 1,
        _hex: 1,
        _errorMessage: 1,
        _currentColor: 1
      },
      fields: ["_initialized"]
    });

    var _lightningColorPickerCustom = lwc.registerComponent(LightningColorPickerCustom, {
      tmpl: _tmpl$9
    });

    function tmpl$9($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        gid: api_scoped_id,
        h: api_element,
        d: api_dynamic,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3
      } = $ctx;
      return [api_element("section", {
        classMap: {
          "slds-popover": true,
          "slds-color-picker__selector": true,
          "slds-show": true,
          "slds-is-absolute": true
        },
        attrs: {
          "role": "dialog",
          "aria-label": "Choose a color",
          "aria-describedby": `${api_scoped_id("dialog-body-id")}`
        },
        key: 6,
        on: {
          "updateselectedcolor": _m2 || ($ctx._m2 = api_bind($cmp.handleUpdateSelectedColor)),
          "keydown": _m3 || ($ctx._m3 = api_bind($cmp.handleKeydown))
        }
      }, [api_element("div", {
        classMap: {
          "slds-popover__body": true
        },
        attrs: {
          "id": api_scoped_id("dialog-body-id")
        },
        key: 1
      }, [api_custom_element("lightning-color-picker-custom", _lightningColorPickerCustom, {
        props: {
          "currentColor": $cmp.currentColor
        },
        key: 0
      }, [])]), api_element("footer", {
        classMap: {
          "slds-popover__footer": true
        },
        key: 5
      }, [api_element("div", {
        classMap: {
          "slds-color-picker__selector-footer": true
        },
        key: 4
      }, [api_element("button", {
        classMap: {
          "slds-button": true,
          "slds-button_neutral": true
        },
        attrs: {
          "name": "cancel"
        },
        key: 2,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.handleCancelClick))
        }
      }, [api_dynamic($cmp.i18n.cancelButton)]), api_element("button", {
        classMap: {
          "slds-button": true,
          "slds-button_brand": true
        },
        attrs: {
          "name": "done"
        },
        key: 3,
        on: {
          "click": _m1 || ($ctx._m1 = api_bind($cmp.handleDoneClick))
        }
      }, [api_dynamic($cmp.i18n.doneButton)])])])])];
    }

    var _tmpl$a = lwc.registerTemplate(tmpl$9);
    tmpl$9.stylesheets = [];
    tmpl$9.stylesheetTokens = {
      hostAttribute: "lightning-colorPickerPanel_colorPickerPanel-host",
      shadowAttribute: "lightning-colorPickerPanel_colorPickerPanel"
    };

    var labelCancelButton = 'Cancel';

    var labelCustomTab = 'Custom';

    var labelDefaultTab = 'Default';

    var labelDoneButton = 'Done';

    const i18n$2 = {
      cancelButton: labelCancelButton,
      customTab: labelCustomTab,
      defaultTab: labelDefaultTab,
      doneButton: labelDoneButton
    };
    const DEFAULT_COLOR = '#000000';

    class LightningColorPickerPanel extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.currentColor = void 0;
        this._isCustomTabActive = false;
        this._selectedColor = null;
      }

      connectedCallback() {
        this._selectedColor = this.currentColor || DEFAULT_COLOR;
      }

      get i18n() {
        return i18n$2;
      }

      get computedClassDefault() {
        return classSet({
          'slds-tabs_default__item': true,
          'slds-is-active': !this._isCustomTabActive
        }).toString();
      }

      get computedClassCustom() {
        return classSet({
          'slds-tabs_default__item': true,
          'slds-is-active': this._isCustomTabActive
        }).toString();
      }

      get ariaSelectedDefault() {
        return !this._isCustomTabActive.toString();
      }

      get ariaSelectedCustom() {
        return this._isCustomTabActive.toString();
      }

      handleTabChange(event) {
        event.preventDefault();
        const tabElement = event.currentTarget;

        if (tabElement.classList.contains('slds-is-active')) {
          return;
        }

        this._isCustomTabActive = tabElement.title !== i18n$2.defaultTab;
      }

      handleUpdateSelectedColor(event) {
        this._selectedColor = event.detail.color;
      }

      dispatchUpdateColorEventWithColor(color) {
        this.dispatchEvent( // eslint-disable-next-line lightning-global/no-custom-event-bubbling
        new CustomEvent('updatecolor', {
          composed: true,
          bubbles: true,
          detail: {
            color
          }
        }));
      }

      handleDoneClick() {
        this.dispatchUpdateColorEventWithColor(this._selectedColor);
      }

      handleCancelClick() {
        this.dispatchUpdateColorEventWithColor(this.currentColor);
      }

      handleKeydown(event) {
        if (event.keyCode === keyCodes.escape) {
          event.preventDefault();
          this.dispatchUpdateColorEventWithColor(this.currentColor);
        } else if (event.shiftKey && event.keyCode === keyCodes.tab && event.srcElement.dataset.id === 'color-anchor') {
          event.preventDefault();
          this.template.querySelector('button[name="done"]').focus();
        } else if (!event.shiftKey && event.keyCode === keyCodes.tab && event.srcElement.name === 'done') {
          event.preventDefault();
          this.template.querySelector('lightning-color-picker-custom').focus();
        }
      }

    }

    lwc.registerDecorators(LightningColorPickerPanel, {
      publicProps: {
        currentColor: {
          config: 0
        }
      },
      track: {
        _isCustomTabActive: 1,
        _selectedColor: 1
      }
    });

    var _lightningColorPickerPanel = lwc.registerComponent(LightningColorPickerPanel, {
      tmpl: _tmpl$a
    });

    function tmpl$a($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element,
        c: api_custom_element,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("button", {
        classMap: {
          "slds-button": true,
          "slds-color-picker__summary-button": true,
          "slds-button_icon": true,
          "slds-button_icon-more": true
        },
        attrs: {
          "type": "button"
        },
        props: {
          "disabled": $cmp.disabled
        },
        key: 4,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.handleColorPickerToggleClick))
        }
      }, [api_element("span", {
        classMap: {
          "slds-swatch": true
        },
        style: $cmp.colorInputStyle,
        attrs: {
          "data-id": "thumbnail"
        },
        key: 1
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 0
      }, [api_dynamic($cmp.i18n.a11yTriggerText)])]), api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": "utility:down",
          "svgClass": "slds-button__icon slds-button__icon_small",
          "variant": "bare"
        },
        key: 2
      }, []), api_element("span", {
        classMap: {
          "slds-assistive-text": true,
          "a11y-color-value": true
        },
        key: 3
      }, [api_dynamic($cmp.value)])]), $cmp._isColorPickerPanelOpen ? api_custom_element("lightning-color-picker-panel", _lightningColorPickerPanel, {
        classMap: {
          "color-picker-panel": true
        },
        props: {
          "currentColor": $cmp.value
        },
        key: 5,
        on: {
          "updatecolor": _m1 || ($ctx._m1 = api_bind($cmp.handleUpdateColorEvent))
        }
      }, []) : null];
    }

    var _tmpl$b = lwc.registerTemplate(tmpl$a);
    tmpl$a.stylesheets = [];
    tmpl$a.stylesheetTokens = {
      hostAttribute: "lightning-primitiveColorpickerButton_primitiveColorpickerButton-host",
      shadowAttribute: "lightning-primitiveColorpickerButton_primitiveColorpickerButton"
    };

    var labelA11yTriggerText = 'Choose a color. Current color: ';

    const i18n$3 = {
      a11yTriggerText: labelA11yTriggerText
    };

    class PrimitiveColorpickerButton extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._isColorPickerPanelOpen = false;
        this._value = '';
        this._disabled = false;
      }

      get value() {
        return this._value;
      }

      set value(value) {
        this._value = value;
      }
      /**
       * If present, the input field is disabled and users cannot interact with it.
       * @type {boolean}
       * @default false
       */


      get disabled() {
        return this._disabled;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);
      }

      focus() {
        const button = this.template.querySelector('button');
        return button && button.focus();
      }

      blur() {
        const button = this.template.querySelector('button');
        return button && button.blur();
      }

      get colorInputStyle() {
        return `background: ${this.value || '#5679C0'};`;
      }

      handleColorPickerToggleClick(event) {
        event.preventDefault();
        this._isColorPickerPanelOpen = !this._isColorPickerPanelOpen;

        if (this._isColorPickerPanelOpen) {
          this.startColorPickerPositioning();
        } else {
          this.stopColorPickerPositioning();
        }
      }

      startColorPickerPositioning() {
        if (!this._autoPosition) {
          this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
          target: () => this.template.querySelector('button.slds-color-picker__summary-button'),
          element: () => this.template.querySelector('lightning-color-picker-panel').shadowRoot.querySelector('section'),
          align: {
            horizontal: Direction.Left,
            vertical: Direction.Top
          },
          targetAlign: {
            horizontal: Direction.Left,
            vertical: Direction.Bottom
          },
          autoFlip: true
        });
      }

      stopColorPickerPositioning() {
        if (this._autoPosition) {
          this._autoPosition.stop();
        }
      }

      handleUpdateColorEvent(event) {
        event.stopPropagation();
        const detail = event.detail;
        this._isColorPickerPanelOpen = false;
        this.stopColorPickerPositioning();
        this.dispatchEvent(new CustomEvent('change', {
          detail
        }));
      }

      get i18n() {
        return i18n$3;
      }

    }

    PrimitiveColorpickerButton.delegatesFocus = true;

    lwc.registerDecorators(PrimitiveColorpickerButton, {
      publicProps: {
        value: {
          config: 3
        },
        disabled: {
          config: 3
        }
      },
      publicMethods: ["focus", "blur"],
      track: {
        _isColorPickerPanelOpen: 1,
        _value: 1,
        _disabled: 1
      }
    });

    var _lightningPrimitiveColorpickerButton = lwc.registerComponent(PrimitiveColorpickerButton, {
      tmpl: _tmpl$b
    });

    function tmpl$b($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        h: api_element,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("button", {
        className: $cmp.computedButtonClass,
        attrs: {
          "name": $cmp.name,
          "title": $cmp.computedTitle,
          "accesskey": $cmp.computedAccessKey,
          "type": $cmp.normalizedType,
          "value": $cmp.value,
          "aria-label": $cmp.computedAriaLabel,
          "aria-expanded": $cmp.computedAriaExpanded,
          "aria-live": $cmp.computedAriaLive,
          "aria-atomic": $cmp.computedAriaAtomic
        },
        props: {
          "disabled": $cmp.disabled
        },
        key: 2,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleFocus)),
          "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleBlur))
        }
      }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.iconName,
          "svgClass": $cmp.computedIconClass,
          "variant": "bare"
        },
        key: 0
      }, []), $cmp.alternativeText ? api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 1
      }, [api_dynamic($cmp.alternativeText)]) : null])];
    }

    var _tmpl$c = lwc.registerTemplate(tmpl$b);
    tmpl$b.stylesheets = [];
    tmpl$b.stylesheetTokens = {
      hostAttribute: "lightning-buttonIcon_buttonIcon-host",
      shadowAttribute: "lightning-buttonIcon_buttonIcon"
    };

    const DEFAULT_SIZE = 'medium';
    const DEFAULT_VARIANT = 'border';
    const DEFAULT_TYPE = 'button';
    /**
     * An icon-only HTML button.
     */

    class LightningButtonIcon extends LightningPrimitiveButton$1 {
      constructor(...args) {
        super(...args);
        this.name = void 0;
        this.value = void 0;
        this.variant = DEFAULT_VARIANT;
        this.iconName = void 0;
        this.iconClass = void 0;
        this.size = DEFAULT_SIZE;
        this.type = DEFAULT_TYPE;
        this.alternativeText = void 0;
        this._order = null;
        this._tooltip = null;
      }

      // remove-next-line-for-c-namespace

      /**
       * Text to display when the user mouses over or focuses on the button.
       * The tooltip is auto-positioned relative to the button and screen space.
       * @type {string}
       * @param {string} value - The plain text string for the tooltip
       */
      set tooltip(value) {
        if (this._tooltip) {
          this._tooltip.value = value;
        } else if (value) {
          // Note that because the tooltip target is a child element it may not be present in the
          // dom during initial rendering.
          this._tooltip = new Tooltip(value, {
            root: this,
            target: () => this.template.querySelector('button')
          });

          this._tooltip.initialize();
        }
      } // remove-next-line-for-c-namespace


      get tooltip() {
        return this._tooltip ? this._tooltip.value : undefined;
      }

      // this is there because raptor currently doesnt support inheritance
      render() {
        return _tmpl$c;
      }

      get computedTitle() {
        return this.state.title || this.alternativeText || '';
      }

      get normalizedVariant() {
        return normalizeString(this.variant, {
          fallbackValue: DEFAULT_VARIANT,
          validValues: ['bare', 'brand', 'container', 'border', 'border-filled', 'bare-inverse', 'border-inverse']
        });
      }

      get normalizedType() {
        return normalizeString(this.type, {
          fallbackValue: DEFAULT_TYPE,
          validValues: ['button', 'reset', 'submit']
        });
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: DEFAULT_SIZE,
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      getVariantBase() {
        return this.normalizedVariant.split('-')[0];
      }

      getVariantModifier() {
        return this.normalizedVariant.split('-')[1] || '';
      }

      get computedButtonClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const isBare = this.getVariantBase(normalizedSize) === 'bare';
        const classes = classSet('slds-button');
        classes.add('slds-button_icon');

        if (!isBare) {
          // If the variant is not bare, then size the button instead of the icon
          switch (normalizedSize) {
            case 'small':
              classes.add('slds-button_icon-small');
              break;

            case 'x-small':
              classes.add('slds-button_icon-x-small');
              break;

            case 'xx-small':
              classes.add('slds-button_icon-xx-small');
              break;

            case 'large':
              // There is no `large` modifier for buttons so we should drop down one size to `medium`
              console.warn(`<lightning-button-icon> The non-bare variants of buttonIcon do not support a size value of "large". Supported values include "xx-small", "x-small", "small", and "medium". Falling back to size value "medium".`);
          }
        }

        return classes.add({
          'slds-button_icon-bare': isBare,
          'slds-button_icon-container': normalizedVariant === 'container',
          'slds-button_icon-border': normalizedVariant === 'border',
          'slds-button_icon-border-filled': normalizedVariant === 'border-filled',
          'slds-button_icon-border-inverse': normalizedVariant === 'border-inverse',
          'slds-button_icon-inverse': normalizedVariant === 'bare-inverse',
          'slds-button_icon-brand': normalizedVariant === 'brand',
          'slds-button_first': this._order === 'first',
          'slds-button_middle': this._order === 'middle',
          'slds-button_last': this._order === 'last'
        }).toString();
      }

      get computedIconClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const isBare = this.getVariantBase(normalizedVariant) === 'bare';
        const iconClass = this.iconClass || '';
        const classes = classSet('slds-button__icon');
        classes.add(iconClass);

        if (isBare) {
          // If the variant is bare, then size the icon instead of the button
          switch (normalizedSize) {
            case 'large':
              classes.add('slds-button__icon_large');
              break;

            case 'small':
              classes.add('slds-button__icon_small');
              break;

            case 'xx-small':
              // There is no `xx-small` modifier for bare so we should drop down one size to `x-small`
              console.warn(`<lightning-button-icon> The bare variant of buttonIcon does not support a size value of "xx-small". Supported values include "x-small", "small", "medium", and "large". The default is "medium".`);

            /* falls through */

            case 'x-small':
              classes.add('slds-button__icon_x-small');
              break;
          }
        }

        if (this.getVariantModifier(normalizedVariant) === 'inverse') {
          classes.add('slds-button_icon-inverse');
        }

        return classes.toString();
      }

      handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
      }
      /**
       * Sets focus on the button.
       */


      focus() {
        if (this._connected) {
          this.template.querySelector('button').focus();
        }
      }
      /**
       * Clicks the button.
       */


      click() {
        if (this._connected) {
          this.template.querySelector('button').click();
        }
      }
      /**
       * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
       * @param {String} order -  The order string (first, middle, last)
       */


      setOrder(order) {
        this._order = order;
      }
      /**
       * Once we are connected, we fire a register event so the button-group (or other) component can register
       * the buttons.
       */


      connectedCallback() {
        this._connected = true;
        const privatebuttonregister = new CustomEvent('privatebuttonregister', {
          bubbles: true,
          detail: {
            callbacks: {
              setOrder: this.setOrder.bind(this),
              setDeRegistrationCallback: deRegistrationCallback => {
                this._deRegistrationCallback = deRegistrationCallback;
              }
            }
          }
        });
        this.dispatchEvent(privatebuttonregister);
      } // remove-next-line-for-c-namespace


      renderedCallback() {
        // initialize aria attributes in primitiveButton
        super.renderedCallback();

        if (this._tooltip && !this._tooltip.initialized) {
          this._tooltip.initialize();
        }
      }

      disconnectedCallback() {
        this._connected = false;

        if (this._deRegistrationCallback) {
          this._deRegistrationCallback();
        }
      }

    }

    LightningButtonIcon.delegatesFocus = true;

    lwc.registerDecorators(LightningButtonIcon, {
      publicProps: {
        name: {
          config: 0
        },
        value: {
          config: 0
        },
        variant: {
          config: 0
        },
        iconName: {
          config: 0
        },
        iconClass: {
          config: 0
        },
        size: {
          config: 0
        },
        type: {
          config: 0
        },
        alternativeText: {
          config: 0
        },
        tooltip: {
          config: 3
        }
      },
      publicMethods: ["focus", "click"],
      track: {
        _order: 1
      },
      fields: ["_tooltip"]
    });

    var _lightningButtonIcon = lwc.registerComponent(LightningButtonIcon, {
      tmpl: _tmpl$c
    });

    function stylesheet$3(hostSelector, shadowSelector, nativeShadow) {
      return "[dir=\"rtl\"] .slds-dropdown_left" + shadowSelector + " {left: 0;right: auto;}\n";
    }
    var _implicitStylesheets$3 = [stylesheet$3];

    function tmpl$c($api, $cmp, $slotset, $ctx) {
      const {
        ti: api_tab_index,
        b: api_bind,
        h: api_element,
        s: api_slot
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3
      } = $ctx;
      return [api_element("div", {
        attrs: {
          "tabindex": api_tab_index($cmp._bookendTabIndex),
          "data-start": true
        },
        key: 0,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp._focusLastElement))
        }
      }, []), api_slot("", {
        key: 1,
        on: {
          "focusin": _m1 || ($ctx._m1 = api_bind($cmp._handleFocusIn)),
          "focusout": _m2 || ($ctx._m2 = api_bind($cmp._handleFocusOut))
        }
      }, [], $slotset), api_element("div", {
        attrs: {
          "tabindex": api_tab_index($cmp._bookendTabIndex),
          "data-end": true
        },
        key: 2,
        on: {
          "focus": _m3 || ($ctx._m3 = api_bind($cmp._focusFirstElement))
        }
      }, [])];
    }

    var _tmpl$d = lwc.registerTemplate(tmpl$c);
    tmpl$c.slots = [""];
    tmpl$c.stylesheets = [];
    tmpl$c.stylesheetTokens = {
      hostAttribute: "lightning-focusTrap_focusTrap-host",
      shadowAttribute: "lightning-focusTrap_focusTrap"
    };

    /**
     *
     * Returns all tabbable elements within a containing element. Tabbable elements are:
     * a visible/non-disabled element that has a tabIndex of 0 and is not within a custom
     * element with tabindex attribute of “-1" on it.
     *
     * @param {Element} container The element to search for tabbable element.
     * @returns {Array} Tabbable elements.
     */
    function findAllTabbableElements(container) {
      const result = [];
      traverseActiveTreeRecursively(container, element => {
        // Remove the try/catch once https://github.com/salesforce/lwc/issues/1421 is fixed
        try {
          if (isTabbable({
            element,
            rootContainer: container
          })) {
            result.push(element);
          }
        } catch (e) {
          console.warn(e);
        }
      });
      return result;
    }
    /**
     * Recursively traverse an active tree and run callback on each non-inert node element.
     *
     * @param {Node} node The starting node to recursively traverse.
     * @param {Function} callback Function to call on each node element.
     */

    function traverseActiveTreeRecursively(node, callback) {
      if (!node) {
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        // inert is only supported by Chrome for now (behind a flag)
        if (node.hasAttribute('inert')) {
          return;
        }

        if (isIframe(node)) {
          if (isIframeOfSameOrigin(node)) {
            // for a same-origin iframe, we don't want to include the
            // iframe itself in the list, since we can see any of the
            // frames focusable children. So, skip calling callback on
            // the iframe node, and proceed to traverse it's children.
            traverseActiveTreeRecursively(node.contentDocument, callback);
          } else {
            // a non same-origin iframe is totally opaque, so include the
            // iframe in the results, but do no try to traverse into the
            // iframes children
            if (callback) {
              callback(node);
            }
          }

          return;
        }

        if (callback) {
          callback(node);
        } // If the element has a shadow root, traverse that


        if (node.shadowRoot) {
          traverseActiveTreeRecursively(node.shadowRoot, callback);
          return;
        } // if it's a slot element, get all assigned nodes and traverse them


        if (node.localName === 'slot') {
          const slottedNodes = node.assignedNodes({
            flatten: true
          });

          for (let i = 0; i < slottedNodes.length; i++) {
            traverseActiveTreeRecursively(slottedNodes[i], callback);
          }

          return;
        }
      }

      let child = node.firstChild;

      while (child !== null) {
        traverseActiveTreeRecursively(child, callback);
        child = child.nextSibling;
      }
    } // returns true if iframe is same origin, and therefore, can focus its internal elements


    function isIframe(node) {
      return node.tagName === 'IFRAME' || node instanceof HTMLIFrameElement;
    }

    function isIframeOfSameOrigin(iframe) {
      // if we can access contentDocument (is not null) on the iframe, then it is of same origin
      return !!iframe.contentDocument;
    }

    const ELEMENTS_WITH_DISABLED_ATTRIBUTE = ['button', 'select', 'textarea', 'input']; // https://html.spec.whatwg.org/multipage/interaction.html#dom-tabindex

    const ELEMENTS_WITH_TABINDEX_ZERO_BY_DEFAULT = ['a', 'select', 'textarea', 'input', 'button', 'iframe', 'object', 'area', 'frame'];

    function isTabbable({
      element,
      rootContainer
    }) {
      const elementLocalName = element.localName;

      if (elementLocalName === 'input' && elementLocalName.type === 'hidden') {
        return false;
      }

      const tabIndexAttribute = element.getAttribute('tabindex');

      if (tabIndexAttribute === '-1') {
        return false;
      }

      if (element.disabled && ELEMENTS_WITH_DISABLED_ATTRIBUTE.includes(element.localName)) {
        return false;
      } // Either the attribute was set directly to '0' or it's an element that has tabIndex zero by default


      const hasTabIndexZero = tabIndexAttribute === '0' || element.tabIndex === 0 && ELEMENTS_WITH_TABINDEX_ZERO_BY_DEFAULT.includes(element.localName);
      return hasTabIndexZero && isElementVisible(element) && isParentCustomElementTabbable({
        element,
        rootContainer
      });
    }

    function isElementVisible(element) {
      const {
        width,
        height
      } = element.getBoundingClientRect();
      const nonZeroSize = width > 0 || height > 0;
      return nonZeroSize && getComputedStyle(element).visibility !== 'hidden';
    }

    function isParentCustomElementTabbable({
      element,
      rootContainer
    }) {
      const parentRoot = rootContainer.getRootNode();
      const ownerDocument = element.ownerDocument;
      let root = element.getRootNode();

      while (root !== parentRoot && root !== ownerDocument) {
        const host = root.host;

        if (host.getAttribute('tabindex') === '-1') {
          return false;
        }

        root = host && host.getRootNode();
      }

      return true;
    }

    class FocusTrap extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._startNode = void 0;
        this._endNode = void 0;
        this._focused = false;
        this._initialized = false;
        this._pendingFocusOut = false;
      }

      renderedCallback() {
        if (!this._initialized) {
          this._initialized = true;
          this._startNode = this.template.querySelector('[data-start]');
          this._endNode = this.template.querySelector('[data-end]');
        }
      }
      /**
       * Focuses the first focusable element in the focus trap.
       */


      focus() {
        if (!this._focused) {
          // We could potentially add support for focusing the element that has 'autofocus' attribute on it,
          // and if none, then focus on the first element
          this._focusFirstElement();
        }
      }

      get _bookendTabIndex() {
        return this._focused ? '0' : '-1';
      }

      _handleFocusIn() {
        if (this._pendingFocusOut) {
          this._pendingFocusOut = false;
        }

        this._focused = true;
      }

      _handleFocusOut() {
        // This assumes that a focusin will be dispatched after a focusout
        this._pendingFocusOut = true; // eslint-disable-next-line @lwc/lwc/no-async-operation

        requestAnimationFrame(() => {
          if (this._pendingFocusOut) {
            this._focused = false;
          }
        });
      }
      /**
       * Focuses on the specified element location.
       * @param {String} elementLocation Could be 'first or 'last'.
       */


      _moveFocusTo(elementLocation) {
        const focusableElements = this._getFocusableElements();

        if (focusableElements.length > 0) {
          let node;

          if (elementLocation === 'last') {
            node = focusableElements[focusableElements.length - 1];
          } else if (elementLocation === 'first') {
            node = focusableElements[0];
          }

          node.focus();
        }
      }
      /**
       * Focuses the last focusable element in the focus trap.
       */


      _focusFirstElement() {
        this._moveFocusTo('first');
      }
      /**
       * Focuses the last focusable element in the focus trap.
       */


      _focusLastElement() {
        this._moveFocusTo('last');
      }
      /**
       * Returns a list of the focusable children found within the element.
       */


      _getFocusableElements() {
        return findAllTabbableElements(this.template.querySelector('slot'));
      }

    }

    lwc.registerDecorators(FocusTrap, {
      publicMethods: ["focus"],
      fields: ["_startNode", "_endNode", "_focused", "_initialized", "_pendingFocusOut"]
    });

    var _lightningFocusTrap = lwc.registerComponent(FocusTrap, {
      tmpl: _tmpl$d
    });

    function tmpl$d($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element,
        d: api_dynamic,
        gid: api_scoped_id,
        c: api_custom_element,
        k: api_key,
        i: api_iterator,
        ti: api_tab_index,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1,
        _m2
      } = $ctx;
      return [api_element("label", {
        className: $cmp.computedLabelClass,
        attrs: {
          "for": `${api_scoped_id("select")}`
        },
        key: 1
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 0
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]), $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp.fieldLevelHelp
        },
        key: 2
      }, []) : null, api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 6
      }, [api_element("div", {
        classMap: {
          "slds-select_container": true
        },
        key: 5
      }, [api_element("select", {
        classMap: {
          "slds-select": true
        },
        attrs: {
          "id": api_scoped_id("select"),
          "name": $cmp.name,
          "size": $cmp.size,
          "accesskey": $cmp.accessKey,
          "tabindex": api_tab_index($cmp.tabIndex)
        },
        props: {
          "disabled": $cmp.disabled,
          "multiple": $cmp.multiple
        },
        key: 4,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleFocus)),
          "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleBlur)),
          "change": _m2 || ($ctx._m2 = api_bind($cmp.handleChange))
        }
      }, api_iterator($cmp.options, function (option) {
        return api_element("option", {
          attrs: {
            "value": option.value
          },
          key: api_key(3, option.value)
        }, [api_dynamic(option.label)]);
      }))])]), $cmp.errorMessage ? api_element("div", {
        classMap: {
          "slds-form-element__help": true
        },
        attrs: {
          "id": api_scoped_id("help-message"),
          "data-help-message": true,
          "aria-live": "assertive"
        },
        key: 7
      }, [api_dynamic($cmp.errorMessage)]) : null];
    }

    var _tmpl$e = lwc.registerTemplate(tmpl$d);
    tmpl$d.stylesheets = [];
    tmpl$d.stylesheetTokens = {
      hostAttribute: "lightning-primitiveSelect_primitiveSelect-host",
      shadowAttribute: "lightning-primitiveSelect_primitiveSelect"
    };

    var labelRequired = 'required';

    const i18n$4 = {
      required: labelRequired
    };
    const {
      reduce: ArrayReduce
    } = Array.prototype;

    class LightningPrimitiveSelect extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._errorMessage = '';
        this._options = [];
        this._selectedValue = void 0;
        this._variant = void 0;
        this._required = false;
        this._disabled = false;
        this._multiple = false;
        this._fieldLevelHelp = void 0;
        this._size = void 0;
        this._ariaDescribedBy = void 0;
        this._tabIndex = void 0;
        this.label = void 0;
        this.name = void 0;
        this.messageWhenValueMissing = void 0;
        this.accessKey = void 0;
      }

      set fieldLevelHelp(value) {
        this._fieldLevelHelp = value;
      }

      get fieldLevelHelp() {
        return this._fieldLevelHelp;
      }

      set variant(value) {
        this._variant = normalizeVariant$1(value);
        this.updateClassList();
      }

      get variant() {
        return this._variant || VARIANT.STANDARD;
      }

      set multiple(value) {
        this._multiple = normalizeBoolean(value);
      }

      get multiple() {
        return this._multiple;
      }

      set size(newValue) {
        this._size = newValue;
      }

      get size() {
        if (!this.multiple) {
          return null;
        }

        if (this._size === undefined) {
          return '4';
        }

        return this._size;
      }

      set required(value) {
        this._required = normalizeBoolean(value);
      }

      get required() {
        return this._required;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);
      }

      get disabled() {
        return this._disabled;
      }

      set value(newValue) {
        this._selectedValue = newValue;

        if (this.connected && newValue) {
          this.selectOptionsByValue(newValue);
        }
      }

      get value() {
        return this._selectedValue;
      }

      set options(newValue) {
        this._options = newValue;

        if (this.connected && newValue) {
          this.selectOptionsByValue(this._selectedValue);
        }
      }

      get options() {
        return this._options;
      }

      get tabIndex() {
        return this._tabIndex;
      }

      set tabIndex(newValue) {
        this._tabIndex = newValue;
      }

      connectedCallback() {
        this.classList.add('slds-form-element');
        this.updateClassList();
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this.connected = true;
      }

      updateClassList() {
        classListMutation(this.classList, {
          'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
          'slds-form-element_horizontal': this.variant === VARIANT.LABEL_INLINE
        });
      }

      renderedCallback() {
        if (this.options && this._selectedValue !== undefined) {
          this.selectOptionsByValue(this._selectedValue);
        }
      }

      disconnectedCallback() {
        this.connected = false;
      }

      focus() {
        if (this.connected) {
          this.getElement.focus();
        }
      }

      blur() {
        if (this.connected) {
          this.getElement.blur();
        }
      }

      get validity() {
        const missing = !this.disabled && this.required && (this._selectedValue == null || this._selectedValue === '' || this._selectedValue.length === 0);
        return buildSyntheticValidity({
          valueMissing: missing,
          customError: this.customErrorMessage != null && this.customErrorMessage !== ''
        });
      }

      checkValidity() {
        const isValid = this.validity.valid;

        if (!isValid) {
          this.dispatchEvent(new CustomEvent('invalid', {
            cancellable: true
          }));
        }

        return isValid;
      }

      reportValidity() {
        this.showHelpMessageIfInvalid();
        return this.checkValidity();
      }

      setCustomValidity(message) {
        this.customErrorMessage = message;
      }

      showHelpMessageIfInvalid() {
        const validity = this.validity;

        if (validity.valid) {
          this._errorMessage = '';
          this.classList.remove('slds-has-error');
          this.removeAriaDescribedBy();
        } else {
          this.classList.add('slds-has-error');
          this._errorMessage = getErrorMessage(validity, {
            valueMissing: this.messageWhenValueMissing,
            customError: this.customErrorMessage
          });
          this.setAriaDescribedBy(this.computedUniqueErrorMessageElementId);
        }
      }

      get i18n() {
        return i18n$4;
      }

      get errorMessage() {
        return this._errorMessage;
      }

      get getElement() {
        return this.template.querySelector('select');
      }

      get computedUniqueErrorMessageElementId() {
        return getRealDOMId(this.template.querySelector('[data-help-message]'));
      }

      get isLabelHidden() {
        return this.variant === VARIANT.LABEL_HIDDEN;
      }

      get computedLabelClass() {
        return classSet('slds-form-element__label').add({
          'slds-assistive-text': this.isLabelHidden
        }).toString();
      }

      get computedAriaDescribedBy() {
        return this._ariaDescribedBy;
      }

      handleChange(event) {
        event.preventDefault();
        event.stopPropagation();
        this._selectedValue = this.getSelectedOptionValues();
        this.dispatchChangeEvent();
      }

      handleFocus() {
        this.interactingState.enter();
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleBlur() {
        this.interactingState.leave();
        this.dispatchEvent(new CustomEvent('blur'));
      }

      dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
          composed: true,
          bubbles: true,
          detail: {
            value: this._selectedValue
          }
        }));
      }

      selectOptionsByValue(optionValue) {
        if (this.multiple) {
          if (Array.isArray(optionValue)) {
            const options = this.template.querySelectorAll('option');
            options.forEach(option => {
              option.selected = optionValue.includes(option.value);
            });
          }
        } else {
          this.getElement.value = optionValue;
        }
      }

      getSelectedOptionValues() {
        if (this.multiple) {
          const options = this.template.querySelectorAll('option');
          return ArrayReduce.call(options, (selectedValues, option) => {
            if (option.selected) {
              selectedValues.push(option.value);
            }

            return selectedValues;
          }, []);
        }

        return this.getElement.value;
      }

      setAriaDescribedBy(val) {
        this.getElement.setAttribute('aria-describedby', val);
      }

      removeAriaDescribedBy() {
        this.getElement.removeAttribute('aria-describedby');
      }

    }

    lwc.registerDecorators(LightningPrimitiveSelect, {
      publicProps: {
        label: {
          config: 0
        },
        name: {
          config: 0
        },
        messageWhenValueMissing: {
          config: 0
        },
        accessKey: {
          config: 0
        },
        fieldLevelHelp: {
          config: 3
        },
        variant: {
          config: 3
        },
        multiple: {
          config: 3
        },
        size: {
          config: 3
        },
        required: {
          config: 3
        },
        disabled: {
          config: 3
        },
        value: {
          config: 3
        },
        options: {
          config: 3
        },
        tabIndex: {
          config: 3
        },
        validity: {
          config: 1
        }
      },
      publicMethods: ["focus", "blur", "checkValidity", "reportValidity", "setCustomValidity", "showHelpMessageIfInvalid"],
      track: {
        _errorMessage: 1,
        _options: 1,
        _selectedValue: 1,
        _variant: 1,
        _required: 1,
        _disabled: 1,
        _multiple: 1,
        _fieldLevelHelp: 1,
        _size: 1,
        _ariaDescribedBy: 1,
        _tabIndex: 1
      }
    });

    var _lightningPrimitiveSelect = lwc.registerComponent(LightningPrimitiveSelect, {
      tmpl: _tmpl$e
    });

    function tmpl$e($api, $cmp, $slotset, $ctx) {
      const {
        b: api_bind,
        c: api_custom_element,
        h: api_element,
        d: api_dynamic,
        gid: api_scoped_id,
        k: api_key,
        i: api_iterator,
        ti: api_tab_index
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5,
        _m6
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-datepicker": true,
          "slds-dropdown": true,
          "slds-dropdown_left": true
        },
        attrs: {
          "aria-hidden": "false",
          "aria-label": $cmp.computedAriaLabel,
          "role": "dialog",
          "tabindex": "-1"
        },
        key: 20
      }, [api_custom_element("lightning-focus-trap", _lightningFocusTrap, {
        key: 19
      }, [api_element("div", {
        classMap: {
          "slds-datepicker__filter": true,
          "slds-grid": true
        },
        key: 8
      }, [api_element("div", {
        classMap: {
          "slds-datepicker__filter_month": true,
          "slds-grid": true,
          "slds-grid_align-spread": true,
          "slds-grow": true
        },
        key: 5
      }, [api_element("div", {
        classMap: {
          "slds-align-middle": true
        },
        key: 1
      }, [api_custom_element("lightning-button-icon", _lightningButtonIcon, {
        props: {
          "iconName": "utility:left",
          "variant": "container",
          "alternativeText": $cmp.i18n.previousMonth
        },
        key: 0,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.goToPreviousMonth))
        }
      }, [])]), api_element("h2", {
        classMap: {
          "slds-align-middle": true
        },
        attrs: {
          "aria-atomic": "true",
          "aria-live": "assertive",
          "id": api_scoped_id("month-title"),
          "data-index": $cmp.monthIndex
        },
        key: 2
      }, [api_dynamic($cmp.computedMonthTitle)]), api_element("div", {
        classMap: {
          "slds-align-middle": true
        },
        key: 4
      }, [api_custom_element("lightning-button-icon", _lightningButtonIcon, {
        props: {
          "iconName": "utility:right",
          "variant": "container",
          "alternativeText": $cmp.i18n.nextMonth
        },
        key: 3,
        on: {
          "click": _m1 || ($ctx._m1 = api_bind($cmp.goToNextMonth))
        }
      }, [])])]), api_element("div", {
        classMap: {
          "slds-shrink-none": true
        },
        key: 7
      }, [api_custom_element("lightning-primitive-select", _lightningPrimitiveSelect, {
        props: {
          "value": $cmp.calendarYear,
          "label": $cmp.i18n.yearSelector,
          "variant": "label-hidden",
          "options": $cmp.computedYearList
        },
        key: 6,
        on: {
          "change": _m2 || ($ctx._m2 = api_bind($cmp.handleYearChange)),
          "click": _m3 || ($ctx._m3 = api_bind($cmp.handleYearSelectClick))
        }
      }, [])])]), api_element("table", {
        classMap: {
          "slds-datepicker__month": true
        },
        attrs: {
          "aria-labelledby": `${api_scoped_id("month-title")}`,
          "role": "grid"
        },
        key: 17
      }, [api_element("thead", {
        key: 12
      }, [api_element("tr", {
        attrs: {
          "id": api_scoped_id("weekdays-element")
        },
        key: 11
      }, api_iterator($cmp.computedWeekdayLabels, function (weekday) {
        return api_element("th", {
          attrs: {
            "id": api_scoped_id(weekday.fullName),
            "scope": "col"
          },
          key: api_key(10, weekday.fullName)
        }, [api_element("abbr", {
          attrs: {
            "title": weekday.fullName
          },
          key: 9
        }, [api_dynamic(weekday.shortName)])]);
      }))]), api_element("tbody", {
        key: 16,
        on: {
          "keydown": _m5 || ($ctx._m5 = api_bind($cmp.handleCalendarKeyDown))
        }
      }, api_iterator($cmp.computedMonth, function (week, index) {
        return api_element("tr", {
          key: api_key(15, week.id)
        }, api_iterator(week.days, function (day) {
          return api_element("td", {
            className: day.className,
            attrs: {
              "role": "gridcell",
              "aria-selected": day.isSelected,
              "aria-current": day.ariaCurrent,
              "tabindex": api_tab_index(day.tabIndex),
              "data-value": day.dateValue
            },
            key: api_key(14, day.dateValue)
          }, [api_element("span", {
            classMap: {
              "slds-day": true
            },
            key: 13,
            on: {
              "click": _m4 || ($ctx._m4 = api_bind($cmp.handleDateClick))
            }
          }, [api_dynamic(day.dayInMonth)])]);
        }));
      }))]), api_element("button", {
        classMap: {
          "slds-button": true,
          "slds-align_absolute-center": true,
          "slds-text-link": true
        },
        attrs: {
          "name": "today",
          "type": "button"
        },
        key: 18,
        on: {
          "click": _m6 || ($ctx._m6 = api_bind($cmp.handleTodayClick))
        }
      }, [api_dynamic($cmp.i18n.today)])])])];
    }

    var _tmpl$f = lwc.registerTemplate(tmpl$e);
    tmpl$e.stylesheets = [];

    if (_implicitStylesheets$3) {
      tmpl$e.stylesheets.push.apply(tmpl$e.stylesheets, _implicitStylesheets$3);
    }
    tmpl$e.stylesheetTokens = {
      hostAttribute: "lightning-calendar_calendar-host",
      shadowAttribute: "lightning-calendar_calendar"
    };

    var labelAriaLabelMonth = 'Date picker: ';

    var labelNextMonth = 'Next Month';

    var labelPreviousMonth = 'Previous Month';

    var labelToday = 'Today';

    var labelYearSelector = 'Pick a Year';

    var firstDayOfWeek = '1';

    function handleKeyDownOnCalendar(event, date, calendarInterface) {
      const tdElement = event.target;
      const keyValue = normalizeKeyValue(event.key);

      switch (keyValue) {
        case 'ArrowUp':
          preventDefaultAndStopPropagation(event);
          date.setDate(date.getDate() - 7);
          calendarInterface.focusDate(date);
          break;

        case 'ArrowDown':
          preventDefaultAndStopPropagation(event);
          date.setDate(date.getDate() + 7);
          calendarInterface.focusDate(date);
          break;

        case 'ArrowRight':
          preventDefaultAndStopPropagation(event);
          date.setDate(date.getDate() + 1);
          calendarInterface.focusDate(date);
          break;

        case 'ArrowLeft':
          preventDefaultAndStopPropagation(event);
          date.setDate(date.getDate() - 1);
          calendarInterface.focusDate(date);
          break;

        case 'Enter':
        case ' ':
          preventDefaultAndStopPropagation(event);
          calendarInterface.selectDate(tdElement);
          break;

        case 'PageUp':
          preventDefaultAndStopPropagation(event);

          if (event.altKey) {
            date.setFullYear(date.getFullYear() - 1);
          } else {
            date.setMonth(date.getMonth() - 1);
          }

          calendarInterface.focusDate(date);
          break;

        case 'PageDown':
          preventDefaultAndStopPropagation(event);

          if (event.altKey) {
            date.setFullYear(date.getFullYear() + 1);
          } else {
            date.setMonth(date.getMonth() + 1);
          }

          calendarInterface.focusDate(date);
          break;

        case 'Home':
          {
            preventDefaultAndStopPropagation(event);
            const startOfWeek = calendarInterface.getStartOfWeek(date);
            calendarInterface.focusDate(startOfWeek);
            break;
          }

        case 'End':
          {
            preventDefaultAndStopPropagation(event);
            const endOfWeek = calendarInterface.getStartOfWeek(date);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            calendarInterface.focusDate(endOfWeek);
            break;
          }
      }
    }

    function preventDefaultAndStopPropagation(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // This is a library built from Globalization's repo
    /**
     * Define address format patterns.
     */

    var AddressFormatPattern = Object.freeze({
      /**
       *
       * N: Name (The formatting of names for this field is outside of the scope of the address elements.)
       * O: Organization
       * A: Address Lines (2 or 3 lines address)
       * D: District (Sub-locality): smaller than a city, and could be a neighborhood, suburb or dependent locality.
       * C: City (Locality)
       * S: State (Administrative Area)
       * K: Country
       * Z: ZIP Code / Postal Code
       * X: Sorting code, for example, CEDEX as used in France
       * n: newline
       */
      A: Symbol('Address Lines'),
      C: Symbol('City'),
      S: Symbol('State'),
      K: Symbol('Country'),
      Z: Symbol('Zip Code'),
      n: Symbol('New Line'),
      fromPlaceHolder: function fromPlaceHolder(placeHolder) {
        switch (placeHolder) {
          case 'A':
            return AddressFormatPattern.A;

          case 'C':
            return AddressFormatPattern.C;

          case 'S':
            return AddressFormatPattern.S;

          case 'K':
            return AddressFormatPattern.K;

          case 'Z':
            return AddressFormatPattern.Z;

          case 'n':
            return AddressFormatPattern.n;
        }

        return null;
      },
      getPlaceHolder: function getPlaceHolder(pattern) {
        switch (pattern) {
          case AddressFormatPattern.A:
            return 'A';

          case AddressFormatPattern.C:
            return 'C';

          case AddressFormatPattern.S:
            return 'S';

          case AddressFormatPattern.K:
            return 'K';

          case AddressFormatPattern.Z:
            return 'Z';

          case AddressFormatPattern.n:
            return 'n';
        }

        return null;
      },
      getData: function getData(pattern, data) {
        if (data) {
          switch (pattern) {
            case AddressFormatPattern.A:
              return data.address;

            case AddressFormatPattern.C:
              return data.city;

            case AddressFormatPattern.S:
              return data.state;

            case AddressFormatPattern.K:
              return data.country;

            case AddressFormatPattern.Z:
              return data.zipCode;

            case AddressFormatPattern.n:
              return data.newLine;
          }
        }

        return null;
      }
    });

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    /**
     * Address token types enum
     *
     * @private
     */


    var AddressTokenTypes = Object.freeze({
      DATA: Symbol('data'),
      STRING: Symbol('string'),
      NEWLINE: Symbol('newline'),
      GROUP: Symbol('group')
    });
    /**
     * AddressToken class
     *
     * @private
     */

    var AddressToken = function () {
      /**
       *
       * @param {AddressTokenTypes} type
       * @param {string} string
       * @param {*} pattern
       */
      function AddressToken(type, string, pattern) {
        classCallCheck(this, AddressToken);
        this.type = type;
        this.string = string;
        this.pattern = pattern;
      }
      /**
       * Construct a string type token
       *
       * @param {string} string String
       * @return {AddressToken} Address Token
       */


      createClass(AddressToken, null, [{
        key: 'string',
        value: function string(_string) {
          return new AddressToken(AddressTokenTypes.STRING, _string);
        }
        /**
         * Construct a data type token
         *
         * @param {pattern} pattern Address Format Pattern
         * @return {AddressToken} Address Token
         */

      }, {
        key: 'data',
        value: function data(pattern) {
          return new AddressToken(AddressTokenTypes.DATA, undefined, pattern);
        }
        /**
         * Construct a new line type token
         *
         * @return {AddressToken} Address Token
         */

      }, {
        key: 'newLine',
        value: function newLine() {
          return new AddressToken(AddressTokenTypes.NEWLINE);
        }
      }]);
      return AddressToken;
    }();

    // This is a library built from Globalization's repo

    /**
     S: Salutation
     F: First Name(givenName)
     M: Middle Name
     L: Last Name(familyName)
     X: Suffix
     I: Informal Name
     */

    var fieldConstants = {
      SALUTATION: Symbol('Salutation'),
      FIRST: Symbol('First Name'),
      MIDDLE: Symbol('Middle Name'),
      LAST: Symbol('Last Name'),
      SUFFIX: Symbol('Suffix'),
      INFORMAL: Symbol('Informal Name')
    };

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    var Format = function Format(parts) {
      _classCallCheck(this, Format);

      this.parts = Object.freeze(parts);
      Object.freeze(this);
    };
    /**
     * Represents a field within the format
     */


    var FieldFormatPart = function FieldFormatPart(field) {
      _classCallCheck(this, FieldFormatPart);

      this.field = field;
      this.type = 'field';
      Object.freeze(this);
    };
    /**
     * Represents text to be output directly
     */


    var TextFormatPart = function TextFormatPart(text) {
      _classCallCheck(this, TextFormatPart);

      this.type = 'text';
      this.text = text;
      Object.freeze(this);
    };

    var fieldFormatParts = Object.freeze({
      SALUTATION: new FieldFormatPart(fieldConstants.SALUTATION),
      FIRST: new FieldFormatPart(fieldConstants.FIRST),
      MIDDLE: new FieldFormatPart(fieldConstants.MIDDLE),
      LAST: new FieldFormatPart(fieldConstants.LAST),
      SUFFIX: new FieldFormatPart(fieldConstants.SUFFIX),
      INFORMAL: new FieldFormatPart(fieldConstants.INFORMAL)
    });

    var FormatParser = function () {
      function FormatParser() {
        _classCallCheck(this, FormatParser);
      }

      _createClass(FormatParser, [{
        key: 'parse',

        /**
         * Parses the format
         * @param {string} fmt the format to be parsed
         * @returns {Format}
         */
        value: function parse(fmt) {
          var nodes = [];
          var textBuffer = ''; // parse the format string

          for (var i = 0; i < fmt.length; i = i + 1) {
            if (fmt[i] === '%') {
              i = i + 1; // move to the next character after %
              // end the last text buffer

              if (textBuffer.length > 0) {
                nodes.push(Object.freeze(new TextFormatPart(textBuffer)));
                textBuffer = '';
              }

              if (i >= fmt.length) {
                throw new Error('Unexpected end of format. Symbol at ' + (i - 1) + ' should be followed by a valid field code');
              }

              var code = fmt[i];

              switch (code) {
                case 'S':
                  nodes.push(fieldFormatParts.SALUTATION);
                  break;

                case 'F':
                  nodes.push(fieldFormatParts.FIRST);
                  break;

                case 'M':
                  nodes.push(fieldFormatParts.MIDDLE);
                  break;

                case 'L':
                  nodes.push(fieldFormatParts.LAST);
                  break;

                case 'X':
                  nodes.push(fieldFormatParts.SUFFIX);
                  break;

                case 'I':
                  nodes.push(fieldFormatParts.INFORMAL);
                  break;
              }
            } else {
              // if it wasn't a symbol, then just output the value directly
              textBuffer += fmt[i];
            }
          }

          if (textBuffer.length > 0) {
            nodes.push(new TextFormatPart(textBuffer));
          }

          return new Format(nodes);
        }
      }]);

      return FormatParser;
    }();

    var formatParser = new FormatParser();

    var numberFormat = '#,##0.###';

    var percentFormat = '#,##0%';

    var currencyFormat = '¤#,##0.00;(¤#,##0.00)';

    var currency = 'USD';

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#Parameters

    const POSSIBLE_OPTS = {
      style: true,
      currency: true,
      currencyDisplay: true,
      useGrouping: true,
      minimumIntegerDigits: true,
      minimumFractionDigits: true,
      maximumFractionDigits: true,
      minimumSignificantDigits: true,
      maximumSignificantDigits: true
    };
    const STYLE = {
      DECIMAL: 'decimal',
      CURRENCY: 'currency',
      PERCENT: 'percent'
    };
    const CURRENCY_DISPLAY = {
      CODE: 'code',
      // USD
      SYMBOL: 'symbol',
      // $
      NAME: 'name' // US Dollars

    };
    const SAFE_NUM_LENGTH = 15;
    const numberFormatInstancesCache = {};

    function getStringOfChar(char, amount) {
      return new Array(amount + 1).join(char);
    }

    function getGroupingCount(skeleton) {
      const match = skeleton.match(/,[#0]*\./);
      return match ? match[0].length - 2 : 0;
    }

    function getOptionsUniqueKey(options) {
      return Object.keys(options).sort().reduce((prev, optionName) => {
        if (POSSIBLE_OPTS[optionName]) {
          return prev + optionName + options[optionName] + '';
        }

        return prev;
      }, '');
    }

    function toNumber(value, defaultValue) {
      const number = parseInt(value, 10);

      if (isNaN(number)) {
        return defaultValue;
      }

      return number;
    }

    function getFractionPart(options) {
      const minimumDigits = toNumber(options.minimumFractionDigits, 0);
      const maximumDigits = Math.max(toNumber(options.maximumFractionDigits, 0), minimumDigits);
      return '.' + new Array(minimumDigits + 1).join('0') + new Array(maximumDigits - minimumDigits + 1).join('#');
    }

    function updateFractionPart(skeleton, options) {
      const fractionPart = getFractionPart(options);
      return addFractionsToPattern(skeleton, fractionPart);
    }

    function addFractionsToPattern(pattern, fractionPart) {
      if (!fractionPart) {
        return pattern;
      } // if pattern has two formats (one for positive and one for negative numbers), add fractions to both patterns


      if (pattern.indexOf(';') > 0) {
        const [positivePattern, negativePattern] = pattern.split(';');
        return `${addFractionsToPattern(positivePattern, fractionPart)};${addFractionsToPattern(negativePattern, fractionPart)}`;
      } // If the pattern already has a fraction part, replace it with the fractions calculated from the options


      if (pattern.indexOf('.') > 0) {
        return pattern.replace(/\.(0|#)*/, fractionPart);
      } // If the pattern doesn't have a fraction part, we need to add it to the pattern
      // We need to add the fraction part after the last digit (represented by '0' or '#')


      const position = Math.max(pattern.lastIndexOf('0'), pattern.lastIndexOf('#')) + 1;
      return [pattern.slice(0, position), fractionPart, pattern.slice(position)].join('');
    }

    function updateCurrencySymbol(skeleton, currencyCode, options) {
      const symbol = String.fromCharCode(164);

      if (options.currencyDisplay === CURRENCY_DISPLAY.NAME) {
        // append the currency code at the end.
        return skeleton.replace(symbol, '') + currencyCode;
      }

      return skeleton.replace(symbol, currencyCode);
    }

    function updateIntegerPart(skeleton, options) {
      const minimumIntegerDigits = options.minimumIntegerDigits;
      const groupingCount = getGroupingCount(skeleton);

      if (!minimumIntegerDigits) {
        return skeleton;
      }

      if (minimumIntegerDigits <= groupingCount) {
        return skeleton.replace(/,[#0]*\./, ',' + getStringOfChar('#', groupingCount - minimumIntegerDigits) + getStringOfChar('0', minimumIntegerDigits) + '.');
      }

      return skeleton.replace(/[#0]*\./, getStringOfChar('0', minimumIntegerDigits - groupingCount) + ',' + getStringOfChar('0', groupingCount) + '.');
    }

    function getBestMatchCurrencySymbol(code, currencyDisplay) {
      if (!('Intl' in window)) {
        return code; // fail gracefully.
      }

      const opts = {
        style: 'currency',
        currency: code,
        minimumFractionDigits: 0
      };

      if (currencyDisplay) {
        opts.currencyDisplay = currencyDisplay;
      }

      const nf = getFromCache(opts);
      return nf.format(2).replace(/2/g, '');
    }

    function getCurrency(options) {
      const currencyDisplay = options.currencyDisplay || CURRENCY_DISPLAY.SYMBOL;

      if (currencyDisplay === CURRENCY_DISPLAY.SYMBOL || currencyDisplay === CURRENCY_DISPLAY.NAME) {
        return getBestMatchCurrencySymbol(options.currency, currencyDisplay);
      }

      return options.currency;
    }

    function getFromCache(options) {
      const optionsUniqueKey = getOptionsUniqueKey(options);
      let numberFormatInstance = numberFormatInstancesCache[optionsUniqueKey];

      if (numberFormatInstance) {
        return numberFormatInstance;
      }

      numberFormatInstance = new Intl.NumberFormat(salesforceLocale, options);
      numberFormatInstancesCache[optionsUniqueKey] = numberFormatInstance;
      return numberFormatInstance;
    }

    function exceedsSafeLength(value) {
      const numberAsString = value.toString().replace('.', '');
      return numberAsString.length >= SAFE_NUM_LENGTH;
    }

    function normalizedMinimumFractionDigits(options) {
      const fractionSkeleton = getFallbackFractionSkeleton(options.style);
      const fractionDigits = fractionSkeleton.replace(/[^0]/g, '');
      return fractionDigits.length;
    }

    function normalizedMaximumFractionDigits(options) {
      const fractionSkeleton = getFallbackFractionSkeleton(options.style);
      const fractionDigits = fractionSkeleton.replace(/[^0#]/g, '');
      return Math.max(options.minimumFractionDigits, fractionDigits.length);
    }

    function getFallbackFractionSkeleton(style) {
      let styleFormat = numberFormat;

      if (style === STYLE.CURRENCY) {
        styleFormat = currencyFormat;
      } else if (style === STYLE.PERCENT) {
        styleFormat = percentFormat;
      }

      const format = styleFormat.split(';')[0];
      return format.split('.')[1] || '';
    }

    function normalizeOptions(options) {
      const normalizedOpts = Object.assign({}, options);
      normalizedOpts.currency = normalizedOpts.currency || currency;

      if (normalizedOpts.minimumFractionDigits === undefined) {
        normalizedOpts.minimumFractionDigits = normalizedMinimumFractionDigits(normalizedOpts);
      }

      if (normalizedOpts.maximumFractionDigits === undefined || normalizedOpts.maximumFractionDigits < normalizedOpts.minimumFractionDigits) {
        normalizedOpts.maximumFractionDigits = normalizedMaximumFractionDigits(normalizedOpts);
      }

      return normalizedOpts;
    }

    function NumberOptions(options) {
      this.options = options || {};
    }

    NumberOptions.prototype.isCurrency = function () {
      return this.options.style === 'currency';
    };

    NumberOptions.prototype.isPercent = function () {
      return this.options.style === 'percent';
    };

    NumberOptions.prototype.isDefaultCurrency = function () {
      return !this.options.currency || currency === this.options.currency;
    };

    NumberOptions.prototype.getDefaultSkeleton = function () {
      return this.isCurrency() ? currencyFormat : this.isPercent() ? percentFormat : numberFormat;
    };

    NumberOptions.prototype.getSkeleton = function () {
      const options = this.options;
      const defaultSkeleton = this.getDefaultSkeleton();
      let skeleton = updateFractionPart(defaultSkeleton, options);
      skeleton = updateIntegerPart(skeleton, options);

      if (!this.isDefaultCurrency()) {
        skeleton = updateCurrencySymbol(skeleton, getCurrency(options), options);
      }

      return skeleton;
    };

    /*
     * Regex to test a string for an ISO8601 Date. The following formats are matched.
     * Note that if a time element is present (e.g. 'T'), the string should have a time zone designator (Z or +hh:mm or -hh:mm).
     *
     *  YYYY
     *  YYYY-MM
     *  YYYY-MM-DD
     *  YYYY-MM-DDThh:mmTZD
     *  YYYY-MM-DDThh:mm:ssTZD
     *  YYYY-MM-DDThh:mm:ss.STZD
     *
     *
     * @see: https://www.w3.org/TR/NOTE-datetime
     */
    const ISO8601_STRICT_PATTERN = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z){1})?)?)?$/i;
    /* Regex to test a string for an ISO8601 partial time or full time:
     * hh:mm
     * hh:mm:ss
     * hh:mm:ss.S
     * full time = partial time + TZD
     */

    const ISO8601_TIME_PATTERN = /^\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
    const STANDARD_DATE_FORMAT = 'YYYY-MM-DD';
    const TIME_SEPARATOR = 'T';
    const TIMEZONE_INDICATOR = /(Z|([+-])(\d{2}):(\d{2}))$/;
    function isValidISODateTimeString(dateTimeString) {
      return isValidISO8601String(dateTimeString) && isValidDate(dateTimeString);
    }
    function isValidISOTimeString(timeString) {
      if (!isValidISO8601TimeString(timeString)) {
        return false;
      }

      const timeOnly = removeTimeZoneSuffix(timeString);
      return isValidDate(`2018-09-09T${timeOnly}Z`);
    }
    function removeTimeZoneSuffix(dateTimeString) {
      if (typeof dateTimeString === 'string') {
        return dateTimeString.split(TIMEZONE_INDICATOR)[0];
      }

      return dateTimeString;
    }

    function isValidISO8601String(dateTimeString) {
      if (typeof dateTimeString !== 'string') {
        return false;
      }

      return ISO8601_STRICT_PATTERN.test(dateTimeString);
    }

    function isValidISO8601TimeString(timeString) {
      if (typeof timeString !== 'string') {
        return false;
      }

      return ISO8601_TIME_PATTERN.test(timeString);
    }

    function isValidDate(value) {
      // Date.parse returns NaN if the argument doesn't represent a valid date
      const timeStamp = Date.parse(value);
      return isFinite(timeStamp);
    }

    // This is a library for all calls to the aura localizationService.
    function isBefore(date1, date2, unit) {
      return configProvider.getLocalizationService().isBefore(date1, date2, unit);
    }
    function isAfter(date1, date2, unit) {
      return configProvider.getLocalizationService().isAfter(date1, date2, unit);
    }
    function formatDateTimeUTC(date) {
      return configProvider.getLocalizationService().formatDateTimeUTC(date);
    }
    function formatDate(dateString, format, locale) {
      return configProvider.getLocalizationService().formatDate(dateString, format, locale);
    }
    function formatTime(timeString, format) {
      return configProvider.getLocalizationService().formatTime(timeString, format);
    }
    function parseDateTimeUTC(dateTimeString) {
      return configProvider.getLocalizationService().parseDateTimeUTC(dateTimeString);
    }
    function parseDateTimeISO8601(dateTimeString) {
      return configProvider.getLocalizationService().parseDateTimeISO8601(dateTimeString);
    }
    function parseDateTime(dateTimeString, format, strictMode) {
      return configProvider.getLocalizationService().parseDateTime(dateTimeString, format, strictMode);
    }
    function syncUTCToWallTime(date, timeZone) {
      let converted = null; // eslint-disable-next-line new-cap

      configProvider.getLocalizationService().UTCToWallTime(date, timeZone, result => {
        converted = result;
      });
      return converted;
    }
    function syncWallTimeToUTC(date, timeZone) {
      let converted = null; // eslint-disable-next-line new-cap

      configProvider.getLocalizationService().WallTimeToUTC(date, timeZone, result => {
        converted = result;
      });
      return converted;
    }
    function toOtherCalendar(date) {
      return configProvider.getLocalizationService().translateToOtherCalendar(date);
    }
    function fromOtherCalendar(date) {
      return configProvider.getLocalizationService().translateFromOtherCalendar(date);
    }
    function toLocalizedDigits(input) {
      return configProvider.getLocalizationService().translateToLocalizedDigits(input);
    }
    function fromLocalizedDigits(input) {
      return configProvider.getLocalizationService().translateFromLocalizedDigits(input);
    } // This belongs to localization service; i.e. getLocalizationService().parseTime()
    // Should be removed after it's been added to the localization service

    function parseTime(timeString, format, strictParsing) {
      if (!timeString) {
        return null;
      }

      if (!format) {
        if (!isValidISOTimeString(timeString)) {
          return null;
        }

        return parseDateTimeISO8601(timeString);
      }

      const parseString = timeString.replace(/(\d)([AaPp][Mm])/g, '$1 $2'); // Modifying the time string so that strict parsing doesn't break on minor deviations

      const parseFormat = format.replace(/(\b|[^h])h{2}(?!h)/g, '$1h').replace(/(\b|[^H])H{2}(?!H)/g, '$1H').replace(/(\b|[^m])m{2}(?!m)/g, '$1m').replace(/\s*A/g, ' A').trim();
      const acceptableFormats = [parseFormat]; // We want to be lenient and accept input values with seconds or milliseconds precision.
      // So even though we may display the time as 10:23 AM, we would accept input values like 10:23:30.555 AM.

      acceptableFormats.push(parseFormat.replace('m', 'm:s'), parseFormat.replace('m', 'm:s.S'), parseFormat.replace('m', 'm:s.SS'), parseFormat.replace('m', 'm:s.SSS')); // Start parsing from the most strict format (i.e. time with milliseconds).
      // The strict mode parsing of time strings using parseDateTime seems to be lenient for certain formats

      acceptableFormats.reverse();

      for (let i = 0; i < acceptableFormats.length; i++) {
        const time = parseDateTime(parseString, acceptableFormats[i], strictParsing);

        if (time) {
          return time;
        }
      }

      return null;
    } // This is called from the numberFormat library when the value exceeds the safe length.

    function getNumberFormat(format) {
      return configProvider.getLocalizationService().getNumberFormat(format);
    }

    function numberFormatFallback(options) {
      const skeleton = new NumberOptions(options).getSkeleton();
      return {
        format: value => {
          return getNumberFormat(skeleton).format(value);
        }
      };
    }

    function numberFormat$1(options) {
      const normalizedOpts = Object.assign({}, normalizeOptions(options));

      if (!('Intl' in window)) {
        return numberFormatFallback(normalizedOpts);
      }

      return {
        format: value => {
          if (value && exceedsSafeLength(value)) {
            return numberFormatFallback(normalizedOpts).format(value);
          }

          const numberFormatInstance = getFromCache(normalizedOpts);
          return numberFormatInstance.format(value);
        }
      };
    }

    const isTimeZonesSupported = function () {
      try {
        // IE11 only supports the UTC time zone and throws when given anything else
        // eslint-disable-next-line new-cap
        Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Los_Angeles'
        });
      } catch (err) {
        return false;
      }

      return true;
    }();

    var salesforceLanguage = 'en';

    // Falling back to the user's locale or the default 'en-us' in case the tag isn't supported by the browser's Intl implementation

    const FALLBACK_LOCALES = [salesforceLocale, 'en-us'];
    const symbolsCache = {}; // languageOverride is only used in the tests

    function getNameOfWeekdays(languageOverride) {
      const language = languageOverride || salesforceLanguage;
      const languageDataCache = symbolsCache[language];

      if (languageDataCache && languageDataCache.weekdays) {
        return languageDataCache.weekdays;
      }

      const intlLocales = [language, ...FALLBACK_LOCALES];
      const fullNameFormatter = new Intl.DateTimeFormat(intlLocales, {
        weekday: 'long',
        timeZone: 'UTC'
      });
      const shortNameFormatter = new Intl.DateTimeFormat(intlLocales, {
        weekday: 'short',
        timeZone: 'UTC'
      });
      const weekdays = [];

      for (let i = 0; i <= 6; i++) {
        // (1970, 0, 4) corresponds to a sunday.
        const date = new Date(Date.UTC(1970, 0, 4 + i));
        weekdays.push({
          fullName: format(fullNameFormatter, date),
          shortName: format(shortNameFormatter, date)
        });
      }

      if (!symbolsCache[language]) {
        symbolsCache[language] = {};
      }

      symbolsCache[language].weekdays = weekdays;
      return weekdays;
    } // languageOverride is only used in the tests

    function getMonthNames(languageOverride) {
      const language = languageOverride || salesforceLanguage;
      const languageDataCache = symbolsCache[language];

      if (languageDataCache && languageDataCache.months) {
        return languageDataCache.months;
      }

      const intlLocales = [language, ...FALLBACK_LOCALES];
      const monthNameFormatter = new Intl.DateTimeFormat(intlLocales, {
        month: 'long'
      });
      const months = [];

      for (let i = 0; i <= 11; i++) {
        const date = new Date(1970, i, 4);
        months.push({
          // we currently only need the fullName
          fullName: format(monthNameFormatter, date)
        });
      }

      if (!symbolsCache[language]) {
        symbolsCache[language] = {};
      }

      symbolsCache[language].months = months;
      return months;
    }

    function format(dateTimeFormat, date) {
      const formattedDate = dateTimeFormat.format(date);
      return removeIE11Markers(formattedDate);
    }

    function removeIE11Markers(formattedString) {
      // IE11 adds LTR / RTL mark in the formatted date time string
      return formattedString.replace(/[\u200E\u200F]/g, '');
    }

    var mediumDateFormat = 'MMM d, yyyy';

    var mediumTimeFormat = 'h:mm:ss a';

    function normalizeISODate(value, format) {
      const dateValue = typeof value === 'string' ? value.trim() : value;

      if (!dateValue) {
        return {
          isoValue: null,
          displayValue: value || ''
        };
      } // if value is an ISO string, only fetch the date part


      const dateOnlyString = typeof dateValue === 'string' && dateValue.split(TIME_SEPARATOR)[0] || dateValue;
      assert(isValidISODateTimeString(dateOnlyString), `datetime component: The value attribute accepts a valid ISO8601 formatted string ` + `with timezone offset. but we are getting the ${typeof value} value "${value}" instead.`);
      const parsedDate = parseDateTime(dateOnlyString, STANDARD_DATE_FORMAT);

      if (!parsedDate) {
        return {
          isoValue: null,
          displayValue: value || ''
        };
      } // convert from Gregorian to Buddhist Calendar if necessary


      const civilDate = toOtherCalendar(parsedDate);
      return {
        isoValue: dateOnlyString,
        displayValue: formatDate(civilDate, format)
      };
    }
    function normalizeISOTime(value, format) {
      // We are not converting the time to the user's timezone. All values are displayed and saved as UTC time values
      const normalizedValue = removeTimeZoneSuffix(value);
      const timeValue = typeof normalizedValue === 'string' ? normalizedValue.trim() : normalizedValue;

      if (!timeValue) {
        return {
          isoValue: null,
          displayValue: value || ''
        };
      }

      assert(isValidISOTimeString(timeValue), `datetime component: The value attribute accepts a valid ISO8601 formatted string. ` + `but we are getting the ${typeof value} value "${value}" instead.`);
      const parsedTime = parseTime(timeValue);

      if (!parsedTime) {
        return {
          isoValue: null,
          displayValue: value || ''
        };
      }

      return {
        isoValue: getISOTimeString(parsedTime),
        displayValue: formatTime(parsedTime, format)
      };
    }
    function normalizeISODateTime(value, timezone, format) {
      const dateTimeValue = typeof value === 'string' ? value.trim() : value;

      if (!dateTimeValue) {
        return {
          isoValue: null,
          displayValue: value || ''
        };
      }

      assert(isValidISODateTimeString(dateTimeValue), `datetime component: The value attribute accepts a valid ISO8601 formatted string ` + `with timezone offset. but we are getting the ${typeof value} value "${value}" instead.`);
      const parsedDate = parseDateTimeISO8601(dateTimeValue);

      if (!parsedDate) {
        return {
          isoValue: null,
          displayValue: value || ''
        };
      }

      const convertedDate = syncUTCToWallTime(parsedDate, timezone);
      return {
        // We are passing the ISO value without a timezone designator.
        // the native input type='datetime-local' who calls this does not accept timezone offset
        isoValue: removeTimeZoneSuffix(convertedDate.toISOString()),
        displayValue: formatDateTimeUTC(convertedDate)
      };
    }
    function normalizeFormattedDate(value, format) {
      const dateValue = typeof value === 'string' ? value.trim() : value;

      if (!dateValue) {
        return null;
      }

      const parsedDate = parseDateTime(dateValue, format || mediumDateFormat, true);

      if (!parsedDate) {
        return null;
      }

      const gregorianDate = fromOtherCalendar(parsedDate);
      return getISODateString(gregorianDate);
    }
    function normalizeFormattedTime(value, format) {
      const timeValue = typeof value === 'string' ? value.trim() : value;

      if (!timeValue) {
        return null;
      }

      const parsedDate = parseTime(timeValue, format || mediumTimeFormat, true);

      if (!parsedDate) {
        return null;
      }

      return getISOTimeString(parsedDate);
    } // The value here isn't really formatted, it's always an ISO string in the form isoDate + T + isoTime (without Z).

    function normalizeFormattedDateTime(value, timezone, format) {
      const datetimeValue = typeof value === 'string' ? value.trim() : value;

      if (!datetimeValue) {
        return null;
      } // given that value is an ISO string without Z, the method below is equivalent to parseDateTimeISO8601(value + 'Z')
      // However, parseDateTimeUTC is more concise and doesn't need any manipulation of the input (adding Z).


      const parsedDate = parseDateTimeUTC(datetimeValue);

      if (!parsedDate) {
        return null;
      }

      const convertedDate = syncWallTimeToUTC(parsedDate, timezone);
      return convertedDate.toISOString();
    }
    function getToday() {
      const today = getTodayBasedOnTimezone();
      return getISODateString(today);
    }
    function getISODateString(date) {
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }
    function getISOTimeString(date) {
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${doublePad(date.getMilliseconds())}`;
    }
    function getCurrentTime(timezone) {
      const today = getTodayBasedOnTimezone(timezone);
      return pad(today.getHours()) + ':' + pad(today.getMinutes());
    }

    function getTodayBasedOnTimezone(timezone) {
      const today = new Date();
      today.setTime(today.getTime() + today.getTimezoneOffset() * 60 * 1000); // time in UTC
      // localization service will use $Locale.timezone when no timezone provided

      return syncUTCToWallTime(today, timezone);
    }

    function pad(n) {
      return Number(n) < 10 ? '0' + n : n;
    }

    function doublePad(n) {
      const number = Number(n);

      if (number < 10) {
        return '00' + n;
      } else if (number < 100) {
        return '0' + n;
      }

      return n;
    }

    const i18n$5 = {
      ariaLabelMonth: labelAriaLabelMonth,
      nextMonth: labelNextMonth,
      previousMonth: labelPreviousMonth,
      today: labelToday,
      yearSelector: labelYearSelector
    };
    const WEEKS_PER_MONTH = 6;
    const DAYS_PER_WEEK = 7;
    const calendarCache = {}; // cache of calendar cells for a given year/month

    class LightningCalendar extends lwc.LightningElement {
      get value() {
        return this.selectedDate;
      }

      set value(newValue) {
        // if value is an ISO string, only fetch the time part
        const dateOnlyString = typeof newValue === 'string' ? newValue.split(TIME_SEPARATOR)[0] : newValue;

        if (dateOnlyString !== this.selectedDate) {
          this.selectedDate = dateOnlyString;

          if (!this._connected) {
            return;
          }

          const newDate = this.parseDate(dateOnlyString); // if the date is invalid, render today's date

          if (!newDate) {
            this.selectedDate = null;
            this.renderToday();
          } else {
            this.selectDate(newDate);
          }
        }
      }

      constructor() {
        super();
        this.calendarYear = null;
        this.calendarMonth = null;
        this.min = void 0;
        this.max = void 0;
        this.uniqueId = generateUniqueId();
      }

      renderedCallback() {
        this.dispatchEvent(new CustomEvent('ready'));
      }

      connectedCallback() {
        this._connected = true;
        this.todayDate = getToday();
        const renderDate = this.getSelectedDate() || this.getTodaysDate();
        this.renderCalendar(renderDate);
        this.keyboardInterface = this.calendarKeyboardInterface();
      }

      disconnectedCallback() {
        this._connected = false;
      }
      /**
       * Sets focus on the focusable date cell in the calendar.
       */


      focus() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
          const dateElement = this.getFocusableDateCell();

          if (dateElement) {
            dateElement.focus();
          }
        });
      }

      get i18n() {
        return i18n$5;
      }

      get computedAriaLabel() {
        const renderedMonth = this.getCalendarDate().getMonth();
        return i18n$5.ariaLabelMonth + getMonthNames()[renderedMonth].fullName;
      }

      get computedMonthTitle() {
        const renderedMonth = this.getCalendarDate().getMonth();
        return getMonthNames()[renderedMonth].fullName;
      }

      get computedWeekdayLabels() {
        const nameOfWeekdays = getNameOfWeekdays();
        const firstDay = this.getFirstDayOfWeek();
        const computedWeekdayLabels = []; // We need to adjust the weekday labels to start from the locale's first day of week

        for (let i = firstDay; i < nameOfWeekdays.length; i++) {
          computedWeekdayLabels.push(nameOfWeekdays[i]);
        }

        for (let i = 0; i < firstDay; i++) {
          computedWeekdayLabels.push(nameOfWeekdays[i]);
        }

        return computedWeekdayLabels;
      }

      get computedSelectElementId() {
        return this.uniqueId + '-select';
      }

      get computedWeekdaysElementId() {
        return this.uniqueId + '-weekdays';
      }

      get computedMonthTitleId() {
        return this.uniqueId + '-month';
      }

      get computedYearList() {
        const sampleDate = new Date();
        const currentYear = sampleDate.getFullYear();
        const minDate = this.parseDate(this.min);
        const maxDate = this.parseDate(this.max);
        const minYear = minDate ? minDate.getFullYear() : currentYear - 100;
        const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 100;
        const yearList = [];

        for (let year = minYear; year <= maxYear; year++) {
          yearList.push({
            label: this.getYearDisplayValue(sampleDate, year),
            value: year
          });
        }

        return yearList;
      }

      get monthIndex() {
        return this.getCalendarDate().getMonth();
      }

      getYearDisplayValue(date, yearValue) {
        date.setFullYear(yearValue);
        return toLocalizedDigits(String(toOtherCalendar(date).getFullYear()));
      }

      get computedMonth() {
        if (!this._connected) {
          return [];
        }

        this.removeCurrentlySelectedDateAttributes();
        const selectedDate = this.getSelectedDate();
        const renderDate = this.getCalendarDate();
        const cacheKey = this.getCalendarCacheKey(renderDate, selectedDate);

        if (cacheKey in calendarCache) {
          return calendarCache[cacheKey];
        }

        const todayDate = this.getTodaysDate();
        const focusableDate = this.getInitialFocusDate(todayDate, selectedDate, renderDate);
        const calendarDates = {
          selectedDate,
          renderDate,
          focusableDate,
          todayDate,
          minDate: this.parseDate(this.min),
          maxDate: this.parseDate(this.max)
        };
        const monthCells = [];
        const date = this.getCalendarStartDate(renderDate);

        for (let week = 0; week < WEEKS_PER_MONTH; week++) {
          const weekCells = {
            id: week,
            days: []
          };

          for (let weekday = 0; weekday < DAYS_PER_WEEK; weekday++) {
            const dayCell = this.getDateCellAttributes(date, calendarDates);
            weekCells.days.push(dayCell);
            date.setDate(date.getDate() + 1);
          }

          monthCells.push(weekCells);
        }

        calendarCache[cacheKey] = monthCells;
        return monthCells;
      }

      getDateCellAttributes(date, calendarDates) {
        const isInAdjacentMonth = !this.dateInCalendar(date, calendarDates.renderDate) || !this.isBetween(date, calendarDates.minDate, calendarDates.maxDate);
        const isSelected = this.isSame(date, calendarDates.selectedDate);
        const isToday = this.isSame(date, calendarDates.todayDate);
        const ariaCurrent = isToday ? 'date' : false;
        const tabIndex = this.isSame(date, calendarDates.focusableDate) ? '0' : false;
        const className = classSet().add({
          'slds-is-today': isToday,
          'slds-is-selected': isSelected,
          'slds-day_adjacent-month': isInAdjacentMonth
        }).toString();
        return {
          dayInMonth: toLocalizedDigits(String(date.getDate())),
          dateValue: this.formatDate(date),
          isSelected: isSelected ? 'true' : 'false',
          className,
          tabIndex,
          ariaCurrent
        };
      }

      dispatchSelectEvent() {
        this.dispatchEvent(new CustomEvent('select', {
          composed: true,
          bubbles: true,
          cancelable: true,
          detail: {
            value: this.selectedDate
          }
        }));
      } // Determines if the date is in the rendered month/year calendar.


      dateInCalendar(date, calendarDate) {
        const renderedCalendar = calendarDate || this.getCalendarDate();
        return date.getMonth() === renderedCalendar.getMonth() && date.getFullYear() === renderedCalendar.getFullYear();
      }

      getInitialFocusDate(todayDate, selectedDate, renderedDate) {
        if (selectedDate && this.dateInCalendar(selectedDate, renderedDate)) {
          return selectedDate;
        }

        if (this.dateInCalendar(todayDate, renderedDate)) {
          return todayDate;
        }

        return new Date(renderedDate.getFullYear(), renderedDate.getMonth(), 1);
      }

      getTodaysDate() {
        if (this.todayDate) {
          return this.parseDate(this.todayDate);
        } // Today's date will be fetched in connectedCallback. In the meantime, use the date based on the device timezone.


        return new Date();
      }

      getSelectedDate() {
        return this.parseDate(this.selectedDate);
      } // returns the month and year in the calendar


      getCalendarDate() {
        if (this.calendarYear) {
          return new Date(this.calendarYear, this.calendarMonth, 1);
        }

        return this.getTodaysDate();
      }

      getCalendarStartDate(renderedDate) {
        const firstDayOfMonth = new Date(renderedDate.getFullYear(), renderedDate.getMonth(), 1);
        return this.getStartOfWeek(firstDayOfMonth);
      }

      getStartOfWeek(dayInWeek) {
        const firstDay = this.getFirstDayOfWeek(); // Negative dates in JS will subtract days from the 1st of the given month

        let startDay = dayInWeek.getDay();

        while (startDay !== firstDay) {
          dayInWeek.setDate(dayInWeek.getDate() - 1);
          startDay = dayInWeek.getDay();
        }

        return dayInWeek;
      }

      getFirstDayOfWeek() {
        return firstDayOfWeek - 1; // In Java, week days are 1 - 7
      } // This method is called when a new value is set, or when you click the today button.
      // In both cases, we need to check if newValue is in the currently rendered calendar


      selectDate(newDate) {
        if (this.dateInCalendar(newDate)) {
          const dateElement = this.getElementByDate(this.formatDate(newDate));
          this.selectDateInCalendar(dateElement);
        } else {
          this.renderCalendar(newDate);
        }
      } // Select a date in current calendar without the need to re-render the calendar


      selectDateInCalendar(dateElement) {
        this.selectedDate = dateElement.getAttribute('data-value');
        this.removeCurrentlySelectedDateAttributes();
        this.addSelectedDateAttributes(dateElement);
      }

      selectDateInCalendarAndDispatchSelect(dateElement) {
        this.selectDateInCalendar(dateElement);
        this.dispatchSelectEvent();
      } // we should be able to control the select value with an attribute once we have a select component


      selectYear(year) {
        const optionElement = this.template.querySelector(`option[value='${year}']`);

        if (optionElement) {
          optionElement.selected = true;
        }
      }

      getElementByDate(dateString) {
        return this.template.querySelector(`td[data-value='${dateString}']`);
      }

      getFocusableDateCell() {
        return this.template.querySelector(`td[tabIndex='0']`);
      }

      unfocusDateCell(element) {
        if (element) {
          element.removeAttribute('tabIndex');
        }
      }

      focusDateCell(element) {
        if (element) {
          element.setAttribute('tabIndex', 0);
          element.focus();
        }
      }

      focusElementByDate(date) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
          const element = this.getElementByDate(this.formatDate(date));

          if (element) {
            this.unfocusDateCell(this.getFocusableDateCell());
            this.focusDateCell(element);
          }
        });
      }

      renderCalendar(newDate) {
        this.calendarMonth = newDate.getMonth();
        this.calendarYear = newDate.getFullYear();
        this.selectYear(newDate.getFullYear());
      }

      renderToday() {
        const todaysDate = this.getTodaysDate();

        if (this.dateInCalendar(todaysDate)) {
          this.removeCurrentlySelectedDateAttributes();
          this.unfocusDateCell(this.getFocusableDateCell());
          const todayElement = this.getElementByDate(this.todayDate);
          todayElement.setAttribute('tabIndex', 0);
        } else {
          this.renderCalendar(todaysDate);
        }
      }

      removeCurrentlySelectedDateAttributes() {
        const currentlySelectedElement = this.template.querySelector(`td[class*='slds-is-selected']`);

        if (currentlySelectedElement) {
          currentlySelectedElement.classList.remove('slds-is-selected');
          currentlySelectedElement.setAttribute('aria-selected', 'false');
        }

        this.unfocusDateCell(this.getFocusableDateCell());
      }

      addSelectedDateAttributes(dateElement) {
        this.focusDateCell(dateElement);
        dateElement.classList.add('slds-is-selected');
        dateElement.setAttribute('aria-selected', 'true');
      }

      handleCalendarKeyDown(event) {
        const dateString = event.target.getAttribute('data-value');
        handleKeyDownOnCalendar(event, this.parseDate(dateString), this.keyboardInterface);
      }

      handleDateClick(event) {
        event.stopPropagation();
        const tdElement = event.target.parentElement;
        this.selectDateInCalendarAndDispatchSelect(tdElement);
      }

      handleTodayClick(event) {
        event.stopPropagation();
        this.selectedDate = this.todayDate;
        this.selectDate(this.getTodaysDate());
        this.dispatchSelectEvent();
      }

      handleYearSelectClick(event) {
        event.stopPropagation();
      }

      handleYearChange(event) {
        event.stopPropagation();
        const newYearValue = event.target.value;

        if (this.calendarYear !== newYearValue) {
          this.calendarYear = newYearValue;
        }
      }

      goToNextMonth(event) {
        event.stopPropagation();
        const calendarDate = this.getCalendarDate();
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        this.renderCalendar(calendarDate);
      }

      goToPreviousMonth(event) {
        event.stopPropagation();
        const calendarDate = this.getCalendarDate();
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        this.renderCalendar(calendarDate);
      }

      calendarKeyboardInterface() {
        const that = this;
        return {
          focusDate(newDate) {
            if (!that.dateInCalendar(newDate)) {
              that.renderCalendar(newDate);
            }

            that.focusElementByDate(newDate);
          },

          getStartOfWeek(dayInWeek) {
            return that.getStartOfWeek(dayInWeek);
          },

          selectDate(dateElement) {
            that.selectDateInCalendarAndDispatchSelect(dateElement);
          }

        };
      }

      formatDate(date) {
        return getISODateString(date);
      }

      parseDate(dateString) {
        return parseDateTime(dateString, STANDARD_DATE_FORMAT, true);
      }

      isSame(date1, date2) {
        if (!date1 || !date2) {
          return false;
        }

        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() // getDate returns the day in month whereas getDay returns the weekday number
        ;
      }

      isBetween(date, date1, date2) {
        let isBeforeEndDate = true;
        let isAfterStartDate = true;

        if (date2) {
          isBeforeEndDate = isBefore(date, date2, 'day') || this.isSame(date, date2);
        }

        if (date1) {
          isAfterStartDate = isAfter(date, date1, 'day') || this.isSame(date, date1);
        }

        return isBeforeEndDate && isAfterStartDate;
      }

      getCalendarCacheKey(renderDate, selectedDate) {
        let key = renderDate.getFullYear() + '-' + renderDate.getMonth(); // Having the key include min/max seems enough for now.
        // We're not going to complicate things by checking if renderDate falls before/after the min/max.

        key += this.min ? 'min' + this.min : '';
        key += this.max ? 'max' + this.max : '';

        if (selectedDate && this.dateInCalendar(selectedDate, renderDate)) {
          key += '_' + selectedDate.getDate();
        }

        return key;
      }

    }

    lwc.registerDecorators(LightningCalendar, {
      publicProps: {
        min: {
          config: 0
        },
        max: {
          config: 0
        },
        value: {
          config: 3
        }
      },
      publicMethods: ["focus"],
      track: {
        calendarYear: 1,
        calendarMonth: 1
      }
    });

    var _lightningCalendar = lwc.registerComponent(LightningCalendar, {
      tmpl: _tmpl$f
    });

    function tmpl$f($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element,
        d: api_dynamic,
        gid: api_scoped_id,
        c: api_custom_element,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5,
        _m6,
        _m7,
        _m8,
        _m9,
        _m10,
        _m11,
        _m12,
        _m13,
        _m14
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-form-element": true,
          "slds-dropdown-trigger": true,
          "slds-dropdown-trigger_click": true,
          "slds-size_1-of-1": true
        },
        attrs: {
          "tabindex": "-1"
        },
        key: 7
      }, [api_element("label", {
        className: $cmp.computedLabelClass,
        attrs: {
          "for": `${api_scoped_id("input")}`
        },
        key: 1
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 0
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]), $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp.fieldLevelHelp
        },
        key: 2
      }, []) : null, api_element("div", {
        classMap: {
          "slds-form-element__control": true,
          "slds-input-has-icon": true,
          "slds-input-has-icon_right": true
        },
        key: 6
      }, [api_element("input", {
        classMap: {
          "slds-input": true
        },
        attrs: {
          "type": "text",
          "id": api_scoped_id("input"),
          "name": $cmp.name,
          "placeholder": $cmp.placeholder,
          "aria-label": $cmp.ariaLabel,
          "autocomplete": $cmp.autocomplete
        },
        props: {
          "value": $cmp.displayValue,
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled
        },
        key: 3,
        on: {
          "input": _m0 || ($ctx._m0 = api_bind($cmp.handleInput)),
          "change": _m1 || ($ctx._m1 = api_bind($cmp.handleInputChange)),
          "focusin": _m2 || ($ctx._m2 = api_bind($cmp.onFocusIn)),
          "focusout": _m3 || ($ctx._m3 = api_bind($cmp.handleInputBlur)),
          "keydown": _m4 || ($ctx._m4 = api_bind($cmp.handleInputKeydown)),
          "click": _m5 || ($ctx._m5 = api_bind($cmp.handleInputClick))
        }
      }, []), api_custom_element("lightning-button-icon", _lightningButtonIcon, {
        classMap: {
          "slds-input__icon": true,
          "slds-input__icon_right": true
        },
        props: {
          "iconName": "utility:event",
          "variant": "bare",
          "disabled": $cmp.computedIconDisabledState,
          "title": $cmp.i18n.selectDate,
          "alternativeText": $cmp.i18n.selectDate
        },
        key: 4,
        on: {
          "click": _m6 || ($ctx._m6 = api_bind($cmp.handleDatePickerIconClick)),
          "keydown": _m7 || ($ctx._m7 = api_bind($cmp.handleDatePickerIconKeyDown)),
          "focusin": _m8 || ($ctx._m8 = api_bind($cmp.onFocusIn)),
          "focusout": _m9 || ($ctx._m9 = api_bind($cmp.onFocusOut))
        }
      }, []), $cmp.isCalendarVisible ? api_custom_element("lightning-calendar", _lightningCalendar, {
        props: {
          "value": $cmp.value,
          "min": $cmp.min,
          "max": $cmp.max
        },
        key: 5,
        on: {
          "select": _m10 || ($ctx._m10 = api_bind($cmp.handleDateSelect)),
          "ready": _m11 || ($ctx._m11 = api_bind($cmp.startPositioning)),
          "keydown": _m12 || ($ctx._m12 = api_bind($cmp.handleCalendarKeyDown)),
          "focusin": _m13 || ($ctx._m13 = api_bind($cmp.onFocusIn)),
          "focusout": _m14 || ($ctx._m14 = api_bind($cmp.onFocusOut))
        }
      }, []) : null])]), $cmp.errorMessage ? api_element("div", {
        classMap: {
          "slds-form-element__help": true
        },
        attrs: {
          "id": api_scoped_id("error-message"),
          "data-error-message": true,
          "aria-live": "assertive"
        },
        key: 8
      }, [api_dynamic($cmp.errorMessage)]) : null];
    }

    var _tmpl$g = lwc.registerTemplate(tmpl$f);
    tmpl$f.stylesheets = [];
    tmpl$f.stylesheetTokens = {
      hostAttribute: "lightning-datepicker_datepicker-host",
      shadowAttribute: "lightning-datepicker_datepicker"
    };

    var labelInvalidDate = 'Your entry does not match the allowed format {0}.';

    var labelRangeOverflow$1 = 'Value must be {0} or earlier.';

    var labelRangeUnderflow$1 = 'Value must be {0} or later.';

    var labelSelectDate = 'Select a date';

    var shortDateFormat = 'M/d/yyyy';

    var longDateFormat = 'MMMM d, yyyy';

    function handleKeyDownOnDatePickerIcon(event, datepickerInterface) {
      switch (normalizeKeyValue(event.key)) {
        case 'Enter':
        case ' ':
          preventDefaultAndStopPropagation$1(event);
          datepickerInterface.showCalendar();
          break;

        case 'Escape':
          preventDefaultAndStopPropagation$1(event);
          datepickerInterface.hideCalendar();
          break;
      }
    }
    function handleBasicKeyDownBehaviour(event, datepickerInterface) {
      if (!datepickerInterface.isCalendarVisible()) {
        return;
      }

      if (normalizeKeyValue(event.key) === 'Escape') {
        preventDefaultAndStopPropagation$1(event);
        datepickerInterface.hideCalendar();
      }
    }

    function preventDefaultAndStopPropagation$1(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const i18n$6 = {
      invalidDate: labelInvalidDate,
      rangeOverflow: labelRangeOverflow$1,
      rangeUnderflow: labelRangeUnderflow$1,
      required: labelRequired,
      selectDate: labelSelectDate
    };
    const ARIA_CONTROLS$1 = 'aria-controls';
    const ARIA_LABEL = 'aria-label';
    const ARIA_LABELLEDBY = 'aria-labelledby';
    const ARIA_DESCRIBEDBY$2 = 'aria-describedby';
    const DATE_STYLE = {
      SHORT: 'short',
      MEDIUM: 'medium',
      LONG: 'long'
    };

    class LightningDatePicker extends lwc.LightningElement {
      get messageWhenBadInput() {
        return this._messageWhenBadInput || formatLabel(this.i18n.invalidDate, this.dateFormat);
      }

      set messageWhenBadInput(message) {
        this._messageWhenBadInput = message;
      }

      get messageWhenRangeOverflow() {
        return this._messageWhenRangeOverflow || formatLabel(this.i18n.rangeOverflow, this.max);
      }

      set messageWhenRangeOverflow(message) {
        this._messageWhenRangeOverflow = message;
      }

      get messageWhenRangeUnderflow() {
        return this._messageWhenRangeUnderflow || formatLabel(this.i18n.rangeUnderflow, this.min);
      }

      set messageWhenRangeUnderflow(message) {
        this._messageWhenRangeUnderflow = message;
      } // setter is required to properly trigger update


      get ariaLabel() {
        return this._ariaLabel;
      }

      set ariaLabel(val) {
        this._ariaLabel = val;
        this.synchronizeA11y();
      }

      set ariaLabelledByElement(el) {
        this._ariaLabelledBy = el;
        this.synchronizeA11y();
      }

      get ariaLabelledByElement() {
        return this._ariaLabelledBy;
      }

      set ariaControlsElement(el) {
        this._ariaControls = el;
        this.synchronizeA11y();
      }

      get ariaControlsElement() {
        return this._ariaControls;
      }

      set ariaDescribedByElements(el) {
        if (Array.isArray(el)) {
          this._ariaDescribedBy = el;
        } else {
          this._ariaDescribedBy = [el];
        }

        this.synchronizeA11y();
      }

      get ariaDescribedByElements() {
        return this._ariaDescribedBy;
      }

      get ariaLabelledbyId() {
        return getRealDOMId(this._ariaLabelledBy);
      }

      get ariaControlsId() {
        return getRealDOMId(this.ariaControlsElement);
      }

      synchronizeA11y() {
        const input = this.template.querySelector('input');

        if (!input) {
          return;
        }

        synchronizeAttrs(input, {
          [ARIA_LABELLEDBY]: this.ariaLabelledbyId,
          [ARIA_DESCRIBEDBY$2]: this.computedAriaDescribedby,
          [ARIA_CONTROLS$1]: this.ariaControlsId,
          [ARIA_LABEL]: this._ariaLabel
        });
      }

      renderedCallback() {
        this.synchronizeA11y();
      }

      get value() {
        return this._value;
      }

      set value(newValue) {
        const normalizedDate = normalizeISODate(newValue, this.dateFormat);
        this._value = normalizedDate.isoValue;
        this._displayValue = normalizedDate.displayValue;
      }

      get disabled() {
        return this._disabled;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);
      }

      get readOnly() {
        return this._readonly;
      }

      set readOnly(value) {
        this._readonly = normalizeBoolean(value);
      }

      get required() {
        return this._required;
      }

      set required(value) {
        this._required = normalizeBoolean(value);
      }

      set fieldLevelHelp(value) {
        this._fieldLevelHelp = value;
      }

      get fieldLevelHelp() {
        return this._fieldLevelHelp;
      }

      get variant() {
        return this._variant || VARIANT.STANDARD;
      }

      set variant(value) {
        this._variant = normalizeVariant$1(value);
      }

      focus() {
        if (this.connected) {
          this.inputElement.focus();
        }
      }

      blur() {
        if (this.connected) {
          this.inputElement.blur();
        }
      }

      showHelpMessage(message) {
        if (!message) {
          this.classList.remove('slds-has-error');
          this._errorMessage = '';
        } else {
          this.classList.add('slds-has-error');
          this._errorMessage = message;
        }
      }

      hasBadInput() {
        return !!this._displayValue && this._value === null;
      }

      get dateStyle() {
        return this._dateStyle;
      }

      set dateStyle(value) {
        this._dateStyle = normalizeString(value, {
          fallbackValue: DATE_STYLE.MEDIUM,
          validValues: [DATE_STYLE.SHORT, DATE_STYLE.MEDIUM, DATE_STYLE.LONG]
        });
        this.dateFormat = this.getDateFormatFromStyle(this._dateStyle);
        const normalizedDate = normalizeISODate(this._value, this.dateFormat);
        this._displayValue = normalizedDate.displayValue;
      }

      constructor() {
        super();
        this._disabled = false;
        this._readonly = false;
        this._required = false;
        this._value = null;
        this._calendarVisible = false;
        this._displayValue = null;
        this._errorMessage = '';
        this._fieldLevelHelp = void 0;
        this._variant = void 0;
        this.label = void 0;
        this.name = void 0;
        this.max = void 0;
        this.min = void 0;
        this.placeholder = void 0;
        this.autocomplete = void 0;
        this.messageWhenValueMissing = void 0;
        this._ariaLabelledBy = void 0;
        this._ariaControls = void 0;
        this._ariaDescribedBy = [];
        this.uniqueId = generateUniqueId();
      }

      connectedCallback() {
        this.connected = true;
        this.keyboardInterface = this.datepickerKeyboardInterface();
      }

      disconnectedCallback() {
        this.connected = false;
      }

      get i18n() {
        return i18n$6;
      }

      get isLabelHidden() {
        return this.variant === VARIANT.LABEL_HIDDEN;
      }

      get computedLabelClass() {
        return classSet('slds-form-element__label').add({
          'slds-assistive-text': this.isLabelHidden
        }).toString();
      }

      get computedUniqueErrorMessageElementId() {
        const el = this.template.querySelector('[data-error-message]');
        return getRealDOMId(el);
      }

      get isCalendarVisible() {
        return this._calendarVisible;
      }

      get displayValue() {
        return this._displayValue;
      }

      get errorMessage() {
        return this._errorMessage;
      }

      get computedIconDisabledState() {
        return this.disabled || this.readOnly;
      }

      get computedAriaDescribedby() {
        const ariaValues = [];

        if (this.errorMessage) {
          ariaValues.push(this.computedUniqueErrorMessageElementId);
        }

        this._ariaDescribedBy.forEach(item => {
          const id = getRealDOMId(item);

          if (id) {
            ariaValues.push(id);
          }
        });

        return normalizeAriaAttribute(ariaValues);
      }

      handleInputChange(event) {
        event.stopPropagation(); // keeping the display value in sync with the element's value

        this._displayValue = event.currentTarget.value;
        this._value = this.parseFormattedDate(this._displayValue);
        this.dispatchChangeEvent();
      }

      handleInput() {
        // keeping the display value in sync with the element's value
        this._displayValue = this.inputElement.value; // IE11 fires an input event along with the click event when the element has a placeholder.
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/101220/
        // remove this block when we stop support for IE11

        if (isIE11 && this.placeholder !== undefined) {
          return;
        } // Making sure that the focus remains on the input and we're not triggering leave


        this.hideCalendarAndFocusTrigger();
      }

      handleInputBlur() {
        if (this._value !== null) {
          const normalizedDate = normalizeISODate(this._value, this.dateFormat);
          this._displayValue = normalizedDate.displayValue;
        }

        this.onFocusOut();
      }

      handleInputClick(event) {
        if (this.readOnly) {
          return;
        }

        this.calendarTrigger = event.target;
        this.showCalendar();
      }
      /**
       * When the element gains focus this function is called.
       */


      onFocusIn() {
        if (this._pendingFocusOut) {
          this._pendingFocusOut = false;
        }

        if (!this._focused) {
          this.dispatchEvent(new CustomEvent('focus'));
        }

        this._focused = true;
      }
      /**
       * When the element looses its focus this function is called.
       */


      onFocusOut() {
        // This assumes that a focusin will be dispatched after a focusout
        this._pendingFocusOut = true; // eslint-disable-next-line @lwc/lwc/no-async-operation

        requestAnimationFrame(() => {
          if (this._pendingFocusOut) {
            this._focused = false;
            this.hideCalendar();
            this.dispatchEvent(new CustomEvent('blur'));
          }
        });
      }

      handleDatePickerIconClick(event) {
        if (this.readOnly || this.disabled) {
          return;
        }

        this.calendarTrigger = event.target;
        this.showAndFocusCalendar();
      }

      handleInputKeydown(event) {
        this.calendarTrigger = event.target;
        handleBasicKeyDownBehaviour(event, this.keyboardInterface);
      }

      handleDatePickerIconKeyDown(event) {
        this.calendarTrigger = event.target;
        handleKeyDownOnDatePickerIcon(event, this.keyboardInterface);
      }

      handleCalendarKeyDown(event) {
        handleBasicKeyDownBehaviour(event, this.keyboardInterface);
      }

      handleDateSelect(event) {
        event.stopPropagation();
        this._value = event.detail.value;
        this._displayValue = normalizeISODate(this._value, this.dateFormat).displayValue;
        this.hideCalendarAndFocusTrigger();
        this.dispatchChangeEvent();
      }

      showAndFocusCalendar() {
        this.showCalendar(); // eslint-disable-next-line @lwc/lwc/no-async-operation

        requestAnimationFrame(() => {
          this.focusCalendar();
        });
      }

      hideCalendarAndFocusTrigger() {
        this.hideCalendar();

        if (this.calendarTrigger) {
          this.calendarTrigger.focus();
        }
      }

      focusCalendar() {
        const calendar = this.template.querySelector('lightning-calendar');

        if (calendar) {
          calendar.focus();
        }
      }

      startPositioning() {
        if (!this._relationship) {
          this._relationship = startPositioning(this, {
            target: () => this.template.querySelector('input'),
            element: () => this.template.querySelector('lightning-calendar').shadowRoot.querySelector('div'),
            align: {
              horizontal: Direction.Right,
              vertical: Direction.Top
            },
            targetAlign: {
              horizontal: Direction.Right,
              vertical: Direction.Bottom
            },
            autoFlip: true,
            // Auto flip direction if not have enough space
            leftAsBoundary: true // horizontal flip uses target left as boundary

          });
        } else {
          this._relationship.reposition();
        }
      }

      stopPositioning() {
        if (this._relationship) {
          stopPositioning(this._relationship);
          this._relationship = null;
        }
      }

      showCalendar() {
        if (!this.isCalendarVisible) {
          this.rootElement.classList.add('slds-is-open');
          this._calendarVisible = true;
        }
      }

      hideCalendar() {
        if (this.isCalendarVisible) {
          this.rootElement.classList.remove('slds-is-open');
          this.stopPositioning();
          this._calendarVisible = false;
        }
      }

      get rootElement() {
        return this.template.querySelector('div');
      }

      get inputElement() {
        return this.template.querySelector('input');
      }

      get dateFormat() {
        if (!this._dateFormat) {
          this._dateFormat = this.getDateFormatFromStyle();
        }

        return this._dateFormat;
      }

      set dateFormat(value) {
        this._dateFormat = value;
      }

      getDateFormatFromStyle(dateStyle) {
        let dateFormat;

        switch (dateStyle) {
          case DATE_STYLE.SHORT:
            dateFormat = shortDateFormat;
            break;

          case DATE_STYLE.LONG:
            dateFormat = longDateFormat;
            break;

          default:
            dateFormat = mediumDateFormat;
            break;
        }

        return dateFormat;
      }

      dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
          composed: true,
          bubbles: true,
          detail: {
            value: this._value
          }
        }));
      }

      datepickerKeyboardInterface() {
        const that = this;
        return {
          showCalendar() {
            that.showAndFocusCalendar();
          },

          hideCalendar() {
            that.hideCalendarAndFocusTrigger();
          },

          isCalendarVisible() {
            return that.isCalendarVisible;
          }

        };
      }

      parse(dateString) {
        // We cannot use parseDateTimeISO8601 here because that method does not have a strict flag. If the value is not an ISO string, that method will parse using the native Date()
        // Alternatively we could call isValidISODateTimeString and then parseDateTimeISO8601.
        return parseDateTime(dateString, STANDARD_DATE_FORMAT, true);
      }

      get allowedDateFormats() {
        // We should prioritize the long, because a long date matched with the medium format. An issue in aura?
        // Ex: September 8, 2017 when be parsed with the medium format, returns a valid iso date.
        return [longDateFormat, mediumDateFormat, shortDateFormat];
      }
      /**
       * Parses the input date and sets the dateFormat used to parse the displayValue
       * if it is a valid Date.
       *
       * @param {String} displayValue - The input date.
       * @return {null | string} - A normalized formatted date if displayValue is valid. null otherwise.
       */


      parseFormattedDate(displayValue) {
        const allowedFormats = this.allowedDateFormats;
        const n = allowedFormats.length;
        let i = 0,
            value = null;

        do {
          value = normalizeFormattedDate(displayValue, allowedFormats[i]);
          i++;
        } while (value === null && i < n);

        return value;
      }

    }

    LightningDatePicker.delegatesFocus = true;

    lwc.registerDecorators(LightningDatePicker, {
      publicProps: {
        label: {
          config: 0
        },
        name: {
          config: 0
        },
        max: {
          config: 0
        },
        min: {
          config: 0
        },
        placeholder: {
          config: 0
        },
        autocomplete: {
          config: 0
        },
        messageWhenValueMissing: {
          config: 0
        },
        messageWhenBadInput: {
          config: 3
        },
        messageWhenRangeOverflow: {
          config: 3
        },
        messageWhenRangeUnderflow: {
          config: 3
        },
        ariaLabel: {
          config: 3
        },
        ariaLabelledByElement: {
          config: 3
        },
        ariaControlsElement: {
          config: 3
        },
        ariaDescribedByElements: {
          config: 3
        },
        value: {
          config: 3
        },
        disabled: {
          config: 3
        },
        readOnly: {
          config: 3
        },
        required: {
          config: 3
        },
        fieldLevelHelp: {
          config: 3
        },
        variant: {
          config: 3
        },
        dateStyle: {
          config: 3
        }
      },
      publicMethods: ["focus", "blur", "showHelpMessage", "hasBadInput"],
      track: {
        _disabled: 1,
        _readonly: 1,
        _required: 1,
        _value: 1,
        _calendarVisible: 1,
        _displayValue: 1,
        _errorMessage: 1,
        _fieldLevelHelp: 1,
        _variant: 1
      },
      fields: ["_ariaLabelledBy", "_ariaControls", "_ariaDescribedBy"]
    });

    var _lightningDatepicker = lwc.registerComponent(LightningDatePicker, {
      tmpl: _tmpl$g
    });

    function stylesheet$4(hostSelector, shadowSelector, nativeShadow) {
      return ".slds-inline-logo" + shadowSelector + " {height: 1rem;margin-top: 1rem;margin-bottom: 1rem;}\n";
    }
    var _implicitStylesheets$4 = [stylesheet$4];

    function tmpl$g($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        k: api_key,
        h: api_element,
        i: api_iterator,
        f: api_flatten
      } = $api;
      return api_flatten([$cmp.hasParts ? api_iterator($cmp.text, function (item) {
        return [item.part.highlight ? api_element("strong", {
          key: api_key(0, item.key)
        }, [api_dynamic(item.part.text)]) : null, !item.part.highlight ? api_dynamic(item.part.text) : null];
      }) : [], !$cmp.hasParts ? api_dynamic($cmp.text) : null]);
    }

    var _tmpl$h = lwc.registerTemplate(tmpl$g);
    tmpl$g.stylesheets = [];
    tmpl$g.stylesheetTokens = {
      hostAttribute: "lightning-baseComboboxFormattedText_baseComboboxFormattedText-host",
      shadowAttribute: "lightning-baseComboboxFormattedText_baseComboboxFormattedText"
    };

    class LightningBaseComboboxFormattedText extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._text = '';
        this.hasParts = void 0;
      }

      get text() {
        return this._text;
      }

      set text(value) {
        this.hasParts = Array.isArray(value) && value.length > 0;

        if (this.hasParts) {
          // Generate keys for LWC DOM
          this._text = value.map((part, i) => ({
            part,
            key: i
          }));
        } else {
          this._text = value;
        }
      }

    }

    lwc.registerDecorators(LightningBaseComboboxFormattedText, {
      publicProps: {
        text: {
          config: 3
        }
      },
      track: {
        _text: 1,
        hasParts: 1
      }
    });

    var _lightningBaseComboboxFormattedText = lwc.registerComponent(LightningBaseComboboxFormattedText, {
      tmpl: _tmpl$h
    });

    function tmpl$h($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        h: api_element,
        d: api_dynamic
      } = $api;
      return [api_element("span", {
        classMap: {
          "slds-media__figure": true
        },
        key: 1
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "size": $cmp.iconSize,
          "alternativeText": $cmp.item.iconAlternativeText,
          "iconName": $cmp.item.iconName
        },
        key: 0
      }, [])]), api_element("span", {
        classMap: {
          "slds-media__body": true
        },
        key: 8
      }, [api_element("span", {
        classMap: {
          "slds-listbox__option-text": true,
          "slds-listbox__option-text_entity": true
        },
        key: 4
      }, [!$cmp.textHasParts ? api_element("span", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "title": $cmp.item.text
        },
        key: 2
      }, [api_dynamic($cmp.item.text)]) : null, $cmp.textHasParts ? api_custom_element("lightning-base-combobox-formatted-text", _lightningBaseComboboxFormattedText, {
        classMap: {
          "slds-truncate": true
        },
        props: {
          "title": $cmp.text,
          "text": $cmp.item.text
        },
        key: 3
      }, []) : null]), $cmp.hasSubText ? api_element("span", {
        classMap: {
          "slds-listbox__option-meta": true,
          "slds-listbox__option-meta_entity": true
        },
        key: 7
      }, [!$cmp.subTextHasParts ? api_element("span", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "title": $cmp.item.subText
        },
        key: 5
      }, [api_dynamic($cmp.item.subText)]) : null, $cmp.subTextHasParts ? api_custom_element("lightning-base-combobox-formatted-text", _lightningBaseComboboxFormattedText, {
        classMap: {
          "slds-truncate": true
        },
        props: {
          "title": $cmp.subText,
          "text": $cmp.item.subText
        },
        key: 6
      }, []) : null]) : null]), $cmp.item.rightIconName ? api_element("span", {
        classMap: {
          "slds-media__figure": true,
          "slds-media__figure_reverse": true
        },
        key: 10
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "size": $cmp.rightIconSize,
          "alternativeText": $cmp.item.rightIconAlternativeText,
          "iconName": $cmp.item.rightIconName
        },
        key: 9
      }, [])]) : null];
    }

    var card = lwc.registerTemplate(tmpl$h);
    tmpl$h.stylesheets = [];
    tmpl$h.stylesheetTokens = {
      hostAttribute: "lightning-baseComboboxItem_card-host",
      shadowAttribute: "lightning-baseComboboxItem_card"
    };

    function tmpl$i($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        h: api_element,
        d: api_dynamic
      } = $api;
      return [api_element("span", {
        classMap: {
          "slds-media__figure": true,
          "slds-listbox__option-icon": true
        },
        key: 1
      }, [$cmp.item.iconName ? api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "alternativeText": $cmp.item.iconAlternativeText,
          "iconName": $cmp.item.iconName,
          "size": "x-small"
        },
        key: 0
      }, []) : null]), api_element("span", {
        classMap: {
          "slds-media__body": true
        },
        key: 4
      }, [!$cmp.textHasParts ? api_element("span", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "title": $cmp.item.text
        },
        key: 2
      }, [api_dynamic($cmp.item.text)]) : null, $cmp.textHasParts ? api_custom_element("lightning-base-combobox-formatted-text", _lightningBaseComboboxFormattedText, {
        classMap: {
          "slds-truncate": true
        },
        props: {
          "text": $cmp.item.text,
          "title": $cmp.text
        },
        key: 3
      }, []) : null])];
    }

    var inline = lwc.registerTemplate(tmpl$i);
    tmpl$i.stylesheets = [];
    tmpl$i.stylesheetTokens = {
      hostAttribute: "lightning-baseComboboxItem_inline-host",
      shadowAttribute: "lightning-baseComboboxItem_inline"
    };

    class LightningBaseComboboxItem extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.item = {};
      }

      connectedCallback() {
        // We want to make sure that the item has 'aria-selected' if it's selectable
        if (this.item.selectable) {
          this.setAttribute('aria-selected', 'false');
        }

        if (this.item.type === 'option-inline') {
          this.classList.add('slds-media_small', 'slds-listbox__option_plain');
        } else {
          this.classList.add('slds-listbox__option_entity');
        }
      }

      get textHasParts() {
        const text = this.item.text;
        return text && Array.isArray(text) && text.length > 0;
      }

      get subTextHasParts() {
        const subText = this.item.subText;
        return subText && Array.isArray(subText) && subText.length > 0;
      } // Return html based on the specified item type


      render() {
        if (this.item.type === 'option-card') {
          return card;
        }

        return inline;
      }

      highlight() {
        this.toggleHighlight(true);
      }

      removeHighlight() {
        this.toggleHighlight(false);
      }

      toggleHighlight(highlighted) {
        if (this.item.selectable) {
          this.setAttribute('aria-selected', highlighted ? 'true' : 'false');
          this.classList.toggle('slds-has-focus', highlighted);
        }
      } // Parts are needed for highlighting


      partsToText(parts) {
        if (parts && Array.isArray(parts) && parts.length > 0) {
          return parts.map(part => part.text).join('');
        }

        return parts;
      }

      get rightIconSize() {
        return this.item.rightIconSize || 'small';
      }

      get iconSize() {
        return this.item.iconSize || 'small';
      }

      get text() {
        return this.partsToText(this.item.text);
      }

      get subText() {
        return this.partsToText(this.item.subText);
      }

      get hasSubText() {
        const subText = this.item.subText;
        return subText && subText.length > 0;
      }

    }

    lwc.registerDecorators(LightningBaseComboboxItem, {
      publicProps: {
        item: {
          config: 0
        }
      },
      publicMethods: ["highlight", "removeHighlight"]
    });

    var _lightningBaseComboboxItem = lwc.registerComponent(LightningBaseComboboxItem, {
      tmpl: _tmpl$1
    });

    function tmpl$j($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        gid: api_scoped_id,
        b: api_bind,
        h: api_element,
        d: api_dynamic,
        k: api_key,
        i: api_iterator,
        f: api_flatten
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5,
        _m6,
        _m7,
        _m8,
        _m9,
        _m10,
        _m11,
        _m12,
        _m13,
        _m14
      } = $ctx;
      return [api_element("div", {
        className: $cmp.computedDropdownTriggerClass,
        attrs: {
          "role": "combobox",
          "aria-expanded": $cmp.computedAriaExpanded,
          "aria-haspopup": "listbox"
        },
        key: 29,
        on: {
          "click": _m14 || ($ctx._m14 = api_bind($cmp.handleTriggerClick))
        }
      }, [api_element("div", {
        className: $cmp.computedFormElementClass,
        attrs: {
          "role": "none"
        },
        key: 12
      }, [$cmp.hasInputPill ? api_custom_element("lightning-icon", _lightningIcon, {
        classMap: {
          "slds-icon_container": true,
          "slds-combobox__input-entity-icon": true
        },
        props: {
          "iconName": $cmp.inputPill.iconName,
          "alternativeText": $cmp.inputPill.iconAlternativeText,
          "size": "x-small"
        },
        key: 0
      }, []) : null, api_element("input", {
        className: $cmp.computedInputClass,
        attrs: {
          "id": api_scoped_id("input"),
          "type": "text",
          "role": "textbox",
          "autocomplete": "off",
          "name": $cmp.name,
          "placeholder": $cmp.computedPlaceholder,
          "maxlength": $cmp.inputMaxlength,
          "aria-autocomplete": $cmp.computedAriaAutocomplete,
          "aria-label": $cmp.inputLabel
        },
        props: {
          "required": $cmp.required,
          "value": $cmp.computedInputValue,
          "disabled": $cmp.disabled,
          "readOnly": $cmp._inputReadOnly
        },
        key: 1,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleFocus)),
          "select": _m1 || ($ctx._m1 = api_bind($cmp.handleInputSelect)),
          "change": _m2 || ($ctx._m2 = api_bind($cmp.handleTextChange)),
          "input": _m3 || ($ctx._m3 = api_bind($cmp.handleInput)),
          "keydown": _m4 || ($ctx._m4 = api_bind($cmp.handleInputKeyDown)),
          "blur": _m5 || ($ctx._m5 = api_bind($cmp.handleBlur))
        }
      }, []), $cmp.hasInputPill ? api_element("div", {
        classMap: {
          "slds-input__icon-group": true,
          "slds-input__icon-group_right": true
        },
        key: 5
      }, [api_element("button", {
        classMap: {
          "slds-button": true,
          "slds-button_icon": true,
          "slds-input__icon": true,
          "slds-input__icon_right": true
        },
        attrs: {
          "type": "button",
          "title": $cmp.i18n.pillCloseButtonAlternativeText
        },
        key: 4,
        on: {
          "click": _m6 || ($ctx._m6 = api_bind($cmp.handlePillRemove))
        }
      }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": "utility:close",
          "variant": "bare",
          "svgClass": "slds-button__icon"
        },
        key: 2
      }, []), api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 3
      }, [api_dynamic($cmp.i18n.pillCloseButtonAlternativeText)])])]) : null, !$cmp.hasInputPill ? api_element("div", {
        classMap: {
          "slds-input__icon-group": true,
          "slds-input__icon-group_right": true
        },
        key: 11
      }, [$cmp.showInputActivityIndicator ? api_element("div", {
        classMap: {
          "slds-spinner": true,
          "slds-spinner_brand": true,
          "slds-spinner_x-small": true,
          "slds-input__spinner": true
        },
        attrs: {
          "role": "status"
        },
        key: 9
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 6
      }, [api_dynamic($cmp.i18n.loadingText)]), api_element("div", {
        classMap: {
          "slds-spinner__dot-a": true
        },
        key: 7
      }, []), api_element("div", {
        classMap: {
          "slds-spinner__dot-b": true
        },
        key: 8
      }, [])]) : null, $cmp.inputIconName ? api_custom_element("lightning-icon", _lightningIcon, {
        classMap: {
          "slds-input__icon": true,
          "slds-input__icon_right": true
        },
        props: {
          "alternativeText": $cmp.inputIconAlternativeText,
          "iconName": $cmp.inputIconName,
          "size": $cmp.inputIconSize
        },
        key: 10
      }, []) : null]) : null]), api_element("div", {
        className: $cmp.computedDropdownClass,
        attrs: {
          "id": api_scoped_id("dropdown-element"),
          "data-dropdown-element": true,
          "role": "listbox"
        },
        key: 28,
        on: {
          "scroll": _m9 || ($ctx._m9 = api_bind($cmp.handleListboxScroll)),
          "mousedown": _m10 || ($ctx._m10 = api_bind($cmp.handleDropdownMouseDown)),
          "mouseup": _m11 || ($ctx._m11 = api_bind($cmp.handleDropdownMouseUp)),
          "mouseleave": _m12 || ($ctx._m12 = api_bind($cmp.handleDropdownMouseLeave)),
          "click": _m13 || ($ctx._m13 = api_bind($cmp.handleOptionClick))
        }
      }, $cmp._hasDropdownOpened ? api_flatten([api_iterator($cmp._items, function (item) {
        return [!item.items ? api_custom_element("lightning-base-combobox-item", _lightningBaseComboboxItem, {
          classMap: {
            "slds-media": true,
            "slds-listbox__option": true,
            "slds-media_center": true
          },
          attrs: {
            "data-item-id": item.id,
            "data-value": item.value
          },
          props: {
            "role": "option",
            "item": item,
            "id": api_scoped_id(item.id)
          },
          key: api_key(13, item.value),
          on: {
            "mouseenter": _m7 || ($ctx._m7 = api_bind($cmp.handleOptionMouseEnter))
          }
        }, []) : null, item.items ? api_element("ul", {
          attrs: {
            "role": "group",
            "aria-label": item.label
          },
          key: api_key(19, item.label)
        }, api_flatten([item.label ? api_element("li", {
          classMap: {
            "slds-listbox__item": true
          },
          attrs: {
            "role": "presentation"
          },
          key: 16
        }, [api_element("div", {
          classMap: {
            "slds-media": true,
            "slds-listbox__option": true,
            "slds-listbox__option_plain": true,
            "slds-media_small": true
          },
          attrs: {
            "role": "presentation"
          },
          key: 15
        }, [api_element("h3", {
          attrs: {
            "role": "presentation",
            "title": item.label
          },
          key: 14
        }, [api_dynamic(item.label)])])]) : null, api_iterator(item.items, function (groupItem) {
          return api_element("li", {
            classMap: {
              "slds-listbox__item": true
            },
            attrs: {
              "role": "presentation"
            },
            key: api_key(18, groupItem.value)
          }, [api_custom_element("lightning-base-combobox-item", _lightningBaseComboboxItem, {
            classMap: {
              "slds-media": true,
              "slds-listbox__option": true,
              "slds-media_center": true
            },
            attrs: {
              "data-item-id": groupItem.id,
              "data-value": groupItem.value
            },
            props: {
              "role": "option",
              "item": groupItem,
              "id": api_scoped_id(groupItem.id)
            },
            key: 17,
            on: {
              "mouseenter": _m8 || ($ctx._m8 = api_bind($cmp.handleOptionMouseEnter))
            }
          }, [])]);
        })])) : null];
      }), $cmp.showDropdownActivityIndicator ? api_element("div", {
        classMap: {
          "slds-listbox__item": true
        },
        attrs: {
          "role": "presentation"
        },
        key: 25
      }, [api_element("div", {
        classMap: {
          "slds-align_absolute-center": true,
          "slds-p-top_medium": true
        },
        key: 24
      }, [api_element("div", {
        classMap: {
          "slds-spinner": true,
          "slds-spinner_x-small": true,
          "slds-spinner_inline": true
        },
        attrs: {
          "role": "status"
        },
        key: 23
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 20
      }, [api_dynamic($cmp.i18n.loadingText)]), api_element("div", {
        classMap: {
          "slds-spinner__dot-a": true
        },
        key: 21
      }, []), api_element("div", {
        classMap: {
          "slds-spinner__dot-b": true
        },
        key: 22
      }, [])])])]) : null, $cmp.showAttribution ? api_element("div", {
        classMap: {
          "slds-align_absolute-center": true
        },
        key: 27
      }, [api_element("img", {
        classMap: {
          "slds-inline-logo": true
        },
        attrs: {
          "src": $cmp.attributionLogoUrl,
          "alt": $cmp.attributionLogoAssistiveText,
          "title": $cmp.attributionLogoAssistiveText
        },
        key: 26
      }, [])]) : null]) : [])])];
    }

    var _tmpl$i = lwc.registerTemplate(tmpl$j);
    tmpl$j.stylesheets = [];

    if (_implicitStylesheets$4) {
      tmpl$j.stylesheets.push.apply(tmpl$j.stylesheets, _implicitStylesheets$4);
    }
    tmpl$j.stylesheetTokens = {
      hostAttribute: "lightning-baseCombobox_baseCombobox-host",
      shadowAttribute: "lightning-baseCombobox_baseCombobox"
    };

    var labelAriaSelectedOptions = 'Selected Options:';

    var labelDeselectOptionKeyboard = 'Press delete or backspace to remove';

    var labelLoadingText = 'Loading';

    var labelPillCloseButtonAlternativeText = 'Clear Selection';

    function preventDefaultAndStopPropagation$2(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    function handleEnterKey({
      event,
      currentIndex,
      dropdownInterface
    }) {
      preventDefaultAndStopPropagation$2(event);

      if (dropdownInterface.isDropdownVisible() && currentIndex >= 0) {
        dropdownInterface.selectByIndex(currentIndex);
      } else {
        dropdownInterface.openDropdownIfNotEmpty();
      }
    }

    function handlePageUpOrDownKey({
      event,
      currentIndex,
      dropdownInterface
    }) {
      preventDefaultAndStopPropagation$2(event);

      if (!dropdownInterface.isDropdownVisible()) {
        dropdownInterface.openDropdownIfNotEmpty();
      }

      const pageUpDownOptionSkipCount = 10;

      if (dropdownInterface.getTotalOptions() > 0) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
          let highlightIndex = 0;

          if (event.key === 'PageUp') {
            highlightIndex = Math.max(currentIndex - pageUpDownOptionSkipCount, 0);
          } else {
            // Jump 10 options down
            highlightIndex = Math.min(currentIndex + pageUpDownOptionSkipCount, dropdownInterface.getTotalOptions() - 1);
          }

          dropdownInterface.highlightOptionWithIndex(highlightIndex);
        });
      }
    }

    function handleHomeOrEndKey({
      event,
      dropdownInterface
    }) {
      // If not a read-only input we want the default browser behaviour
      if (!dropdownInterface.isInputReadOnly()) {
        return;
      }

      preventDefaultAndStopPropagation$2(event);

      if (!dropdownInterface.isDropdownVisible()) {
        dropdownInterface.openDropdownIfNotEmpty();
      }

      if (dropdownInterface.getTotalOptions() > 0) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
          const highlightIndex = event.key === 'Home' ? 0 : dropdownInterface.getTotalOptions() - 1;
          dropdownInterface.highlightOptionWithIndex(highlightIndex);
        });
      }
    }

    function handleUpOrDownKey({
      event,
      currentIndex,
      dropdownInterface
    }) {
      preventDefaultAndStopPropagation$2(event);

      if (!dropdownInterface.isDropdownVisible()) {
        dropdownInterface.openDropdownIfNotEmpty();
      }

      const isUpKey = event.key === 'Up' || event.key === 'ArrowUp';
      let nextIndex;

      if (currentIndex >= 0) {
        nextIndex = isUpKey ? currentIndex - 1 : currentIndex + 1;

        if (nextIndex >= dropdownInterface.getTotalOptions()) {
          nextIndex = 0;
        } else if (nextIndex < 0) {
          nextIndex = dropdownInterface.getTotalOptions() - 1;
        }
      } else {
        nextIndex = isUpKey ? dropdownInterface.getTotalOptions() - 1 : 0;
      }

      if (dropdownInterface.getTotalOptions() > 0) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
          dropdownInterface.highlightOptionWithIndex(nextIndex);
        });
      }
    }

    function handleEscapeOrTabKey({
      event,
      dropdownInterface
    }) {
      if (dropdownInterface.isDropdownVisible()) {
        event.stopPropagation();
        dropdownInterface.closeDropdown();
      }
    }

    function handleTypedCharacters({
      event,
      currentIndex,
      dropdownInterface
    }) {
      if (event.key && event.key.length > 1) {
        // not a printable character
        return;
      }

      if (!dropdownInterface.isDropdownVisible()) {
        dropdownInterface.openDropdownIfNotEmpty();
      }

      if (dropdownInterface.isInputReadOnly()) {
        // The element should be read only, it's a work-around for IE11 as it will still make editable an input
        // that has focus and was dynamically changed to be readonly on focus change. Remove once we no longer
        // support IE11
        event.preventDefault(); // eslint-disable-next-line @lwc/lwc/no-async-operation

        requestAnimationFrame(() => runActionOnBufferedTypedCharacters(event, dropdownInterface.highlightOptionWithText.bind(this, currentIndex || 0)));
      }
    }

    const eventKeyToHandlerMap = {
      Enter: handleEnterKey,
      PageUp: handlePageUpOrDownKey,
      PageDown: handlePageUpOrDownKey,
      Home: handleHomeOrEndKey,
      End: handleHomeOrEndKey,
      Down: handleUpOrDownKey,
      // IE11/Edge specific
      Up: handleUpOrDownKey,
      // IE11/Edge specific
      ArrowUp: handleUpOrDownKey,
      ArrowDown: handleUpOrDownKey,
      Esc: handleEscapeOrTabKey,
      // IE11/Edge specific
      Escape: handleEscapeOrTabKey,
      Tab: handleEscapeOrTabKey
    };
    function handleKeyDownOnInput({
      event,
      currentIndex,
      dropdownInterface
    }) {
      const parameters = {
        event,
        currentIndex,
        dropdownInterface
      };

      if (eventKeyToHandlerMap[event.key]) {
        eventKeyToHandlerMap[event.key](parameters);
      } else {
        handleTypedCharacters(parameters);
      }
    }

    class BaseComboboxEvents {
      constructor(baseCombobox) {
        this.dispatchEvent = baseCombobox.dispatchEvent.bind(baseCombobox);
      }

      dispatchPillRemove(pill) {
        this.dispatchEvent(new CustomEvent('pillremove', {
          detail: {
            item: pill
          }
        }));
      }

      dispatchEndReached() {
        this.dispatchEvent(new CustomEvent('endreached'));
      }

      dispatchFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
      }

      dispatchBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
      }

      dispatchTextInput(text) {
        this.dispatchEvent(new CustomEvent('textinput', {
          detail: {
            text
          }
        }));
      }

      dispatchTextChange(text) {
        this.dispatchEvent(new CustomEvent('textchange', {
          detail: {
            text
          }
        }));
      }

      dispatchSelect(value) {
        this.dispatchEvent(new CustomEvent('select', {
          detail: {
            value
          }
        }));
      }

      dispatchDropdownOpen() {
        this.dispatchEvent(new CustomEvent('dropdownopen'));
      }

      dispatchDropdownOpenRequest() {
        this.dispatchEvent(new CustomEvent('dropdownopenrequest'));
      }

    }

    const i18n$7 = {
      ariaSelectedOptions: labelAriaSelectedOptions,
      deselectOptionKeyboard: labelDeselectOptionKeyboard,
      pillCloseButtonAlternativeText: labelPillCloseButtonAlternativeText,
      loadingText: labelLoadingText
    };
    const SMALL_MIN_HEIGHT = '2.25rem';
    const MEDIUM_MIN_HEIGHT = '6.75rem';
    const ARIA_CONTROLS$2 = 'aria-controls';
    const ARIA_LABELLEDBY$1 = 'aria-labelledby';
    const ARIA_DESCRIBEDBY$3 = 'aria-describedby';
    const ARIA_LABEL$1 = 'aria-label';
    const ARIA_ACTIVEDESCENDANT = 'aria-activedescendant';

    class LightningBaseCombobox extends lwc.LightningElement {
      constructor() {
        super();
        this.inputText = '';
        this.inputIconName = 'utility:down';
        this.inputIconSize = 'x-small';
        this.inputIconAlternativeText = void 0;
        this.inputMaxlength = void 0;
        this.showInputActivityIndicator = false;
        this.required = false;
        this.dropdownAlignment = 'left';
        this.placeholder = 'Select an Item';
        this.inputLabel = void 0;
        this.name = void 0;
        this.inputPill = void 0;
        this.attributionLogoUrl = void 0;
        this.attributionLogoAssistiveText = void 0;
        this._showDropdownActivityIndicator = false;
        this._items = [];
        this._disabled = false;
        this._dropdownVisible = false;
        this._hasDropdownOpened = false;
        this._highlightedOptionElementId = null;
        this._variant = void 0;
        this._dropdownHeight = 'standard';
        this._readonly = false;
        this._logoLoaded = false;
        this._inputDescribedBy = [];
        this._inputAriaControls = void 0;
        this._activeElementDomId = void 0;
        this._events = new BaseComboboxEvents(this);
      }

      renderedCallback() {
        this.dispatchEvent(new CustomEvent('ready', {
          detail: {
            id: this.inputId,
            name: this.name
          }
        }));
        this.synchronizeA11y();
      }

      connectedCallback() {
        this.classList.add('slds-combobox_container');
        this._connected = true;
        this._keyboardInterface = this.dropdownKeyboardInterface();
      }

      disconnectedCallback() {
        this._connected = false;
        this._listBoxElementCache = undefined;
      }

      get inputControlsElement() {
        return this._inputAriaControls;
      }

      set inputControlsElement(el) {
        this._inputAriaControls = el;
        this.synchronizeA11y();
      }

      get inputDescribedByElements() {
        return this._inputDescribedBy;
      }

      set inputDescribedByElements(elements) {
        if (Array.isArray(elements)) {
          this._inputDescribedBy = elements;
        } else {
          this._inputDescribedBy = [elements];
        }

        this.synchronizeA11y();
      }

      get inputLabelledByElement() {
        return this._inputLabelledBy;
      }

      set inputLabelledByElement(el) {
        this._inputLabelledBy = el;
        this.synchronizeA11y();
      }

      get inputLabelledById() {
        return getRealDOMId(this._inputLabelledBy);
      }

      get inputAriaControlsId() {
        return getRealDOMId(this._inputAriaControls);
      }

      get inputId() {
        return getRealDOMId(this.template.querySelector('input'));
      }

      get computedAriaDescribedBy() {
        const ariaValues = [];

        this._inputDescribedBy.forEach(el => {
          ariaValues.push(getRealDOMId(el));
        });

        return normalizeAriaAttribute(ariaValues);
      }

      get dropdownHeight() {
        return this._dropdownHeight;
      }

      set dropdownHeight(height) {
        this._dropdownHeight = normalizeString(height, {
          fallbackValue: 'standard',
          validValues: ['standard', 'small']
        });
      }

      get showDropdownActivityIndicator() {
        return this._showDropdownActivityIndicator;
      }

      set showDropdownActivityIndicator(value) {
        this._showDropdownActivityIndicator = normalizeBoolean(value);

        if (this._connected) {
          if (this._showDropdownActivityIndicator) {
            if (this._shouldOpenDropDown) {
              this.openDropdownIfNotEmpty();
            }
          } else if (this._dropdownVisible && this.isDropdownEmpty) {
            this.closeDropdown();
          }
        }
      }

      get disabled() {
        return this._disabled;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);

        if (this._disabled && this._dropdownVisible) {
          this.closeDropdown();
        }
      }

      get readOnly() {
        return this._readonly;
      }

      set readOnly(value) {
        this._readonly = normalizeBoolean(value);

        if (this._readonly && this._dropdownVisible) {
          this.closeDropdown();
        }
      }

      get variant() {
        return this._variant || VARIANT.STANDARD;
      }

      set variant(value) {
        this._variant = normalizeString(value, {
          fallbackValue: VARIANT.STANDARD,
          validValues: [VARIANT.STANDARD, 'lookup']
        });
      }

      get items() {
        return this._unprocessedItems;
      }

      set items(items = []) {
        this._unprocessedItems = items;

        if (this._connected) {
          if (this._hasDropdownOpened) {
            // The dropdown has already been opened at least once, so process the items immediately
            this.updateItems(items);

            if (this._dropdownVisible) {
              // The dropdown is visible but there are no items to show, close it
              if (this.isDropdownEmpty) {
                this.closeDropdown();
              } else {
                // We have new items, update highlight
                this.highlightDefaultItem(); // Since the items have changed, the positioning should be recomputed
                // remove-next-line-for-c-namespace

                this.startDropdownAutoPositioning();
              }
            }
          }

          if (this._shouldOpenDropDown) {
            this.openDropdownIfNotEmpty();
          }
        }
      }

      highlightInputText() {
        if (this._connected) {
          // Safari has issues with invoking set selection range immediately in the 'focus' handler, instead
          // we'd be doing it in an animation frame. Remove the requestAnimationFrame once/if this is fixed
          // in Safari
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          requestAnimationFrame(() => {
            const {
              inputElement
            } = this;
            inputElement.setSelectionRange(0, inputElement.value.length);
          });
        }
      }

      get showAttribution() {
        return this.attributionLogoUrl;
      }

      focus() {
        if (this._connected) {
          this.inputElement.focus();
        }
      }

      focusAndOpenDropdownIfNotEmpty() {
        if (this._connected) {
          if (!this._inputHasFocus) {
            this.focus();
          }

          this.openDropdownIfNotEmpty();
        }
      }

      blur() {
        if (this._connected) {
          this.inputElement.blur();
        }
      }

      synchronizeA11y() {
        const input = this.template.querySelector('input');

        if (!input) {
          return;
        }

        synchronizeAttrs(input, {
          [ARIA_LABELLEDBY$1]: this.inputLabelledById,
          [ARIA_DESCRIBEDBY$3]: this.computedAriaDescribedBy,
          [ARIA_ACTIVEDESCENDANT]: this._activeElementDomId,
          [ARIA_CONTROLS$2]: this.computedInputControls,
          [ARIA_LABEL$1]: this.inputLabel
        });
      }

      itemId(index) {
        return this.inputId + '-' + index;
      }

      itemIndexFromId(id) {
        // Extracts the index from an item id.
        return parseInt(id.substring(id.lastIndexOf('-') + 1), 10);
      }

      processItem(item) {
        const itemCopy = {}; // Supported item properties:
        // 'type' (string): option-inline, option-card
        // 'highlight' (boolean): Whether to highlight the item when dropdown opens
        // 'iconName': left icon name
        // 'iconSize': left icon size
        // 'iconAlternativeText': assistive text for the left icon
        // 'rightIconName': right icon name
        // 'rightIconSize': right icon size
        // 'rightIconAlternativeText': assistive text for the right icon
        // 'text': text to display
        // 'subText': sub-text to display (only option-card supports it)
        // 'value': value associated with the option

        itemCopy.type = item.type;
        itemCopy.iconName = item.iconName;
        itemCopy.iconSize = item.iconSize;
        itemCopy.iconAlternativeText = item.iconAlternativeText;
        itemCopy.rightIconName = item.rightIconName;
        itemCopy.rightIconSize = item.rightIconSize;
        itemCopy.rightIconAlternativeText = item.rightIconAlternativeText;
        itemCopy.text = item.text;
        itemCopy.subText = item.subText;
        itemCopy.value = item.value; // extra metadata needed

        itemCopy.selectable = ['option-card', 'option-inline'].indexOf(item.type) >= 0;

        if (itemCopy.selectable) {
          itemCopy.index = this._selectableItems;
          itemCopy.id = this.itemId(itemCopy.index);
          this._selectableItems += 1;

          if (item.highlight) {
            this._highlightedItemIndex = itemCopy.index;
          }
        }

        return itemCopy;
      }

      get _inputReadOnly() {
        return this._readonly || this.variant === VARIANT.STANDARD || this.hasInputPill;
      }

      get computedAriaAutocomplete() {
        if (this.hasInputPill) {
          // no aria-autocomplete when pill is showing
          return null;
        }

        return this._inputReadOnly ? 'none' : 'list';
      }

      get computedPlaceholder() {
        return this.hasInputPill ? this.inputPill.label : this.placeholder;
      }

      get computedInputValue() {
        return this.hasInputPill ? this.inputPill.label : this.inputText;
      }

      handleListboxScroll(event) {
        // We don't want this to bubble up to the modal which due to event retargeting wouldn't be able
        // to know what is actually being scrolled and thus may lead to the scrolling of the modal
        event.stopPropagation();
        const listbox = event.target;
        const height = listbox.getBoundingClientRect().height;
        const maxScroll = listbox.scrollHeight - height; // Account for variation between browsers when it comes to calculation of margins/padding

        const buffer = 20;
        const bottomReached = listbox.scrollTop + buffer >= maxScroll;

        if (bottomReached) {
          this._events.dispatchEndReached();
        }
      }

      get listboxElement() {
        if (!this._listBoxElementCache) {
          this._listBoxElementCache = this.template.querySelector('[role="listbox"]');
        }

        return this._listBoxElementCache;
      }

      get computedUniqueElementId() {
        return this.inputId;
      }

      get computedUniqueDropdownElementId() {
        return getRealDOMId(this.template.querySelector('[data-dropdown-element]'));
      }

      get computedInputControls() {
        const ariaValues = [this.computedUniqueDropdownElementId];

        if (this.inputControlsElement) {
          ariaValues.push(this.inputAriaControlsId);
        }

        return normalizeAriaAttribute(ariaValues);
      }

      get i18n() {
        return i18n$7;
      }

      get computedDropdownTriggerClass() {
        return classSet('slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click').add({
          'slds-is-open': this._dropdownVisible
        }).toString();
      }

      get computedDropdownClass() {
        const alignment = this.dropdownAlignment;
        return classSet('slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid').add({
          'slds-dropdown_length-with-icon-10': this._dropdownHeight === 'standard',
          'slds-dropdown_length-with-icon-5': this._dropdownHeight === 'small',
          'slds-dropdown_left': alignment === 'left' || alignment === 'auto',
          'slds-dropdown_center': alignment === 'center',
          'slds-dropdown_right': alignment === 'right',
          'slds-dropdown_bottom': alignment === 'bottom-center',
          'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right': alignment === 'bottom-right',
          'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left': alignment === 'bottom-left'
        }).toString();
      }

      get computedInputClass() {
        const classes = classSet('slds-input slds-combobox__input');

        if (this.hasInputPill) {
          classes.add('slds-combobox__input-value');
        } else {
          classes.add({
            'slds-input-has-icon_group-right': this.showInputActivityIndicator
          });
        }

        return classes.toString();
      }

      get _shouldOpenDropDown() {
        // If items were empty and through a user interaction the dropdown should have opened, and if the
        // component still has the focus we'll open it on items update instead.
        return !this.dropdownDisabled && this._inputHasFocus && this._requestedDropdownOpen;
      }

      get dropdownDisabled() {
        return this.readOnly || this.disabled;
      }

      handleOptionClick(event) {
        if (event.target.hasAttribute('aria-selected')) {
          event.stopPropagation();
          event.preventDefault();
          this.selectOptionAndCloseDropdown(event.target);
        }
      }

      handleOptionMouseEnter(event) {
        if (event.target.hasAttribute('aria-selected')) {
          this.highlightOption(event.target);
        }
      }

      handleDropdownMouseLeave() {
        this.removeHighlight(); // This is to account for when a user makes a mousedown press on the dropdown and then leaves the dropdown
        // area, it would leave the dropdown open even though the focus would no longer be on the input

        if (!this._inputHasFocus) {
          this.closeDropdown();
        }
      }

      handleTriggerClick(event) {
        event.stopPropagation();
        this.allowBlur();

        if (this.dropdownDisabled) {
          return;
        }

        if (!this.hasInputPill) {
          // toggle dropdown only for readonly combobox, only open the dropdown otherwise
          // if it's not already opened.
          if (this._inputReadOnly) {
            if (this._dropdownVisible) {
              this.closeDropdown();
            } else {
              this.openDropdownIfNotEmpty();
            }
          } else {
            this.openDropdownIfNotEmpty();
          }

          this.inputElement.focus();
        }
      }

      handlePillKeyDown(event) {
        if (this.dropdownDisabled) {
          return;
        } // 'Del' is IE11 specific, remove once IE11 is no longer supported


        if (event.key === 'Delete' || event.key === 'Del') {
          this.handlePillRemove();
        }
      }

      handleInputKeyDown(event) {
        if (this.dropdownDisabled) {
          return;
        }

        if (this.hasInputPill) {
          this.handlePillKeyDown(event);
        } else {
          handleKeyDownOnInput({
            event,
            currentIndex: this.getCurrentHighlightedOptionIndex(),
            dropdownInterface: this._keyboardInterface
          });
        }
      }

      handleTextChange() {
        this._events.dispatchTextChange(this.inputElement.value);
      }

      handleFocus() {
        this._inputHasFocus = true;

        this._events.dispatchFocus();
      }

      handleInput() {
        // Do not dispatch any events if the pill is showing, this is specifically an IE11 problem,
        // which fires an 'input' event when the placeholder on an input is changed (which is what happens when
        // the pill is shown). The check can be removed when IE11 is no longer supported.
        if (!this.hasInputPill) {
          this._events.dispatchTextInput(this.inputElement.value);
        }
      }

      handleBlur() {
        this._inputHasFocus = false;

        if (this._cancelBlur) {
          return;
        }

        this.closeDropdown();

        this._events.dispatchBlur();
      }

      handleDropdownMouseDown(event) {
        const mainButton = 0;

        if (event.button === mainButton) {
          this.cancelBlur();
        }
      }

      handleDropdownMouseUp() {
        // We need this to make sure that if a scrollbar is being dragged with the mouse, upon release
        // of the drag we allow blur, otherwise the dropdown would not close on blur since we'd have cancel blur
        // set
        this.allowBlur();
      }

      highlightOption(option) {
        this.removeHighlight();

        if (option) {
          option.highlight();
          this._highlightedOptionElement = option;
          this._highlightedOptionElementId = option.getAttribute('data-item-id'); // active element is a component id getter works properly

          this._activeElementDomId = option.id;
        }

        this.synchronizeA11y();
      }

      highlightOptionAndScrollIntoView(optionElement) {
        if (this._selectableItems.length === 0 || !optionElement) {
          return;
        }

        this.highlightOption(optionElement);
        scrollIntoViewIfNeeded(optionElement, this.listboxElement);
      }

      removeHighlight() {
        const option = this._highlightedOptionElement;

        if (option) {
          option.removeHighlight();
          this._highlightedOptionElement = null;
          this._highlightedOptionElementId = null;
          this._activeElementDomId = null;
        }
      }

      selectOptionAndCloseDropdown(optionElement) {
        this.closeDropdown();
        this.inputElement.focus();
        const value = optionElement.getAttribute('data-value');

        this._events.dispatchSelect(value);
      }

      handleInputSelect(event) {
        event.stopPropagation();
      }

      openDropdownIfNotEmpty() {
        if (this._dropdownVisible) {
          // Already visible
          return;
        }

        const noOptions = !Array.isArray(this.items) || this.items.length === 0; // Do not dispatch the open request event if there already was a request to open

        if (noOptions && !this._requestedDropdownOpen) {
          // Dispatch dropdown open request
          this._events.dispatchDropdownOpenRequest();
        } // Do not open if there's nothing to show in the dropdown (eg. no options and no dropdown activity indicator)


        if (this.isDropdownEmpty) {
          // We use this attribute to flag whether an attempt has been made via user-interaction
          // to open the dropdown
          this._requestedDropdownOpen = true;
          return;
        }

        if (!this._hasDropdownOpened) {
          if (this._unprocessedItems) {
            this.updateItems(this._unprocessedItems);
          }

          this._hasDropdownOpened = true;
        }

        this._requestedDropdownOpen = false;
        this._dropdownVisible = true; // remove-next-line-for-c-namespace

        this.startDropdownAutoPositioning();
        this.highlightDefaultItem();

        this._events.dispatchDropdownOpen();
      }

      closeDropdown() {
        if (!this._dropdownVisible) {
          // Already closed
          return;
        } // remove-next-line-for-c-namespace


        this.stopDropdownPositioning();
        this.removeHighlight();
        this._dropdownVisible = false;
      }

      findOptionElementByIndex(index) {
        return this.template.querySelector(`[data-item-id="${this.itemId(index)}"]`);
      }

      allowBlur() {
        this._cancelBlur = false;
      }

      cancelBlur() {
        this._cancelBlur = true;
      }

      getCurrentHighlightedOptionIndex() {
        if (this._highlightedOptionElementId && this._highlightedOptionElementId.length > 0) {
          return this.itemIndexFromId(this._highlightedOptionElementId);
        }

        return -1;
      }

      get inputElement() {
        return this.template.querySelector('input');
      } // remove-next-line-for-c-namespace


      startDropdownAutoPositioning() {
        if (this.dropdownAlignment !== 'auto') {
          return;
        }

        if (!this._autoPosition) {
          this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
          target: () => this.template.querySelector('input'),
          element: () => this.template.querySelector('div.slds-dropdown'),
          align: {
            horizontal: Direction.Left,
            vertical: Direction.Top
          },
          targetAlign: {
            horizontal: Direction.Left,
            vertical: Direction.Bottom
          },
          autoFlip: true,
          alignWidth: true,
          autoShrinkHeight: true,
          minHeight: this._selectableItems < 3 ? SMALL_MIN_HEIGHT : MEDIUM_MIN_HEIGHT
        });
      } // remove-next-line-for-c-namespace


      stopDropdownPositioning() {
        if (this._autoPosition) {
          this._autoPosition.stop();
        }
      }

      get hasInputPill() {
        return this.inputPill && Object.keys(this.inputPill).length > 0;
      }

      handlePillRemove() {
        this.inputElement.focus();

        this._events.dispatchPillRemove(this.inputPill);
      }

      get computedFormElementClass() {
        const hasIcon = this.hasInputPill && this.inputPill.iconName;
        return classSet('slds-combobox__form-element slds-input-has-icon').add({
          'slds-input-has-icon_right': !hasIcon,
          'slds-input-has-icon_left-right': hasIcon
        }).toString();
      }

      get computedAriaExpanded() {
        return this._dropdownVisible ? 'true' : 'false';
      }

      updateItems(items) {
        if (!items) {
          return;
        }

        assert(Array.isArray(items), '"items" must be an array');
        this._selectableItems = 0;
        this._highlightedItemIndex = 0;
        this._items = items.map(item => {
          if (item.items) {
            // This is a group
            const groupCopy = {
              label: item.label
            };
            groupCopy.items = item.items.map(groupItem => {
              return this.processItem(groupItem);
            });
            return groupCopy;
          }

          return this.processItem(item);
        });
      }

      highlightDefaultItem() {
        this.removeHighlight(); // eslint-disable-next-line @lwc/lwc/no-async-operation

        requestAnimationFrame(() => {
          this.highlightOptionAndScrollIntoView(this.findOptionElementByIndex(this._highlightedItemIndex));
        });
      }

      get isDropdownEmpty() {
        // If the activity indicator is showing then it's not empty
        return !this.showDropdownActivityIndicator && (!Array.isArray(this.items) || this.items.length === 0);
      }

      dropdownKeyboardInterface() {
        const that = this;
        return {
          getTotalOptions() {
            return that._selectableItems;
          },

          selectByIndex(index) {
            that.selectOptionAndCloseDropdown(that.findOptionElementByIndex(index));
          },

          highlightOptionWithIndex(index) {
            that.highlightOptionAndScrollIntoView(that.findOptionElementByIndex(index));
          },

          isInputReadOnly() {
            return that._inputReadOnly;
          },

          highlightOptionWithText(currentIndex, text) {
            // This only supports a flat structure, groups are not supported
            for (let index = currentIndex + 1; index < that._items.length; index++) {
              const option = that._items[index];

              if (option.selectable && option.text && option.text.toLowerCase().indexOf(text.toLowerCase()) === 0) {
                that.highlightOptionAndScrollIntoView(that.findOptionElementByIndex(index));
                return;
              }
            }

            for (let index = 0; index < currentIndex; index++) {
              const option = that._items[index];

              if (option.selectable && option.text && option.text.toLowerCase().indexOf(text.toLowerCase()) === 0) {
                that.highlightOptionAndScrollIntoView(that.findOptionElementByIndex(index));
                return;
              }
            }
          },

          isDropdownVisible() {
            return that._dropdownVisible;
          },

          openDropdownIfNotEmpty() {
            that.openDropdownIfNotEmpty();
          },

          closeDropdown() {
            that.closeDropdown();
          }

        };
      }

    }

    LightningBaseCombobox.delegatesFocus = true;

    lwc.registerDecorators(LightningBaseCombobox, {
      publicProps: {
        inputText: {
          config: 0
        },
        inputIconName: {
          config: 0
        },
        inputIconSize: {
          config: 0
        },
        inputIconAlternativeText: {
          config: 0
        },
        inputMaxlength: {
          config: 0
        },
        showInputActivityIndicator: {
          config: 0
        },
        required: {
          config: 0
        },
        dropdownAlignment: {
          config: 0
        },
        placeholder: {
          config: 0
        },
        inputLabel: {
          config: 0
        },
        name: {
          config: 0
        },
        inputPill: {
          config: 0
        },
        attributionLogoUrl: {
          config: 0
        },
        attributionLogoAssistiveText: {
          config: 0
        },
        inputControlsElement: {
          config: 3
        },
        inputDescribedByElements: {
          config: 3
        },
        inputLabelledByElement: {
          config: 3
        },
        dropdownHeight: {
          config: 3
        },
        showDropdownActivityIndicator: {
          config: 3
        },
        disabled: {
          config: 3
        },
        readOnly: {
          config: 3
        },
        variant: {
          config: 3
        },
        items: {
          config: 3
        }
      },
      publicMethods: ["highlightInputText", "focus", "focusAndOpenDropdownIfNotEmpty", "blur"],
      track: {
        _showDropdownActivityIndicator: 1,
        _items: 1,
        _disabled: 1,
        _dropdownVisible: 1,
        _hasDropdownOpened: 1,
        _highlightedOptionElementId: 1,
        _variant: 1,
        _dropdownHeight: 1,
        _readonly: 1,
        _logoLoaded: 1
      },
      fields: ["_inputDescribedBy", "_inputAriaControls", "_activeElementDomId"]
    });

    var _lightningBaseCombobox = lwc.registerComponent(LightningBaseCombobox, {
      tmpl: _tmpl$i
    });

    function scrollIntoViewIfNeeded(element, scrollingParent) {
      const parentRect = scrollingParent.getBoundingClientRect();
      const findMeRect = element.getBoundingClientRect();

      if (findMeRect.top < parentRect.top) {
        if (element.offsetTop + findMeRect.height < parentRect.height) {
          // If element fits by scrolling to the top, then do that
          scrollingParent.scrollTop = 0;
        } else {
          // Otherwise, top align the element
          scrollingParent.scrollTop = element.offsetTop;
        }
      } else if (findMeRect.bottom > parentRect.bottom) {
        // bottom align the element
        scrollingParent.scrollTop += findMeRect.bottom - parentRect.bottom;
      }
    }

    function tmpl$k($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element,
        d: api_dynamic,
        c: api_custom_element,
        b: api_bind,
        gid: api_scoped_id
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5,
        _m6
      } = $ctx;
      return [api_element("label", {
        className: $cmp.computedLabelClass,
        key: 1
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 0
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]), $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp.fieldLevelHelp
        },
        key: 2
      }, []) : null, api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 4
      }, [api_custom_element("lightning-base-combobox", _lightningBaseCombobox, {
        props: {
          "dropdownHeight": "small",
          "name": $cmp.name,
          "variant": "lookup",
          "placeholder": $cmp.placeholder,
          "disabled": $cmp.disabled,
          "readOnly": $cmp.readOnly,
          "items": $cmp.items,
          "inputText": $cmp.displayValue,
          "inputIconName": "utility:clock",
          "inputLabel": $cmp.ariaLabel,
          "inputControlsElement": $cmp.ariaControlsElement,
          "inputLabelledByElement": $cmp.ariaLabelledByElement,
          "dropdownAlignment": "auto"
        },
        key: 3,
        on: {
          "ready": _m0 || ($ctx._m0 = api_bind($cmp.handleReady)),
          "textchange": _m1 || ($ctx._m1 = api_bind($cmp.handleInputChange)),
          "textinput": _m2 || ($ctx._m2 = api_bind($cmp.handleTextInput)),
          "dropdownopenrequest": _m3 || ($ctx._m3 = api_bind($cmp.handleDropdownOpenRequest)),
          "focus": _m4 || ($ctx._m4 = api_bind($cmp.handleFocus)),
          "blur": _m5 || ($ctx._m5 = api_bind($cmp.handleBlur)),
          "select": _m6 || ($ctx._m6 = api_bind($cmp.handleTimeSelect))
        }
      }, [])]), $cmp._errorMessage ? api_element("div", {
        classMap: {
          "slds-form-element__help": true
        },
        attrs: {
          "id": api_scoped_id("error-message"),
          "data-error-message": true,
          "aria-live": "assertive"
        },
        key: 5
      }, [api_dynamic($cmp._errorMessage)]) : null];
    }

    var _tmpl$j = lwc.registerTemplate(tmpl$k);
    tmpl$k.stylesheets = [];
    tmpl$k.stylesheetTokens = {
      hostAttribute: "lightning-timepicker_timepicker-host",
      shadowAttribute: "lightning-timepicker_timepicker"
    };

    var shortTimeFormat = 'h:mm a';

    /* returns the closes time in the list that should be highlighted in case the value is not in the list. E.g.
    - if value is 16:18 and the list has 15 minute intervals, returns 16:30
    */

    function getTimeToHighlight(value, step) {
      const selectedTime = parseTime(value);

      if (!selectedTime) {
        return null;
      }

      selectedTime.setSeconds(0, 0);
      let closestHour = selectedTime.getHours();
      let closestMinute = selectedTime.getMinutes();
      const mod = closestMinute % step;
      const quotient = Math.floor(closestMinute / step);

      if (mod !== 0) {
        const multiplier = mod < step / 2 ? quotient : quotient + 1;
        closestMinute = multiplier * step;

        if (closestMinute >= 60) {
          if (closestHour === 23) {
            closestMinute -= step;
          } else {
            closestMinute = 0;
            closestHour++;
          }
        }

        selectedTime.setHours(closestHour);
        selectedTime.setMinutes(closestMinute);
      }

      return getISOTimeString(selectedTime);
    }

    const i18n$8 = {
      invalidDate: labelInvalidDate,
      rangeOverflow: labelRangeOverflow$1,
      rangeUnderflow: labelRangeUnderflow$1,
      required: labelRequired
    };
    const STEP = 15; // in minutes

    const TIME_STYLE = {
      SHORT: 'short',
      MEDIUM: 'medium',
      LONG: 'long'
    };

    class LightningTimePicker extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._disabled = false;
        this._required = false;
        this._displayValue = null;
        this._value = null;
        this._min = void 0;
        this._max = void 0;
        this._items = [];
        this._fieldLevelHelp = void 0;
        this._variant = 'lookup';
        this._mainInputId = void 0;
        this._errorMessage = void 0;
        this._readonly = true;
        this._describedByElements = [];
        this.label = void 0;
        this.name = void 0;
        this.placeholder = '';
        this.ariaLabelledByElement = void 0;
        this.ariaControlsElement = void 0;
        this.ariaLabel = void 0;
        this.messageWhenValueMissing = void 0;
        this._ariaDescribedByElements = void 0;
      }

      get messageWhenBadInput() {
        return this._messageWhenBadInput || formatLabel(i18n$8.invalidDate, this.timeFormat);
      }

      set messageWhenBadInput(message) {
        this._messageWhenBadInput = message;
      }

      get messageWhenRangeOverflow() {
        // using isoValue since the manually entered time could have seconds/milliseconds and the locale format generally doesn't have this precision
        return this._messageWhenRangeOverflow || formatLabel(i18n$8.rangeOverflow, normalizeISOTime(this.max, this.timeFormat).isoValue);
      }

      set messageWhenRangeOverflow(message) {
        this._messageWhenRangeOverflow = message;
      }

      get messageWhenRangeUnderflow() {
        return this._messageWhenRangeUnderflow || formatLabel(i18n$8.rangeUnderflow, normalizeISOTime(this.min, this.timeFormat).isoValue);
      }

      set messageWhenRangeUnderflow(message) {
        this._messageWhenRangeUnderflow = message;
      }

      set ariaDescribedByElements(el) {
        if (Array.isArray(el)) {
          this._ariaDescribedByElements = el;
        } else {
          this.ariaDescribedByElements = [el];
        }
      }

      get ariaDescribedByElements() {
        return this._ariaDescribedByElements;
      }

      get value() {
        return this._value;
      }

      set value(newValue) {
        const normalizedValue = removeTimeZoneSuffix(newValue);
        const normalizedTime = normalizeISOTime(normalizedValue, this.timeFormat);
        this._value = normalizedTime.isoValue;
        this._displayValue = normalizedTime.displayValue;
      }

      get disabled() {
        return this._disabled;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);
      }

      get readOnly() {
        return this._readonly;
      }

      set readOnly(value) {
        this._readonly = normalizeBoolean(value);

        if (this._readonly) {
          this._variant = VARIANT.STANDARD;
        }
      }

      get required() {
        return this._required;
      }

      set required(value) {
        this._required = normalizeBoolean(value);
      }

      hasBadInput() {
        return !!this._displayValue && this._value === null;
      }

      showHelpMessage(message) {
        if (!message) {
          this.classList.remove('slds-has-error');
          this._errorMessage = '';
        } else {
          this.classList.add('slds-has-error');
          this._errorMessage = message;
        }
      }

      set fieldLevelHelp(value) {
        this._fieldLevelHelp = value;
      }

      get fieldLevelHelp() {
        return this._fieldLevelHelp;
      }

      get variant() {
        return this._variant || VARIANT.STANDARD;
      }

      set variant(value) {
        this._variant = normalizeVariant$1(value);
      }

      get max() {
        return this._max;
      }

      set max(newValue) {
        this._max = newValue;

        if (this.connected) {
          this.rebuildAndUpdateTimeList();
        }
      }

      get min() {
        return this._min;
      }

      set min(newValue) {
        this._min = newValue;

        if (this.connected) {
          this.rebuildAndUpdateTimeList();
        }
      }
      /**
       * Sets focus on the input element.
       */


      focus() {
        if (this.connected) {
          this.getCombobox().focus();
        }
      }
      /**
       * Removes keyboard focus from the input element.
       */


      blur() {
        if (this.connected) {
          this.getCombobox().blur();
        }
      }

      get timeStyle() {
        return this._timeStyle;
      }

      set timeStyle(value) {
        this._timeStyle = normalizeString(value, {
          fallbackValue: TIME_STYLE.SHORT,
          validValues: [TIME_STYLE.SHORT, TIME_STYLE.MEDIUM, TIME_STYLE.LONG]
        });
        this.timeFormat = this.getTimeFormatFromStyle(this._timeStyle);
        const normalizedDate = normalizeISOTime(this._value, this.timeFormat);
        this._displayValue = normalizedDate.displayValue;
      }

      connectedCallback() {
        this.connected = true;
      }

      disconnectedCallback() {
        this.connected = false;
      }

      synchronizeA11y() {
        const label = this.template.querySelector('label');
        const comboBox = this.template.querySelector('lightning-base-combobox');
        let describedByElements = [];

        if (this._ariaDescribedByElements) {
          describedByElements = describedByElements.concat(this._ariaDescribedByElements);
        }

        const errorMessage = this.template.querySelector('[data-error-message]');

        if (errorMessage) {
          describedByElements.push(errorMessage);
        }

        comboBox.inputDescribedByElements = describedByElements;
        synchronizeAttrs(label, {
          for: this._mainInputId
        });
      }

      renderedCallback() {
        this.synchronizeA11y();
      }

      get displayValue() {
        return this._displayValue;
      }

      get items() {
        return this._items;
      }

      get i18n() {
        return i18n$8;
      }

      get isLabelHidden() {
        return this.variant === VARIANT.LABEL_HIDDEN;
      }

      get computedLabelClass() {
        return classSet('slds-form-element__label').add({
          'slds-assistive-text': this.isLabelHidden
        }).toString();
      }

      handleReady(e) {
        this._mainInputId = e.detail.id;
      }

      buildTimeList() {
        // We should always display the options in the short style since m/l will add an extra :00 to the options.
        const optionsTimeFormat = shortTimeFormat;
        const timeList = [];
        const minTime = parseTime(removeTimeZoneSuffix(this.min));
        const minHour = minTime ? minTime.getHours() : 0;
        const maxTime = parseTime(removeTimeZoneSuffix(this.max));
        const maxHour = maxTime ? maxTime.getHours() + 1 : 24;
        const date = new Date();

        for (let hour = minHour; hour < maxHour; hour++) {
          for (let minutes = 0; minutes < 60; minutes += STEP) {
            date.setHours(hour, minutes);
            date.setSeconds(0, 0);

            if (this.isBeforeMinTime(date, minTime)) {
              continue; // eslint-disable-line no-continue
            }

            if (this.isAfterMaxTime(date, maxTime)) {
              break;
            } // @todo: should we always display it short in the combobox given that it makes no sense?


            timeList.push({
              type: 'option-inline',
              text: this.format(date, optionsTimeFormat),
              value: this.format(date)
            });
          }
        }

        return timeList;
      }

      get timeList() {
        if (!this._timeList) {
          this._timeList = this.buildTimeList();
        }

        if (!this._value) {
          return this._timeList;
        }

        const timeToHighlight = getTimeToHighlight(this._value, STEP);

        const timeList = this._timeList.map(item => {
          const itemCopy = Object.assign({}, item);

          if (item.value === this._value) {
            itemCopy.iconName = 'utility:check';
          }

          if (item.value === timeToHighlight) {
            itemCopy.highlight = true;
          }

          return itemCopy;
        });

        return timeList;
      }

      rebuildAndUpdateTimeList() {
        // forcing the time list to be rebuilt
        this._timeList = null;
        this._items = this.timeList;
      }

      get timeFormat() {
        if (!this._timeFormat) {
          this._timeFormat = this.getTimeFormatFromStyle();
        }

        return this._timeFormat;
      }

      set timeFormat(value) {
        this._timeFormat = value;
      }

      getCombobox() {
        return this.template.querySelector('lightning-base-combobox');
      }

      handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
      }

      handleInputChange(event) {
        event.preventDefault();
        event.stopPropagation(); // keeping the display value in sync with the element's value

        this._displayValue = event.detail.text;
        this._value = this.parseFormattedTime(this._displayValue);
        this._items = this.timeList;
        this.dispatchChangeEvent();
      }

      handleTextInput(event) {
        event.preventDefault();
        event.stopPropagation(); // keeping the display value in sync with the element's value

        this._displayValue = event.detail.text;
      }

      handleTimeSelect(event) {
        event.stopPropagation(); // for some reason this event is fired without detail from grouped-combobox

        if (!event.detail) {
          return;
        }

        this._value = event.detail.value;
        this._displayValue = normalizeISOTime(this._value, this.timeFormat).displayValue;
        this._items = this.timeList;
        this.dispatchChangeEvent();
      }

      handleDropdownOpenRequest() {
        this._items = this.timeList;
      }

      dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
          composed: true,
          bubbles: true,
          detail: {
            value: this._value
          }
        }));
      }

      format(date, formatString) {
        if (formatString) {
          return formatTime(date, formatString);
        }

        return getISOTimeString(date);
      }

      isBeforeMinTime(date, minTime) {
        const minDate = minTime || parseTime(removeTimeZoneSuffix(this.min));
        return minDate ? isBefore(date, minDate, 'minute') : false;
      }

      isAfterMaxTime(date, maxTime) {
        const maxDate = maxTime || parseTime(removeTimeZoneSuffix(this.max));
        return maxDate ? isAfter(date, maxDate, 'minute') : false;
      }

      getTimeFormatFromStyle(timeStyle) {
        let timeFormat;

        switch (timeStyle) {
          case TIME_STYLE.MEDIUM:
          case TIME_STYLE.LONG:
            timeFormat = mediumTimeFormat;
            break;

          default:
            timeFormat = shortTimeFormat;
            break;
        }

        return timeFormat;
      }

      get allowedTimeFormats() {
        // the locale.timeFormat is the medium format. Locale dont supports a large
        // time format at the moment.
        return [mediumTimeFormat, shortTimeFormat];
      }
      /**
       * Parses the input time and sets the timeFormat used to parse the displayValue
       * if it is a valid time.
       *
       * @param {String} displayValue - The input date.
       * @return {null | string} - A normalized formatted time if displayValue is valid. null otherwise.
       */


      parseFormattedTime(displayValue) {
        const allowedFormats = this.allowedTimeFormats;
        const n = allowedFormats.length;
        let i = 0,
            value = null;

        do {
          value = normalizeFormattedTime(displayValue, allowedFormats[i]);
          i++;
        } while (value === null && i < n);

        if (value !== null) {
          this.timeFormat = allowedFormats[i - 1];
        }

        return value;
      }

    }

    LightningTimePicker.delegatesFocus = true;

    lwc.registerDecorators(LightningTimePicker, {
      publicProps: {
        label: {
          config: 0
        },
        name: {
          config: 0
        },
        placeholder: {
          config: 0
        },
        ariaLabelledByElement: {
          config: 0
        },
        ariaControlsElement: {
          config: 0
        },
        ariaLabel: {
          config: 0
        },
        messageWhenValueMissing: {
          config: 0
        },
        messageWhenBadInput: {
          config: 3
        },
        messageWhenRangeOverflow: {
          config: 3
        },
        messageWhenRangeUnderflow: {
          config: 3
        },
        ariaDescribedByElements: {
          config: 3
        },
        value: {
          config: 3
        },
        disabled: {
          config: 3
        },
        readOnly: {
          config: 3
        },
        required: {
          config: 3
        },
        fieldLevelHelp: {
          config: 3
        },
        variant: {
          config: 3
        },
        max: {
          config: 3
        },
        min: {
          config: 3
        },
        timeStyle: {
          config: 3
        }
      },
      publicMethods: ["hasBadInput", "showHelpMessage", "focus", "blur"],
      track: {
        _disabled: 1,
        _required: 1,
        _displayValue: 1,
        _value: 1,
        _min: 1,
        _max: 1,
        _items: 1,
        _fieldLevelHelp: 1,
        _variant: 1,
        _mainInputId: 1,
        _errorMessage: 1,
        _readonly: 1,
        _describedByElements: 1
      },
      fields: ["_ariaDescribedByElements"]
    });

    var _lightningTimepicker = lwc.registerComponent(LightningTimePicker, {
      tmpl: _tmpl$j
    });

    function tmpl$l($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element,
        d: api_dynamic,
        c: api_custom_element,
        b: api_bind,
        gid: api_scoped_id
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-form": true,
          "slds-form_compound": true
        },
        attrs: {
          "tabindex": "-1"
        },
        key: 10
      }, [api_element("fieldset", {
        classMap: {
          "slds-form-element": true
        },
        key: 9
      }, [api_element("legend", {
        className: $cmp.computedLabelClass,
        key: 1
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 0
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]), $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp.fieldLevelHelp
        },
        key: 2
      }, []) : null, api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 7
      }, [api_element("div", {
        classMap: {
          "slds-form-element__group": true
        },
        key: 6
      }, [api_element("div", {
        classMap: {
          "slds-form-element__row": true
        },
        key: 5
      }, [api_custom_element("lightning-datepicker", _lightningDatepicker, {
        classMap: {
          "slds-form-element": true
        },
        props: {
          "min": $cmp.dateMin,
          "max": $cmp.dateMax,
          "label": $cmp.i18n.date,
          "name": $cmp.name,
          "variant": $cmp.variant,
          "placeholder": $cmp.placeholder,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled,
          "autocomplete": $cmp.autocomplete,
          "dateStyle": $cmp.dateStyle
        },
        key: 3,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleDatepickerFocus)),
          "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleDatepickerBlur)),
          "change": _m2 || ($ctx._m2 = api_bind($cmp.handleDateChange))
        }
      }, []), api_custom_element("lightning-timepicker", _lightningTimepicker, {
        classMap: {
          "slds-form-element": true
        },
        props: {
          "label": $cmp.i18n.time,
          "name": $cmp.name,
          "variant": $cmp.variant,
          "timeStyle": $cmp.timeStyle,
          "placeholder": $cmp.placeholder,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled
        },
        key: 4,
        on: {
          "focus": _m3 || ($ctx._m3 = api_bind($cmp.handleTimepickerFocus)),
          "blur": _m4 || ($ctx._m4 = api_bind($cmp.handleTimepickerBlur)),
          "change": _m5 || ($ctx._m5 = api_bind($cmp.handleTimeChange))
        }
      }, [])])])]), $cmp.customErrorMessage ? api_element("div", {
        classMap: {
          "slds-form-element__help": true
        },
        attrs: {
          "data-error-message": true,
          "id": api_scoped_id("errormessage"),
          "aria-live": "assertive"
        },
        key: 8
      }, [api_dynamic($cmp.customErrorMessage)]) : null])])];
    }

    var _tmpl$k = lwc.registerTemplate(tmpl$l);
    tmpl$l.stylesheets = [];
    tmpl$l.stylesheetTokens = {
      hostAttribute: "lightning-datetimepicker_datetimepicker-host",
      shadowAttribute: "lightning-datetimepicker_datetimepicker"
    };

    var labelDate = 'Date';

    var labelTime = 'Time';

    const i18n$9 = {
      date: labelDate,
      rangeOverflow: labelRangeOverflow$1,
      rangeUnderflow: labelRangeUnderflow$1,
      required: labelRequired,
      time: labelTime
    };

    class LightningDateTimePicker extends lwc.LightningElement {
      // getters and setters necessary to trigger sync
      set timeAriaControls(val) {
        this._timeAriaControls = val;
        this.synchronizeA11y();
      }

      get timeAriaControls() {
        return this._timeAriaControls;
      }

      set timeAriaLabelledBy(val) {
        this._timeAriaLabelledBy = val;
        this.synchronizeA11y();
      }

      get timeAriaLabelledBy() {
        return this._timeAriaLabelledBy;
      }

      set timeAriaDescribedBy(val) {
        this._timeAriaDescribedBy = val;
        this.synchronizeA11y();
      }

      get timeAriaDescribedBy() {
        return this._timeAriaDescribedBy;
      }

      get messageWhenBadInput() {
        if (this._messageWhenBadInput) {
          return this._messageWhenBadInput;
        } else if (this.hasBadDateInput) {
          return this.getDatepicker().messageWhenBadInput;
        } else if (this.hasBadTimeInput) {
          return this.getTimepicker().messageWhenBadInput;
        }

        return null;
      }

      set messageWhenBadInput(message) {
        this._messageWhenBadInput = message;
      }

      get messageWhenRangeOverflow() {
        return this._messageWhenRangeOverflow || formatLabel(i18n$9.rangeOverflow, this.formattedMax);
      }

      set messageWhenRangeOverflow(message) {
        this._messageWhenRangeOverflow = message;
      }

      get messageWhenRangeUnderflow() {
        return this._messageWhenRangeUnderflow || formatLabel(i18n$9.rangeUnderflow, this.formattedMin);
      }

      set messageWhenRangeUnderflow(message) {
        this._messageWhenRangeUnderflow = message;
      }

      get max() {
        return this.maxValue;
      }

      set max(newValue) {
        this.maxValue = newValue;
        this.calculateFormattedMaxValue();
      }

      get min() {
        return this.minValue;
      }

      set min(newValue) {
        this.minValue = newValue;
        this.calculateFormattedMinValue();
      }

      get value() {
        return this._value;
      }

      set value(newValue) {
        if (this.connected) {
          this.setDateAndTimeValues(newValue);
        } else {
          // we set the values in connectedCallback to make sure timezone is available.
          this._initialValue = newValue;
        }
      }

      get timezone() {
        return this._timezone;
      }

      set timezone(newValue) {
        this._timezone = newValue;

        if (this.connected) {
          this.updateValuesForTimezone();
        }
      }

      get disabled() {
        return this._disabled;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);
      }

      get readOnly() {
        return this._readonly;
      }

      set readOnly(value) {
        this._readonly = normalizeBoolean(value);
      }

      get required() {
        return this._required;
      }

      set required(value) {
        this._required = normalizeBoolean(value);
      }

      set fieldLevelHelp(value) {
        this._fieldLevelHelp = value;
      }

      get fieldLevelHelp() {
        return this._fieldLevelHelp;
      }

      get variant() {
        return this._variant || VARIANT.STANDARD;
      }

      set variant(value) {
        this._variant = normalizeVariant$1(value);
      }
      /**
       * Sets focus on the date input element.
       */


      focus() {
        if (this.connected) {
          this.getDatepicker().focus();
        }
      }
      /**
       * Removes keyboard focus from the input elements.
       */


      blur() {
        if (this.connected) {
          this.getDatepicker().blur();
          this.getTimepicker().blur();
        }
      }

      hasBadInput() {
        return this.connected && (this.hasBadDateInput || this.hasBadTimeInput);
      }

      get hasBadDateInput() {
        return this.getDatepicker().hasBadInput();
      }

      get hasBadTimeInput() {
        const timeBadInput = this.getTimepicker().hasBadInput();
        const timeMissing = this.required && this._dateValue && !this._timeValue;
        return timeMissing || timeBadInput;
      }

      showHelpMessage(message) {
        if (!this.connected) {
          return;
        }

        if (!message) {
          this.clearHelpMessage();
          return;
        }

        if (this.hasBadDateInput && !this._messageWhenBadInput) {
          this.clearHelpMessage();
          this.getDatepicker().showHelpMessage(message);
          return;
        }

        if (this.hasBadTimeInput && !this._messageWhenBadInput) {
          this.clearHelpMessage();
          this.getTimepicker().showHelpMessage(message);
          return;
        }

        this.classList.add('slds-has-error');
        this._customErrorMessage = message;
      }

      clearHelpMessage() {
        this.classList.remove('slds-has-error');
        this._customErrorMessage = '';
        this.getDatepicker().showHelpMessage('');
        this.getTimepicker().showHelpMessage('');
      }

      get isLabelHidden() {
        return this.variant === VARIANT.LABEL_HIDDEN;
      }

      get computedLabelClass() {
        return classSet('slds-form-element__legend slds-form-element__label').add({
          'slds-assistive-text': this.isLabelHidden
        }).toString();
      }

      get i18n() {
        return i18n$9;
      }

      get customErrorMessage() {
        return this._customErrorMessage;
      }

      get dateMin() {
        return this._dateMin;
      }

      get dateMax() {
        return this._dateMax;
      }

      get errorMessageElementId() {
        return getRealDOMId(this.template.querySelector('[data-error-message]'));
      }

      get computedDateAriaDescribedBy() {
        const ariaValues = [];

        if (this.customErrorMessage) {
          ariaValues.push(this.errorMessageElementId);
        }

        if (this.dateAriaDescribedBy) {
          ariaValues.push(this.dateAriaDescribedBy);
        }

        return normalizeAriaAttribute(ariaValues);
      }

      get computedTimeAriaDescribedBy() {
        const ariaValues = [];

        if (this.customErrorMessage) {
          ariaValues.push(this.errorMessageElementId);
        }

        if (this.timeAriaDescribedBy) {
          ariaValues.push(this.timeAriaDescribedBy);
        }

        return normalizeAriaAttribute(ariaValues);
      }

      constructor() {
        super();
        this._disabled = false;
        this._readonly = false;
        this._required = false;
        this._fieldLevelHelp = void 0;
        this._variant = void 0;
        this._value = null;
        this._timezone = null;
        this._customErrorMessage = '';
        this._dateMin = void 0;
        this._dateMax = void 0;
        this.label = void 0;
        this.name = void 0;
        this.placeholder = '';
        this.dateStyle = void 0;
        this.timeStyle = void 0;
        this.timeAriaLabel = void 0;
        this.autocomplete = void 0;
        this.dateAriaControls = void 0;
        this.dateAriaLabel = void 0;
        this.dateAriaLabelledBy = void 0;
        this.dateAriaDescribedBy = void 0;
        this.messageWhenValueMissing = void 0;
        this.uniqueId = generateUniqueId();
      }

      synchronizeA11y() {
        const datepicker = this.template.querySelector('lightning-datepicker');
        const timepicker = this.template.querySelector('lightning-timepicker');

        if (datepicker) {
          synchronizeAttrs(datepicker, {
            ariaLabelledByElement: this.dateAriaLabelledBy,
            ariaDescribedByElements: this.computedDateAriaDescribedBy,
            ariaControlsElement: this.dateAriaControls,
            'aria-label': this.dateAriaLabel
          });
        }

        if (timepicker) {
          synchronizeAttrs(timepicker, {
            ariaLabelledByElement: this.timeAriaLabelledBy,
            ariaDescribedByElements: this.computedTimeAriaDescribedBy,
            ariaControlsElement: this.timeAriaControls,
            'aria-label': this.timeAriaLabel
          });
        }
      }

      connectedCallback() {
        this.classList.add('slds-form_compound');
        this.connected = true; // we set the initial values here in order to make sure timezone is available.

        this.updateValuesForTimezone(this._initialValue);
        this.interactingState = new InteractingState({
          debounceInteraction: true
        });
        this.interactingState.onenter(() => {
          this.dispatchEvent(new CustomEvent('focus'));
        });
        this.interactingState.onleave(() => {
          this.dispatchEvent(new CustomEvent('blur'));
        });
      }

      renderedCallback() {
        this.synchronizeA11y();
      }

      disconnectedCallback() {
        this.connected = false;
      }

      getTimepicker() {
        return this.template.querySelector('lightning-timepicker');
      }

      getDatepicker() {
        return this.template.querySelector('lightning-datepicker');
      }

      handleDatepickerFocus() {
        this._dateFocus = true;
        this.interactingState.enter();
      }

      handleTimepickerFocus() {
        this._timeFocus = true;
        this.interactingState.enter();
      }

      handleDatepickerBlur() {
        this._dateFocus = false; // timepicker fires focus before datepicker fires blur

        if (!this._timeFocus) {
          this.interactingState.leave();
        }
      }

      handleTimepickerBlur() {
        this._timeFocus = false; // datepicker fires focus before timepicker fires blur

        if (!this._dateFocus) {
          this.interactingState.leave();
        }
      }

      handleDateChange(event) {
        event.stopPropagation();

        if (!event.detail) {
          return;
        }

        this._dateValue = event.detail.value;

        if (this._dateValue) {
          this._timeValue = this._timeValue || getCurrentTime(this.timezone);
          this.setTimepickerValue(this._timeValue);
        }

        this.updateValue();
      }

      handleTimeChange(event) {
        event.stopPropagation();

        if (!event.detail) {
          return;
        }

        this._timeValue = event.detail.value;
        this.updateValue();
      }

      updateValue() {
        const dateValue = this._dateValue;
        const timeValue = this._timeValue;

        if (dateValue && timeValue) {
          const dateTimeString = dateValue + TIME_SEPARATOR + timeValue;
          this._value = normalizeFormattedDateTime(dateTimeString, this.timezone);
          this.dispatchChangeEvent();
        } else if (!dateValue) {
          this._value = null;
          this.dispatchChangeEvent();
        }
      }

      dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', {
          composed: true,
          bubbles: true,
          detail: {
            value: this._value
          }
        }));
      }

      updateValuesForTimezone(datetimeValue) {
        this.setDateAndTimeValues(datetimeValue || this._value);
        this.calculateFormattedMinValue();
        this.calculateFormattedMaxValue();
      }

      setDateAndTimeValues(value) {
        const normalizedValue = normalizeISODateTime(value, this.timezone).isoValue;
        const isDateOnly = normalizedValue && value.indexOf(TIME_SEPARATOR) < 0;

        if (isDateOnly) {
          this._dateValue = value;
          this._value = this._dateValue;
          this.setDatepickerValue(value);
          return;
        }

        const dateAndTime = this.separateDateTime(normalizedValue);
        this._dateValue = dateAndTime && dateAndTime[0];
        this._timeValue = dateAndTime && dateAndTime[1];
        this._value = value;
        this.setDatepickerValue(this._dateValue);
        this.setTimepickerValue(this._timeValue);
      }

      setDatepickerValue(value) {
        const datepicker = this.getDatepicker();

        if (datepicker) {
          datepicker.value = value;
        }
      }

      setTimepickerValue(value) {
        const timepicker = this.getTimepicker();

        if (timepicker) {
          timepicker.value = value;
        }
      }

      calculateFormattedMinValue() {
        if (!this.min) {
          return;
        }

        const normalizedDate = normalizeISODateTime(this.min, this.timezone);
        this._dateMin = this.separateDateTime(normalizedDate.isoValue)[0];
        this.formattedMin = normalizedDate.displayValue;
      }

      calculateFormattedMaxValue() {
        if (!this.max) {
          return;
        }

        const normalizedDate = normalizeISODateTime(this.max, this.timezone);
        this._dateMax = this.separateDateTime(normalizedDate.isoValue)[0];
        this.formattedMax = normalizedDate.displayValue;
      }

      separateDateTime(isoString) {
        return typeof isoString === 'string' ? isoString.split(TIME_SEPARATOR) : null;
      }

    }

    LightningDateTimePicker.delegatesFocus = true;

    lwc.registerDecorators(LightningDateTimePicker, {
      publicProps: {
        label: {
          config: 0
        },
        name: {
          config: 0
        },
        placeholder: {
          config: 0
        },
        dateStyle: {
          config: 0
        },
        timeStyle: {
          config: 0
        },
        timeAriaLabel: {
          config: 0
        },
        autocomplete: {
          config: 0
        },
        timeAriaControls: {
          config: 3
        },
        timeAriaLabelledBy: {
          config: 3
        },
        timeAriaDescribedBy: {
          config: 3
        },
        dateAriaControls: {
          config: 0
        },
        dateAriaLabel: {
          config: 0
        },
        dateAriaLabelledBy: {
          config: 0
        },
        dateAriaDescribedBy: {
          config: 0
        },
        messageWhenValueMissing: {
          config: 0
        },
        messageWhenBadInput: {
          config: 3
        },
        messageWhenRangeOverflow: {
          config: 3
        },
        messageWhenRangeUnderflow: {
          config: 3
        },
        max: {
          config: 3
        },
        min: {
          config: 3
        },
        value: {
          config: 3
        },
        timezone: {
          config: 3
        },
        disabled: {
          config: 3
        },
        readOnly: {
          config: 3
        },
        required: {
          config: 3
        },
        fieldLevelHelp: {
          config: 3
        },
        variant: {
          config: 3
        }
      },
      publicMethods: ["focus", "blur", "hasBadInput", "showHelpMessage"],
      track: {
        _disabled: 1,
        _readonly: 1,
        _required: 1,
        _fieldLevelHelp: 1,
        _variant: 1,
        _value: 1,
        _timezone: 1,
        _customErrorMessage: 1,
        _dateMin: 1,
        _dateMax: 1
      }
    });

    var _lightningDatetimepicker = lwc.registerComponent(LightningDateTimePicker, {
      tmpl: _tmpl$k
    });

    function tmpl$m($api, $cmp, $slotset, $ctx) {
      const {
        h: api_element,
        t: api_text,
        d: api_dynamic,
        gid: api_scoped_id,
        c: api_custom_element,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5,
        _m6,
        _m7,
        _m8,
        _m9,
        _m10,
        _m11,
        _m12,
        _m13,
        _m14,
        _m15,
        _m16,
        _m17,
        _m18,
        _m19,
        _m20,
        _m21,
        _m22,
        _m23,
        _m24,
        _m25,
        _m26,
        _m27,
        _m28,
        _m29,
        _m30,
        _m31,
        _m32,
        _m33,
        _m34,
        _m35,
        _m36,
        _m37,
        _m38,
        _m39
      } = $ctx;
      return [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        attrs: {
          "data-aria": true
        },
        key: 0
      }, []), $cmp.isTypeSimple ? api_element("label", {
        className: $cmp.computedLabelClass,
        attrs: {
          "for": `${api_scoped_id("input")}`
        },
        key: 2
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 1
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]) : null, $cmp.isTypeSimple ? $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp.fieldLevelHelp
        },
        key: 3
      }, []) : null : null, $cmp.isTypeSimple ? api_element("div", {
        className: $cmp.computedFormElementClass,
        key: 14
      }, [api_element("input", {
        classMap: {
          "slds-input": true
        },
        attrs: {
          "type": $cmp._internalType,
          "id": api_scoped_id("input"),
          "aria-label": $cmp.computedAriaLabel,
          "accesskey": $cmp.accesskey,
          "autocomplete": $cmp.autocomplete,
          "max": $cmp.normalizedMax,
          "min": $cmp.normalizedMin,
          "inputmode": $cmp._inputMode,
          "step": $cmp.step,
          "maxlength": $cmp.maxLength,
          "minlength": $cmp.minLength,
          "pattern": $cmp.pattern,
          "placeholder": $cmp.placeholder,
          "name": $cmp.name
        },
        props: {
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled
        },
        key: 4,
        on: {
          "blur": _m0 || ($ctx._m0 = api_bind($cmp.handleBlur)),
          "focus": _m1 || ($ctx._m1 = api_bind($cmp.handleFocus)),
          "change": _m2 || ($ctx._m2 = api_bind($cmp.handleChange)),
          "input": _m3 || ($ctx._m3 = api_bind($cmp.handleInput)),
          "keydown": _m4 || ($ctx._m4 = api_bind($cmp.handleKeyDown))
        }
      }, []), $cmp.isTypeSearch ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": "utility:search",
          "variant": "bare",
          "svgClass": "slds-input__icon slds-input__icon_left slds-icon-text-default"
        },
        key: 5
      }, []) : null, $cmp.isTypeSearch ? api_element("div", {
        classMap: {
          "slds-input__icon-group": true,
          "slds-input__icon-group_right": true
        },
        key: 13
      }, [$cmp.isLoading ? api_element("div", {
        classMap: {
          "slds-spinner": true,
          "slds-spinner_brand": true,
          "slds-spinner_x-small": true,
          "slds-input__spinner": true
        },
        attrs: {
          "role": "status"
        },
        key: 9
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 6
      }, [api_dynamic($cmp.i18n.loading)]), api_element("div", {
        classMap: {
          "slds-spinner__dot-a": true
        },
        key: 7
      }, []), api_element("div", {
        classMap: {
          "slds-spinner__dot-b": true
        },
        key: 8
      }, [])]) : null, $cmp._showClearButton ? api_element("button", {
        classMap: {
          "slds-input__icon": true,
          "slds-input__icon_right": true,
          "slds-button": true,
          "slds-button_icon": true
        },
        attrs: {
          "data-element-id": "searchClear"
        },
        key: 12,
        on: {
          "blur": _m5 || ($ctx._m5 = api_bind($cmp.handleBlur)),
          "click": _m6 || ($ctx._m6 = api_bind($cmp._clearAndSetFocusOnInput))
        }
      }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": "utility:clear",
          "variant": "bare",
          "svgClass": "slds-button__icon"
        },
        key: 10
      }, []), api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 11
      }, [api_dynamic($cmp.i18n.clear)])]) : null]) : null]) : null, $cmp.isTypeToggle ? api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 23
      }, [api_element("label", {
        classMap: {
          "slds-checkbox_toggle": true,
          "slds-grid": true
        },
        attrs: {
          "for": `${api_scoped_id("checkbox-toggle")}`
        },
        key: 22
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 15
      }, [api_text("*")]) : null, api_element("span", {
        className: $cmp.computedLabelClass,
        key: 16
      }, [api_dynamic($cmp.label)]), api_element("input", {
        attrs: {
          "type": "checkbox",
          "id": api_scoped_id("checkbox-toggle"),
          "aria-label": $cmp.computedAriaLabel,
          "accesskey": $cmp.accesskey,
          "name": $cmp.name
        },
        props: {
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled
        },
        key: 17,
        on: {
          "blur": _m7 || ($ctx._m7 = api_bind($cmp.handleBlur)),
          "focus": _m8 || ($ctx._m8 = api_bind($cmp.handleFocus)),
          "change": _m9 || ($ctx._m9 = api_bind($cmp.handleChange))
        }
      }, []), api_element("span", {
        classMap: {
          "slds-checkbox_faux_container": true
        },
        attrs: {
          "id": api_scoped_id("toggle-description"),
          "data-toggle-description": true,
          "aria-live": "assertive"
        },
        key: 21
      }, [api_element("span", {
        classMap: {
          "slds-checkbox_faux": true
        },
        key: 18
      }, []), api_element("span", {
        classMap: {
          "slds-checkbox_on": true
        },
        key: 19
      }, [api_dynamic($cmp.messageToggleActive)]), api_element("span", {
        classMap: {
          "slds-checkbox_off": true
        },
        key: 20
      }, [api_dynamic($cmp.messageToggleInactive)])])])]) : null, $cmp.isTypeCheckbox ? !$cmp.isStandardVariant ? api_element("label", {
        classMap: {
          "slds-checkbox__label": true
        },
        attrs: {
          "for": `${api_scoped_id("checkbox")}`
        },
        key: 26
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 24
      }, [api_text("*")]) : null, api_element("span", {
        className: $cmp.computedLabelClass,
        key: 25
      }, [api_dynamic($cmp.label)])]) : null : null, $cmp.isTypeCheckbox ? !$cmp.isStandardVariant ? $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp.fieldLevelHelp
        },
        key: 27
      }, []) : null : null : null, $cmp.isTypeCheckbox ? api_element("div", {
        className: $cmp.computedFormElementClass,
        key: 36
      }, [api_element("span", {
        className: $cmp.computedCheckboxClass,
        key: 35
      }, [$cmp.isStandardVariant ? $cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 28
      }, [api_text("*")]) : null : null, api_element("input", {
        attrs: {
          "type": "checkbox",
          "id": api_scoped_id("checkbox"),
          "aria-label": $cmp.computedAriaLabel,
          "accesskey": $cmp.accesskey,
          "name": $cmp.name
        },
        props: {
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled
        },
        key: 29,
        on: {
          "blur": _m10 || ($ctx._m10 = api_bind($cmp.handleBlur)),
          "focus": _m11 || ($ctx._m11 = api_bind($cmp.handleFocus)),
          "change": _m12 || ($ctx._m12 = api_bind($cmp.handleChange))
        }
      }, []), !$cmp.isStandardVariant ? api_element("span", {
        classMap: {
          "slds-checkbox_faux": true
        },
        key: 30
      }, []) : null, $cmp.isStandardVariant ? api_element("label", {
        classMap: {
          "slds-checkbox__label": true
        },
        attrs: {
          "for": `${api_scoped_id("checkbox")}`
        },
        key: 33
      }, [api_element("span", {
        classMap: {
          "slds-checkbox_faux": true
        },
        key: 31
      }, []), api_element("span", {
        className: $cmp.computedLabelClass,
        key: 32
      }, [api_dynamic($cmp.label)])]) : null, $cmp.isStandardVariant ? $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp.fieldLevelHelp
        },
        key: 34
      }, []) : null : null])]) : null, $cmp.isTypeCheckboxButton ? api_element("div", {
        classMap: {
          "slds-checkbox_add-button": true
        },
        key: 40
      }, [api_element("input", {
        classMap: {
          "slds-assistive-text": true
        },
        attrs: {
          "type": "checkbox",
          "id": api_scoped_id("checkbox-button"),
          "aria-label": $cmp.computedAriaLabel,
          "accesskey": $cmp.accesskey,
          "name": $cmp.name
        },
        props: {
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled
        },
        key: 37,
        on: {
          "blur": _m13 || ($ctx._m13 = api_bind($cmp.handleBlur)),
          "focus": _m14 || ($ctx._m14 = api_bind($cmp.handleFocus)),
          "change": _m15 || ($ctx._m15 = api_bind($cmp.handleChange))
        }
      }, []), api_element("label", {
        classMap: {
          "slds-checkbox_faux": true
        },
        attrs: {
          "for": `${api_scoped_id("checkbox-button")}`
        },
        key: 39
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 38
      }, [api_dynamic($cmp.label)])])]) : null, $cmp.isTypeRadio ? api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 46
      }, [api_element("span", {
        classMap: {
          "slds-radio": true
        },
        key: 45
      }, [api_element("input", {
        attrs: {
          "type": "radio",
          "id": api_scoped_id("radio"),
          "accesskey": $cmp.accesskey,
          "name": $cmp.name
        },
        props: {
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled
        },
        key: 41,
        on: {
          "blur": _m16 || ($ctx._m16 = api_bind($cmp.handleBlur)),
          "focus": _m17 || ($ctx._m17 = api_bind($cmp.handleFocus)),
          "change": _m18 || ($ctx._m18 = api_bind($cmp.handleChange))
        }
      }, []), api_element("label", {
        classMap: {
          "slds-radio__label": true
        },
        attrs: {
          "for": `${api_scoped_id("radio")}`
        },
        key: 44
      }, [api_element("span", {
        classMap: {
          "slds-radio_faux": true
        },
        key: 42
      }, []), api_element("span", {
        className: $cmp.computedLabelClass,
        key: 43
      }, [api_dynamic($cmp.label)])])])]) : null, $cmp.isTypeFile ? api_element("span", {
        className: $cmp.computedLabelClass,
        attrs: {
          "id": api_scoped_id("form-label"),
          "data-form-label": true
        },
        key: 48
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 47
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]) : null, $cmp.isTypeFile ? api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 56
      }, [api_element("div", {
        classMap: {
          "slds-file-selector": true,
          "slds-file-selector_files": true
        },
        key: 55,
        on: {
          "drop": _m23 || ($ctx._m23 = api_bind($cmp.handleDropFiles))
        }
      }, [api_custom_element("lightning-primitive-file-droppable-zone", _lightningPrimitiveFileDroppableZone, {
        props: {
          "multiple": $cmp.multiple,
          "disabled": $cmp.disabled
        },
        key: 54
      }, [api_element("input", {
        classMap: {
          "slds-file-selector__input": true,
          "slds-assistive-text": true
        },
        attrs: {
          "type": "file",
          "id": api_scoped_id("input-file"),
          "aria-label": $cmp.computedAriaLabel,
          "accesskey": $cmp.accesskey,
          "accept": $cmp.accept,
          "name": $cmp.name
        },
        props: {
          "multiple": $cmp.multiple,
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "disabled": $cmp.disabled
        },
        key: 49,
        on: {
          "blur": _m19 || ($ctx._m19 = api_bind($cmp.handleBlur)),
          "click": _m20 || ($ctx._m20 = api_bind($cmp.handleFileClick)),
          "focus": _m21 || ($ctx._m21 = api_bind($cmp.handleFocus)),
          "change": _m22 || ($ctx._m22 = api_bind($cmp.handleChange))
        }
      }, []), api_element("label", {
        classMap: {
          "slds-file-selector__body": true
        },
        attrs: {
          "id": api_scoped_id("file-selector-label"),
          "data-file-selector-label": true,
          "for": `${api_scoped_id("input-file")}`
        },
        key: 53
      }, [api_element("span", {
        classMap: {
          "slds-file-selector__button": true,
          "slds-button": true,
          "slds-button_neutral": true
        },
        key: 51
      }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": "utility:upload",
          "variant": "bare",
          "svgClass": "slds-button__icon slds-button__icon_left"
        },
        key: 50
      }, []), api_dynamic($cmp.i18n.inputFileButtonLabel)]), api_element("span", {
        classMap: {
          "slds-file-selector__text": true,
          "slds-medium-show": true
        },
        key: 52
      }, [api_dynamic($cmp.i18n.inputFileBodyText)])])])])]) : null, $cmp.isTypeColor ? api_element("div", {
        classMap: {
          "slds-color-picker": true
        },
        key: 65
      }, [api_element("div", {
        classMap: {
          "slds-form-element": true,
          "slds-color-picker__summary": true
        },
        key: 64
      }, [api_element("label", {
        className: $cmp.computedColorLabelClass,
        attrs: {
          "for": `${api_scoped_id("color")}`
        },
        key: 58
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 57
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]), api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 62
      }, [api_custom_element("lightning-primitive-colorpicker-button", _lightningPrimitiveColorpickerButton, {
        props: {
          "value": $cmp.value,
          "disabled": $cmp.disabled
        },
        key: 59,
        on: {
          "blur": _m24 || ($ctx._m24 = api_bind($cmp.handleBlur)),
          "focus": _m25 || ($ctx._m25 = api_bind($cmp.handleFocus)),
          "change": _m26 || ($ctx._m26 = api_bind($cmp.handleColorChange))
        }
      }, []), api_element("div", {
        classMap: {
          "slds-color-picker__summary-input": true
        },
        key: 61
      }, [api_element("input", {
        classMap: {
          "slds-input": true,
          "slds-m-right_x-small": true
        },
        attrs: {
          "type": "text",
          "id": api_scoped_id("color"),
          "name": $cmp.name,
          "autocomplete": $cmp.autocomplete,
          "accesskey": $cmp.accesskey,
          "aria-label": $cmp.computedAriaLabel,
          "minlength": "4",
          "maxlength": "7",
          "placeholder": $cmp.placeholder,
          "pattern": $cmp.pattern
        },
        props: {
          "disabled": $cmp.disabled
        },
        key: 60,
        on: {
          "blur": _m27 || ($ctx._m27 = api_bind($cmp.handleBlur)),
          "focus": _m28 || ($ctx._m28 = api_bind($cmp.handleFocus)),
          "change": _m29 || ($ctx._m29 = api_bind($cmp.handleChange)),
          "input": _m30 || ($ctx._m30 = api_bind($cmp.handleInput))
        }
      }, [])])]), $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp.fieldLevelHelp
        },
        key: 63
      }, []) : null])]) : null, $cmp.isTypeDesktopDate ? api_custom_element("lightning-datepicker", _lightningDatepicker, {
        props: {
          "max": $cmp.max,
          "min": $cmp.min,
          "label": $cmp.label,
          "name": $cmp.name,
          "variant": $cmp.variant,
          "ariaLabel": $cmp.ariaLabel,
          "dateStyle": $cmp.dateStyle,
          "placeholder": $cmp.placeholder,
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "fieldLevelHelp": $cmp.fieldLevelHelp,
          "autocomplete": $cmp.autocomplete,
          "messageWhenBadInput": $cmp.messageWhenBadInput,
          "messageWhenValueMissing": $cmp.messageWhenValueMissing,
          "messageWhenRangeOverflow": $cmp.messageWhenRangeOverflow,
          "messageWhenRangeUnderflow": $cmp.messageWhenRangeUnderflow,
          "disabled": $cmp.disabled
        },
        key: 66,
        on: {
          "change": _m31 || ($ctx._m31 = api_bind($cmp.handleChange)),
          "blur": _m32 || ($ctx._m32 = api_bind($cmp.handleBlur)),
          "focus": _m33 || ($ctx._m33 = api_bind($cmp.handleFocus))
        }
      }, []) : null, $cmp.isTypeDesktopTime ? api_custom_element("lightning-timepicker", _lightningTimepicker, {
        props: {
          "max": $cmp.max,
          "min": $cmp.min,
          "label": $cmp.label,
          "name": $cmp.name,
          "ariaLabel": $cmp.ariaLabel,
          "variant": $cmp.variant,
          "timeStyle": $cmp.timeStyle,
          "placeholder": $cmp.placeholder,
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "fieldLevelHelp": $cmp.fieldLevelHelp,
          "messageWhenBadInput": $cmp.messageWhenBadInput,
          "messageWhenValueMissing": $cmp.messageWhenValueMissing,
          "messageWhenRangeOverflow": $cmp.messageWhenRangeOverflow,
          "messageWhenRangeUnderflow": $cmp.messageWhenRangeUnderflow,
          "disabled": $cmp.disabled
        },
        key: 67,
        on: {
          "change": _m34 || ($ctx._m34 = api_bind($cmp.handleChange)),
          "blur": _m35 || ($ctx._m35 = api_bind($cmp.handleBlur)),
          "focus": _m36 || ($ctx._m36 = api_bind($cmp.handleFocus))
        }
      }, []) : null, $cmp.isTypeDesktopDateTime ? api_custom_element("lightning-datetimepicker", _lightningDatetimepicker, {
        props: {
          "dateAriaControls": $cmp.dateAriaControls,
          "dateAriaLabel": $cmp.dateAriaLabel,
          "dateAriaLabelledBy": $cmp.dateAriaLabelledBy,
          "dateAriaDescribedBy": $cmp.dateAriaDescribedBy,
          "dateStyle": $cmp.dateStyle,
          "timeStyle": $cmp.timeStyle,
          "timeAriaControls": $cmp.timeAriaControls,
          "timeAriaLabel": $cmp.timeAriaLabel,
          "timeAriaLabelledBy": $cmp.timeAriaLabelledBy,
          "timeAriaDescribedBy": $cmp.timeAriaDescribedBy,
          "max": $cmp.max,
          "min": $cmp.min,
          "timezone": $cmp.timezone,
          "label": $cmp.label,
          "name": $cmp.name,
          "variant": $cmp.variant,
          "placeholder": $cmp.placeholder,
          "required": $cmp.required,
          "readOnly": $cmp.readOnly,
          "fieldLevelHelp": $cmp.fieldLevelHelp,
          "autocomplete": $cmp.autocomplete,
          "messageWhenBadInput": $cmp.messageWhenBadInput,
          "messageWhenValueMissing": $cmp.messageWhenValueMissing,
          "messageWhenRangeOverflow": $cmp.messageWhenRangeOverflow,
          "messageWhenRangeUnderflow": $cmp.messageWhenRangeUnderflow,
          "disabled": $cmp.disabled
        },
        key: 68,
        on: {
          "change": _m37 || ($ctx._m37 = api_bind($cmp.handleChange)),
          "blur": _m38 || ($ctx._m38 = api_bind($cmp.handleBlur)),
          "focus": _m39 || ($ctx._m39 = api_bind($cmp.handleFocus))
        }
      }, []) : null, $cmp._helpMessage ? api_element("div", {
        classMap: {
          "slds-form-element__help": true
        },
        attrs: {
          "id": api_scoped_id("help-message"),
          "data-help-message": true,
          "role": "alert"
        },
        key: 69
      }, [api_dynamic($cmp._helpMessage)]) : null];
    }

    var _tmpl$l = lwc.registerTemplate(tmpl$m);
    tmpl$m.stylesheets = [];

    if (_implicitStylesheets$1) {
      tmpl$m.stylesheets.push.apply(tmpl$m.stylesheets, _implicitStylesheets$1);
    }
    tmpl$m.stylesheetTokens = {
      hostAttribute: "lightning-input_input-host",
      shadowAttribute: "lightning-input_input"
    };

    var labelInputFileBodyText = 'Or drop files';

    var labelInputFileButtonLabel = 'Upload Files';

    var labelMessageToggleActive = 'Active';

    var labelMessageToggleInactive = 'Inactive';

    var labelClearInput = 'Clear';

    var labelLoadingIndicator = 'Loading';

    var labelNumberIncrementCounter = 'Increase number';

    var labelNumberDecrementCounter = 'Decrease number';

    var userTimeZone = 'America/Los_Angeles';

    var formFactor = 'Large';

    function normalizeInput(value) {
      if (typeof value === 'number' || typeof value === 'string') {
        return String(value);
      }

      return '';
    }

    function normalizeDate(value) {
      return normalizeISODate(value).isoValue || '';
    } // Converts value to the user's timezone and formats it in a way that will be accepted by the input

    function normalizeUTCDateTime(value, timezone) {
      return normalizeISODateTime(value, timezone).isoValue || '';
    }
    function normalizeTime(value) {
      return normalizeISOTime(value).isoValue || '';
    } // parses the input value and converts it back to UTC from the user's timezone

    function normalizeDateTimeToUTC(value, timezone) {
      return normalizeFormattedDateTime(value, timezone) || '';
    }

    var groupingSeparator = ',';

    var decimalSeparator = '.';

    const VALID_NUMBER_CHARACTERS_EXPRESSION = new RegExp( // eslint-disable-next-line no-useless-escape
    '^[-+0-9kKmMeE.,\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9' + '\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF' + '\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF' + '\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9' + '\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9' + '\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89' + '\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49' + '\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909' + '\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9' + ']$');
    const SHORTCUT_FACTORS = {
      k: 3,
      m: 6
    };
    function toIsoDecimal(numberAsString) {
      const result = transformLocalizedNumberToIsoDecimal(numberAsString);

      if (isNaN(result)) {
        return '';
      }

      return result;
    }
    function isValidNumber(numberAsString) {
      return !isNaN(transformLocalizedNumberToIsoDecimal(numberAsString));
    }
    function fromIsoDecimal(numberAsString) {
      return toLocalizedDigits(numberAsString.replace('.', decimalSeparator));
    } // TODO: Too many options, simplify

    function increaseNumberByStep({
      value,
      increment,
      step,
      fractionDigits
    }) {
      const startingValue = value === '' || value == null ? '0' : value;
      const stepAsFloat = parseFloat(step);
      let result;

      if (isNaN(stepAsFloat)) {
        result = parseFloat(startingValue) + increment;
      } else {
        // ideally we'd round the value to the closest correct step, so that if say the step is '2', and the
        // current value is '1' it would increment to '2' instead of '3', since the former would be the valid
        // number given the step constraint, however this would significantly complicate the code, keeping
        // it simple for now.
        const increaseBy = increment * stepAsFloat;
        result = parseFloat(startingValue) + increaseBy;
      }

      return result.toFixed(fractionDigits);
    }
    function calculateFractionDigitsFromStep(step) {
      let calculatedFractionDigits;

      if (step) {
        const stepAsString = String(step).toLowerCase();

        if (stepAsString !== 'any') {
          // lowering the case because we're checking for exponent format as well
          let fractionDigits = 0;

          if (stepAsString.indexOf('.') >= 0 && stepAsString.indexOf('e') < 0) {
            const fractionalPart = stepAsString.split('.')[1]; // we're parsing to account for cases where the step is
            // '1.0', or '1.000', etc.

            if (parseInt(fractionalPart, 10) > 0) {
              fractionDigits = fractionalPart.length;
            }
          } else if (stepAsString.indexOf('e-') > 0) {
            // exponent form eg. 1.5e-5
            const splitOnExponent = stepAsString.split('e-');
            const fractionalPart = splitOnExponent[0].split('.')[1];
            const exponentPart = splitOnExponent[1];
            const fractionalPartLength = fractionalPart ? fractionalPart.length : 0;
            fractionDigits = parseInt(exponentPart, 10) + fractionalPartLength;
          }

          calculatedFractionDigits = fractionDigits;
        }
      }

      return calculatedFractionDigits;
    }
    function formatNumber(numberAsString, options) {
      if (isEmptyString(numberAsString)) {
        return '';
      }

      let formattedValue = numberAsString;
      let inputValue = numberAsString; // set formatter style & default options

      const formatStyle = options.style;
      const formatOptions = {
        style: formatStyle
      };
      formatOptions.minimumFractionDigits = options.minimumFractionDigits;
      formatOptions.maximumFractionDigits = options.maximumFractionDigits;

      if (formatStyle === 'percent-fixed') {
        // percent-fixed just uses percent format and divides the value by 100
        // before passing to the library, this is to deal with the
        // fact that percentages in salesforce are 0-100, not 0-1
        formatOptions.style = 'percent';
        const inputValueAsString = inputValue.toString();
        const normalisedNumberInPercent = parseFloat(inputValue) / 100; // If the number contains fraction digits and is not in an exponent format

        if (inputValueAsString.indexOf('.') > 0 && inputValueAsString.indexOf('e') < 0) {
          // Depending on the input number, division by 100 may lead to rounding errors
          // (e.g 0.785 / 100 is 0.007850000000000001), so we need to round back
          // to the correct precision, that is - existing number of fractional digits
          // plus extra 2 for division by 100.
          inputValue = normalisedNumberInPercent.toFixed(inputValueAsString.split('.')[1].length + 2);
        } else {
          inputValue = normalisedNumberInPercent;
        }
      }

      try {
        formattedValue = numberFormat$1(formatOptions).format(inputValue) || '';
      } catch (ignore) {// ignore any errors
      }

      return formattedValue;
    } // Exporting only to test, separators are only overridden in the tests

    function transformLocalizedNumberToIsoDecimal(numberAsString, separators) {
      if (numberAsString == null || numberAsString.length === 0) {
        return '';
      }

      const decimalSymbol = separators ? separators.decimalSeparator : decimalSeparator;
      const groupingSymbol = separators ? separators.groupSeparator : groupingSeparator; // remove the grouping separator

      let result = numberAsString.split(groupingSymbol).join('');

      if (decimalSymbol !== '.') {
        // replace the local decimal separator with a
        result = result.replace(decimalSymbol, '.');
      }

      return expandShortcuts(addLeadingZeroIfNeeded(fromLocalizedDigits(result)));
    }
    function isValidNumberCharacter(character) {
      return VALID_NUMBER_CHARACTERS_EXPRESSION.test(character);
    }
    function normalizeNumber(value) {
      if (value === undefined || value === null || isNaN(value)) {
        return '';
      }

      return String(value);
    }
    function hasValidNumberShortcut(value) {
      const result = value.toLowerCase().trim();
      const hasMoreThanOneK = result.indexOf('k') !== result.lastIndexOf('k');
      const hasMoreThanOneM = result.indexOf('m') !== result.lastIndexOf('m');
      const hasBothKAndM = result.indexOf('k') > 0 && result.indexOf('m') > 0;

      if (hasMoreThanOneK && hasMoreThanOneM || hasBothKAndM) {
        return false;
      }

      const endsWithK = result.endsWith('k');
      const endsWithM = result.endsWith('m'); // has 'm' or 'k' and more than just them (ie. result of 'm' or 'k' are not valid.

      return (endsWithK || endsWithM) && result.length > 1;
    } // Exported for testing only

    function expandShortcuts(isoValue) {
      if (!hasValidNumberShortcut(isoValue)) {
        return isoValue;
      }

      let result = isoValue.toLowerCase().trim();
      const shortcut = result.charAt(result.length - 1); // remove the suffix

      result = result.substring(0, result.length - 1);

      if (isNaN(result)) {
        return isoValue;
      }

      const parts = result.split('.');
      let fractionDigits = 0;
      const hasDecimalPart = parts.length > 1;

      if (hasDecimalPart) {
        fractionDigits = parts[1].length;
      }

      const exponent = SHORTCUT_FACTORS[shortcut]; // since multiplication may result in loss of precision on javascript's part,
      // we're calculating here the number of fraction digits needed and formatting
      // the number at that

      const newFractionDigits = Math.max(0, fractionDigits - exponent);
      return parseFloat(result * Math.pow(10, exponent)).toFixed(newFractionDigits);
    }

    function addLeadingZeroIfNeeded(result) {
      // If the number starts with +. OR  -. OR . ; insert a 0 before the decimal separator.
      // eg. -.2 -> -0.2
      const decimalSeparatorLocation = result.indexOf('.');

      if (decimalSeparatorLocation === 0 || decimalSeparatorLocation === 1) {
        const firstCharacter = result.charAt(0);

        if (firstCharacter === '+' || firstCharacter === '-' || firstCharacter === '.') {
          result = result.substring(0, decimalSeparatorLocation) + '0' + result.substring(decimalSeparatorLocation);
        }
      }

      return result;
    }

    const i18n$a = {
      a11yTriggerText: labelA11yTriggerText,
      inputFileBodyText: labelInputFileBodyText,
      inputFileButtonLabel: labelInputFileButtonLabel,
      messageToggleActive: labelMessageToggleActive,
      messageToggleInactive: labelMessageToggleInactive,
      numberIncrementCounter: labelNumberIncrementCounter,
      numberDecrementCounter: labelNumberDecrementCounter,
      required: labelRequired,
      clear: labelClearInput,
      loading: labelLoadingIndicator
    };
    const ARIA_CONTROLS$3 = 'aria-controls';
    const ARIA_LABEL$2 = 'aria-label';
    const ARIA_LABELEDBY = 'aria-labelledby';
    const ARIA_DESCRIBEDBY$4 = 'aria-describedby';
    /*
    * This component supports the regular native input types, with the addition of toggle, checkbox-button and color.
    * Furthermore the file type supports a droppable zone, search has a clear button, number has formatting.
    * Input changes (native oninput event) triggers an onchange event,
    *     the native even is stopped, the dispatched custom event has a value that points to the state of the component
    *     in case of files it's the files uploaded (via droppable zone or through the upload button),
    *     checked for radio and checkbox, checkbox-button, and just straight input's value for everything else
    *
    *
    * _Toggle_ (always has an aria-describedby, on error has an additional one, default label text for active and inactive
    * states)
    * _File_ (as it has a droppable zone, the validity returned would have to be valid - unless a custom error message was
    *    passed)
    * _Search_ (it has the clear button and the icon)
    * _Number_ (formatting when not in focus, when in focus shows raw value)
    *
    * */

    const VALID_NUMBER_FORMATTERS = ['decimal', 'percent', 'percent-fixed', 'currency'];
    const DEFAULT_COLOR$1 = '#000000';
    const DEFAULT_FORMATTER = VALID_NUMBER_FORMATTERS[0];
    /**
     * Returns an aria string with all the non-autolinked values removed
     * @param {String} values space sperated list of ids
     * @returns {String} The aria values with the non-auto linked ones removed
     */

    function filterNonAutoLink(values) {
      const ariaValues = values && values.split(/\s+/);
      return ariaValues && ariaValues.filter(value => {
        return !!value.match(/^auto-link/);
      }).join(' ');
    }
    /**
     * Represents interactive controls that accept user input depending on the type attribute.
     */


    class LightningInput extends lwc.LightningElement {
      /**
       * Text that is displayed when the field is empty, to prompt the user for a valid entry. Use this attribute with date, email, number, password, search, tel, text, time, and url input types only.
       * @type {string}
       *
       */

      /**
       * Specifies the name of an input element.
       * @type {string}
       *
       */

      /**
       * Text label for the input.
       * @type {string}
       * @required
       *
       */

      /**
       * Error message to be displayed when a bad input is detected. The badInput error can be returned for invalid input for any input type.
       * @type {string}
       *
       */

      /**
       * Error message to be displayed when a pattern mismatch is detected. The patternMismatch error can be returned when you specify a pattern for email, password, search, tel, text, or url input types.
       * @type {string}
       *
       */

      /**
       * Error message to be displayed when a range overflow is detected. The rangeOverflow error can be returned when you specify a max value for number or range input types.
       * @type {string}
       *
       */

      /**
       * Error message to be displayed when a range underflow is detected. The rangeUnderflow error can be returned when you specify a min value for number or range input types.
       * @type {string}
       *
       */

      /**
       * Error message to be displayed when a step mismatch is detected. The stepMismatch error can be returned when you specify a step value for number and range input types.
       * @type {string}
       *
       */

      /**
       * Error message to be displayed when the value is too short. The tooShort error can be returned when you specify a min-length value for email, password, search, tel, text, and url input types.
       * @type {string}
       *
       */

      /**
       * Error message to be displayed when the value is too long. The tooLong error can be returned when you specify a max-length value for email, password, search, tel, text, and url input types.
       * @type {string}
       *
       */

      /**
       * Error message to be displayed when a type mismatch is detected. The typeMismatch error can be returned for the email and url input types.
       * @type {string}
       *
       */

      /**
       * Error message to be displayed when the value is missing. The valueMissing error can be returned when you specify the required attribute for any input type.
       * @type {string}
       *
       */

      /**
       * Text shown for the active state of a toggle. The default is "Active".
       * @type {string}
       */

      /**
       * Text shown for the inactive state of a toggle. The default is "Inactive".
       * @type {string}
       */

      /**
       * Describes the input to assistive technologies.
       * @type {string}
       */

      /**
       * Controls auto-filling of the field. Use this attribute with
       * email, search, tel, text, and url input types only. Set the attribute to pass
       * through autocomplete values to be interpreted by the browser.
       * @type {string}
       */

      /**
       * The display style of the date when type='date' or type='datetime'. Valid values are
       * short, medium (default), and long. The format of each style is specific to the locale.
       * On mobile devices this attribute has no effect.
       * @type {string}
       * @default medium
       */

      /**
       * The display style of the time when type='time' or type='datetime'. Valid values are
       * short (default), medium, and long. Currently, medium and long styles look the same.
       * On mobile devices this attribute has no effect.
       * @type {string}
       * @default short
       *
       */

      /**
       * Describes the date input to assistive technologies when type='datetime'. On mobile devices,
       * this label is merged with aria-label and time-aria-label to describe the native date time input.
       * @type {string}
       *
       */
      constructor() {
        super();
        this.placeholder = void 0;
        this.name = void 0;
        this.label = void 0;
        this.messageWhenBadInput = void 0;
        this.messageWhenPatternMismatch = void 0;
        this.messageWhenRangeOverflow = void 0;
        this.messageWhenRangeUnderflow = void 0;
        this.messageWhenStepMismatch = void 0;
        this.messageWhenTooShort = void 0;
        this.messageWhenTooLong = void 0;
        this.messageWhenTypeMismatch = void 0;
        this.messageWhenValueMissing = void 0;
        this.messageToggleActive = i18n$a.messageToggleActive;
        this.messageToggleInactive = i18n$a.messageToggleInactive;
        this.ariaLabel = void 0;
        this.autocomplete = void 0;
        this.dateStyle = void 0;
        this.timeStyle = void 0;
        this.dateAriaLabel = void 0;
        this._timeAriaDescribedBy = void 0;
        this._timeAriaLabelledBy = void 0;
        this._timeAriaControls = void 0;
        this._dateAriaControls = void 0;
        this._dateAriaDescribedBy = void 0;
        this._dateAriaLabelledBy = void 0;
        this._value = '';
        this._type = 'text';
        this._pattern = void 0;
        this._max = void 0;
        this._min = void 0;
        this._step = void 0;
        this._disabled = false;
        this._readOnly = false;
        this._required = false;
        this._checked = false;
        this._isLoading = false;
        this._multiple = false;
        this._timezone = false;
        this._helpMessage = null;
        this._isColorPickerPanelOpen = false;
        this._fieldLevelHelp = void 0;
        this._accesskey = void 0;
        this._maxLength = void 0;
        this._minLength = void 0;
        this._accept = void 0;
        this._variant = void 0;
        this._numberRawValue = '';
        this._formatter = DEFAULT_FORMATTER;
        this._showRawNumber = false;
        this._initialValueSet = false;
        this._files = null;
        this._rendered = void 0;
        this.ariaObserver = new ContentMutation(this); // Native Shadow Root will return [native code].
        // Our synthetic method will return the function source.

        this.isNative = this.template.querySelector.toString().match(/\[native code\]/);
      }

      connectedCallback() {
        this.classList.add('slds-form-element');

        this._updateClassList();

        this._validateRequiredAttributes();

        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.reportValidity());

        if (this.isTypeNumber) {
          this._updateNumberValue(this._value);
        }
      }

      disconnectedCallback() {
        this._rendered = false;
        this._initialValueSet = false;
        this._cachedInputElement = undefined;
      }

      renderedCallback() {
        if (!this._initialValueSet && this._inputElement) {
          this._rendered = true;

          if (this.isTypeNumber) {
            this._numberRawValue = fromIsoDecimal(this._value);
          }

          this._setInputValue(this._displayedValue);

          if (this.isTypeCheckable) {
            this._inputElement.checked = this._checked;
          }

          this._initialValueSet = true;
        }

        this.ariaObserver.sync();

        this._synchronizeA11y();
      }
      /**
       * Reserved for internal use.
       * @type {number}
       *
       */


      get formatFractionDigits() {
        return this._formatFractionDigits;
      }

      set formatFractionDigits(value) {
        this._formatFractionDigits = value;

        if (this._rendered && this.isTypeNumber) {
          this._setInputValue(this._displayedValue);
        }
      }
      /**
       * A space-separated list of element IDs whose presence or content is controlled by the
       * time input when type='datetime'. On mobile devices, this is merged with aria-controls
       * and date-aria-controls to describe the native date time input.
       * @type {string}
       */


      get timeAriaControls() {
        return this._timeAriaControls;
      }

      set timeAriaControls(references) {
        this._timeAriaControls = references;
        this.ariaObserver.connectLiveIdRef(references, reference => {
          this._timeAriaControls = reference;
        });
      }
      /**
       * A space-separated list of element IDs that provide labels for the date input when type='datetime'.
       * On mobile devices, this is merged with aria-labelled-by and time-aria-labelled-by to describe
       * the native date time input.
       * @type {string}
       */


      get dateAriaLabelledBy() {
        return this._dateAriaLabelledBy;
      }

      set dateAriaLabelledBy(references) {
        this._dateAriaLabelledBy = references;
        this.ariaObserver.connectLiveIdRef(references, reference => {
          this._dateAriaLabelledBy = reference;
        });
      }
      /**
       * A space-separated list of element IDs that provide labels for the time input when type='datetime'.
       * On mobile devices, this is merged with aria-labelled-by and date-aria-labelled-by to describe
       * the native date time input.
       * @type {string}
       *
       */


      get timeAriaLabelledBy() {
        return this._timeAriaLabelledBy;
      }

      set timeAriaLabelledBy(references) {
        this._timeAriaLabelledBy = references;
        this.ariaObserver.connectLiveIdRef(references, reference => {
          this._timeAriaLabelledBy = reference;
        });
      }
      /**
       * A space-separated list of element IDs that provide descriptive labels for the time input when
       * type='datetime'. On mobile devices, this is merged with aria-described-by and date-aria-described-by
       * to describe the native date time input.
       *  @type {string}
       *
       */


      get timeAriaDescribedBy() {
        return this._timeAriaDescribedBy;
      }

      set timeAriaDescribedBy(references) {
        this._timeAriaDescribedBy = references;
        this.ariaObserver.connectLiveIdRef(references, reference => {
          this._timeAriaDescribedBy = reference;
        });
      }
      /**
       * A space-separated list of element IDs whose presence or content is controlled by the
       * date input when type='datetime'. On mobile devices, this is merged with aria-controls
       * and time-aria-controls to describe the native date time input.
       * @type {string}
       *
       */


      get dateAriaControls() {
        return this._dateAriaControls;
      }

      set dateAriaControls(references) {
        this._dateAriaControls = references;
        this.ariaObserver.connectLiveIdRef(references, reference => {
          this._dateAriaControls = reference;
        });
      }
      /**
       * A space-separated list of element IDs that provide descriptive labels for the date input when
       * type='datetime'. On mobile devices, this is merged with aria-described-by and time-aria-described-by
       * to describe the native date time input.
       * @type {string}
       */


      get dateAriaDescribedBy() {
        return this._dateAriaDescribedBy;
      }

      set dateAriaDescribedBy(references) {
        this._dateAriaDescribedBy = references;
        this.ariaObserver.connectLiveIdRef(references, reference => {
          this._dateAriaDescribedBy = reference;
        });
      }
      /**
       * A space-separated list of element IDs whose presence or content is controlled by the input.
       * @type {string}
       */


      get ariaControls() {
        return this._ariaControls;
      }

      set ariaControls(references) {
        this._ariaControls = references;
        this.ariaObserver.link('input', 'aria-controls', references, '[data-aria]');
      }
      /**
       * A space-separated list of element IDs that provide labels for the input.
       * @type {string}
       */


      get ariaLabelledBy() {
        // native version returns the auto linked value
        if (this.isNative) {
          const ariaValues = this.template.querySelector('input').getAttribute('aria-labelledby');
          return filterNonAutoLink(ariaValues);
        }

        return this._ariaLabelledBy;
      }

      set ariaLabelledBy(references) {
        this._ariaLabelledBy = references;
        this.ariaObserver.link('input', 'aria-labelledby', references, '[data-aria]');
      }
      /**
       * A space-separated list of element IDs that provide descriptive labels for the input.
       * @type {string}
       */


      get ariaDescribedBy() {
        if (this.isNative) {
          // in native case return the linked value
          const ariaValues = this.template.querySelector('input').getAttribute('aria-describedby');
          return filterNonAutoLink(ariaValues);
        }

        return this._ariaDescribedBy;
      }

      set ariaDescribedBy(references) {
        this._ariaDescribedBy = references;
        this.ariaObserver.link('input', 'aria-describedby', references, '[data-aria]');
      }
      /**
       * String value with the formatter to be used for number input. Valid values include
       * decimal, percent, percent-fixed, and currency.
       * @type {string}
       */


      get formatter() {
        return this._formatter;
      }

      set formatter(value) {
        this._formatter = normalizeString(value, {
          fallbackValue: DEFAULT_FORMATTER,
          validValues: VALID_NUMBER_FORMATTERS
        });

        this._updateInputDisplayValueIfTypeNumber();
      }
      /**
       * The type of the input. This value defaults to text.
       * @type {string}
       * @default text
       */


      get type() {
        return this._type;
      }

      set type(value) {
        const normalizedValue = normalizeString(value);
        this._type = normalizedValue === 'datetime' ? 'datetime-local' : normalizedValue;

        this._validateType(normalizedValue);

        this._inputElementRefreshNeeded = true;

        if (this._rendered) {
          // The type is being changed after render, which means the input element may be different (eg. changing
          // from text to 'checkbox', so we need to set the initial value again
          this._initialValueSet = false;

          if (this.isTypeNumber) {
            // If the type has changed, we need to re-parse the value as a number
            this._updateNumberValue(this._value);
          }
        }

        this._updateProxyInputAttributes(['type', 'value', 'max', 'min', 'required', 'pattern']);
      }
      /**
       * For the search type only. If present, a spinner is displayed to indicate that data is loading.
       * @type {boolean}
       * @default false
       */


      get isLoading() {
        return this._isLoading;
      }

      set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
      }
      /**
       * Specifies the regular expression that the input's value is checked against.
       * This attribute is supported for email, password, search, tel, text, and url types.
       * @type {string}
       *
       */


      get pattern() {
        if (this.isTypeColor) {
          return '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$';
        }

        return this._pattern;
      }

      set pattern(value) {
        this._pattern = value;

        this._updateProxyInputAttributes('pattern');
      }
      /**
       * The maximum number of characters allowed in the field.
       * Use this attribute with email, password, search, tel, text, and url input types only.
       * @type {number}
       */


      get maxLength() {
        return this._maxLength;
      }

      set maxLength(value) {
        this._maxLength = value;

        this._updateProxyInputAttributes('maxlength');
      }
      /**
       * Specifies the types of files that the server accepts. Use this attribute with file input type only.
       * @type {string}
       */


      get accept() {
        return this._accept;
      }

      set accept(value) {
        this._accept = value;

        this._updateProxyInputAttributes('accept');
      }
      /**
       * The minimum number of characters allowed in the field.
       * Use this attribute with email, password, search, tel, text, and url input types only.
       * @type {number}
       */


      get minLength() {
        return this._minLength;
      }

      set minLength(value) {
        this._minLength = value;

        this._updateProxyInputAttributes('minlength');
      } // number and date/time

      /**
       * The maximum acceptable value for the input.  Use this attribute with number,
       * range, date, time, and datetime input types only. For number and range type, the max value is a
       * decimal number. For the date, time, and datetime types, the max value must use a valid string for the type.
       * @type {decimal|string}
       */


      get max() {
        return this._max;
      }

      set max(value) {
        this._max = value;

        this._updateProxyInputAttributes('max');
      }
      /**
       * The minimum acceptable value for the input. Use this attribute with number,
       * range, date, time, and datetime input types only. For number and range types, the min value
       * is a decimal number. For the date, time, and datetime types, the min value must use a valid string for the type.
       * @type {decimal|string}
       */


      get min() {
        return this._min;
      }

      set min(value) {
        this._min = value;

        this._updateProxyInputAttributes('min');
      }
      /**
       * Granularity of the value, specified as a positive floating point number.
       * Use this attribute with number and range input types only.
       * Use 'any' when granularity is not a concern. This value defaults to 1.
       * @type {decimal|string}
       * @default 1
       */


      get step() {
        // This should be reconsidered as it in effect disabled any step support for datetime/time types on mobile
        if (this.isTypeDateTime || this.isTypeTime) {
          return 'any';
        } // It should probably default to '1' instead, but this means that we'd be explicitly passing step='1' to the
        // native input


        return this._step;
      }

      set step(value) {
        if (typeof value === 'string' && value.toLowerCase() === 'any') {
          this._step = 'any';
        } else {
          this._step = isUndefinedOrNull(value) || isNaN(value) ? undefined : String(value);
        }

        this._updateProxyInputAttributes('step');

        this._updateInputDisplayValueIfTypeNumber();
      }
      /**
       * If present, the checkbox is selected.
       * @type {boolean}
       * @default false
       */


      get checked() {
        // checkable inputs can be part of a named group, in that case there won't be a change event thrown and so
        // the internal tracking _checked would be out of sync with the actual input value.
        if (this.isTypeCheckable && this._initialValueSet) {
          return this._inputElement.checked;
        }

        return this._checked;
      }

      set checked(value) {
        this._checked = normalizeBoolean(value);

        this._updateProxyInputAttributes('checked');

        if (this._rendered) {
          this._inputElement.checked = this._checked;
        }
      }
      /**
       * Specifies that a user can enter more than one value. Use this attribute with file and email input types only.
       * @type {boolean}
       * @default false
       */


      get multiple() {
        return this._multiple;
      }

      set multiple(value) {
        this._multiple = normalizeBoolean(value);

        this._updateProxyInputAttributes('multiple');
      }
      /**
       * Specifies the value of an input element.
       * @type {object}
       */


      get value() {
        return this._value;
      }

      set value(value) {
        const previousValue = this._value;
        this._value = normalizeInput(value);

        if (this._rendered && this.isTypeNumber) {
          this._value = normalizeNumber(value); // the extra check for whether the value has changed is done for cases
          // when the same value is set back in a change handler, this is to avoid
          // the raw number from changing formatting under the user
          // (eg. if the user typed 1,000 we want to preserve that formatting as the user
          // types the value)

          if (this.validity.badInput || this._value !== previousValue) {
            this._updateNumberValue(value);
          }
        }

        this._updateProxyInputAttributes('value'); // Setting value of a type='file' isn't allowed


        if (!this.isTypeFile) {
          // Again, due to the interop layer we need to check whether the value being set
          // is different, otherwise we're duplicating the sets on the input, which result
          // in different bugs like Japanese IME duplication of characters in Safari (likely a browser bug) or
          // character position re-set in IE11.
          if (this._rendered && this._inputElement.value !== this._displayedValue) {
            this._setInputValue(this._displayedValue);
          }
        }
      }
      /**
       * The variant changes the appearance of an input field.
       * Accepted variants include standard, label-inline, label-hidden, and label-stacked.
       * This value defaults to standard, which displays the label above the field.
       * Use label-hidden to hide the label but make it available to assistive technology.
       * Use label-inline to horizontally align the label and input field.
       * Use label-stacked to place the label above the input field.
       * @type {string}
       * @default standard
       */


      get variant() {
        return this._variant || VARIANT.STANDARD;
      }

      set variant(value) {
        this._variant = normalizeVariant$1(value);

        this._updateClassList();
      }
      /**
       * If present, the input field is disabled and users cannot interact with it.
       * @type {boolean}
       * @default false
       */


      get disabled() {
        return this._disabled;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);

        this._updateProxyInputAttributes('disabled');
      }
      /**
       * If present, the input field is read-only and cannot be edited by users.
       * @type {boolean}
       * @default false
       */


      get readOnly() {
        return this._readOnly;
      }

      set readOnly(value) {
        this._readOnly = normalizeBoolean(value);

        this._updateProxyInputAttributes('readonly');
      }
      /**
       * If present, the input field must be filled out before the form is submitted.
       * @type {boolean}
       * @default false
       */


      get required() {
        return this._required;
      }

      set required(value) {
        this._required = normalizeBoolean(value);

        this._updateProxyInputAttributes('required');
      }
      /**
       * Specifies the time zone used when type='datetime' only. This value defaults to the user's Salesforce time zone setting.
       * @type {string}
       *
       */


      get timezone() {
        return this._timezone || userTimeZone;
      }

      set timezone(value) {
        this._timezone = value; // mobile date/time normalization of value/max/min depends on timezone, so we need to update here as well

        this._updateProxyInputAttributes(['value', 'max', 'min']);
      }
      /**
       * Help text detailing the purpose and function of the input.
       * This attribute isn't supported for file, toggle, and checkbox-button types.
       * @type {string}
       *
       */


      get fieldLevelHelp() {
        return this._fieldLevelHelp;
      }

      set fieldLevelHelp(value) {
        this._fieldLevelHelp = value;
      }
      /**
       * Specifies a shortcut key to activate or focus an element.
       * @type {string}
       *
       */


      get accessKey() {
        return this._accesskey;
      }

      set accessKey(newValue) {
        this._accesskey = newValue;
      }
      /**
       * A FileList that contains selected files. Use this attribute with the file input type only.
       * @type {object}
       *
       */


      get files() {
        if (this.isTypeFile) {
          return this._files;
        }

        return null;
      }
      /**
       * Represents the validity states that an element can be in, with respect to constraint validation.
       * @type {object}
       *
       */


      get validity() {
        return this._constraint.validity;
      }
      /**
       * Checks if the input is valid.
       * @returns {boolean} Indicates whether the element meets all constraint validations.
       */


      checkValidity() {
        return this._constraint.checkValidity();
      }
      /**
       * Sets a custom error message to be displayed when a form is submitted.
       * @param {string} message - The string that describes the error. If message is an empty string, the error message is reset.
       */


      setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
      }
      /**
       * Displays the error messages and returns false if the input is invalid.
       * If the input is valid, reportValidity() clears displayed error messages and returns true.
       * @returns {boolean} - The validity status of the input fields.
       */


      reportValidity() {
        return this._constraint.reportValidity(message => {
          if (this._rendered && !this.isNativeInput) {
            this._inputElement.showHelpMessage(message);
          } else {
            this._helpMessage = message;
          }
        });
      }
      /**
       * Displays error messages on invalid fields.
       * An invalid field fails at least one constraint validation and returns false when checkValidity() is called.
       */


      showHelpMessageIfInvalid() {
        this.reportValidity();
      }
      /**
       * Sets focus on the input element.
       */


      focus() {
        if (this._rendered) {
          this._inputElement.focus();
        }
      }
      /**
       * Removes keyboard focus from the input element.
       */


      blur() {
        if (this._rendered) {
          this._inputElement.blur();
        }
      }

      get isNativeInput() {
        return !(this.isTypeDesktopDate || this.isTypeDesktopDateTime || this.isTypeDesktopTime);
      }

      get computedAriaControls() {
        const ariaValues = []; // merge all date & time arias on mobile since it's displayed as a single field

        if (this.isTypeMobileDateTime) {
          ariaValues.push(this.dateAriaControls);
          ariaValues.push(this.timeAriaControls);
        }

        if (this.ariaControls) {
          ariaValues.push(this.ariaControls);
        }

        return normalizeAriaAttribute(ariaValues);
      }

      get computedAriaLabel() {
        const ariaValues = []; // merge all date & time arias on mobile since it's displayed as a single field

        if (this.isTypeMobileDateTime) {
          ariaValues.push(this.dateAriaLabel);
          ariaValues.push(this.timeAriaLabel);
        }

        if (this.ariaLabel) {
          ariaValues.push(this.ariaLabel);
        }

        return normalizeAriaAttribute(ariaValues);
      }

      get computedAriaLabelledBy() {
        const ariaValues = [];

        if (this.isTypeFile) {
          ariaValues.push(this.computedUniqueFileElementLabelledById);
        } // merge all date & time arias on mobile since it's displayed as a single field


        if (this.isTypeMobileDateTime) {
          ariaValues.push(this.dateAriaLabelledBy);
          ariaValues.push(this.timeAriaLabelledBy);
        }

        if (this.ariaLabelledBy) {
          ariaValues.push(this.ariaLabelledBy);
        }

        return normalizeAriaAttribute(ariaValues);
      }

      get computedAriaDescribedBy() {
        const ariaValues = [];

        if (this._helpMessage) {
          ariaValues.push(this.computedUniqueHelpElementId);
        } // The toggle type is described by a secondary element


        if (this.isTypeToggle) {
          ariaValues.push(this.computedUniqueToggleElementDescribedById);
        } // merge all date & time arias on mobile since it's displayed as a single field


        if (this.isTypeMobileDateTime) {
          ariaValues.push(this.dateAriaDescribedBy);
          ariaValues.push(this.timeAriaDescribedBy);
        }

        if (this.ariaDescribedBy) {
          ariaValues.push(this.ariaDescribedBy);
        }

        return normalizeAriaAttribute(ariaValues);
      }

      get isLabelHidden() {
        return this.variant === VARIANT.LABEL_HIDDEN;
      }

      get isLabelStacked() {
        return this.variant === VARIANT.LABEL_STACKED;
      }

      get accesskey() {
        return this._accesskey;
      }

      get colorInputElementValue() {
        return this.validity.valid && this.value ? this.value : DEFAULT_COLOR$1;
      }

      get colorInputStyle() {
        return `background: ${this.value || '#5679C0'};`;
      }

      get computedUniqueHelpElementId() {
        return getRealDOMId(this.template.querySelector('[data-help-message]'));
      }

      get computedUniqueToggleElementDescribedById() {
        if (this.isTypeToggle) {
          const toggle = this.template.querySelector('[data-toggle-description]');
          return getRealDOMId(toggle);
        }

        return null;
      }

      get computedUniqueFormLabelId() {
        if (this.isTypeFile) {
          const formLabel = this.template.querySelector('[data-form-label]');
          return getRealDOMId(formLabel);
        }

        return null;
      }

      get computedUniqueFileSelectorLabelId() {
        if (this.isTypeFile) {
          const fileBodyLabel = this.template.querySelector('[data-file-selector-label]');
          return getRealDOMId(fileBodyLabel);
        }

        return null;
      }

      get computedUniqueFileElementLabelledById() {
        if (this.isTypeFile) {
          const labelIds = [this.computedUniqueFormLabelId, this.computedUniqueFileSelectorLabelId];
          return labelIds.join(' ');
        }

        return null;
      }

      get computedFormElementClass() {
        const classes = classSet('slds-form-element__control slds-grow');

        if (this.isTypeSearch) {
          classes.add('slds-input-has-icon slds-input-has-icon_left-right');
        }

        return classes.toString();
      }

      get i18n() {
        return i18n$a;
      }

      get computedLabelClass() {
        const classnames = classSet('slds-form-element__label');

        if (this.isTypeCheckable || this.isTypeFile) ; else if (this.isTypeToggle) {
          classnames.add('slds-m-bottom_none');
        } else {
          classnames.add('slds-no-flex');
        }

        return classnames.add({
          'slds-assistive-text': this.isLabelHidden
        }).toString();
      }

      get computedNumberClass() {
        return classSet('slds-input').add({
          'slds-is-disabled': this.disabled
        }).toString();
      }

      get computedColorLabelClass() {
        return classSet('slds-form-element__label slds-color-picker__summary-label').add({
          'slds-assistive-text': this.isLabelHidden
        }).toString();
      }

      get computedCheckboxClass() {
        return classSet('slds-checkbox').add({
          'slds-checkbox_standalone': !this.isStandardVariant
        }).toString();
      }

      get normalizedMax() {
        return this._normalizeDateTimeString(this.max);
      }

      get normalizedMin() {
        return this._normalizeDateTimeString(this.min);
      }

      get isTypeNumber() {
        return this.type === 'number';
      }

      get isTypeCheckable() {
        return this.isTypeCheckbox || this.isTypeCheckboxButton || this.isTypeRadio || this.isTypeToggle;
      }

      get isTypeSearch() {
        return this.type === 'search';
      }

      get isTypeToggle() {
        return this.type === 'toggle';
      }

      get isTypeText() {
        return this.type === 'text';
      }

      get isTypeCheckbox() {
        return this.type === 'checkbox';
      }

      get isTypeRadio() {
        return this.type === 'radio';
      }

      get isTypeCheckboxButton() {
        return this.type === 'checkbox-button';
      }

      get isTypeFile() {
        return this.type === 'file';
      }

      get isTypeColor() {
        return this.type === 'color';
      }

      get isTypeDate() {
        return this.type === 'date';
      }

      get isTypeDateTime() {
        return this.type === 'datetime' || this.type === 'datetime-local';
      }

      get isTypeTime() {
        return this.type === 'time';
      }

      get isTypeMobileDate() {
        return this.isTypeDate && !this._isDesktopBrowser();
      }

      get isTypeDesktopDate() {
        return this.isTypeDate && this._isDesktopBrowser();
      }

      get isTypeMobileDateTime() {
        return this.isTypeDateTime && !this._isDesktopBrowser();
      }

      get isTypeDesktopDateTime() {
        return this.isTypeDateTime && this._isDesktopBrowser();
      }

      get isTypeMobileTime() {
        return this.isTypeTime && !this._isDesktopBrowser();
      }

      get isTypeDesktopTime() {
        return this.isTypeTime && this._isDesktopBrowser();
      }

      get isTypeSimple() {
        return !this.isTypeCheckbox && !this.isTypeCheckboxButton && !this.isTypeToggle && !this.isTypeRadio && !this.isTypeFile && !this.isTypeColor && !this.isTypeDesktopDate && !this.isTypeDesktopDateTime && !this.isTypeDesktopTime;
      }

      get _inputElement() {
        if (!this._cachedInputElement || this._inputElementRefreshNeeded) {
          this._inputDragonDecorated = false;
          let inputElement;

          if (this.isTypeDesktopDate) {
            inputElement = this.template.querySelector('lightning-datepicker');
          } else if (this.isTypeDesktopDateTime) {
            inputElement = this.template.querySelector('lightning-datetimepicker');
          } else if (this.isTypeDesktopTime) {
            inputElement = this.template.querySelector('lightning-timepicker');
          } else {
            inputElement = this.template.querySelector('input');
            this._inputDragonDecorated = true;
            decorateInputForDragon(inputElement);
          }

          this._inputElementRefreshNeeded = false;
          this._cachedInputElement = inputElement;
        }

        return this._cachedInputElement;
      }

      get _inputTypeForValidity() {
        let inputType = 'text';

        if (this.isTypeSimple) {
          if (this.isTypeNumber) {
            inputType = 'number';
          } else {
            inputType = this.type;
          }
        } else if (this.isTypeCheckable) {
          inputType = this.isTypeRadio ? 'radio' : 'checkbox';
        } else if (this.isTypeFile) {
          inputType = 'file';
        } else if (this.isTypeDateTime) {
          inputType = 'datetime-local';
        } else if (this.isTypeTime) {
          inputType = 'time';
        } else if (this.isTypeDate) {
          inputType = 'date';
        }

        return inputType;
      }

      get _displayedValue() {
        if (this.isTypeNumber) {
          // If the number is not valid (bad input, step mismatch, etc.) show the raw number as
          // well, otherwise the formatted value ends up being 'NaN' which makes it hard to
          // see mistakes
          if (this._showRawNumber || !this.validity.valid) {
            if (hasValidNumberShortcut(this._numberRawValue) && isValidNumber(this._numberRawValue)) {
              this._numberRawValue = fromIsoDecimal(this._value);
            }

            return this._numberRawValue;
          }

          return formatNumber(this._value, this._buildFormatNumberOptions(this.formatter));
        }

        if (this.isTypeMobileDate || this.isTypeMobileDateTime || this.isTypeMobileTime) {
          return this._normalizeDateTimeString(this._value);
        }

        return this._value;
      }

      get _internalType() {
        if (this.isTypeNumber) {
          return 'text';
        }

        return this._type;
      }

      get isStandardVariant() {
        return this.variant === VARIANT.STANDARD || this.variant === VARIANT.LABEL_HIDDEN;
      }

      get _showClearButton() {
        return this.isTypeSearch && isNotUndefinedOrNull(this._value) && this._value !== '';
      }

      get _ignoreRequired() {
        // If uploading via the drop zone or via the input directly, we should
        // ignore the required flag as a file has been uploaded
        return this.isTypeFile && this._required && (this.fileUploadedViaDroppableZone || this._files && this._files.length > 0);
      }

      get _inputMode() {
        if (this.isTypeNumber) {
          return 'decimal';
        }

        return null;
      }

      get _constraint() {
        if (!this._constraintApi) {
          const overrides = {
            badInput: () => {
              if (!this._rendered) {
                return false;
              }

              if (this.isTypeNumber) {
                return !isValidNumber(this._numberRawValue);
              }

              if (!this.isNativeInput) {
                return this._inputElement.hasBadInput();
              }

              return this._inputElement.validity.badInput;
            },
            tooLong: () => // since type=number is type=text in the dom when not in focus
            // we should always return false as maxlength doesn't apply
            this.isNativeInput && !this.isTypeNumber && this._rendered && this._inputElement.validity.tooLong,
            tooShort: () => // since type=number is type=text in the dom when not in focus
            // we should always return false as minlength doesn't apply
            this.isNativeInput && !this.isTypeNumber && this._rendered && this._inputElement.validity.tooShort,
            patternMismatch: () => this.isNativeInput && this._rendered && this._inputElement.validity.patternMismatch
          }; // FF, IE and Safari don't support type datetime-local,
          // IE and Safari don't support type date or time
          // we need to defer to the base component to check rangeOverflow/rangeUnderflow.
          // Due to the custom override, changing the type to or from datetime/time would affect the validation

          if (this.isTypeDesktopDateTime || this.isTypeDesktopTime || this.isTypeDesktopDate) {
            overrides.rangeOverflow = () => {
              // input type='time' is timezone agnostic, so we should remove the timezone designator before comparison
              const max = this.isTypeDesktopTime ? normalizeTime(this.max) : this.max;
              return isAfter(this.value, max);
            };

            overrides.rangeUnderflow = () => {
              // input type='time' is timezone agnostic, so we should remove the timezone designator before comparison
              const min = this.isTypeDesktopTime ? normalizeTime(this.min) : this.min;
              return isBefore(this.value, min);
            };

            overrides.stepMismatch = () => false;
          }

          if (this.isIE11) {
            overrides.stepMismatch = () => false;
          }

          this._constraintApi = new FieldConstraintApiWithProxyInput(() => {
            // The date/time components display their own errors and have custom messages for badInput and rangeOverflow/Underflow.
            if (!this.isNativeInput) {
              return this._inputElement;
            }

            return this;
          }, overrides);
          this._constraintApiProxyInputUpdater = this._constraint.setInputAttributes({
            type: () => this._inputTypeForValidity,
            // We need to normalize value so that it's consumable by the proxy input (otherwise the value
            // will be invalid for the native input)
            value: () => this._normalizeDateTimeString(this.value),
            checked: () => this.checked,
            maxlength: () => this.maxLength,
            minlength: () => this.minLength,
            // 'pattern' depends on type
            pattern: () => this.pattern,
            // 'max' and 'min' depend on type and timezone
            max: () => this.normalizedMax,
            min: () => this.normalizedMin,
            step: () => this.step,
            accept: () => this.accept,
            multiple: () => this.multiple,
            disabled: () => this.disabled,
            readonly: () => this.readOnly,
            // depends on type and whether an upload has been made
            required: () => this.required && !this._ignoreRequired
          });
        }

        return this._constraintApi;
      }

      handleFileClick() {
        this._setInputValue(null);

        this._updateValueAndValidityAttribute(null);
      }

      handleDropFiles(event) {
        // drop doesn't trigger focus nor blur, so set state to interacting
        // and auto leave when there's no more action
        this.interactingState.interacting();
        this.fileUploadedViaDroppableZone = true;
        this._files = event.dataTransfer && event.dataTransfer.files;

        this._updateProxyInputAttributes('required');

        this._dispatchChangeEventWithDetail({
          files: this._files
        });
      }

      handleFocus() {
        this.interactingState.enter();

        if (this.isTypeColor) {
          this._isColorPickerPanelOpen = false;
        }

        if (this._rendered && this.isTypeNumber) {
          this._showRawNumber = true;
          this._inputElement.value = this._displayedValue; // W-6176985: IE11 input when set value, will move cursor to beginning.
          // This fix is only for input type=number on IE11, and force the cursor to the end.

          if (isIE11) {
            const length = this._inputElement.value.length;
            this._inputElement.selectionStart = length;
            this._inputElement.selectionEnd = length;
          }
        }

        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleBlur(event) {
        this.interactingState.leave();

        if (this._rendered && this.isTypeNumber) {
          this._showRawNumber = false;

          this._setInputValue(this._displayedValue);
        }

        if (!event.relatedTarget || !this.template.contains(event.relatedTarget)) {
          this.dispatchEvent(new CustomEvent('blur'));
        }
      }

      handleChange(event) {
        event.stopPropagation();

        this._dispatchCommitEvent();

        if (this.isTypeSimple && this.value === event.target.value) {
          return;
        }

        this._dispatchChangeEvent();
      }

      handleInput(event) {
        event.stopPropagation();

        if (this.isTypeNumber) {
          // for invalid numbers the value might stay the same as the user
          // changed the invalid input, so we need to update the raw value
          this._numberRawValue = this._inputElement.value;
        }

        if (this.isTypeSimple && this.value === event.target.value) {
          return;
        }

        this._dispatchChangeEvent();
      }

      handleKeyDown(event) {
        if (this.isTypeNumber) {
          // we're letting "Shift" through to prevent capital letters, other special symbols for type="number"
          const hasMetaOrCtrlModifier = event.metaKey || event.ctrlKey; // need to check that event.key is valid for "autofill" cases

          if (!hasMetaOrCtrlModifier && !this.readOnly && event.key) {
            const key = normalizeKeyValue(event.key);

            if (key.length === 1 && !isValidNumberCharacter(key)) {
              event.preventDefault();
            }

            if (key === 'ArrowUp') {
              event.preventDefault();

              this._numberStepUpAndDispatchEvents(1);
            } else if (key === 'ArrowDown') {
              event.preventDefault();

              this._numberStepUpAndDispatchEvents(-1);
            }
          }
        }
      }

      handleColorChange(event) {
        const selectedColor = event.detail.color;

        if (selectedColor !== this._inputElement.value) {
          this._setInputValue(selectedColor);

          this._updateValueAndValidityAttribute(selectedColor);

          this.focus();

          this._dispatchChangeEventWithDetail({
            value: selectedColor
          });

          this._dispatchCommitEvent();
        }

        this.template.querySelector('lightning-primitive-colorpicker-button').focus();
      }

      _clearAndSetFocusOnInput(event) {
        // TODO: Discuss this, it seems the wrong thing to do.
        // button is removed from template, but
        // event still is propagated, For example, captured by panel,
        // then cause panel think is clicked outside.
        event.stopPropagation();
        this.interactingState.enter();

        this._setInputValue('');

        this._updateValueAndValidityAttribute('');

        this._inputElement.focus();

        this._dispatchChangeEventWithDetail({
          value: this._value
        });

        this._dispatchCommitEvent();
      }

      _dispatchCommitEvent() {
        this.dispatchEvent(new CustomEvent('commit'));
      }

      _dispatchChangeEventWithDetail(detail) {
        this.dispatchEvent(new CustomEvent('change', {
          composed: true,
          bubbles: true,
          detail
        }));
      }

      _validateType(type) {
        assert(type !== 'hidden', `<lightning-input> The type attribute value "hidden" is invalid. Use a regular <input type="hidden"> instead.`);
        assert(type !== 'submit' && type !== 'reset' && type !== 'image' && type !== 'button', `<lightning-input> The type attribute value "${type}" is invalid. Use <lightning:button> instead.`);

        if (this.isTypeRadio) {
          assert(!this.required, `<lightning-input> The required attribute is not supported on radio inputs directly. It should be implemented at the radio group level.`);
        }
      }

      _validateRequiredAttributes() {
        const {
          label
        } = this;
        assert(typeof label === 'string' && label.length, `<lightning-input> The required label attribute value "${label}" is invalid.`);
      }

      _setInputValue(value) {
        if (this._inputDragonDecorated) {
          // The underlying input has been modified to dispatch an 'input' event when a direct value set
          // is used to allow for Dragon Natural Speaking (which sets the value directly on the inputs instead
          // dispatching an input event against the input). Since we're in a programatic set here (ie. set
          // not resulting from a direct user interaction) we want a default setter behaviour that doesn't
          // dispatch any events.
          setDecoratedDragonInputValueWithoutEvent(this._inputElement, value);
        } else {
          this._inputElement.value = value;
        }
      }

      _dispatchChangeEvent() {
        this.interactingState.enter();
        const detail = {};

        if (this.isTypeCheckable) {
          this._updateCheckedAndValidityAttribute(this._inputElement.checked);

          detail.checked = this._checked;
        } else if (this.isTypeFile) {
          this._files = this._inputElement.files; // LWC does not proxy dom elements any more. So there is no need to call lwc.unwrap here anymore

          detail.files = this._files;

          this._updateProxyInputAttributes('required');
        }

        if (!this.isTypeCheckable) {
          if (this.isTypeNumber) {
            this._numberRawValue = this._inputElement.value;
            detail.value = toIsoDecimal(this._inputElement.value);
          } else {
            detail.value = this._inputElement.value;
          }

          if (this.isTypeMobileDateTime) {
            detail.value = normalizeDateTimeToUTC(detail.value, this.timezone);
          } else if (this.isTypeMobileTime) {
            detail.value = normalizeTime(detail.value);
          }

          this._updateValueAndValidityAttribute(detail.value);
        }

        this._dispatchChangeEventWithDetail(detail);
      }

      _isDesktopBrowser() {
        return formFactor === 'Large';
      }

      _updateValueAndValidityAttribute(value) {
        this._value = value;

        this._updateProxyInputAttributes('value');
      }

      _updateCheckedAndValidityAttribute(value) {
        this._checked = value;

        this._updateProxyInputAttributes('checked');
      }

      _updateProxyInputAttributes(attributes) {
        if (this._constraintApiProxyInputUpdater) {
          this._constraintApiProxyInputUpdater(attributes);
        }
      }

      _updateInputDisplayValueIfTypeNumber() {
        // Displayed value depends on the format number, so if we're not showing the raw
        // number we should update the value
        if (this._rendered && this.isTypeNumber && !this._showRawNumber && this._inputElement) {
          this._setInputValue(this._displayedValue);
        }
      }
      /**
       * Increases (if increment is positive, decreases otherwise) the number value of the input by the increment
       * multiple of the given 'step'. Additionally dispatches the 'change' and 'commit' events.
       *
       * @param {Number} increment A multiple of the step to increase, when step is 'any',
       * the step is assumed to be 1.
       * @private
       */


      _numberStepUpAndDispatchEvents(increment) {
        if (this._readOnly || this._disabled) {
          return;
        }

        this._value = increaseNumberByStep({
          value: this._value,
          step: this.step,
          increment,
          fractionDigits: this._buildFormatNumberOptions(this.formatter).minimumFractionDigits
        }); // Raw value is the value the user entered (we preserve a user's input),
        // since we're generating a new value we're overriding it

        this._numberRawValue = fromIsoDecimal(this._value);

        this._setInputValue(this._displayedValue);

        this._dispatchChangeEvent();

        this._dispatchCommitEvent();
      }

      _updateClassList() {
        classListMutation(this.classList, {
          'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
          'slds-form-element_horizontal': this.variant === VARIANT.LABEL_INLINE
        });
      }

      _updateNumberValue(value) {
        const newValue = normalizeNumber(value);
        this._value = newValue;
        this._numberRawValue = fromIsoDecimal(newValue);
      }

      _buildFormatNumberOptions(formatter) {
        const options = {
          style: formatter
        }; // Use the min/max fraction digits from the formatFractionDigits provided by the user if available.
        // Otherwise, use the number of digits calculated from step

        if (this._formatFractionDigits !== undefined) {
          options.minimumFractionDigits = this._formatFractionDigits;
          options.maximumFractionDigits = this._formatFractionDigits;
        } else {
          let digitsFromStep = calculateFractionDigitsFromStep(this._step); // if formatting percentages, when calculating digits from step, take into
          // consideration that the formatted number is effectively multiplied by 10^2, ie. 0.1 is 10%
          // so we need to subtract 2 digits;

          if (formatter === 'percent' && typeof digitsFromStep === 'number') {
            digitsFromStep -= 2;

            if (digitsFromStep < 0) {
              digitsFromStep = 0;
            }
          }

          options.minimumFractionDigits = digitsFromStep;
          options.maximumFractionDigits = digitsFromStep;
        }

        return options;
      }

      _normalizeDateTimeString(value) {
        let result = value;

        if (this.isTypeDate) {
          result = normalizeDate(value);
        } else if (this.isTypeTime) {
          result = normalizeTime(value);
        } else if (this.isTypeDateTime) {
          result = normalizeUTCDateTime(value, this.timezone);
        }

        return result;
      }

      _synchronizeA11y() {
        const input = this.template.querySelector('input');
        const datepicker = this.template.querySelector('lightning-datepicker');
        const timepicker = this.template.querySelector('lightning-timepicker');

        if (input) {
          synchronizeAttrs(input, {
            [ARIA_LABELEDBY]: this.computedAriaLabelledBy,
            [ARIA_DESCRIBEDBY$4]: this.computedAriaDescribedBy,
            [ARIA_CONTROLS$3]: this.computedAriaControls,
            [ARIA_LABEL$2]: this.computedAriaLabel
          });
        } else if (datepicker) {
          synchronizeAttrs(datepicker, {
            ariaLabelledByElement: this.ariaLabelledBy,
            ariaDescribedByElements: this.ariaDescribedBy,
            ariaControlsElement: this.ariaControls,
            [ARIA_LABEL$2]: this.computedAriaLabel
          });
        } else if (timepicker) {
          synchronizeAttrs(timepicker, {
            ariaLabelledByElement: this.ariaLabelledBy,
            ariaDescribedByElements: this.ariaDescribedBy,
            ariaControlsElement: this.ariaControls,
            [ARIA_LABEL$2]: this.computedAriaLabel
          });
        }
      }

    }

    LightningInput.delegatesFocus = true;

    lwc.registerDecorators(LightningInput, {
      publicProps: {
        placeholder: {
          config: 0
        },
        name: {
          config: 0
        },
        label: {
          config: 0
        },
        messageWhenBadInput: {
          config: 0
        },
        messageWhenPatternMismatch: {
          config: 0
        },
        messageWhenRangeOverflow: {
          config: 0
        },
        messageWhenRangeUnderflow: {
          config: 0
        },
        messageWhenStepMismatch: {
          config: 0
        },
        messageWhenTooShort: {
          config: 0
        },
        messageWhenTooLong: {
          config: 0
        },
        messageWhenTypeMismatch: {
          config: 0
        },
        messageWhenValueMissing: {
          config: 0
        },
        messageToggleActive: {
          config: 0
        },
        messageToggleInactive: {
          config: 0
        },
        ariaLabel: {
          config: 0
        },
        autocomplete: {
          config: 0
        },
        dateStyle: {
          config: 0
        },
        timeStyle: {
          config: 0
        },
        dateAriaLabel: {
          config: 0
        },
        formatFractionDigits: {
          config: 3
        },
        timeAriaControls: {
          config: 3
        },
        dateAriaLabelledBy: {
          config: 3
        },
        timeAriaLabelledBy: {
          config: 3
        },
        timeAriaDescribedBy: {
          config: 3
        },
        dateAriaControls: {
          config: 3
        },
        dateAriaDescribedBy: {
          config: 3
        },
        ariaControls: {
          config: 3
        },
        ariaLabelledBy: {
          config: 3
        },
        ariaDescribedBy: {
          config: 3
        },
        formatter: {
          config: 3
        },
        type: {
          config: 3
        },
        isLoading: {
          config: 3
        },
        pattern: {
          config: 3
        },
        maxLength: {
          config: 3
        },
        accept: {
          config: 3
        },
        minLength: {
          config: 3
        },
        max: {
          config: 3
        },
        min: {
          config: 3
        },
        step: {
          config: 3
        },
        checked: {
          config: 3
        },
        multiple: {
          config: 3
        },
        value: {
          config: 3
        },
        variant: {
          config: 3
        },
        disabled: {
          config: 3
        },
        readOnly: {
          config: 3
        },
        required: {
          config: 3
        },
        timezone: {
          config: 3
        },
        fieldLevelHelp: {
          config: 3
        },
        accessKey: {
          config: 3
        },
        files: {
          config: 1
        },
        validity: {
          config: 1
        }
      },
      publicMethods: ["checkValidity", "setCustomValidity", "reportValidity", "showHelpMessageIfInvalid", "focus", "blur"],
      track: {
        _timeAriaDescribedBy: 1,
        _timeAriaLabelledBy: 1,
        _timeAriaControls: 1,
        _dateAriaControls: 1,
        _dateAriaDescribedBy: 1,
        _dateAriaLabelledBy: 1,
        _value: 1,
        _type: 1,
        _pattern: 1,
        _max: 1,
        _min: 1,
        _step: 1,
        _disabled: 1,
        _readOnly: 1,
        _required: 1,
        _checked: 1,
        _isLoading: 1,
        _multiple: 1,
        _timezone: 1,
        _helpMessage: 1,
        _isColorPickerPanelOpen: 1,
        _fieldLevelHelp: 1,
        _accesskey: 1,
        _maxLength: 1,
        _minLength: 1,
        _accept: 1,
        _variant: 1,
        _numberRawValue: 1
      },
      fields: ["_formatter", "_showRawNumber", "_initialValueSet", "_files", "_rendered"]
    });

    var _lightningInput = lwc.registerComponent(LightningInput, {
      tmpl: _tmpl$l
    });
    LightningInput.interopMap = {
      exposeNativeEvent: {
        change: true,
        focus: true,
        blur: true
      }
    };

    function stylesheet$5(hostSelector, shadowSelector, nativeShadow) {
      return "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {.slds-slot" + shadowSelector + " {display: flex;}\n}";
    }
    var _implicitStylesheets$5 = [stylesheet$5];

    function tmpl$n($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot
      } = $api;
      return [api_slot("", {
        classMap: {
          "slds-slot": true
        },
        key: 0
      }, [], $slotset)];
    }

    var _tmpl$m = lwc.registerTemplate(tmpl$n);
    tmpl$n.slots = [""];
    tmpl$n.stylesheets = [];

    if (_implicitStylesheets$5) {
      tmpl$n.stylesheets.push.apply(tmpl$n.stylesheets, _implicitStylesheets$5);
    }
    tmpl$n.stylesheetTokens = {
      hostAttribute: "lightning-layout_layout-host",
      shadowAttribute: "lightning-layout_layout"
    };

    const HALIN_CLASS = {
      center: 'slds-grid_align-center',
      space: 'slds-grid_align-space',
      spread: 'slds-grid_align-spread',
      end: 'slds-grid_align-end'
    };
    const VALIN_CLASS = {
      start: 'slds-grid_vertical-align-start',
      center: 'slds-grid_vertical-align-center',
      end: 'slds-grid_vertical-align-end',
      stretch: 'slds-grid_vertical-stretch'
    };
    const BOUNDARY_CLASS = {
      small: 'slds-grid_pull-padded',
      medium: 'slds-grid_pull-padded-medium',
      large: 'slds-grid_pull-padded-large'
    };
    const VERTICAL_ALIGN = Object.keys(VALIN_CLASS);
    const BOUNDARY = Object.keys(BOUNDARY_CLASS);
    const HORIZONTAL_ALIGN = Object.keys(HALIN_CLASS);
    const ROWS_CLASS = 'slds-wrap';
    const GRID_CLASS = 'slds-grid';
    function normalizeParam(value, valid, fallback) {
      value = value ? value.toLowerCase() : ' ';
      return normalizeString(value, {
        fallbackValue: fallback || ' ',
        validValues: valid || []
      });
    }
    function computeLayoutClass(hAlign, vAlign, boundary, multiRows) {
      const computedClass = classSet(GRID_CLASS);

      if (hAlign !== ' ' && HALIN_CLASS[hAlign]) {
        computedClass.add(HALIN_CLASS[hAlign]);
      }

      if (vAlign !== ' ' && VALIN_CLASS[vAlign]) {
        computedClass.add(VALIN_CLASS[vAlign]);
      }

      if (boundary !== ' ' && BOUNDARY_CLASS[boundary]) {
        computedClass.add(BOUNDARY_CLASS[boundary]);
      }

      if (multiRows) {
        computedClass.add(ROWS_CLASS);
      }

      return computedClass;
    }

    /**
     * Represents a responsive grid system for arranging containers on a page.
     */

    class LightningLayout extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._horizontalAlign = void 0;
        this._verticalAlign = void 0;
        this._pullToBoundary = void 0;
        this._multipleRows = void 0;
        this._layoutClass = [];
      }

      /**
       * Determines how to spread the layout items horizontally.
       * The alignment options are center, space, spread, and end.
       * @type {string}
       * @default
       */
      get horizontalAlign() {
        return this._horizontalAlign;
      }

      set horizontalAlign(value) {
        this._horizontalAlign = normalizeParam(value, HORIZONTAL_ALIGN);
        this.updateClassList();
      }

      /**
       * Determines how to align the layout items vertically in the container.
       * The alignment options are start, center, end, and stretch.
       * @type {string}
       * @default
       */
      get verticalAlign() {
        return this._verticalAlign;
      }

      set verticalAlign(value) {
        this._verticalAlign = normalizeParam(value, VERTICAL_ALIGN);
        this.updateClassList();
      }

      /**
       * Pulls layout items to the layout boundaries and corresponds
       * to the padding size on the layout item. Possible values are small, medium, or large.
       * @type {string}
       * @default
       *
       */
      get pullToBoundary() {
        return this._pullToBoundary;
      }

      set pullToBoundary(value) {
        this._pullToBoundary = normalizeParam(value, BOUNDARY);
        this.updateClassList();
      }

      /**
       * If present, layout items wrap to the following line when they exceed the layout width.
       * @type {boolean}
       * @default false
       */
      get multipleRows() {
        return this._multipleRows || false;
      }

      set multipleRows(value) {
        this._multipleRows = normalizeBoolean(value);
        this.updateClassList();
      }

      connectedCallback() {
        this.updateClassList();
      }

      updateClassList() {
        this.classList.remove(...this._layoutClass);
        const config = computeLayoutClass(this.horizontalAlign, this.verticalAlign, this.pullToBoundary, this.multipleRows);
        this._layoutClass = Object.keys(config);
        this.classList.add(...this._layoutClass);
      }

    }

    lwc.registerDecorators(LightningLayout, {
      publicProps: {
        horizontalAlign: {
          config: 3
        },
        verticalAlign: {
          config: 3
        },
        pullToBoundary: {
          config: 3
        },
        multipleRows: {
          config: 3
        }
      },
      track: {
        _horizontalAlign: 1,
        _verticalAlign: 1,
        _pullToBoundary: 1,
        _multipleRows: 1
      },
      fields: ["_layoutClass"]
    });

    var _lightningLayout = lwc.registerComponent(LightningLayout, {
      tmpl: _tmpl$m
    });

    function tmpl$o($api, $cmp, $slotset, $ctx) {
      const {
        s: api_slot
      } = $api;
      return [api_slot("", {
        key: 0
      }, [], $slotset)];
    }

    var _tmpl$n = lwc.registerTemplate(tmpl$o);
    tmpl$o.slots = [""];
    tmpl$o.stylesheets = [];
    tmpl$o.stylesheetTokens = {
      hostAttribute: "lightning-layoutItem_layoutItem-host",
      shadowAttribute: "lightning-layoutItem_layoutItem"
    };

    const SIZE_MIN = 1;
    const SIZE_MAX = 12;
    const DEFAULT_LAYOUT_SIZE = {
      default: null,
      small: null,
      medium: null,
      large: null
    };
    const PADDING = ['horizontal-small', 'horizontal-medium', 'horizontal-large', 'around-small', 'around-medium', 'around-large'];
    const PADDING_CLASS = {
      'slds-p-right_small': 'horizontal-small',
      'slds-p-left_small': 'horizontal-small',
      'slds-p-right_medium': 'horizontal-medium',
      'slds-p-left_medium': 'horizontal-medium',
      'slds-p-right_large': 'horizontal-large',
      'slds-p-left_large': 'horizontal-large',
      'slds-p-around_small': 'around-small',
      'slds-p-around_medium': 'around-medium',
      'slds-p-around_large': 'around-large'
    };
    const FLEXIBILITY = ['auto', 'shrink', 'no-shrink', 'grow', 'no-grow', 'no-flex'];
    const FLEX_CLASS = {
      'slds-col': 'auto',
      'slds-grow': 'grow',
      'slds-shrink': 'shrink',
      'slds-grow-none': 'no-grow',
      'slds-shrink-none': 'no-shrink',
      'slds-no-flex': 'no-flex'
    };
    const SIZE_CLASS = {
      default: 'slds-size_',
      small: 'slds-small-size_',
      medium: 'slds-medium-size_',
      large: 'slds-large-size_'
    };
    const DIRECTION = ['left', 'top', 'right', 'bottom'];
    const STYLE_ERROR = {
      FLEX_CONFLICT: 'You cannot have `flexibility` value to be set to `auto` and `no-flex` together for <lightning-layout-item> component',
      SIZE_RANGE: 'Invalid `size` attribute for <lightning-layout-item> component. The `size` attribute should be an integer between 1 and 12',
      SMALL_SIZE_RANGE: 'Invalid `smallDeviceSize` attribute for <lightning-layout-item> component. The `smallDeviceSize` attribute should be an integer between 1 and 12',
      MEDIUM_SIZE_RANGE: 'Invalid `mediumDeviceSize` attribute for <lightning-layout-item> component. The `mediumDeviceSize` attribute should be an integer between 1 and 12',
      LARGE_SIZE_RANGE: 'Invalid `largeDeviceSize` attribute for <lightning-layout-item> component. The `largeDeviceSize` attribute should be an integer between 1 and 12',
      SIZE_REQUIRED: 'You cannot have device specific size attributes for <lightning-layout-item> component without specifying the `size` attribute'
    };

    function hasConflict(value) {
      return value.some(item => item === 'auto') && value.some(item => item === 'no-flex');
    }

    function toArray(value) {
      if (Array.isArray(value)) {
        return value;
      } else if (typeof value === 'string') {
        value = value.split(',');
        return value.map(item => item.trim());
      }

      return [value];
    }

    function normalizeDirection$1(value, fallback) {
      value = value ? value.toLowerCase() : ' ';
      return normalizeString(value, {
        fallbackValue: fallback || '',
        validValues: DIRECTION
      });
    }
    function normalizePadding(value) {
      value = value ? value.toLowerCase() : ' ';
      return normalizeString(value, {
        fallbackValue: ' ',
        validValues: PADDING
      });
    }
    function normalizeFlexibility(value) {
      value = toArray(value);

      if (hasConflict(value)) {
        throw new Error(STYLE_ERROR.FLEX_CONFLICT);
      }

      return value.filter(item => FLEXIBILITY.some(allowed => item === allowed));
    }
    function normalizeSize(value) {
      if (value != null) {
        const size = parseFloat(value);
        return isNaN(size) ? null : Math.round(size);
      }

      return value;
    }

    function computePaddingClass(padding, computedClass) {
      computedClass = computedClass || classSet();
      padding = padding || ' ';
      Object.keys(PADDING_CLASS).forEach(key => {
        if (PADDING_CLASS[key].toLowerCase() === padding) {
          computedClass.add(key);
        }
      });
      return computedClass;
    }

    function computeFlexibilityClass(flexibility, computedClass) {
      computedClass = computedClass || classSet();
      flexibility = flexibility || [];
      Object.keys(FLEX_CLASS).forEach(key => {
        if (flexibility.some(flex => flex === FLEX_CLASS[key])) {
          computedClass.add(key);
        }
      });
      return computedClass;
    }

    function computeSizeClass(layoutSize, computedClass) {
      computedClass = computedClass || classSet();
      layoutSize = layoutSize || DEFAULT_LAYOUT_SIZE;
      Object.keys(SIZE_CLASS).forEach(key => {
        const size = layoutSize[key];

        if (size != null && size !== 0) {
          computedClass.add(`${SIZE_CLASS[key]}${size}-of-12`);
        }
      });
      return computedClass;
    }

    function computeBumpClass(direction, computedClass) {
      computedClass = computedClass || classSet();
      direction = direction || '';

      if (direction !== '') {
        computedClass.add(`slds-col_bump-${direction}`);
      }

      return computedClass;
    }

    function computeLayoutClass$1(layoutSize, flexibility, padding, bump) {
      const computedClass = computePaddingClass(padding);
      computeFlexibilityClass(flexibility, computedClass);
      computeSizeClass(layoutSize, computedClass);
      computeBumpClass(bump, computedClass);
      return computedClass;
    }
    function validateSize(size, smallDeviceSize, mediumDeviceSize, largeDeviceSize) {
      if (size != null && !(SIZE_MIN <= size && size <= SIZE_MAX)) {
        throw new Error(STYLE_ERROR.SIZE_RANGE);
      }

      if (smallDeviceSize != null && !(SIZE_MIN <= smallDeviceSize && smallDeviceSize <= SIZE_MAX)) {
        throw new Error(STYLE_ERROR.SMALL_SIZE_RANGE);
      }

      if (mediumDeviceSize != null && !(SIZE_MIN <= mediumDeviceSize && mediumDeviceSize <= SIZE_MAX)) {
        throw new Error(STYLE_ERROR.MEDIUM_SIZE_RANGE);
      }

      if (largeDeviceSize && !(SIZE_MIN <= largeDeviceSize && largeDeviceSize <= SIZE_MAX)) {
        throw new Error(STYLE_ERROR.LARGE_SIZE_RANGE);
      }

      if (size == null && (smallDeviceSize != null || mediumDeviceSize != null || largeDeviceSize != null)) {
        throw new Error(STYLE_ERROR.SIZE_REQUIRED);
      }

      return true;
    }

    /**
     * The basic element in a lightning-layout component.
     * A layout item groups information together to define visual grids, spacing, and sections.
     * @slot default Placeholder for your content in lightning-layout-item.
     */

    class LightningLayoutItem extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._flexibility = void 0;
        this._alignmentBump = void 0;
        this._padding = void 0;
        this._size = void 0;
        this._smallDeviceSize = void 0;
        this._mediumDeviceSize = void 0;
        this._largeDeviceSize = void 0;
        this._layoutClass = [];
      }

      /**
       * Make the item fluid so that it absorbs any extra space in its
       * container or shrinks when there is less space. Allowed values are:
       * auto (columns grow or shrink equally as space allows),
       * shrink (columns shrink equally as space decreases),
       * no-shrink (columns don't shrink as space reduces),
       * grow (columns grow equally as space increases),
       * no-grow (columns don't grow as space increases),
       * no-flex (columns don't grow or shrink as space changes).
       * Use a comma-separated value for multiple options, such as 'auto, no-shrink'.
       * @type {object}
       */
      get flexibility() {
        return this._flexibility;
      }

      set flexibility(value) {
        this._flexibility = normalizeFlexibility(value);
        this.updateClassList();
      }

      /**
       * Specifies a direction to bump the alignment of adjacent layout items. Allowed values are left, top, right, bottom.
       * @type {string}
       */
      get alignmentBump() {
        return this._alignmentBump;
      }

      set alignmentBump(value) {
        this._alignmentBump = normalizeDirection$1(value);
        this.updateClassList();
      }

      /**
       * Sets padding to either the right and left sides of a container,
       * or all sides of a container. Allowed values are horizontal-small,
       * horizontal-medium, horizontal-large, around-small, around-medium, around-large.
       * @type {string}
       */
      get padding() {
        return this._padding;
      }

      set padding(value) {
        this._padding = normalizePadding(value);
        this.updateClassList();
      }

      /**
       * If the viewport is divided into 12 parts, size indicates the
       * relative space the container occupies. Size is expressed as
       * an integer from 1 through 12. This applies for all device-types.
       * @type {number}
       */
      get size() {
        return this._size;
      }

      set size(value) {
        this._size = normalizeSize(value);
        this.validateSize();
        this.updateClassList();
      }

      /**
       * If the viewport is divided into 12 parts, this attribute indicates
       * the relative space the container occupies on device-types larger than
       * mobile. It is expressed as an integer from 1 through 12.
       * @type {number}
       */
      get smallDeviceSize() {
        return this._smallDeviceSize;
      }

      set smallDeviceSize(value) {
        this._smallDeviceSize = normalizeSize(value);
        this.validateSize();
        this.updateClassList();
      }

      /**
       * If the viewport is divided into 12 parts, this attribute indicates
       * the relative space the container occupies on device-types larger than
       * tablet. It is expressed as an integer from 1 through 12.
       * @type {number}
       */
      get mediumDeviceSize() {
        return this._mediumDeviceSize;
      }

      set mediumDeviceSize(value) {
        this._mediumDeviceSize = normalizeSize(value);
        this.validateSize();
      }

      /**
       * If the viewport is divided into 12 parts, this attribute indicates
       * the relative space the container occupies on device-types larger than
       * desktop. It is expressed as an integer from 1 through 12.
       * @type {number}
       */
      get largeDeviceSize() {
        return this._largeDeviceSize;
      }

      set largeDeviceSize(value) {
        this._largeDeviceSize = normalizeSize(value);
        this.validateSize();
        this.updateClassList();
      }

      connectedCallback() {
        this.updateClassList();
      }

      updateClassList() {
        this.classList.remove(...this._layoutClass);
        const config = computeLayoutClass$1({
          default: this.size,
          small: this.smallDeviceSize,
          medium: this.mediumDeviceSize,
          large: this.largeDeviceSize
        }, this.flexibility, this.padding, this.alignmentBump);
        this._layoutClass = Object.keys(config);
        this.classList.add(...this._layoutClass);
      }

      validateSize() {
        validateSize(this.size, this.smallDeviceSize, this.mediumDeviceSize, this.largeDeviceSize);
      }

    }

    lwc.registerDecorators(LightningLayoutItem, {
      publicProps: {
        flexibility: {
          config: 3
        },
        alignmentBump: {
          config: 3
        },
        padding: {
          config: 3
        },
        size: {
          config: 3
        },
        smallDeviceSize: {
          config: 3
        },
        mediumDeviceSize: {
          config: 3
        },
        largeDeviceSize: {
          config: 3
        }
      },
      track: {
        _flexibility: 1,
        _alignmentBump: 1,
        _padding: 1,
        _size: 1,
        _smallDeviceSize: 1,
        _mediumDeviceSize: 1,
        _largeDeviceSize: 1
      },
      fields: ["_layoutClass"]
    });

    var _lightningLayoutItem = lwc.registerComponent(LightningLayoutItem, {
      tmpl: _tmpl$n
    });

    function tmpl$p($api, $cmp, $slotset, $ctx) {
      const {
        b: api_bind,
        h: api_element,
        d: api_dynamic,
        c: api_custom_element
      } = $api;
      const {
        _m0
      } = $ctx;
      return [$cmp._src ? api_element("img", {
        attrs: {
          "src": $cmp._src,
          "alt": $cmp.alternativeText,
          "title": $cmp.alternativeText
        },
        key: 0,
        on: {
          "error": _m0 || ($ctx._m0 = api_bind($cmp.handleImageError))
        }
      }, []) : null, $cmp.showInitials ? api_element("abbr", {
        className: $cmp.computedInitialsClass,
        attrs: {
          "title": $cmp.alternativeText
        },
        key: 1
      }, [api_dynamic($cmp.initials)]) : null, $cmp.showIcon ? api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "iconName": $cmp.fallbackIconName,
          "alternativeText": $cmp.alternativeText,
          "title": $cmp.alternativeText
        },
        key: 2
      }, []) : null];
    }

    var _tmpl$o = lwc.registerTemplate(tmpl$p);
    tmpl$p.stylesheets = [];
    tmpl$p.stylesheetTokens = {
      hostAttribute: "lightning-avatar_avatar-host",
      shadowAttribute: "lightning-avatar_avatar"
    };

    const DEFAULT_SIZE$1 = 'medium';
    const DEFAULT_VARIANT$1 = 'square';
    /**
     * A visual representation of an object.
     */

    class LightningAvatar extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.alternativeText = '';
        this.fallbackIconName = void 0;
        this.initials = void 0;
        this._size = DEFAULT_SIZE$1;
        this._src = '';
        this._variant = DEFAULT_VARIANT$1;
      }

      /**
       * The size of the avatar. Valid values are x-small, small, medium, and large. This value defaults to medium.
       *
       * @type {string}
       * @default medium
       */
      get size() {
        return this._size;
      }

      set size(value) {
        this._size = normalizeString(value, {
          fallbackValue: DEFAULT_SIZE$1,
          validValues: ['x-small', 'small', 'medium', 'large']
        });
        this.updateClassList();
      }
      /**
       * The URL for the image.
       *
       * @type {string}
       * @required
       */


      get src() {
        return this._src;
      }

      set src(value) {
        this._src = typeof value === 'string' && value.trim() || '';
      }
      /**
       * The variant changes the shape of the avatar. Valid values are empty,
       * circle, and square. This value defaults to square.
       *
       * @type {string}
       * @default square
       */


      get variant() {
        return this._variant;
      }

      set variant(value) {
        this._variant = normalizeString(value, {
          fallbackValue: DEFAULT_VARIANT$1,
          validValues: ['circle', 'square']
        });
        this.updateClassList();
      }

      connectedCallback() {
        this.updateClassList();
      } // update custom element's classList


      updateClassList() {
        const size = this._size;
        const variant = this._variant;
        const classes = classSet('slds-avatar').add({
          'slds-avatar_x-small': size === 'x-small',
          'slds-avatar_small': size === 'small',
          'slds-avatar_medium': size === 'medium',
          'slds-avatar_large': size === 'large'
        }).add({
          'slds-avatar_circle': variant === 'circle'
        });
        classListMutation(this.classList, classes);
      }

      get computedInitialsClass() {
        return classSet('slds-avatar__initials').add(computeSldsClass(this.fallbackIconName)).toString();
      }

      get showInitials() {
        return !this._src && this.initials;
      }

      get showIcon() {
        return !this._src && !this.initials;
      }

      handleImageError(event) {
        // eslint-disable-next-line no-console
        console.warn(`<lightning-avatar> Image with src="${event.target.src}" failed to load.`);
        this._src = '';
      }

    }

    lwc.registerDecorators(LightningAvatar, {
      publicProps: {
        alternativeText: {
          config: 0
        },
        fallbackIconName: {
          config: 0
        },
        initials: {
          config: 0
        },
        size: {
          config: 3
        },
        src: {
          config: 3
        },
        variant: {
          config: 3
        }
      },
      track: {
        _size: 1,
        _src: 1,
        _variant: 1
      }
    });

    var _lightningAvatar = lwc.registerComponent(LightningAvatar, {
      tmpl: _tmpl$o
    });

    function tmpl$q($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        h: api_element,
        t: api_text
      } = $api;
      return [api_custom_element("lightning-card", _lightningCard, {
        props: {
          "title": "Creative Team",
          "variant": "base"
        },
        key: 46
      }, [api_element("div", {
        attrs: {
          "slot": "actions"
        },
        key: 1
      }, [api_custom_element("lightning-button", _lightningButton, {
        props: {
          "variant": "neutral",
          "label": "Add Member"
        },
        key: 0
      }, [])]), api_element("div", {
        attrs: {
          "slot": "footer"
        },
        key: 3
      }, [api_element("a", {
        classMap: {
          "slds-text-link": true
        },
        attrs: {
          "target": "_blank",
          "href": ""
        },
        key: 2
      }, [api_text("View More")])]), api_element("div", {
        classMap: {
          "slds-card__body_inner": true
        },
        key: 45
      }, [api_custom_element("lightning-input", _lightningInput, {
        classMap: {
          "slds-m-bottom_small": true
        },
        props: {
          "label": "Input label",
          "placeholder": "Search People...",
          "type": "text",
          "variant": "label-hidden"
        },
        key: 4
      }, []), api_element("ul", {
        classMap: {
          "slds-list_vertical-space-medium": true
        },
        key: 44
      }, [api_element("li", {
        classMap: {
          "slds-item": true
        },
        key: 17
      }, [api_custom_element("lightning-layout", _lightningLayout, {
        props: {
          "horizontalAlign": "spread"
        },
        key: 16
      }, [api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        key: 13
      }, [api_element("div", {
        classMap: {
          "slds-media": true
        },
        key: 12
      }, [api_element("div", {
        classMap: {
          "slds-media__figure": true
        },
        key: 6
      }, [api_custom_element("lightning-avatar", _lightningAvatar, {
        props: {
          "alternativeText": "",
          "size": "large",
          "src": "",
          "variant": "circle"
        },
        key: 5
      }, [])]), api_element("div", {
        classMap: {
          "slds-media__body": true
        },
        key: 10
      }, [api_element("a", {
        classMap: {
          "slds-text-link": true
        },
        attrs: {
          "target": "_blank",
          "href": ""
        },
        key: 7
      }, [api_text("Tim Barr")]), api_element("div", {
        styleMap: {
          "color": "rgb(81, 79, 77)",
          "fontSize": "13px"
        },
        key: 9
      }, [api_element("p", {
        key: 8
      }, [api_text("ABC Agency")])])]), api_element("div", {
        classMap: {
          "slds-media__figure": true,
          "slds-media__figure_reverse": true
        },
        key: 11
      }, [])])]), api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        key: 15
      }, [api_element("div", {
        classMap: {
          "slds-text-title": true,
          "slds-text-color_default": true
        },
        key: 14
      }, [api_text("Owner")])])])]), api_element("li", {
        classMap: {
          "slds-item": true
        },
        key: 30
      }, [api_custom_element("lightning-layout", _lightningLayout, {
        props: {
          "horizontalAlign": "spread"
        },
        key: 29
      }, [api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        key: 26
      }, [api_element("div", {
        classMap: {
          "slds-media": true
        },
        key: 25
      }, [api_element("div", {
        classMap: {
          "slds-media__figure": true
        },
        key: 19
      }, [api_custom_element("lightning-avatar", _lightningAvatar, {
        props: {
          "alternativeText": "",
          "size": "large",
          "src": "",
          "variant": "circle"
        },
        key: 18
      }, [])]), api_element("div", {
        classMap: {
          "slds-media__body": true
        },
        key: 23
      }, [api_element("a", {
        classMap: {
          "slds-text-link": true
        },
        attrs: {
          "target": "_blank",
          "href": ""
        },
        key: 20
      }, [api_text("Jane Grey")]), api_element("div", {
        styleMap: {
          "color": "rgb(81, 79, 77)",
          "fontSize": "13px"
        },
        key: 22
      }, [api_element("p", {
        key: 21
      }, [api_text("AMEX")])])]), api_element("div", {
        classMap: {
          "slds-media__figure": true,
          "slds-media__figure_reverse": true
        },
        key: 24
      }, [])])]), api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        key: 28
      }, [api_element("div", {
        classMap: {
          "slds-text-title": true,
          "slds-text-color_default": true
        },
        key: 27
      }, [api_text("Owner")])])])]), api_element("li", {
        classMap: {
          "slds-item": true
        },
        key: 43
      }, [api_custom_element("lightning-layout", _lightningLayout, {
        props: {
          "horizontalAlign": "spread"
        },
        key: 42
      }, [api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        key: 39
      }, [api_element("div", {
        classMap: {
          "slds-media": true
        },
        key: 38
      }, [api_element("div", {
        classMap: {
          "slds-media__figure": true
        },
        key: 32
      }, [api_custom_element("lightning-avatar", _lightningAvatar, {
        props: {
          "alternativeText": "",
          "size": "large",
          "src": "",
          "variant": "circle"
        },
        key: 31
      }, [])]), api_element("div", {
        classMap: {
          "slds-media__body": true
        },
        key: 36
      }, [api_element("a", {
        classMap: {
          "slds-text-link": true
        },
        attrs: {
          "target": "_blank",
          "href": ""
        },
        key: 33
      }, [api_text("John Mcgee")]), api_element("div", {
        styleMap: {
          "color": "rgb(81, 79, 77)",
          "fontSize": "13px"
        },
        key: 35
      }, [api_element("p", {
        key: 34
      }, [api_text("AMEX")])])]), api_element("div", {
        classMap: {
          "slds-media__figure": true,
          "slds-media__figure_reverse": true
        },
        key: 37
      }, [])])]), api_custom_element("lightning-layout-item", _lightningLayoutItem, {
        key: 41
      }, [api_element("div", {
        classMap: {
          "slds-text-title": true,
          "slds-text-color_default": true
        },
        key: 40
      }, [api_text("Owner")])])])])])])])];
    }

    var _tmpl$p = lwc.registerTemplate(tmpl$q);
    tmpl$q.stylesheets = [];
    tmpl$q.stylesheetTokens = {
      hostAttribute: "lwc-agencyPeoples_agencyPeoples-host",
      shadowAttribute: "lwc-agencyPeoples_agencyPeoples"
    };

    class AgencyPeoples extends lwc.LightningElement {}

    var agencyPeoples = lwc.registerComponent(AgencyPeoples, {
      tmpl: _tmpl$p
    });

    return agencyPeoples;

});
