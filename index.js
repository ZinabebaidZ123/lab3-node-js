const fs=require('fs');
const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(function(req,res,next){
    console.log(" we are middleware") 
    next();
})
let users;

app.post('/register',function(req,res){
    console.log(req.body)
if(req.body.fname =='' ||  req.body.username=='' ||req.body.password==''){
    res.send('all filed is required');
   
}else{
    
    res.send(`message:user was registered successfully${JSON.stringify(req.body)}`);
    users= JSON.parse(fs.readFileSync('users.text','utf-8'))
    console.log(users)
    users.push(req.body);
    fs.writeFileSync('users.text', JSON.stringify(users))

}   
})

app.post('/login',function(req,res){
    users= JSON.parse(fs.readFileSync('users.text','utf-8'))
    console.log(req.body)
    console.log(users)
    let login=false;
    let message;
    let error={error:'invalid credentials' };
    users.forEach(element => {
        if(element.username == req.body.username && element.password == req.body.password){
             message={message: "logged in successfully", name:req.body.usernam}
           login=true;
        }
    });
    if(login == true){
        res.send(JSON.stringify(message));
    }else{

        res.send(JSON.stringify(error)); 
    }
   
})


app.get('/todo',function(req,res){

    res.send(fs.readFileSync('data.json','utf-8'))

})




app.post('/todo',function(req,res){
console.log(req.body)
    let todo= JSON.parse(fs.readFileSync('data.json','utf-8'))
    todo.push({title: req.body.title ,uername: req.body.username})
    fs.writeFileSync("data.json",JSON.stringify(todo))
    res.send("success")

})




app.get('/todo/:id',function(req,res){
    console.log(req.params.id)

        let todo= JSON.parse(fs.readFileSync('data.json','utf-8'))
        console.log(todo)
        res.send(todo[parseInt(req.params.id)-1])
    
    })





app.listen(4000,function()
{
    console.log('welcome')
})