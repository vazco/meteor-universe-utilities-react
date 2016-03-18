import {Meteor} from 'meteor/meteor';
import {EJSON} from 'meteor/ejson';

const SubscriptionMixin = {
    getInitialState () {
        return {};
    },
    componentWillMount () {
        this.subscriptions = {};
    },

    componentWillUnmount () {
        this.subscriptionsStop();
    },

    subscribe (subscription, ...params) {
        const handleId = `__SubscriptionMixin_${subscription}_${EJSON.stringify(params)}`;
        const handle = Meteor.subscribe(subscription, ...params, {
            onReady: () => {
                this.setState({[handleId]: 'ready'});
            },

            onStop: (err) => {
                this.setState({[handleId]: 'stopped'});

                delete this.subscriptions[subscription][handleId];
            }
        });


        this.subscriptions[subscription] = this.subscriptions[subscription] || {};
        this.subscriptions[subscription][handleId] = handle;

        return handle;
    },

    subscriptionReady (subscription, handleId) {
        if (handleId) {
            const handle = this.subscriptions[subscription][handleId];
            return handle && handle.ready();
        }

        return _(this.subscriptions[subscription] || {}).every(handle => handle.ready());
    },

    subscriptionsReady () {
        return _.every(this.subscriptions, handlers => _(handlers).every(handle => handle.ready()));
    },

    subscriptionsStop () {
        return _.each(this.subscriptions, handlers => _(handlers).forEach(handle => handle.stop()));
    },

    subscriptionStop (subscription, handleId) {
        if (handleId) {
            const handle = this.subscriptions[subscription][handleId];
            return handle && handle.stop();
        }

        return _(this.subscriptions[subscription] || {}).every(handle => handle.stop());
    }
};

export default SubscriptionMixin;
