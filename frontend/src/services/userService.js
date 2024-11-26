import { api, requestConfigs } from "../utils/config";

const profile = async (data, token) => {
  const config = requestConfigs("GET", data, token);

  try {
    const request = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return request;
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (data, token) => {
  const config = requestConfigs("PUT", data, token, true);

  try {
    const request = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return request;
  } catch (error) {
    console.log(error);
  }
};

// get user details
const getUserDetails = async (id) => {
  try {
    const config = requestConfigs("GET");
    const request = await fetch(api + "/users/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return request;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
