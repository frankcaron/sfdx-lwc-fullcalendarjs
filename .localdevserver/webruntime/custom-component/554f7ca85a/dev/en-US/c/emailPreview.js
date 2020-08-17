Webruntime.define('lwc/emailPreview', ['lwc'], function (lwc) { 'use strict';

	function tmpl($api, $cmp, $slotset, $ctx) {
	  return [];
	}

	var _tmpl = lwc.registerTemplate(tmpl);
	tmpl.stylesheets = [];
	tmpl.stylesheetTokens = {
	  hostAttribute: "lwc-emailPreview_emailPreview-host",
	  shadowAttribute: "lwc-emailPreview_emailPreview"
	};

	class EmailPreview extends lwc.LightningElement {}

	var emailPreview = lwc.registerComponent(EmailPreview, {
	  tmpl: _tmpl
	});

	return emailPreview;

});
