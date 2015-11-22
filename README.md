# Universe Utilities for react

## Provides meteor react modules for universe:modules

Mapping all available modules like require('react/*') and of course require('react') to system modules.

```
import React from 'react';
import ReactDOM from 'react-dom';
import AutoFocusMixin from 'react/lib/AutoFocusMixin';
```

It's useful for importing components from npm by universe:modules-npm.
Package universe:modules-npm allows to replace npm dependencies onto universe:modules dependencies

## Universe Mixins for React

### AutorunMixin

```js
import {AutorunMixin} from '{universe:utilities-react}';

// Any function prefixed with 'autorun' is executed in componentWillMount.
// It will create Computation object.
// Computation object is stopped in componentWillUnmount.

export default React.createClass({
    mixins: [AutorunMixin],

    // 'Anonymous' autorun.
    autorun () {
        // Reactive context here.
        this.setState({
            name: Session.get('name') || 'Anonymous'
        });
    },

    // 'IsLoggedIn' autorun.
    autorunIsLoggedIn () {
        this.setState({
            isLoggedIn: !!Metor.userId()
        });
    },

    render () {
        return (
            <div>
                <p>Session variable: {this.state.name}</p>
                <p>Is user logged in? {'' + this.state.isLoggedIn}</p>
                <button onClick={this.invalidate}>Click to invalidate autoruns</button>
            </div>
        );
    },

    invalidate () {
        this.autorunComputation.invalidate();
        this.autorunIsLoggedInComputation.invalidate();
    }
});
```

### DualLinkMixin

```js
import {DualLinkMixin} from '{universe:utilities-react}';

// Create or get dualLink from cache.
// var dualLink = this.dualLink(name = 'default')
//
// Overwrite local state with object
// dualLink.setLocal(object)
// Overwrite remote state with object
// dualLink.setRemote(object)
//
// Overwrite field in local state with value
// dualLink.setLocal(field, value)
// Overwrite field in remote state with value
// dualLink.setRemote(field, value)
//
// Removes local state
// dualLink.clear()
//
// Check for any value in both state
// dualLink.isEmpty()
//
// Creates value link (changes are saved in local state)
// dualLink.valueLink(field)
//
// Get two states merged
// dualLink.get()
// Get field from both states (local state has higher priority than remote)
// dualLink.get(field)
//
// Get field from local state
// dualLink.getLocal(field)
// Get field from remote state
// dualLink.getRemote(field)

export React.createClass({
    mixins: [DualLinkMixin],

    componentWillMount () {
        this.dualLink().setRemote(this.props.user);
    },

    componentWillReceiveProps (props) {
        this.dualLink().clear();
        this.dualLink().setRemote(props.user);
    },

    render () {
        const dualLink = this.dualLink();

        if (dualLink.isEmpty()) {
            return (
                <p>Loading...</p>
            );
        }

        return (
            <div>
                <p>Id: {dualLink.get('id')}</p>
                <p>Name: {dualLink.get('name')}</p>
            </div>
        );
    }
});
```

### SubscriptionMixin

```js
import {AutorunMixin, SubscriptionMixin} from '{universe:utilities-react}';

// Subscribe for publication
// this.subscribe(publicationName, ...args)
//
// Check for readiness of single subscription
// this.subscriptionReady(publicationName)
//
// Check for readiness of all subscriptions
// this.subscriptionsReady()

export default React.createClass({
    mixins: [SubscriptionMixin, AutorunMixin],

    autorunUsers () {
        this.subscribe('users');
        this.setState({
            users: Meteor.users.find().fetch()
        });
    },

    render () {
        if (!this.subscriptionsReady()) {
            return (
                <p>Loading...</p>
            );
        }

        return (
            <ul>
                {this.state.users}
            </ul>
        );
    }
});
```

### Complete example

```js
import {AutorunMixin, DualLinkMixin, SubscriptionMixin} from '{universe:utilities-react}';

export default React.createClass({
    mixins: [SubscriptionMixin, DualLinkMixin, AutorunMixin],

    propTypes: {
        id: React.PropTypes.string.isRequired
    },

    autorunPost () {
        const id = this.props.id;

        this.subscribe('post', id);
        this.dualLink().setRemote(Posts.findOne(id));
    },

    render () {
        if (!this.subscriptionsReady()) {
            return (
                <p>Loading...</p>
            );
        }

        const dualLink = this.dualLink();

        return (
            <div>
                <input type="text" valueLink={dualLink.get('title')}>
                <input type="text" valueLink={dualLink.get('text')}>
                <button onClick={this.submit}>Save</button>
            </div>
        );
    },

    submit () {
        Posts.update({
            _id: this.props.id
        }, {
            $set: this.dualLink().get()
        });
    }
});
```

## Helpers

### classNames

A simple utility for conditionally joining classNames together

```js
import {classNames} from '{universe:utilities-react}';

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }) // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

*- based on [JedWatson/classnames](ithub.com/JedWatson/classnames)*

### executionEnvironment

Simple helpers around environment with information like:
canUseDOM, canUseWorkers, canUseEventListeners, canUseViewport

```js
import {executionEnvironment} from '{universe:utilities-react}';

console.log(executionEnvironment.canUseDOM);
console.log(executionEnvironment.canUseWorkers);
console.log(executionEnvironment.canUseEventListeners);
console.log(executionEnvironment.canUseViewport);
```

### objectAssign

Ponyfill: A polyfill that doesn't overwrite the native method

```js
import {objectAssign} from '{universe:utilities-react}';
objectAssign({foo: 0}, {bar: 1});
//=> {foo: 0, bar: 1}

// multiple sources
objectAssign({foo: 0}, {bar: 1}, {baz: 2});
//=> {foo: 0, bar: 1, baz: 2}

// overwrites equal keys
objectAssign({foo: 0}, {foo: 1}, {foo: 2});
//=> {foo: 2}

// ignores null and undefined sources
objectAssign({foo: 0}, null, {bar: 1}, undefined);
//=> {foo: 0, bar: 1}
```

**objectAssign(target, source, [source, ...])**

Assigns enumerable own properties of source objects to the target object and returns the target object. Additional source objects will overwrite previous ones.

- more here: ES6 spec - [Object.assign](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign)

*- based on [sindresorhus/object-assign](https://github.com/sindresorhus/object-assign)*

### cloneWithProps

Stand-alone React cloneWithProps util that works with multiple versions of React

```js
import {cloneWithProps} from '{universe:utilities-react}';
cloneWithProps(<MyComponent oldProp='hi'/> { newProp: 'hello' })
```

*This is tested with React 0.9 to 0.13, and adds a trivial amount of code to get everything to work.*

*- based on [react-clonewithprops](https://github.com/jquense/react-clonewithprops)*

