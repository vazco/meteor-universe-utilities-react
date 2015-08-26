System.config({
    packages: {
        '{universe:utilities-react}': {
            main: 'index',
            format: 'register',
            map: {
                '.': System.normalizeSync('{universe:utilities-react}')
            }
        }
    }
});