const SubscriptionMixin = {
    componentWillMount () {
        this.subscriptions = {};
    },

    componentWillUnmount () {
        _.each(this.subscriptions, handle => handle.stop());
    },

    subscribe (subscription, ...params) {
        this.subscriptions[subscription] = Meteor.subscribe(subscription, ...params);
    },

    subscriptionReady (subscription) {
        return this.subscriptions[subscription] && this.subscriptions[subscription].ready();
    },

    subscriptionsReady () {
        return _.all(this.subscriptions, handle => handle.ready());
    }
};

export default SubscriptionMixin;