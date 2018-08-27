const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../db/queries')

router.get('/',(req, res)=>{
  res.json({
    message : '🔐'
  })
})

function validUser(user){
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && user.password.trim() != '';
  return validEmail && validPassword ;
  
}

router.post('/signup',(req, res, next)=>{
  if (validUser(req.body)) {
    User
      .getOneByEmailByuser(req.body.email)
      .then(user =>{
        // console.log('user' ,user)
        if(!user){
          bcrypt.hash(req.body.password, 7)
            .then((hash) => {
              const user = {
                email : req.body.email,
                password : hash             
              }
              User 
              .createNewUser(user)
              .then(id =>{
                  res.json({
                    id,
                  message :'✅'
                })
              })
          });
        }else{
          next (new Error('Email in use'))
        }
      })
   } else {
    next (new Error('Invalid user'))
   }
});

router.post('/login',(req,res,next)=>{
  if(validUser(req.body)){
    User
      .getOneByEmailByuser(req.body.email)
      .then(user => {
        console.log('user',user)
        console.log(req.body)
        if (user) {
          bcrypt.compare(req.body.password, user.password)
          .then((result)=> {
            console.log(result)
            if (result) {
              res.cookie('user_id', user.id, {
                httpOnly: true,
                secure: req.app.get('env') != 'development',
                signed: true
              })
              res.json({
                result,
                message : "Login 🔓"
              })
            } else {
              next(new Error('Invalid Login'))
            }
        });
        }else{
          next(new Error('Invalid DB LOGIN'))
        }
      })
  }else{
    next(new Error('Invalid Login'))
  }
});

module.exports= router;