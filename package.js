Package.describe({
    name: 'universe:utilities-react',
    version: '1.0.0',
    summary: 'Universe Utilities for react',
    git: 'https://github.com/vazco/meteor-universe-utilities-react'
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.3-beta.11');

    api.use([
        'ejson',
        'ecmascript',
        'universe:utilities'
    ]);

    api.mainModule('index.js');
});
