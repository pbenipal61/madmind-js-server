const http = require('http');

const app = require('./app');
const https = require("https");
const fs = require("fs");
const port = 80;
const https_port = 443;



const http_server = http.createServer(app);

// http_server.listen(port, () => {
//     console.log("HTTP server up");
// });

const privateKey = fs.readFileSync('/etc/letsencrypt/live/joelmaenpaa.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/joelmaenpaa.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/joelmaenpaa.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const https_server = https.createServer(credentials, app);
https_server.listen(https_port, () => {
    console.log(`HTTPS server up`);
});



