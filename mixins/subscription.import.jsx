const SubscriptionMixin = {
    componentWillMount () {
        this.subscriptions = {};
    },

    componentWillUnmount () {
        _.each(this.subscriptions, handlers => handlers.forEach(handle => handle.stop()));
    },

    subscribe (subscription, ...params) {
        this.subscriptions[subscription] = this.subscriptions[subscription] || [];
        this.subscriptions[subscription].push(Meteor.subscribe(subscription, ...params, () => {
            this.setState({
                [`__SubscriptionMixin_${subscription}${this.subscriptions[subscription].length}`]: true
            });
        }));
    },

    subscriptionReady (subscription) {
        return this.subscriptions[subscription] && this.subscriptions[subscription].every(handle => handle.ready());
    },

    subscriptionsReady () {
        return _.all(this.subscriptions, handlers => handlers.every(handle => handle.ready()));
    }
};

export default SubscriptionMixin;
