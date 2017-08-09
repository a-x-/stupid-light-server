const express = require('express')
const app = express()
const child_process = require('child_process')
const getStatus = () => parseInt(child_process.execSync('gpio -1 read 22', {encoding: 'utf8'}), 10);

app.get('/', function (req, res) {
  const status = getStatus();
  console.log('status', status)
  res.send(`Hello World! [${status ? 'on' : 'off'}]
    ${!status ? '<a href="/on">on</a>'
             : '<a href="/off">off</a>'}
  `)
});

app.get('/on', (req, res) => {
  child_process.exec('light 1');
  res.end('<html><head><meta http-equiv="refresh" content="3;url=/"></head><boby>sent</body></html>');
});

app.get('/status', (req, res) => {
  const status = getStatus();
  res.end(status ? 'on' : 'off');
});

app.get('/off', (req, res) => {
  child_process.exec('light 0');
  res.end('<html><head><meta http-equiv="refresh" content="3;url=/"></head><boby>sent</body></html>');
});

app.listen(3000)
console.log('listen 3000')
