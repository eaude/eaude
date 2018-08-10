import * as mongoose from 'mongoose'
import * as passportLocalMongoose from 'passport-local-mongoose'
import * as mongodbErrorHandler from 'mongoose-mongodb-errors'
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
  email: {
    type: String,
    required: 'please provied an email',
    trim: true,
    lowercase: true,
    unique: true
  }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

userSchema.plugin(mongodbErrorHandler)

export const Model = mongoose.model('User', userSchema)
