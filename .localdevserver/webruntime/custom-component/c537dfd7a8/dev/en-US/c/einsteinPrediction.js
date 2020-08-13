Webruntime.define('lwc/einsteinPrediction', ['lwc'], function (lwc) { 'use strict';

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element
      } = $api;
      return [api_element("article", {
        classMap: {
          "slds-card": true
        },
        key: 20
      }, [api_element("div", {
        classMap: {
          "slds-grid": true,
          "slds-einstein-header": true,
          "slds-card__header": true
        },
        key: 7
      }, [api_element("header", {
        classMap: {
          "slds-media": true,
          "slds-media_center": true,
          "slds-has-flexi-truncate": true
        },
        key: 6
      }, [api_element("div", {
        classMap: {
          "slds-grid": true,
          "slds-grid_vertical-align-center": true,
          "slds-size_3-of-4": true,
          "slds-medium-size_2-of-3": true
        },
        key: 4
      }, [api_element("div", {
        classMap: {
          "slds-media__body": true
        },
        key: 3
      }, [api_element("h2", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "title": "Einstein (10+)"
        },
        key: 2
      }, [api_element("a", {
        classMap: {
          "slds-card__header-link": true
        },
        attrs: {
          "href": "javascript:void(0);",
          "title": "Einstein (10+)"
        },
        key: 1
      }, [api_element("span", {
        classMap: {
          "slds-text-heading_small": true
        },
        key: 0
      }, [api_text("Campaign Go Live Guidnce")])])])])]), api_element("div", {
        classMap: {
          "slds-einstein-header__figure": true,
          "slds-size_1-of-4": true,
          "slds-medium-size_1-of-3": true
        },
        key: 5
      }, [])])]), api_element("div", {
        classMap: {
          "slds-card__body": true,
          "slds-card__body_inner": true
        },
        styleMap: {
          "marginBottom": "20px"
        },
        key: 18
      }, [api_element("p", {
        classMap: {
          "slds-text-align_left": true,
          "slds-text-body_regular": true
        },
        key: 10
      }, [api_text("This campaign is "), api_element("strong", {
        key: 9
      }, [api_element("span", {
        styleMap: {
          "color": "#00AA00"
        },
        key: 8
      }, [api_text("trending positive")])]), api_text(".")]), api_element("p", {
        key: 11
      }, [api_text("\xA0")]), api_element("ul", {
        classMap: {
          "slds-list": true
        },
        key: 14
      }, [api_element("li", {
        key: 12
      }, [api_text("- The collaboration between agencies and marketing managers has no negative sentiment.")]), api_element("li", {
        key: 13
      }, [api_text("- The tracking towards the due date is still on target.")])]), api_element("p", {
        key: 15
      }, [api_text("\xA0")]), api_element("p", {
        classMap: {
          "slds-text-align_left": true
        },
        key: 16
      }, [api_text("Continue to keep the ball rolling, rock star.")]), api_element("p", {
        key: 17
      }, [api_text("\xA0")])]), api_element("footer", {
        classMap: {
          "slds-card__footer": true
        },
        key: 19
      }, [])])];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];
    tmpl.stylesheetTokens = {
      hostAttribute: "lwc-einsteinPrediction_einsteinPrediction-host",
      shadowAttribute: "lwc-einsteinPrediction_einsteinPrediction"
    };

    class EinsteinPrediction extends lwc.LightningElement {}

    var einsteinPrediction = lwc.registerComponent(EinsteinPrediction, {
      tmpl: _tmpl
    });

    return einsteinPrediction;

});
