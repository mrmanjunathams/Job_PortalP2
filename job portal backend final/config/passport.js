const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
const bcrypt=require('bcryptjs');
module.exports=function(passport){
  passport.use(new LocalStrategy(function(username,password,done){
    let query=(username:username);
    User.findOne(query,fuction(err,user){
      if(err) throw err;
      if(!user){
        return done(null,false,{message:"no user found"});
      }

      bcrypt.compare(password,user.password,fuction(err,isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null,user);
        } else{
          return done(null.false,{message:'Wrong password'});
        }
      });
    })

  }));
}
