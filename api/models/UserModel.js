import mongoose from 'mongoose'

const UserModel = mongoose.model(
    'User', 
    new mongoose.Schema({
        _id: { type: String, required: true },
        userName: { type:String, required: true }
    })
);

module.exports = UserModel;