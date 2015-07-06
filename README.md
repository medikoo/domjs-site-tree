# domjs-site-tree
##  [Domjs](https://github.com/medikoo/domjs) based [SiteTree](https://github.com/medikoo/site-tree)

`DomjsSiteTree` allows configuration of SiteTree's with [domjs](https://github.com/medikoo/domjs) style templates.

##### Basic example:

Let's say we have follwing domjs view files:

_base.js_
```javascript
exports.title = "SitTree test page";

exports.head = function () {
  link({ rel: 'icon', href: '/favicon.png' });
  link({ rel: 'stylesheet', href: '/style.css' });
}

exports.body = function () {
  header(nav(ul(
    li(a({ href: '/' }, "Main page"))
  )));
  main();
  footer(p('© footer example'));
}
```

_homepage.js_
```javascript
exports._parent = require('./base');
exports.main = function () {
  h1("Homepage of SiteTree demo");
  p("Homepage content ...");
}
```

_subpage.js_
```javascript
exports._parent = require('./base');
exports.main = function () {
  h1("Subpage of SiteTree demo");
  p("Subpage content ...");
}
```

SiteTree configuration may look as:

```javascript
var DomjsSiteTree = require('domjs-site-tree');
var Domjs = require('domjs');
var domjs = new Domjs(document);

// Initialize SiteTree instance:
var siteTree = new DomjsSiteTree(domjs);

// Retrieve view nodes:
var homepageView = require('./homepage');
var subpageView = require('./subpage');


// Switch between views in document:
// Present homepage
siteTree.load(homepageView);

// Switch to subpage
siteTree.load(subpageView);

// Switch back to homepage
siteTree.load(homepageView)
```

### Installation

	$ npm install domjs-site-tree

### API

#### new DomjsSiteTree(domjs)

```javascript
var DomjsSiteTree = require('domjs-site-tree');
var Domjs = require('domjs');

var domjs = new Domjs(document);

var siteTree = new DomjsSiteTree(domjs);
```

On initialization [Domjs](https://github.com/medikoo/domjs#domjs) instance needs to be provided.

#### Templates format

`DomjsSiteTree` templates can be provided in a form of:
- __functions__, where content should be built using domjs element constructors (_DocumentFragment_ will automatically be resolved via domjs)
- __strings__, which will be treated as plain text (not HTML) content for addressed elements.

For detailed documentation of configuration of SiteTree, please refer to [SiteTree documentation](https://github.com/medikoo/site-tree#configuration-of-view-nodes)

## Tests [![Build Status](https://travis-ci.org/medikoo/domjs-site-tree.svg)](https://travis-ci.org/medikoo/domjs-site-tree)

	$ npm test
