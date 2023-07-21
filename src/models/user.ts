import mongoose from "mongoose";
import { Password } from "../services/password";

//what it takes to create a user schema.
interface userProperties {
    email: string,
    password: string
}

//what the entire collection of user looks like or methods associated with user model
interface userModel extends mongoose.Model<userDoc> {
    build(properties: userProperties): userDoc;
}

//what properties a single user has
interface userDoc extends mongoose.Document {
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false
    }
});

userSchema.pre('save', async function(done) {
   if(this.isModified('password')) {
    const hashedPwd = await Password.toHash(this.get('password'));
    this.set('password', hashedPwd);
   } 
   done();
});

//This is how custom functions are built into the schema of a model.
userSchema.statics.build = (properties: userProperties) => {
    return new User(properties);
};

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };