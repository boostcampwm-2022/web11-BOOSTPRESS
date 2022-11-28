module.exports = {
    apps: [
        {
            name: 'backend',
            script: 'dist/main.js',
            instances: 0,
            exec_mode: 'cluster',
        },
    ],
};
