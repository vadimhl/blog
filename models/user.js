const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =  mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    name: String,
    blogs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
        }
      ],
})
userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', {
    transform: ( doc, retObj ) => {
        retObj.id = retObj._id.toString();
        delete retObj.passwordHash;
        delete retObj._id;
        delete retObj.__v;
    }
})

module.exports = mongoose.model('User', userSchema);