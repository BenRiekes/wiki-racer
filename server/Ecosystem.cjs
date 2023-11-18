module.exports = {
    apps: [{
        name: 'wiki-racer',
        script: 'server/Server.js',
        env: {
            NODE_ENV: 'development',
            OPEN_AI_KEY: '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',
            OPEN_AI_ASSISTANT: 'asst_ZYH8Z1KeiTGIkXaqvbzXk3lC'
        },
    }]
}