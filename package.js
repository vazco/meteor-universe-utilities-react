Package.describe({
    name: 'universe:utilities-react',
    version: '0.5.3',
    // Brief, one-line summary of the package.
    summary: 'Universe Utilities for react',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/vazco/meteor-universe-utilities-react'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use(['universe:modules@0.5.0', 'react-runtime@0.13.3_7', 'ecmascript@0.1.5']);
    api.addFiles([
        'modules/ReactWithAddons.js',
        //mixins
        'mixins/autorun.import.jsx',
        'mixins/dualLink.import.jsx',
        'mixins/subscription.import.jsx',
        //helpers
        'helpers/classnames.import.jsx',
        'helpers/execution-environment.import.jsx',
        'helpers/object-assign.import.jsx',
        'helpers/react-clonewithprops.import.jsx',
        'helpers/deep-equal.import.jsx',
        'helpers/deep-extend.import.jsx',
        //index
        'index.import.js'
    ]);
});
