const express = require('express');
const router = express.Router();

// Controller
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoId, updatePhoto, likePhoto, commentPhoto, searchPhoto} = require('../controllers/photoController')

// Middleware
const validate = require('../middlewares/handleValidation')
const authGuart = require('../middlewares/AuthGuard');
const {photoInsertValidation, photoUpdateValidation, photoCommentValidation} = require('../middlewares/photoValidation');
const {imgUpload, imageUpload} = require('../middlewares/imageUpload');

// routes
router.post('/', authGuart, imageUpload.single('image'), photoInsertValidation(), validate, insertPhoto)
router.delete('/:id', authGuart, deletePhoto)
router.get('/', authGuart, getAllPhotos)
router.get('/user/:id', authGuart, getUserPhotos)
router.get('/search', authGuart, searchPhoto)
router.get('/:id', authGuart, getPhotoId)
router.put('/:id', authGuart, photoUpdateValidation(), validate, updatePhoto)
router.put('/like/:id',authGuart, likePhoto);
router.put('/comment/:id', authGuart, commentPhoto);

module.exports = router;