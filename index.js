const { log } = require("console");
const express = require("express");
const { parse } = require("path");

const app = express()
const port = 3000

app.use(express.urlencoded({extended:false}));

let users = [
    {"id":1, "name":"arif"},
    {"id":2, "name":"budi"},
    {"id":3, "name":"cecep"},
];

app.get('/users', (req, res, next) => {
    res.json({message:'success', data:users})
})

app.get('/users/:id', (req, res, next) => {
    let id = req.params.id
    console.log('get id', id);
    let user = users.id
    console.log('get id', id);
    users.forEach((item => {
        if(item.id==id){
            user = item
        }
    }));
    if(!user){
        res.status(404).json({message:'user not found'})
    }
    console.log('get id', id);
    console.log('get user', user);
    res.json({message:'success get data user', data:users})
})

app.put('/users/:id', (req, res, next) => {
    let id = req.params.id
    let {name} = req.body
    console.log('get id', id);
    console.log('get name', name);
    
    let user
    let new_users = users.map((item)=>{
        if (item.id ==id){
            item.name = name
            user = item,
            console.log(('get new id & name'));
            return item
        } else {
            return item
        }
    })
    if(!user){
        res.status(404).json({message:'user not found, failed update data'})
    }
    users = [... new_users]
    res.json({message:'success update user', data:users})
})

app.delete('/users/:id', (req, res, next) => {
    let id = req.params.id
    console.log('get id', id);

    let user;
    let new_users = [];
    users.forEach((item)=>{
        if (item.id ==id){
            user = item
        } else {
            new_users = [...new_users, item]
        }
    })
    if(!user){
        res.status(404).json({message:'user not found, failed delete data'})
    }
    users = [... new_users]
    res.json({message:`success delete user data ${user.name}`, data:users})
})

app.post('/users', (req, res, next) => {
    let {id, name} = req.body;
    users = [... users, {"id":parseInt(id), name}]
    res.json({message:'success input user', data:users})
})

app.get('/', (req, res, next) => {
    res.json({message:'success', data:'server success running on port 3000'})
})

app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
})