'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , ensureCallable = require('es5-ext/object/valid-callable')
  , d              = require('d')
  , SiteTree       = require('site-tree')

  , defineProperty = Object.defineProperty, defineProperties = Object.defineProperties;

var DomjsSiteTree = module.exports = defineProperties(setPrototypeOf(function (domjs) {
	if (!(this instanceof DomjsSiteTree)) return new DomjsSiteTree(domjs);
	SiteTree.call(this, domjs.document);
	defineProperty(this, 'domjs', d(domjs));
}, SiteTree), {
	ensureTemplate: d(function (tpl) {
		if (typeof tpl === 'string') return tpl;
		return ensureCallable(tpl);
	})
});

DomjsSiteTree.prototype = Object.create(SiteTree.prototype, {
	constructor: d(DomjsSiteTree),
	_resolveTemplate: d(function (tpl, context) {
		var df;
		if (typeof tpl === 'string') {
			df = this.document.createDocumentFragment();
			df.appendChild(this.document.createTextNode(tpl));
			return df;
		}
		return this.domjs.collect(tpl.bind(context));
	})
});
