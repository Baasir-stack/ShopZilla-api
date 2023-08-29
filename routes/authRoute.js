const router = require('express').Router()
const {register,login}  = require('../controllers.js/authController')

//register
router.post('/register',register)

router.post('/login',login)







module.exports  =router
