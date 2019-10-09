import bcrypt from 'bcrypt';
const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const { Schema } = mongoose;

const roles = ['user', 'admin'];


const userSchema = new Schema({
        firstname: { 
            type: String, 
            validate: validators.isAlpha(), 
            trim: true,
            maxlength: 128,
            required: true 
        },
        lastname: { 
            type: String, 
            validate: validators.isAlpha(), 
            trim: true,
            maxlength: 128,
            required: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: validators.isEmail()
        },
        role: { 
            type: String, 
            enum: roles, 
            trim: true,
            default: 'user'
        },
        password: { 
            type: String, 
            required: true,
            trim: true,
            validate: validators.isLength(6,128)
        },
    }, 
    {
        timestamps: true
    }
);

mongoose.model('user', userSchema);

let UserModel = mongoose.model('user', userSchema);

UserModel.getAll = () => {
    return UserModel.find({});
};

UserModel.getByEmail = (email) => {
    return UserModel.findOne({email: email});
};

UserModel.deleteByEmail = (email) => {
    return UserModel.remove({email: email});
};

UserModel.comparePassword = (password1, password2) => {
    return bcrypt.compare(password1, password2);
};


export default UserModel;