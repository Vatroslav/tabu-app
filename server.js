const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/endpoint', (req, res) => {
  res.json({ message: 'This is CORS-enabled for all origins!' });
});

app.listen(3000, () => {
  console.log('CORS-enabled web server listening on port 3000');
});
