import express from 'express'
import { MongoClient } from 'mongodb';
const url='mongodb://localhost:27017'
const app=express();
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
const client=new MongoClient(url);
client.connect().then(async (connection)=>{
    const dbName=connection.db('class')
    const collection=dbName.collection("Students")
    const result=await collection.find().toArray()
   console.log(result.length)
    app.get('',(req,resp)=>{
    resp.render('firstPage')
})
app.get('/student',(req,resp)=>{
    resp.render('student.ejs',{result:result})
})
app.get('/new',(req,resp)=>{
    resp.render('new.ejs')
})
app.get('/update',(req,resp)=>{
    resp.render('update.ejs')
})
app.get('/home',(req,resp)=>{
    resp.render('home.ejs')
})
app.post('/submit',async (req,resp)=>{
     await collection.insertOne(req.body)
    resp.send("<h1>Your deta is saved </h1>")
})

})






app.listen(6200)