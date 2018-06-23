const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const User = require();

const schema = mongoose.Schema;

const userSchema = new schema({
    username:{type:String, required:true},
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
});

const User = module.exports = mongoose.model("User",userSchema);

module.exports.saveUser = function (newUser, callback) {
         //This function is used to hash the password.bcryptjs used.
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;

            if(err) throw err;
            newUser.save(callback);
        });
    });

};
module.exports.findByEmail = function (email, callback) {
  const query = {email: email};
  User.findOne(query, callback);

};

