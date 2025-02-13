const express = require('express')
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express();  //creates a express server or application
app.use(cors());

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("hello");
})


app.use('/ai', aiRoutes)

module.exports = app;
