Webruntime.define('lwc/emailPreview', ['lwc', 'lightning/configProvider'], function (lwc, configProvider) { 'use strict';

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return ".padded" + shadowSelector + " {margin: 15px;}\n.bordered" + shadowSelector + " {border: 1px solid #666;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
      return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}\n";
    }
    var _implicitStylesheets$1 = [stylesheet$1];

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

    if (_implicitStylesheets$1) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets$1);
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
    function normalizeArray(value) {
      if (Array.isArray(value)) {
        return value;
      }

      return [];
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

    function stylesheet$2(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: block;}") : (hostSelector + " {display: block;}")) + "\n";
    }
    var _implicitStylesheets$2 = [stylesheet$2];

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

    function stylesheet$3(hostSelector, shadowSelector, nativeShadow) {
      return ".slds-inline-logo" + shadowSelector + " {height: 1rem;margin-top: 1rem;margin-bottom: 1rem;}\n";
    }
    var _implicitStylesheets$3 = [stylesheet$3];

    function tmpl$7($api, $cmp, $slotset, $ctx) {
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

    var _tmpl$8 = lwc.registerTemplate(tmpl$7);
    tmpl$7.stylesheets = [];
    tmpl$7.stylesheetTokens = {
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
      tmpl: _tmpl$8
    });

    function tmpl$8($api, $cmp, $slotset, $ctx) {
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

    var card = lwc.registerTemplate(tmpl$8);
    tmpl$8.stylesheets = [];
    tmpl$8.stylesheetTokens = {
      hostAttribute: "lightning-baseComboboxItem_card-host",
      shadowAttribute: "lightning-baseComboboxItem_card"
    };

    function tmpl$9($api, $cmp, $slotset, $ctx) {
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

    var inline = lwc.registerTemplate(tmpl$9);
    tmpl$9.stylesheets = [];
    tmpl$9.stylesheetTokens = {
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

    function tmpl$a($api, $cmp, $slotset, $ctx) {
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

    var _tmpl$9 = lwc.registerTemplate(tmpl$a);
    tmpl$a.stylesheets = [];

    if (_implicitStylesheets$3) {
      tmpl$a.stylesheets.push.apply(tmpl$a.stylesheets, _implicitStylesheets$3);
    }
    tmpl$a.stylesheetTokens = {
      hostAttribute: "lightning-baseCombobox_baseCombobox-host",
      shadowAttribute: "lightning-baseCombobox_baseCombobox"
    };

    var labelAriaSelectedOptions = 'Selected Options:';

    var labelDeselectOptionKeyboard = 'Press delete or backspace to remove';

    var labelLoadingText = 'Loading';

    var labelPillCloseButtonAlternativeText = 'Clear Selection';

    function preventDefaultAndStopPropagation(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    function handleEnterKey({
      event,
      currentIndex,
      dropdownInterface
    }) {
      preventDefaultAndStopPropagation(event);

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
      preventDefaultAndStopPropagation(event);

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

      preventDefaultAndStopPropagation(event);

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
      preventDefaultAndStopPropagation(event);

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

    const i18n$1 = {
      ariaSelectedOptions: labelAriaSelectedOptions,
      deselectOptionKeyboard: labelDeselectOptionKeyboard,
      pillCloseButtonAlternativeText: labelPillCloseButtonAlternativeText,
      loadingText: labelLoadingText
    };
    const SMALL_MIN_HEIGHT = '2.25rem';
    const MEDIUM_MIN_HEIGHT = '6.75rem';
    const ARIA_CONTROLS$1 = 'aria-controls';
    const ARIA_LABELLEDBY = 'aria-labelledby';
    const ARIA_DESCRIBEDBY$2 = 'aria-describedby';
    const ARIA_LABEL = 'aria-label';
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
          [ARIA_LABELLEDBY]: this.inputLabelledById,
          [ARIA_DESCRIBEDBY$2]: this.computedAriaDescribedBy,
          [ARIA_ACTIVEDESCENDANT]: this._activeElementDomId,
          [ARIA_CONTROLS$1]: this.computedInputControls,
          [ARIA_LABEL]: this.inputLabel
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
        return i18n$1;
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
      tmpl: _tmpl$9
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

    function tmpl$b($api, $cmp, $slotset, $ctx) {
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
        _m4
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
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]), $cmp._fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
        props: {
          "content": $cmp._fieldLevelHelp
        },
        key: 2
      }, []) : null, api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 4
      }, [api_custom_element("lightning-base-combobox", _lightningBaseCombobox, {
        props: {
          "name": $cmp.name,
          "required": $cmp.required,
          "disabled": $cmp.disabled,
          "placeholder": $cmp.placeholder,
          "items": $cmp._items,
          "inputText": $cmp._selectedLabel,
          "inputIconSize": "xx-small",
          "inputIconName": "utility:down",
          "showDropdownActivityIndicator": $cmp.spinnerActive,
          "dropdownAlignment": $cmp.dropdownAlignment
        },
        key: 3,
        on: {
          "dropdownopen": _m0 || ($ctx._m0 = api_bind($cmp.handleDropdownOpen)),
          "focus": _m1 || ($ctx._m1 = api_bind($cmp.handleFocus)),
          "blur": _m2 || ($ctx._m2 = api_bind($cmp.handleBlur)),
          "ready": _m3 || ($ctx._m3 = api_bind($cmp.handleComboboxReady)),
          "select": _m4 || ($ctx._m4 = api_bind($cmp.handleSelect))
        }
      }, [])]), $cmp._helpMessage ? api_element("div", {
        classMap: {
          "slds-form-element__help": true
        },
        attrs: {
          "id": api_scoped_id("help-text"),
          "data-help-text": true,
          "aria-live": "assertive"
        },
        key: 5
      }, [api_dynamic($cmp._helpMessage)]) : null];
    }

    var _tmpl$a = lwc.registerTemplate(tmpl$b);
    tmpl$b.stylesheets = [];

    if (_implicitStylesheets$2) {
      tmpl$b.stylesheets.push.apply(tmpl$b.stylesheets, _implicitStylesheets$2);
    }
    tmpl$b.stylesheetTokens = {
      hostAttribute: "lightning-combobox_combobox-host",
      shadowAttribute: "lightning-combobox_combobox"
    };

    var labelRequired = 'required';

    var labelPlaceholder = 'Select an Option';

    const i18n$2 = {
      required: labelRequired,
      placeholder: labelPlaceholder
    };
    /**
     * A widget that provides an input field that is readonly,
     * accompanied by a dropdown list of selectable options.
     */

    class LightningCombobox extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._ariaLabelledBy = '';
        this._ariaDescribedBy = '';
        this._fieldLevelHelp = '';
        this._selectedLabel = '';
        this._disabled = false;
        this._readOnly = false;
        this._spinnerActive = false;
        this._required = false;
        this.label = void 0;
        this.dropdownAlignment = 'left';
        this.placeholder = i18n$2.placeholder;
        this.messageWhenValueMissing = void 0;
        this.name = void 0;
        this._items = [];
        this._variant = void 0;
        this._helpMessage = void 0;
        this._labelForId = void 0;
      }

      renderedCallback() {
        this.synchronizeA11y();
      }

      connectedCallback() {
        this.classList.add('slds-form-element');
        this.updateClassList();
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid()); // The connected logic here is needed because at the point when @api setters
        // are called other values may not have been set yet, so it could happen that the 'value' was set, but 'options'
        // are not available, or that the 'options' and 'value' have been set but 'multiple' hasn't been set yet.
        // So here we make sure that we start processing the data only once the element is actually in DOM, which
        // should be beneficial for performance as well

        this.connected = true;
        this._items = this.generateItems(this.options);

        if (this.options && this.selectedValue !== undefined) {
          this.updateSelectedOptions();
        }
      }

      updateClassList() {
        classListMutation(this.classList, {
          'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
          'slds-form-element_horizontal': this.variant === VARIANT.LABEL_INLINE
        });
      }

      disconnectedCallback() {
        this.connected = false;
      }
      /**
       * Reserved for internal use. Use the standard aria-labelledby instead. A space-separated list of element IDs that provide labels for the combobox.
       * @type {string}
       */


      get ariaLabelledBy() {
        return this._ariaLabelledBy;
      }

      set ariaLabelledBy(labelledBy) {
        this._ariaLabelledBy = labelledBy;
      }
      /**
       * Reserved for internal use. Use the standard aria-describedby instead. A space-separated list of element IDs that provide descriptive labels for the combobox.
       * @type {string}
       */


      get ariaDescribedBy() {
        return this._ariaDescribedBy;
      }

      set ariaDescribedBy(describedBy) {
        this._ariaDescribedBy = describedBy;
      }
      /**
       * Help text detailing the purpose and function of the combobox.
       * @type {string}
       */


      get fieldLevelHelp() {
        return this._fieldLevelHelp;
      }

      set fieldLevelHelp(value) {
        this._fieldLevelHelp = value;
      }
      /**
       * The variant changes the appearance of the combobox.
       * Accepted variants include standard, label-hidden, label-inline, and label-stacked.
       * This value defaults to standard.
       * Use label-hidden to hide the label but make it available to assistive technology.
       * Use label-inline to horizontally align the label and combobox.
       * Use label-stacked to place the label above the combobox.
       * @type {string}
       * @default standard
       */


      get variant() {
        return this._variant || VARIANT.STANDARD;
      }

      set variant(value) {
        this._variant = normalizeVariant$1(value);
        this.updateClassList();
      }
      /**
       * Specifies the value of an input element.
       * @type {object}
       */


      get value() {
        return this.selectedValue;
      }

      set value(newValue) {
        // There are some cases where this won't work correctly
        // See https://git.soma.salesforce.com/raptor/raptor/issues/457
        if (newValue !== this.selectedValue) {
          this.selectedValue = newValue;

          if (this.connected && this.options) {
            this.updateSelectedOptions();
          }
        }
      }
      /**
       * A list of options that are available for selection. Each option has the following attributes: label and value.
       * @type {object[]}
       * @required
       */


      get options() {
        return this._options || [];
      }

      set options(newValue) {
        this._options = normalizeArray(newValue);

        if (this.connected) {
          this._items = this.generateItems(this._options);
          this.updateSelectedOptions();
        }
      }
      /**
       * If present, the combobox is disabled and users cannot interact with it.
       * @type {boolean}
       * @default false
       */


      get disabled() {
        return this._disabled || this._readOnly || false;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);
      }
      /**
       * If present, the combobox is read-only.
       * A read-only combobox is also disabled.
       * @type {boolean}
       * @default false
       */


      get readOnly() {
        return this.disabled;
      }

      set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
      }
      /**
       * If present, a value must be selected before the form can be submitted.
       * @type {boolean}
       * @default false
       */


      get required() {
        return this._required;
      }

      set required(value) {
        this._required = normalizeBoolean(value);
      }
      /**
       * If present, a spinner is displayed below the menu items to indicate loading activity.
       * @type {boolean}
       * @default false
       */


      get spinnerActive() {
        return this._spinnerActive;
      }

      set spinnerActive(value) {
        this._spinnerActive = normalizeBoolean(value);
      }
      /**
       * Sets focus on the combobox.
       */


      focus() {
        if (this.connected) {
          this.getBaseComboboxElement().focus();
        }
      }
      /**
       * Removes focus from the combobox.
       */


      blur() {
        if (this.connected) {
          this.getBaseComboboxElement().blur();
        }
      }
      /**
       * Represents the validity states that an element can be in, with respect to constraint validation.
       * @type {object}
       * @required
       */


      get validity() {
        return this._constraint.validity;
      }
      /**
       * Returns the valid attribute value (Boolean) on the ValidityState object.
       * @returns {boolean} Indicates whether the combobox has any validity errors.
       */


      checkValidity() {
        return this._constraint.checkValidity();
      }
      /**
       * Displays the error messages and returns false if the input is invalid.
       * If the input is valid, reportValidity() clears displayed error messages and returns true.
       * @returns {boolean} - The validity status of the combobox.
       */


      reportValidity() {
        return this._constraint.reportValidity(message => {
          this._helpMessage = message;
        });
      }
      /**
       * Sets a custom error message to be displayed when the combobox value is submitted.
       * @param {string} message - The string that describes the error. If message is an empty string, the error message
       * is reset.
       */


      setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
      }
      /**
       * Shows the help message if the combobox is in an invalid state.
       */


      showHelpMessageIfInvalid() {
        this.reportValidity();
      }

      handleComboboxReady(e) {
        this._labelForId = e.detail.id;
      }

      synchronizeA11y() {
        synchronizeAttrs(this.template.querySelector('label'), {
          for: this._labelForId
        });
        const baseCombobox = this.template.querySelector('lightning-base-combobox');
        baseCombobox.inputLabelledByElement = this.ariaLabelledBy;
        baseCombobox.inputDescribedByElements = this.computedAriaDescribedBy;
      }

      get i18n() {
        return i18n$2;
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
        const describedByElements = [];

        if (this._helpMessage) {
          const helpText = this.template.querySelector('[data-help-text]');
          describedByElements.push(helpText);
        }

        if (typeof this.ariaDescribedBy === 'string') {
          describedByElements.push(this.ariaDescribedBy);
        }

        return describedByElements;
      }

      handleSelect(event) {
        if (event.detail.value === this.selectedValue) {
          return;
        }

        this.selectedValue = event.detail.value;
        this.updateSelectedOptions(); // the change event needs to propagate to elements outside of the light-DOM, hence making it composed.

        this.dispatchEvent(new CustomEvent('change', {
          composed: true,
          bubbles: true,
          detail: {
            value: this.selectedValue
          }
        }));
      }

      handleFocus() {
        this.interactingState.enter();
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleBlur() {
        this.interactingState.leave();
        this.dispatchEvent(new CustomEvent('blur'));
      }

      handleDropdownOpen() {
        this.dispatchEvent(new CustomEvent('open'));
      }

      updateSelectedOptions() {
        this.updateSelectedLabelFromValue(this.selectedValue);
        this.markOptionSelectedFromValue(this.selectedValue);
      }

      markOptionSelectedFromValue(value) {
        if (this._items) {
          const selectedItem = this._items.find(item => item.value === value); // de-select previously selected item


          if (this._selectedItem) {
            this._selectedItem.iconName = undefined;
            this._selectedItem.highlight = false;
          }

          this._selectedItem = selectedItem;

          if (selectedItem) {
            selectedItem.iconName = 'utility:check';
            this._selectedItem.highlight = true;
          } // Make a shallow copy to trigger an update on the combobox


          this._items = this._items.slice();
        }
      }

      updateSelectedLabelFromValue(newValue) {
        this._selectedLabel = this.getOptionLabelByValue(newValue);
      }

      getOptionLabelByValue(value) {
        const foundOption = this.options.find(option => option.value === value);

        if (foundOption) {
          return foundOption.label;
        }

        return '';
      }

      generateItems(options) {
        return options.map(option => {
          return {
            type: 'option-inline',
            text: option.label,
            highlight: this.value === option.value,
            value: option.value
          };
        });
      }

      getBaseComboboxElement() {
        return this.template.querySelector('lightning-base-combobox');
      }

      get _constraint() {
        if (!this._constraintApi) {
          this._constraintApi = new FieldConstraintApi(() => this, {
            valueMissing: () => !this.disabled && this.required && isEmptyString(this.selectedValue)
          });
        }

        return this._constraintApi;
      }

    }

    LightningCombobox.delegatesFocus = true;

    lwc.registerDecorators(LightningCombobox, {
      publicProps: {
        label: {
          config: 0
        },
        dropdownAlignment: {
          config: 0
        },
        placeholder: {
          config: 0
        },
        messageWhenValueMissing: {
          config: 0
        },
        name: {
          config: 0
        },
        ariaLabelledBy: {
          config: 3
        },
        ariaDescribedBy: {
          config: 3
        },
        fieldLevelHelp: {
          config: 3
        },
        variant: {
          config: 3
        },
        value: {
          config: 3
        },
        options: {
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
        spinnerActive: {
          config: 3
        },
        validity: {
          config: 1
        }
      },
      publicMethods: ["focus", "blur", "checkValidity", "reportValidity", "setCustomValidity", "showHelpMessageIfInvalid"],
      track: {
        _ariaLabelledBy: 1,
        _ariaDescribedBy: 1,
        _fieldLevelHelp: 1,
        _selectedLabel: 1,
        _disabled: 1,
        _readOnly: 1,
        _spinnerActive: 1,
        _required: 1,
        _items: 1,
        _variant: 1,
        _helpMessage: 1
      },
      fields: ["_labelForId"]
    });

    var _lightningCombobox = lwc.registerComponent(LightningCombobox, {
      tmpl: _tmpl$a
    });

    function tmpl$c($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        b: api_bind,
        h: api_element,
        t: api_text
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_custom_element("lightning-card", _lightningCard, {
        props: {
          "title": "Preview Creative",
          "iconName": "custom:custom83"
        },
        key: 6
      }, [api_custom_element("lightning-button", _lightningButton, {
        attrs: {
          "slot": "actions"
        },
        props: {
          "label": "Open Preview"
        },
        key: 0
      }, []), api_element("div", {
        classMap: {
          "padded": true
        },
        key: 2
      }, [api_custom_element("lightning-combobox", _lightningCombobox, {
        props: {
          "name": "progress",
          "label": "Status",
          "value": $cmp.value,
          "placeholder": "Select Progress",
          "options": $cmp.options
        },
        key: 1,
        on: {
          "change": _m0 || ($ctx._m0 = api_bind($cmp.handleChange))
        }
      }, [])]), api_element("div", {
        classMap: {
          "padded": true,
          "bordered": true
        },
        key: 4
      }, [api_element("img", {
        attrs: {
          "src": "https://jsimms-20200724-demo.my.salesforce.com/resource/1597693737000/PreviewURL?"
        },
        key: 3
      }, [])]), api_element("p", {
        key: 5
      }, [api_text("\xA0")])])];
    }

    var _tmpl$b = lwc.registerTemplate(tmpl$c);
    tmpl$c.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl$c.stylesheets.push.apply(tmpl$c.stylesheets, _implicitStylesheets);
    }
    tmpl$c.stylesheetTokens = {
      hostAttribute: "lwc-emailPreview_emailPreview-host",
      shadowAttribute: "lwc-emailPreview_emailPreview"
    };

    class EmailPreview extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.value = 'inProgress';
      }

      get options() {
        return [{
          label: 'New',
          value: 'new'
        }, {
          label: 'In Progress',
          value: 'inProgress'
        }, {
          label: 'Finished',
          value: 'finished'
        }];
      }

      handleChange(event) {
        this.value = event.detail.value;
      }

    }

    lwc.registerDecorators(EmailPreview, {
      fields: ["value"]
    });

    var emailPreview = lwc.registerComponent(EmailPreview, {
      tmpl: _tmpl$b
    });

    return emailPreview;

});
