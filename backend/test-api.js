const http = require('http');

const data = JSON.stringify({
  name: 'Test User API',
  email: 'test@example.com',
  message: 'This is a test from the API call'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/form/submit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error('Error connecting to backend:', error);
});

req.write(data);
req.end();
