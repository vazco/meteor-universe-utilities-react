Package.describe({
    name: 'universe:utilities-react',
    version: '1.0.0-beta2',
    // Brief, one-line summary of the package.
    summary: 'Universe Utilities for react',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/vazco/meteor-universe-utilities-react'
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.3-modules-beta.4');

    api.use('ecmascript');

    api.mainModule('index.js');
});
