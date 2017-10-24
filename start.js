const express = require('express');
const mongoose= require('mongoose');

const app = express();

const port =process.env.PORT || 5523;

app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
app.get('/', (req, res) => {
  res.send('This is the official KFCR application and it has just begun');
});
