const server = require('./src/app');
const config = require('./src/configs/config');

server.listen(config.server.port, () => {
    console.log('server puerto:', config.server.port);
});