# ember-test-with-data

## Introduction

ember-test-with-data keeps integration and acceptance testing consistent by
using tags set specifically in HTML5 data attributes.  

## Why should I use data attributes?

HTML markup and css classes are often sufficient for selecting DOM elements, but
that is not the purpose of why they are inserted into your code. HTML provides
the structure for your page and css gives your page styling. To use them for
testing, we give them a secondary purpose, which can sometimes create unneed
complexity.

By creating data-test attributes on elements, we can specifically select DOM
elements with that attribute being a sole purpose of helping you test.

## What does this do differently than others?

There are 2 data attribute addons out there.

* https://github.com/simplabs/ember-test-selectors
* https://github.com/Ticketfly/ember-hook

So why use ember-test-with-data?

* **Full automation** - Rather than having to add all your data-test attributes
manually, this automates the process (while still allowing for overrides) so
that you can .
* **No ember-test-with-data code in production** - We strip everything from your
production environments so there is no logic shipped with your production code.


## Features

* **Strip tags from production** - Removes all `data-test` attributes from your
code so the attributes don't add bloat to your production/staging environments
* **AutoTag Feature** - When enabled it adds data-test attributes to all
components and built in Ember template helpers based on the component name.
* **Suffixes** - Allows you to easily add a suffix to to a component's
`data-test` attribute. This allows for easily setting and finding specific
components when a component is reused.
* **Rich Settings** - We want this addon to be very customizable so that it will
fit with your project.

## Installation

```
ember install ember-test-with-data
```

That's it! It should work out of the box, but there are some settings you can
change.

## Configuration

You can set your preferences for ember-test-with-data in the
`/config/environment.js` file in your ember-cli app. Example:

```js
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    /*
    * Your settings in here
    */
  };

  ENV['ember-test-with-data'] = {
    hiddenEnvironments: ['staging', 'production'], // default ['production']
    dataTestSuffix: 'id',                          // default null
    autoTag: true                                  // default true
  }
}
```

###### Settings

* **hiddenEnvironments** (default: `['production']`) - Sets the environments in
which data-test attributes will be stripped.
* **dataTestSuffix** (default: `null`) - Sets the suffix of the data-test
identifier. A value of null makes the generated test attributes as `data-test`,
but setting it to `id` makes the generated test attributes `data-test-id`.
* **autoTag** (default: true) - Automatically generates data test attributes on
all components and ember template helpers based on their name. (i.e.
`{{your-component}}` will give the components element a data test attribute of
`your-component`)

## Acceptance Test Helper

To help you simplify your testing, an acceptance test helper is provided.  To
use it in your acceptance tests, simply add the following line to the top of
your `start-app.js` helper.

```js
// tests/helpers/start-app.js

import Ember from 'ember';
import './ember-test-with-data/find-with-data';

...
```

Now in your app you can use `findWithData('VALUE_OF_DATA_TEST_ATTRIBUTE')` and
it will find the element you are needing to test.

## Future features

* **Template Helpers** - To help generate data-test attributes based on models
and other contexts.
