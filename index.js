const http = require('http');

const app = require('./app');

const port = 3000;



const http_server = http.createServer(app);

http_server.listen(port, () => {
    console.log("HTTP server up");
});



