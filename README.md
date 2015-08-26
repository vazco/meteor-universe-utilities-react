# Universe Utilities for react

## React Mixins

### AutorunMixin

```js
import {AutorunMixin} from '{universe:utilities-react}';

export default React.createClass({
    displayName: 'ProfilesList',
    mixins: [AutorunMixin],
    autorunCursor () {
        this.setState({
            cursor: UniUsers.find()
        });
    },
    render () {
        return <ProfilesList cursor={this.state.cursor}/>;
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