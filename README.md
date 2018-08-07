<h1 align="center">
    <a href="https://github.com/vazco">vazco</a>/Universe Utilities for React
</h1>

&nbsp;

## Instalation
```sh
 meteor add universe:utilities-react
```

## Universe Mixins for React

### AutorunMixin

```jsx
import {AutorunMixin} from 'meteor/universe:utilities-react';

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

```jsx
import {DualLinkMixin} from 'meteor/universe:utilities-react';

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

```jsx
import {AutorunMixin, SubscriptionMixin} from 'meteor/universe:utilities-react';

// Subscribe for publication
// this.subscribe(publicationName, ...args)
//
// Check for readiness of single subscription or selected subscription handler
// this.subscriptionReady(publicationName[, subscriptionHandlerId])
//
// Check for readiness of all subscriptions
// this.subscriptionsReady()
//
// Stops all subscriptions
// this.subscriptionsStop()
//
// Stops one subscription or selected subscription handler
// this.subscriptionStop(publicationName[, subscriptionHandlerId])

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

```jsx
import {AutorunMixin, DualLinkMixin, SubscriptionMixin} from 'meteor/universe:utilities-react';

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

### executionEnvironment

Simple helpers around environment with information like:
canUseDOM, canUseWorkers, canUseEventListeners, canUseViewport

```jsx
import {executionEnvironment} from 'meteor/universe:utilities-react';

console.log(executionEnvironment.canUseDOM);
console.log(executionEnvironment.canUseWorkers);
console.log(executionEnvironment.canUseEventListeners);
console.log(executionEnvironment.canUseViewport);
```

### cloneWithProps

Stand-alone React cloneWithProps util that works with multiple versions of React

```jsx
import {cloneWithProps} from 'meteor/universe:utilities-react';
cloneWithProps(<MyComponent oldProp='hi'/> { newProp: 'hello' })
```

*This is tested with React 0.9 to 0.14, and adds a trivial amount of code to get everything to work.*

*- based on [react-clonewithprops](https://github.com/jquense/react-clonewithprops)*

## License

<img src="https://vazco.eu/banner.png" align="right">

**Like every package maintained by [Vazco](https://vazco.eu/), Universe Utilities for React is [MIT licensed](https://github.com/vazco/uniforms/blob/master/LICENSE).**
