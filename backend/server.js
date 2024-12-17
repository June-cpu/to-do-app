require('dotenv').config();
const express = require('express');  
const mongoose = require('mongoose'); 
const cors = require('cors');  
require('dotenv').config();  

const app = express();  


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello from the To-Do API!');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const tasksRouter = require('./routes/tasks'); 
app.use('/api/tasks', tasksRouter); 

