//Imports
const express = require('express');
const Users = require('./users/model');

//Instance of Express App
const server = express();


//Global Middleware
server.use(express.json());//teaches express to parse request bodies as JSON//

//Endpoints

//Post Endpoints//
server.post('/api/users', async (req, res)=>{
    try{
        const {id, name, bio}=req.body;

        if(!name || !bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }
        else{
            const newPerson = await Users.insert({id, name, bio})
            res.status(201).json(newPerson);
        }
    } 
    catch{
        res.status(500).json({ 
            message: "There was an error while saving the user to the database" })
    }
})
//Post Endpoints//

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
        }
        else {
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

server.get('/api/users/:id', async (req, res)=>{
    try{
        const {id}=req.params;
        const user= await Users.findById(id);
        if(!user){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }
        else{
            res.status(200).json(user)
        }

    }
    catch(err){
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})
//Get Enpoints//

//Delete Endpoints//
//Delete Endpoints//

//



//Exposing the server to other modules
module.exports = server; // EXPORT YOUR SERVER instead of {}
