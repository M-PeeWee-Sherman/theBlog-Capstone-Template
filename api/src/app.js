const express = require('express');
const bcrypt = require('bcryptjs');
var cors = require('cors');
const app = express();
app.use(cors());
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

app.get('/',(req,res)=>{
    console.log(`Root Called ${Object.keys(req)}`);
    res.status(200).json('Hello from root route');
})

app.get('/posts', (req,res)=>{
    console.log("GET posts");
    knex.select('*').from('posts').then((data)=>res.status(200).json(data))
    .catch(err =>
        res.status(404).json({
          message:
            `The data you are looking for could not be found. Please try again${err}`
        })
      );
})

 app.get('/posts/:users_id', (req,res)=>{
    console.log("posts/users_id");
    knex.select('*').from('posts').where({users_id:req.params.users_id}).then((data)=>res.status(200).json(data))
    .catch(err =>
        res.status(404).json({
          message:
            `The data you are looking for could not be found. Please try again${err}`
        })
      );
 })

 //Update Post
 app.post('/posts', (req,res)=>{
    console.log("POST posts");
    if (req.body){
    let data = req.body;
    //console.log("Body:" +req.body);
    knex('posts').returning('id').insert(data).then(id=>{
        return res.status(201).json(id);
    });
    }else{console.log("Request POST Body is Null")}
})

 //Update Post
app.put('/posts', (req,res)=>{
    if (req.body){
        let id = req.body.id;
        let data = req.body;
        delete data.id;
    knex('posts').where({id}).update(data).then(()=>{
        return res.status(201).json(id);
    });
    }else{console.log("Request PUT Body is Null")}
})

app.delete('/posts/:id', (req,res)=>{
    let id = req.params.id;
    //console.log(`Received request to delete ${id}`)
    
    knex('posts').where({id}).del().then(()=>{
        return res.status(201).json(id);
    });

})

//Get All User Details
app.get('/users', (req,res)=>{
    console.log("GET users");
    //let users_id = req.params.users_id;
    knex('users').select(['id','firstname','lastname','username'])
    .then((data)=>res.status(200).json(data));
});

const saltRounds = 10;
//Create User
app.post('/users', (req,res)=>{
    console.log("POST users");
    //console.log(`Post User Pinged for creation of ${req.body.username}`)
    let data = req.body;
    //knew('users').where({data.username}).count('active').then((total)=>{
    // if(parseInt(total)>0){now allow entry of username}
    //})
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(data.password, salt);

    data.password = hash;
    knex('users').returning('id').insert(data).then((id)=>{
        //console.log(`id ${id} added`)
        return res.status(201).json(id);})
        //.catch(err => {console.log(`create User${data.username} Error: ${err}`)});

});

//Check submission and generate a 'key'
app.post('/login',(req,res)=>{
    console.log("POST login");
    var sentPW = req.body.password;
    var username = req.body.username;
    //console.log(`received username:${username} and password:${sentPW}`)
    //let salt = bcrypt.genSaltSync(saltRounds);
    //let hash = bcrypt.hashSync(sentPW, salt);
    
    knex('users').where({username}).select('id','password').then((query)=>{
        //console.log(`password hash:${hash}`)
        //console.log(`${Object.keys(query[0])} passwordquery response:${query[0].password}`)
        if (query.length>0 && query[0].password && bcrypt.compareSync(sentPW, query[0].password)){
            console.log(`It matches for user ${query[0].id}`);
            return res.status(200).json({users_id:query[0].id});
        }else
        {
            console.log(`No Match found`);
            return res.status(401).json({users_id:0})
        }
    })
    //.catch(err => {console.log(`login${username} Error: ${err}`)});
})

module.exports = app;

