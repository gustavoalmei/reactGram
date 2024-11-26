const Photo = require('../models/Photo.js');
const mongoose = require('mongoose');
const User = require('../models/User.js');

// insert a photo, with an user related to it
const insertPhoto = async(req, res)=>{
  const {title} = req.body;
  const image = req.file.filename;
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);
  
  // Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name
  })

  // if photo was created successfully, return data
  if(!newPhoto){
    res.status(422).json({
      errors:["Houve um problema, tente novamente mais tarde."]
    })
    return;
  }

  res.status(200).json(newPhoto);
}

// remove photo from db
const deletePhoto = async(req, res)=>{
  const {id} = req.params;
  const reqUser = req.user;
  try{
  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  // check if image exist
  if(!photo){
    res.status(404).json({errors:["Imagem não encontrada."]})
  }

  // Check if photo belongs to user
  if(!photo.userId.equals(reqUser._id)){
    res.status(422).json({erros:["Ocorreu um erro, por favor tente novamente mais tarde."]})
    return;
  }
  await Photo.findByIdAndDelete(photo._id);
  res.status(200).json({id: photo._id, message: "Foto excluída com sucesso."})
  }catch(error){
    res.status(404).json({errors:["Imagem não encontrada."]})
    return;
  }
}

// Get all photos
const getAllPhotos = async(req, res)=>{
  const photos = await Photo.find({}).sort([['createdAt', -1]]).exec();
  return res.status(200).json(photos);
};

// Get user photos
const getUserPhotos = async(req, res)=>{
  const {id} = req.params;
  const photoUser = await Photo.find({userId: id}).sort([['createdAt', -1]]).exec();
  return res.status(200).json(photoUser);
};

// Get photo ID
const getPhotoId = async(req, res)=>{
  const {id} = req.params;
  const searchPhoto = await Photo.findById(new mongoose.Types.ObjectId(id));
  
  // check photo exist
  if(!searchPhoto){
    res.status(404).json({erros:["Imagem não encontrada."]})
    return;
  }
  res.status(200).json(searchPhoto);
  return
};

// Update photo
const updatePhoto = async(req, res)=>{
  const {id} = req.params;
  const { title } = req.body;
  const reqUser = req.user;

  const findPhoto = await Photo.findById(new mongoose.Types.ObjectId(id));
    
  // check photo exist
  if(!findPhoto){
    res.status(404).json({erros:["Imagem não encontrada."]})
    return
  }

  // check photo belongs to user
  if(!findPhoto.userId.equals(reqUser._id)){
    res.status(422).json({erros:["Ocorreu um erro, tente novamente mais tarde."]})
    return
  }

  if(title){
    findPhoto.title = title;
  }

  await findPhoto.save();

  res.status(200).json({findPhoto, message: "Foto atualizada com sucesso."})
}

// Like functionality
const likePhoto = async(req, res)=>{
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
  
  // check photo exist
  if(!photo){
    res.status(404).json({erros:["Imagem não encontrada."]})
    return
  }

  // Check if user already liked the photo
  if(photo.likes.includes(reqUser._id)){
    res.status(422).json({errors:["Você já deu like na foto."]})
    return
  }

  // putt id user in likes array
  photo.likes.push(reqUser._id);
  
  photo.save();

  res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto foi curtida."});
}

// Comment functionality
const commentPhoto = async(req, res)=>{
  const {id} = req.params;
  const {comment} = req.body;
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);
  const photo = await Photo.findById(id);
  
  // check photo exist
  if(!photo){
    res.status(404).json({erros:["Imagem não encontrada."]})
    return
  }

  // put comment in the array comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id
  }
  photo.comments.push(userComment);
  await photo.save();
  res.status(200).json({comment: userComment, message: "O comentário foi adicionado com sucesso."})
}

// Search photo
const searchPhoto = async(req, res)=>{
  const {q} = req.query;
  const photo = await Photo.find({title: new RegExp(q, "i")}).exec();
  res.status(200).json(photo);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoId,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhoto
}