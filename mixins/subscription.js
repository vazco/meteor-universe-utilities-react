import {Meteor} from 'meteor/meteor';

const SubscriptionMixin = {
    componentWillMount () {
        this.subscriptions = {};
    },

    componentWillUnmount () {
        this.subscriptionsStop();
    },

    subscribe (subscription, ...params) {
        const handle = Meteor.subscribe(subscription, ...params, {
            onReady: () => {
                this.setState({
                    [`__SubscriptionMixin_${subscription}_${handle.subscriptionId}`]: 'ready'
                });
            },

            onStop: (err) => {
                this.setState({
                    [`__SubscriptionMixin_${subscription}_${handle.subscriptionId}`]: 'stopped'
                });

                delete this.subscriptions[subscription][handle.subscriptionId];
            }
        });

        this.subscriptions[subscription] = this.subscriptions[subscription] || {};
        this.subscriptions[subscription][handle.subscriptionId] = handle;
        return handle;
    },

    subscriptionReady (subscription, id) {
        if (id) {
            const handle = this.subscriptions[subscription][id];
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

    subscriptionStop (subscription, id) {
        if (id) {
            const handle = this.subscriptions[subscription][id];
            return handle && handle.stop();
        }

        return _(this.subscriptions[subscription] || {}).every(handle => handle.stop());
    }
};

export default SubscriptionMixin;
