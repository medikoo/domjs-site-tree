'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , d              = require('d')
  , SiteTree       = require('site-tree')

  , defineProperty = Object.defineProperty;

var DomjsSiteTree = module.exports = setPrototypeOf(function (domjs) {
	if (!(this instanceof DomjsSiteTree)) return new DomjsSiteTree(domjs);
	SiteTree.call(this, domjs.document);
	defineProperty(this, 'domjs', d(domjs));
}, SiteTree);

DomjsSiteTree.prototype = Object.create(SiteTree.prototype, {
	constructor: d(DomjsSiteTree),
	resolveTemplate: d(function (tpl, context) { return this.domjs.collect(tpl.bind(context)); })
});
