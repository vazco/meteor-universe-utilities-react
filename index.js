//export {default as DualLinkMixin} from './mixins/dualLink';
//export {default as classNames} from './helpers/classnames';
//export {default as executionEnvironment} from './helpers/execution-environment';
//export {default as objectAssign} from './helpers/object-assign';
//export {default as deepEqual} from './helpers/deep-equal';
//export {default as deepExtend} from './helpers/deep-extend';
//export {default as cloneWithProps} from './helpers/react-clonewithprops';

/*
 Re-exporting doesn't work as of Meteor 1.3b4
 Please enable mixins/helpers when you're sure that they work and are still needed in Meteor 1.3!
 */

import AutorunMixin from './mixins/autorun';
import SubscriptionMixin from './mixins/subscription';
import DualLinkMixin from './mixins/dualLink';
import executionEnvironment from './helpers/execution-environment';


export {
    AutorunMixin,
    SubscriptionMixin,
    DualLinkMixin,
    executionEnvironment
};