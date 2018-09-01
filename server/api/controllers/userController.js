import mongoose from 'mongoose'
const User = mongoose.model('User')

export const registerUser = async (req, res, next) => {
  const user = new User({ email: req.body.username, username: req.body.username })
  await User.register(user, req.body.password)
  next()
}
