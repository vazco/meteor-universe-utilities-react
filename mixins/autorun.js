import {Tracker} from 'meteor/tracker';

const AutorunMixin = {
    componentWillMount () {
        for (let method in this) {
            if (this.hasOwnProperty(method) && method.indexOf('autorun', 0) === 0) {
                const methodComputation = method + 'Computation';

                if (this[methodComputation] === undefined) {
                    this[methodComputation] = Tracker.nonreactive(() => {
                        // we put this inside nonreactive to be sure that it won't be related to any other computation
                        return Tracker.autorun(this[method]);
                    });
                }
            }
        }
    },

    componentWillUnmount () {
        for (let method in this) {
            if (this.hasOwnProperty(method) && method.indexOf('autorun', 0) === 0) {
                const methodComputation = method + 'Computation';

                if (this[methodComputation]) {
                    this[methodComputation].stop();
                    this[methodComputation] = null;
                }
            }
        }
    }
};

export default AutorunMixin;