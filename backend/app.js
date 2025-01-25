const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) =>{
  const posts = [
    {
      title: 'First Post',
      content: 'This is the first post'
    },
    {
      title: 'Second Post',
      content: 'This is the second post'
    },
    {
      title: 'Third Post',
      content: 'This is the third post'
    }
  ]
  res.json({
    posts
  })
})

module.exports = app;
