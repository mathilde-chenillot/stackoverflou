import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import uniqueValidator from 'mongoose-unique-validator';

const userSchema = Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    nickname: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    creationDate: { type: Date, required: true},
});

userSchema.plugin(uniqueValidator); // to have a unique mail in the database

const User =  model('User', userSchema);

export default User;
// module.exports = model('User', userSchema);