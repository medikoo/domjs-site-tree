'use strict';

var toArray  = require('es5-ext/array/to-array')
  , Domjs    = require('domjs');

module.exports = function (T, a) {
	var domjs = new Domjs(document), tree = new T(domjs), ns = domjs.ns
	  , header, content, foo, bar, context = {}, partialContent = {}, conf;

	var rootPage = { _name: 'root', body: function () {
		header = ns.div({ id: 'header' }, 'Header');
		content = ns.div({ id: 'content' },
			foo = ns.div({ id: 'foo' },
				ns.p('foo'),
				ns.p('bar')),
			ns.div(bar = ns.div({ id: 'bar' },
				ns.p('Other foo'),
				ns.p('Other bar'))));
		partialContent = ns.div({ id: 'partial-content' }, ' melon ');
	} };

	var page1 = { _name: 'page1', _parent: rootPage, foo: function () {
		ns.span('foo 1 ');
		ns.span('foo 2');
	}, bar: function () {
		ns.span('bar 1 ');
		ns.span('bar 2');
	}, 'partial-content': {
		class: { active: true },
		prepend: function () {
			ns.span('prepended 1 ');
			ns.span('prepended 2');
		},
		append: function () {
			ns.span('appended 1 ');
			ns.span('appended 2');
		}
	} };

	tree.load(page1, context);
	a(foo.textContent, 'foo 1 foo 2', "Replace content #1");
	a(bar.textContent, 'bar 1 bar 2', "Replace content #2");
	a(partialContent.className, 'active', "Classname");
	a(partialContent.textContent, 'prepended 1 prepended 2 melon appended 1 appended 2',
		"Append/Prepend");

	tree.load(rootPage, context);
	a.deep(toArray(document.body.childNodes), [header, content, partialContent], "Reload home #1");
	a.deep(toArray(content.childNodes), [foo, bar.parentNode], "Reload home #2");
	a(partialContent.className, '');
	a(partialContent.textContent, ' melon ', "Append/Prepend");

	tree.load(page1, context);
	a(foo.textContent, 'foo 1 foo 2', "Replace content #1");
	a(bar.textContent, 'bar 1 bar 2', "Replace content #2");
	a(partialContent.className, 'active', "Classname");
	a(partialContent.textContent, 'prepended 1 prepended 2 melon appended 1 appended 2',
		"Append/Prepend");

	a.h1("Ensure view");
	a.throws(function () { T.ensureView(undefined, tree); }, TypeError);
	a.throws(function () { T.ensureView(null, tree); }, TypeError);
	a.throws(function () { T.ensureView('', tree); }, TypeError);
	conf = {};
	a(T.ensureView(conf, tree), conf);
	conf._foo = 'bar';
	a(T.ensureView(conf, tree), conf);
	conf.bar = 'foo';
	a.throws(function () { T.ensureView(conf, tree); }, TypeError);
	delete conf.bar;
	conf['foo bar'] = function () {};
	a.throws(function () { T.ensureView(conf, tree); }, TypeError);
	delete conf['foo bar'];
	conf.bar = function () {};
	a(T.ensureView(conf, tree), conf);
	conf.elo = { class: 'raz' };
	a.throws(function () { T.ensureView(conf, tree); }, TypeError);
	conf.elo.class = {};
	a(T.ensureView(conf, tree), conf);
	conf.elo.content = '';
	a.throws(function () { T.ensureView(conf, tree); }, TypeError);
	conf.elo.content = {};
	a.throws(function () { T.ensureView(conf, tree); }, TypeError);
	conf.elo.content = function () {};
	a(T.ensureView(conf, tree), conf);
	conf.elo.prepend = function () {};
	a.throws(function () { T.ensureView(conf, tree); }, TypeError);
	delete conf.elo.prepend;
	conf.elo.append = function () {};
	a.throws(function () { T.ensureView(conf, tree); }, TypeError);
	delete conf.elo.content;
	a(T.ensureView(conf, tree), conf);
	conf.elo.prepend = function () {};
	a(T.ensureView(conf, tree), conf);
};
