import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  savedItem: {
    type: [String],
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
})

export const User = model<IUser, UserModel>('User', userSchema)
