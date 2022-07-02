const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getChefe,
  getAllChefes,
} = require('../controllers/userController.js')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/chefes').get(getAllChefes)
router.route('/chefes/:id').get(getChefe)

module.exports = router
