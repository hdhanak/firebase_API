const {auth,  admin } = require('./config');
module.exports = (req:any, res:any, next:any) => {
const token = req.header('Authorization').replace('Bearer', '').trim()
var user = auth.currentUser;
console.log(user,'user');

if (user) {
   admin.auth().verifyIdToken(token)
  .then(function (decodedToken:any) {
      if(decodedToken.uid === user.uid)
      {
        console.log(user.uid,'user.uid');
        
         req.user = user.uid
         return next()
      }
   }).catch(function (error:any) {
    console.log(error,'erro token');
    
     //Handle error
   });
} else {
   console.log("There is no current user.");
   return res.send("There is no current user")
}
};
