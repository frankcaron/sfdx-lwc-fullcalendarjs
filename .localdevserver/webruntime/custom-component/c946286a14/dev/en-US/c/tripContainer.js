Webruntime.define('lwc/tripContainer', ['lwc'], function (lwc) { 'use strict';

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return ".trip-container" + shadowSelector + " {width: 100%;border: 0px;padding: 0px;}\n.trip-card" + shadowSelector + " {display: flex;width: 100%;background-color: #fff;box-shadow: 5px 10px 8px 10px #888888;}\n.trip-content" + shadowSelector + " {display: flex;flex-direction: column;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element
      } = $api;
      return [api_element("div", {
        classMap: {
          "trip-container": true
        },
        key: 2
      }, [api_element("div", {
        classMap: {
          "trip-card": true
        },
        key: 1
      }, [api_element("div", {
        classMap: {
          "trip-content": true
        },
        key: 0
      }, [api_text("hello world")])])])];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    tmpl.stylesheetTokens = {
      hostAttribute: "lwc-tripContainer_tripContainer-host",
      shadowAttribute: "lwc-tripContainer_tripContainer"
    };

    class TripContainer extends lwc.LightningElement {}

    var tripContainer = lwc.registerComponent(TripContainer, {
      tmpl: _tmpl
    });

    return tripContainer;

});
