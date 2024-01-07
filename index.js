var express=require('express');
var mongoose=require("mongoose");
const bodyParser = require('body-parser');
var app=express();

mongoose.connect("mongodb://localhost:27017/test");
const User = require('./models/User');

app.set('engine view','ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.get('/signup',(req,res)=>{
    res.render('SignUp.ejs')
})
app.post('/profil', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    
    if (user) {
      res.render('profil.ejs',{
        username:req.body.username,
        univ:user.univ,
        profession:user.profession
      });
    } else {
      res.render('login.ejs', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.log(error);
  }
});
app.post('/login', async (req, res) => {
  const { username, password, email, univ, profession } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('SignUp.ejs', { error: 'Username is already taken' });
    }

    const newUser = new User({
      username,
      password,
      email,
      univ,
      profession
    });
    await newUser.save();

    res.render('login.ejs',{created:"Account created"}); 
  } catch (error) {
    console.log(error);
  }
});


/*app.get('/profil',(req,res)=>{
    res.render('profil.ejs')
})*/
app.listen(8080,()=>{
    console.log("server is running successfully ... ")
})