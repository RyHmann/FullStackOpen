const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [3, 'Username too short, must be at least 3 characters'],
        required: true,
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            id: String,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)