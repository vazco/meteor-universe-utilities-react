System.registerDynamic('react', [], false, function (require, exports, module) {
    module.exports = Package['react-runtime'].React;
});

System.registerDynamic('react-dom', [], false, function (require, exports, module) {
    module.exports = Package['react-runtime'].ReactDOM;
});

System.config({
    meta: {
        'react/*': {
            format: 'register',
            loader: 'UniverseReactModulesLoader'
        },
        'react-dom/*': {
            format: 'register',
            loader: 'UniverseReactModulesLoader'
        }
    }
});

// Our custom loader for react
/* globals UniverseReactModulesLoader:true */
UniverseReactModulesLoader = System.newModule({
    locate ({name}) {
        return new Promise((resolve, reject) => {
            let [dir] = name.split('/');
            // check if we're in valid namespace
            if (dir !== 'react') {
                reject(new Error('[Universe Modules]: trying to get exported values from invalid package: ' + name));
                return;
            }
            resolve(name);
        });
    },
    fetch () {
        // we don't need to fetch anything for this to work
        return '';
    },
    instantiate ({name}) {

        return React.require(name);
    }
});

// Register our loader
System.set('UniverseReactModulesLoader', UniverseReactModulesLoader);

