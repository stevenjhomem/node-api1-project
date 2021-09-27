//Imports
const express = require('express');
const Users = require('./users/model');



//Instance of Express App
const server = express();


//Global Middleware
server.use(express.json());//teaches express to parse request bodies as JSON//

//Endpoints


//Get Endpoints
server.get('/', (req, res)=>{
    console.log(`This is a ${req.method}`);
    res.json({message:'Hey Steven!'})
});

server.get('/api/users', async (req, res)=>{
    try {
        const users = await Users.find()
        if(!users){
            res.status(404).json({
                message: 'Users does not exist yet'
            })
        }else {
            res.status(200).json(users)
        }  
    } catch(err) {
        //handle error
            res.status(500).json({
            message: err.message,
            customMessage: 'Something happened while getting the users'
        })
    }
})
//Get Enpoints

//



//Exposing the server to other modules
module.exports = server; // EXPORT YOUR SERVER instead of {}
