export const login = (req, res, next) => {
  res.json({ email: req.user.email })
}

export const logout = () => {

}
