require('dotenv').config();

const app = require('./src/app')

//to start server at some port, after starting the server, the callback function will run
app.listen(3000, ()=>{
    console.log(`The server is running on the http://localhost:3000`)
})