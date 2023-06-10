import config from '../../../config/index'
import { User } from './user.model'
import { IUser } from './users.interface'
import { genaretUserId } from './users.utiles'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto genated incremental id-
  const id = await genaretUserId()
  user.id = id

  //default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('failed to create user')
  }
  return createUser
}

export default {
  createUser,
}
