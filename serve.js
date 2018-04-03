var apm = require('elastic-apm-node').start({
    serviceName: 'Count Down as a Service',
    secretToken: '',
    serverUrl: 'http://localhost:8200'
})

require('./lib/server.js').startUp({ port: process.env.PORT || 8080 });
