Webruntime.define('lwc/fullCalendarJs', ['lwc'], function (lwc) { 'use strict';

  function tmpl($api, $cmp, $slotset, $ctx) {
    const {
      h: api_element,
      t: api_text,
      gid: api_scoped_id
    } = $api;
    return [api_element("article", {
      classMap: {
        "slds-card": true
      },
      key: 13
    }, [api_element("div", {
      classMap: {
        "slds-card__header": true,
        "slds-grid": true
      },
      key: 10
    }, [api_element("header", {
      classMap: {
        "slds-media": true,
        "slds-media_center": true,
        "slds-has-flexi-truncate": true
      },
      key: 9
    }, [api_element("div", {
      classMap: {
        "slds-media__figure": true
      },
      key: 4
    }, [api_element("span", {
      classMap: {
        "slds-icon_container": true,
        "slds-icon-standard-actions-and-buttons": true
      },
      attrs: {
        "title": "Campaign Schedule"
      },
      key: 3
    }, [api_element("svg", {
      classMap: {
        "slds-icon": true,
        "slds-icon_small": true
      },
      attrs: {
        "aria-hidden": "true"
      },
      key: 1
    }, [api_element("use", {
      attrs: {
        "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/standard-sprite/svg/symbols.svg#actions_and_buttons")
      },
      key: 0
    }, [])]), api_element("span", {
      classMap: {
        "slds-assistive-text": true
      },
      key: 2
    }, [api_text("Campaign Scehdule")])])]), api_element("div", {
      classMap: {
        "slds-media__body": true
      },
      key: 8
    }, [api_element("h2", {
      classMap: {
        "slds-card__header-title": true
      },
      key: 7
    }, [api_element("a", {
      classMap: {
        "slds-card__header-link": true,
        "slds-truncate": true
      },
      attrs: {
        "href": "javascript:void(0);",
        "title": "Campaign Schedule"
      },
      key: 6
    }, [api_element("span", {
      key: 5
    }, [api_text("Campaign Schedule")])])])])])]), api_element("div", {
      classMap: {
        "slds-card__body": true,
        "slds-card__body_inner": true
      },
      key: 12
    }, [api_element("div", {
      classMap: {
        "fullcalendarjs": true
      },
      attrs: {
        "id": api_scoped_id("calendar")
      },
      key: 11
    }, [])])])];
  }

  var _tmpl = lwc.registerTemplate(tmpl);
  tmpl.stylesheets = [];
  tmpl.stylesheetTokens = {
    hostAttribute: "lwc-fullCalendarJs_fullCalendarJs-host",
    shadowAttribute: "lwc-fullCalendarJs_fullCalendarJs"
  };

  function getDocument(cmp) {
    // Detect LWC type via duck-typing.
    if (cmp && cmp.template && cmp.template.ownerDocument) {
      const doc = cmp.template.ownerDocument;
      return doc;
    }

    throw new TypeError('The first parameter of loadScript() and loadStyle() must be an LWC component.');
  }

  function findLinkByUrl(root, url) {
    return root.querySelector(`link[href='${url}']`);
  }

  function findScriptByUrl(doc, url) {
    return doc.querySelector(`script[src='${url}']`) || doc.querySelector(`script[data-locker-src='${url}']`);
  }

  function createStyle(doc, url) {
    const link = doc.createElement('link');
    link.href = url;
    link.charset = 'utf-8';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    return link;
  }

  function createScript(doc, url) {
    const script = doc.createElement('script');
    script.src = url;
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    return script;
  }

  function promiseStyle(doc, link, skipload) {
    return new Promise((resolve, reject) => {
      link.addEventListener('load', resolve);
      link.addEventListener('error', err => {
        err.stopPropagation();
        reject(err.message);
      });

      if (!skipload) {
        doc.head.appendChild(link);
      }
    });
  }

  function promiseScript(doc, script, skipload) {
    return new Promise((resolve, reject) => {
      script.addEventListener('load', () => {
        handleScriptLoad(script, resolve);
      });
      script.addEventListener('error', evt => {
        handleScriptError(evt, reject);
      });

      if (!skipload) {
        doc.head.appendChild(script);
      }
    });
  }

  function handleScriptLoad(script, resolve) {
    script._ltngRequireLoaded = true;
    resolve();
  }

  function handleScriptError(evt, reject) {
    evt.stopPropagation();
    reject(evt.message);
  }

  function handleExistingScript(script, url) {
    if (!script._ltngRequireCreated) {
      throw new Error('platformResourceLoader encountered an existing <script> element for ' + url + ' that was not created by an ltng:require or platformResourceLoader instance. Unable to determine when the script would complete loading!');
    }

    return new Promise((resolve, reject) => {
      if (script._ltngRequireLoaded) {
        // Another ltng:require/platformResourceLoader loaded this dependency resolve()
        resolve();
      } else {
        // Another ltng:require/platformResourceLoader is loading this dependency wire up a listener for this instance's load and resolve
        script.addEventListener('load', () => {
          handleScriptLoad(script, resolve);
        });
        script.addEventListener('error', evt => {
          handleScriptError(evt, reject);
        });
      }
    });
  }
  /**
   * Utility function to load a CSS file via a link tag.
   * @param {LightningElement} self - The current component. Stylesheets are added in the component markup.
   * @param {String} url - The path to the CSS file.
   * @return {Promise} - A promise resolved once the CSS file has been loaded.
   */


  function loadStyle(self, url) {
    const doc = getDocument(self); // Let the element handle relative to absolute mapping (link.href).

    const link = createStyle(doc, url); // Prevent duplicate styles in the same document scope.

    const existingLink = findLinkByUrl(doc, link.href);
    return promiseStyle(doc, existingLink || link, !!existingLink);
  }
  /**
   * Utility function to load a JS file via a script tag.
   * @param {LightningElement} self - The current component. Scripts are added to the head section of the document.
   * @param {String} url - The path to the JS file.
   * @return {Promise} - A promise resolved once the JS file has been loaded.
   */

  function loadScript(self, url) {
    const doc = getDocument(self); // Let the element handle relative to absolute mapping (script.src).

    const script = createScript(doc, url); // Prevent duplicate scripts in the same document scope.

    const existingScript = findScriptByUrl(doc, script.src);

    if (existingScript) {
      return handleExistingScript(existingScript, url);
    } // add this to tell that it was created by ltng:require/platformResourceLoader (aura or lwc version)


    script._ltngRequireCreated = true;
    return promiseScript(doc, script, !!existingScript);
  }

  var FullCalendarJS = '/assets/project/635fb3a81d/staticresources/FullCalendarJS';

  /**
   * FullCalendarJs
   * @description Full Calendar JS - Lightning Web Components
   */

  class FullCalendarJs extends lwc.LightningElement {
    constructor(...args) {
      super(...args);
      this.fullCalendarJsInitialised = false;
    }

    /**
     * @description Standard lifecyle method 'renderedCallback'
     *              Ensures that the page loads and renders the 
     *              container before doing anything else
     */
    renderedCallback() {
      // Performs this operation only on first render
      if (this.fullCalendarJsInitialised) {
        return;
      }

      this.fullCalendarJsInitialised = true; // Executes all loadScript and loadStyle promises
      // and only resolves them once all promises are done

      Promise.all([loadScript(this, FullCalendarJS + '/jquery.min.js'), loadScript(this, FullCalendarJS + '/moment.min.js'), loadScript(this, FullCalendarJS + '/fullcalendar.min.js'), loadStyle(this, FullCalendarJS + '/fullcalendar.min.css') // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
      ]).then(() => {
        // Initialise the calendar configuration
        this.initialiseFullCalendarJs();
      }).catch(error => {
        // eslint-disable-next-line no-console
        console.error({
          message: 'Error occured on FullCalendarJS',
          error
        });
      });
    }
    /**
     * @description Initialise the calendar configuration
     *              This is where we configure the available options for the calendar.
     *              This is also where we load the Events data.
     */


    initialiseFullCalendarJs() {
      const ele = this.template.querySelector('div.fullcalendarjs'); // eslint-disable-next-line no-undef

      $(ele).fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2019-01-12',
        // defaultDate: new Date(), // default day is today
        navLinks: true,
        // can click day/week names to navigate views
        editable: true,
        eventLimit: true,
        // allow "more" link when too many events
        events: [{
          title: 'All Day Event',
          start: '2019-01-01'
        }, {
          title: 'Long Event',
          start: '2019-01-07',
          end: '2019-01-10'
        }, {
          id: 999,
          title: 'Repeating Event',
          start: '2019-01-09T16:00:00'
        }, {
          id: 999,
          title: 'Repeating Event',
          start: '2019-01-16T16:00:00'
        }, {
          title: 'Conference',
          start: '2019-01-11',
          end: '2019-01-13'
        }, {
          title: 'Meeting',
          start: '2019-01-12T10:30:00',
          end: '2019-01-12T12:30:00'
        }, {
          title: 'Lunch',
          start: '2019-01-12T12:00:00'
        }, {
          title: 'Meeting',
          start: '2019-01-12T14:30:00'
        }, {
          title: 'Happy Hour',
          start: '2019-01-12T17:30:00'
        }, {
          title: 'Dinner',
          start: '2019-01-12T20:00:00'
        }, {
          title: 'Birthday Party',
          start: '2019-01-13T07:00:00'
        }, {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2019-01-28'
        }]
      });
    }

  }

  lwc.registerDecorators(FullCalendarJs, {
    fields: ["fullCalendarJsInitialised"]
  });

  var fullCalendarJs = lwc.registerComponent(FullCalendarJs, {
    tmpl: _tmpl
  });

  return fullCalendarJs;

});
