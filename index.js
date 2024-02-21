var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',(req,res)=> console.log('Error in connecting to Database'))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phon=req.body.phon
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phon":phon,
        "gender":gender,
        "password":password
    }
    db.collection('user').insertOne(data,(err,colletion)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Suessfully")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res)=> {
    res.set({
        "Allow-aess-Allow-origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on Port 3000")