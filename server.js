const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')

const UserRoute = require('./routes/UserRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const app = express()
const port = process.env.PORT || 3000

var cors = require('cors')
 
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});



// Routes
app.use('/api/user', UserRoute);
app.use('/api/user/post', postRoute);
app.use('/api/user/comment',commentRoute);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log('Server started on port', port);
      console.log('Connected to database');
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });