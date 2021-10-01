const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =  mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    name: String,
})

userSchema.set('toJSON', {
    transform: ( doc, retObj ) => {
        retObj.id = retObj._id.toString();
        delete retObj._id;
        delete retObj.__v;
    }
})

module.exports = mongoose.model('User', userSchema);