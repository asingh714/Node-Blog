const uppercase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next()
}


module.exports = uppercase;