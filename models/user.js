import mongoose, { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
)

export default models.User || model('User', userSchema)