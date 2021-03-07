'use strict';

const http = require('http');
const { HOST, PORT } = process.env;

const server = http.createServer((req, res) => {
	res.end('Hello from DevSays\n');
});
server.listen(PORT, HOST, () => {
	console.dir(`Server is running on http://${HOST}:${PORT}/`);
});
