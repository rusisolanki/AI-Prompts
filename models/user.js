import {Schema, model, models} from 'mongoose';

const UserModel = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required' ]
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String
    }
})

// Here usually everytime we input the values a new user model is created but in next js we instead check if that already exists and if it does then it does not create a new model
// Mongoose provides a 'models' object which stores all the registered models. If a model named 'User' already exists in the 'models' object it assigns that existing model to the 'User' variable. This prevents redefining the model and ensures that the existing model is reused.

const User = models.User || model('User', UserModel)
export default User;