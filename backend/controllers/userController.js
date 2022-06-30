const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken.js')
const { cloudinary } = require('../utils/cloudinary')

//@des Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body

  //Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  //Find if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(401)
    throw new Error('User already exists')
  }
  //Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const uploadedResponse = await cloudinary.uploader.upload(image, {
    upload_preset: 'Add-recepies',
  })

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    image: uploadedResponse.url,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: uploadedResponse.url,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@des Login a User
//@route /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  //check  user and password mach
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

//@des Get user
//@route /api/users/:id
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if(!user) {
    res.status(401)
    throw new Error('user not found')
  }
  res.status(200).json(user)
})

//@des Fetch all users
//@route Get /api/users/all
//@access public
const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({}).select('-password')
  if (allUsers) {
    res.status.json(allUsers)
  } else {
    res.status(404)
    throw Error('Users Not Found')
  }
})

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
}
