['react',
    'react/addons',
    'react/lib/getActiveElement',
    'react/lib/invariant',
    'react/lib/warning'
]
    .forEach(function (m) {
        System.registerDynamic(m, [], false, function (require, exports, module) {
            module.exports = Package['react-runtime'].React.require(m);
        });
    });
