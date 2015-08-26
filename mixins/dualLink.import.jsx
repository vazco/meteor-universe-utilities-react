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

        this.component = component;
        this.name = name;

        this._setState('remote', {});
        this._setState('local', {});
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

            // subscribtion helper

        } else {
            console.warn('[DualLinkMixin] Invalid set params', {type, field, value});
        }
    }

    getRemote (field) {
        return field ? UniUtils.get(this._getState('remote'), field) : this._getState('remote');
    }

    getLocal (field) {
        return field ? UniUtils.get(this._getState('local'), field) : this._getState('local');
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
        return _({}).extend(this.getRemote(), this.getLocal());
    }

    isEmpty () {
        return _.isEmpty(this.get());
    }

    setRemote (field, value) {
        this._setState('remote', field, value);
    }

    setLocal (field, value) {
        this._setState('local', field, value);
    }

    clear (field) {
        if (field) {
            this.setLocal(field, {});
        } else {
            this.setLocal({});
        }
    }

    valueLink (field) {
        return {
            value: this.get(field),
            requestChange: value => {
                this.setLocal(field, value);
            }
        };
    }
}

export default DualLinkMixin;