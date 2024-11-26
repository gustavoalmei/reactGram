import { api, requestConfigs } from "../utils/config";

// publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfigs("POST", data, token, true);
  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfigs("GET", null, token);
  try {
    const res = await fetch(api + "/photos/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete photo
const DeletePhoto = async (id, token) => {
  const config = requestConfigs("DELETE", null, token);
  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfigs("PUT", data, token);
  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update photo
const getPhotoId = async (id, token) => {
  const config = requestConfigs("GET", null, token);
  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// like a photo
const like = async (id, token) => {
  const config = requestConfigs("PUT", null, token);
  try {
    const res = await fetch(api + "/photos/like/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// comments a photo
const comments = async (data, id, token) => {
  const config = requestConfigs("PUT", data, token);
  try {
    const res = await fetch(api + "/photos/comment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Gett all photo
const getAllPhotos = async (token) => {
  const config = requestConfigs("GET", null, token);
  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Gett all photo
const searchPhoto = async (query, token) => {
  const config = requestConfigs("GET", null, token);
  try {
    const res = await fetch(api + "/photos/search?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  DeletePhoto,
  updatePhoto,
  getPhotoId,
  like,
  comments,
  getAllPhotos,
  searchPhoto,
};

export default photoService;
