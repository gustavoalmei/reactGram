const express = require('express');
const router = express.Router();

// Controller
const {register, login, getCurrentUser, update, getUserById} = require('../controllers/userController')

// Middleware
const validate = require('../middlewares/handleValidation')
const { userCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidations');
const authGuart = require('../middlewares/AuthGuard');
const {imageUpload} = require('../middlewares/imageUpload')

// routes
router.post('/register', userCreateValidation(), validate, register)
router.post('/login', loginValidation(), validate, login)
router.get('/profile', authGuart, getCurrentUser)
router.put('/', authGuart, userUpdateValidation(), validate, imageUpload.single("profileImage"), update)
router.get('/:id', getUserById)

module.exports = router;