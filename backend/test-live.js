const https = require('https');

const data = JSON.stringify({
  name: 'Test Live User',
  email: 'test@example.com',
  message: 'This is a test from the API call'
});

const options = {
  hostname: 'solarx-backend.onrender.com',
  port: 443,
  path: '/api/form/submit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
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
