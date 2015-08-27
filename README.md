# Universe Utilities for react

## React Mixins

### AutorunMixin

```js
import {AutorunMixin} from '{universe:utilities-react}';

export default React.createClass({
    displayName: 'ProfilesList',
    mixins: [AutorunMixin],
    autorunA () {
        Meteor.subscribe('users', () => this.setState(isReady: true));
    },
    autorunB () {
            this.setState({
                users: Meteor.users.find().fetch()
            });
        },
    render () {
        return <ProfilesList users={this.state.users}/>;
    }
});
```

### DualLinkMixin

```js
import {DualLinkMixin} from '{universe:utilities-react}';
export React.createClass({
    displayName: 'UserItem',

    mixins: [DualLinkMixin],

    componentWillMount () {
        this.dualLink().setRemote(this.props.user);
    },

    componentWillReceiveProps (props) {
        this.dualLink().clear();
        this.dualLink().setRemote(props.user);
    },

    render () {
        if (this.dualLink().isEmpty()) {
            return null;
        }
        console.log('fullUser', this.dualLink().get());
        return <div>{this.dualLink().get('name')}</div>;
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

### deepEqual

Node's assert.deepEqual() algorithm as a standalone module.
*This module is around 5 times faster than wrapping assert.deepEqual() in a try/catch.*

```js
import {deepEqual} from '{universe:utilities-react}';

console.dir([
    equal(
        { a : [ 2, 3 ], b : [ 4 ] },
        { a : [ 2, 3 ], b : [ 4 ] }
    ),
    equal(
        { x : 5, y : [6] },
        { x : 5, y : 6 }
    )
]);
```

**deepEqual(a, b, opts)**
Compare objects a and b, returning whether they are equal according to a recursive equality algorithm.

If opts.strict is true, use strict equality (===) to compare leaf nodes. The default is to use coercive equality (==) because that's how assert.deepEqual() works by default.

*- based on [substack/node-deep-equal](https://github.com/substack/node-deep-equal)*

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
