import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: [],
  error: false,
  success: false,
  loading: false,
  message: false,
};

// funcoes
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.publishPhoto(photo, token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserPhotos = createAsyncThunk(
  "photo/userPhotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);
    return data;
  }
);

export const deletePhoto = createAsyncThunk(
  "photo/deletePhoto",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.DeletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const updatePhoto = createAsyncThunk(
  "photo/updatePhoto",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getPhotoId = createAsyncThunk(
  "photo/photoID",
  async (photoID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getPhotoId(photoID, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const like = createAsyncThunk(
  "photo/like",
  async (photoID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.like(photoID, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const comment = createAsyncThunk(
  "photo/comment",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.comments(
      { comment: photoData.comment },
      photoData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getAllPhotos = createAsyncThunk(
  "photo/AllPhotos",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getAllPhotos(token);
    return data;
  }
);

export const searchPhoto = createAsyncThunk(
  "photo/searchPhoto",
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.searchPhoto(query, token);
    return data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos.map((photo) => {
          if (photo._id == action.payload.id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getPhotoId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhotoId.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(like.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId);
        }
        state.photos.map((photo) => {
          if (photo._id == action.payload.photoId) {
            return photo.likes.push(action.payload.userId);
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(comment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.photo.comments.push(action.payload.comment);

        state.message = action.payload.message;
      })
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
