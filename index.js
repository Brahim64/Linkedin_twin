var express=require('express')
var app=express()

app.set('engine view','ejs')

app.use(express.static('public'));//this line help express to know that public have static files and must use them when needed


app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.get('/signup',(req,res)=>{
    res.render('SignUp.ejs')
})
app.get('/profil',(req,res)=>{
    res.render('profil.ejs')
})
app.listen(8080,()=>{
    console.log("server is running successfully ... ")
})