Package.describe({
    name: 'universe:utilities-react',
    version: '1.0.0',
    summary: 'Universe Utilities for react',
    git: 'https://github.com/vazco/meteor-universe-utilities-react'
});

Package.onUse(function (api) {
    api.versionsFrom('1.3');

    api.use([
        'ejson',
        'ecmascript',
        'universe:utilities@2.3.2'
    ]);

    api.mainModule('index.js');
});
