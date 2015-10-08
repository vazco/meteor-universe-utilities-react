System.registerDynamic("react", [], false, function(require, exports, module) {
    module.exports = Package['react-runtime'].React;
});

System.registerDynamic("react/addons", [], false, function(require, exports, module) {
    module.exports = Package['react-runtime'].React;
});