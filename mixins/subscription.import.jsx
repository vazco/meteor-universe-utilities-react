const SubscriptionMixin = {
    componentWillMount () {
        this.subscriptions = {};
    },

    componentWillUnmount () {
        this.subscriptionsStop();
    },

    subscribe (subscription, ...params) {
        this.subscriptions[subscription] = this.subscriptions[subscription] || {};

        const handle = Meteor.subscribe(subscription, ...params, {
            onReady: () => {
                this.setState({
                    [`__SubscriptionMixin_${subscription}${handle.subscriptionId}`]: true
                });
            },
            onStop: () => {
                this.setState({
                    [`__SubscriptionMixin_${subscription}${handle.subscriptionId}`]: false
                });
            }
        });

        this.subscriptions[subscription][handle.subscriptionId] = handle;
        return handle;
    },

    subscriptionReady (subscription, id = null) {
        if (id) {
            const handle = this.subscriptions[subscription][id];
            return handle && handle.ready();
        }
        return this.subscriptions[subscription] && _(this.subscriptions[subscription]).every(handle => handle.ready());
    },

    subscriptionsReady () {
        return _.every(this.subscriptions, handlers => _(handlers).every(handle => handle.ready()));
    },

    subscriptionsStop () {
        return _.each(this.subscriptions, handlers => _(handlers).forEach(handle => handle.stop()));
    },

    subscriptionStop (subscription, id = null) {
        if (id) {
            const handle = this.subscriptions[subscription][id];
            return handle && handle.stop();
        }
        return this.subscriptions[subscription] && _(this.subscriptions[subscription]).every(handle => handle.stop());
    }
};

export default SubscriptionMixin;
