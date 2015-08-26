Package.describe({
    name: 'universe:utilities-react',
    version: '0.1.0',
    // Brief, one-line summary of the package.
    summary: 'Universe Utilities for react',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/vazco/meteor-universe-utilities-react'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');
    api.use('universe:modules@0.4.1');
    api.addFiles([
        'mixins/autorun.import.jsx',
        'mixins/dualLink.import.jsx',
        'index.import.js',
        'index.js'
    ]);
});
