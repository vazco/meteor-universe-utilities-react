const DualLinkMixin = {
    componentWillMount () {
        this._dualLinks = {};
    },

    dualLink (linkName = 'default') {
        if (this._dualLinks[linkName]) {
            // get DualLink from cache
            return this._dualLinks[linkName];
        }

        // create new DualLink
        return this._dualLinks[linkName] = new DualLink(this, linkName);
    }
};

class DualLink {
    constructor (component, name) {
        check(name, String);

        this.name      = name;
        this.component = component;

        this._setState('local',  {});
        this._setState('remote', {});
    }

    _getStateName (type) {
        return '_dualLink_' + this.name + '_' + type;
    }

    _getState (type) {
        return this.component.state[this._getStateName(type)];
    }

    _setState (type, field, value) {
        if (typeof field === 'string' && value !== undefined) {

            // set/update only one field
            this.component.setState({
                [this._getStateName(type)]: UniUtils.set(this._getState(type), field, value)
            });

        } else if (typeof field === 'object' && value === undefined) {

            // set whole object, in this case our value is in field argument
            this.component.setState({
                [this._getStateName(type)]: field
            });

        } else if (field === undefined && value === undefined) {

            // subscription helper

        } else {
            console.warn('[DualLinkMixin] Invalid set params', {type, field, value});
        }
    }

    getLocal (field) {
        return field ? UniUtils.get(this._getState('local'), field) : this._getState('local');
    }

    getRemote (field) {
        return field ? UniUtils.get(this._getState('remote'), field) : this._getState('remote');
    }

    get (field) {
        if (field) {
            // return only one field

            let local = this.getLocal(field);
            if (local !== undefined) {
                // local can be also e.g. empty string
                return local;
            }

            return this.getRemote(field);
        }

        // return whole object
        return $.extend(true, {}, this.getRemote(), this.getLocal());
    }

    isEmpty () {
        return _.isEmpty(this.get());
    }

    setLocal (field, value) {
        this._setState('local', field, value);
    }

    setRemote (field, value) {
        this._setState('remote', field, value);
    }

    clear () {
        this.setLocal({});
    }

    valueLink (field) {
        return {
            value: this.get(field),
            requestChange: value => this.setLocal(field, value)
        };
    }
}

export default DualLinkMixin;
