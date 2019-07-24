import { axiosCall, axios } from '@utils/axiosConfig';
import { saveUser } from '@actions/Auth';

export const startUpdate = () => ({
  type: 'UPDATE_START',
  payload: {
    isLoading: true,
    isCompleted: false,
  },
});

export const updateSuccess = user => ({
  type: 'UPDATE_SUCCESS',
  payload: {
    isLoading: false,
    user,
    isError: false,
    isCompleted: true,
    message: 'Profile Successfully Updated',
  },
});

export const updateFailure = error => ({
  type: 'UPDATE_FAILURE',
  payload: {
    isLoading: false,
    user: null,
    isError: true,
    isCompleted: true,
    message: error,
  },
});

export const getImgLink = async (pictureFile) => {
  const imgForm = new FormData();
  imgForm.append('image', pictureFile);
  imgForm.append('name', pictureFile.name);
  const imgurApiUrl = 'https://api.imgur.com/3/image';
  const response = await axios.post(imgurApiUrl, imgForm, {
    headers: { Authorization: 'Client-ID 163ceaad1d6ed26' },
  });

  const imgLink = response && response.data && response.data.data && response.data.data.link;
  return imgLink;
};


export const updateAction = {
  updateUser: payload => async (dispatch) => {
    try {
      let res;
      await dispatch(startUpdate());
      if (payload.pictureFile) {
        const imgLink = await getImgLink(payload.pictureFile);
        const updateData = { ...payload, profilePic: imgLink };
        res = await axiosCall({ path: 'user/update', method: 'put', payload: updateData });
      } else {
        res = await axiosCall({ path: 'user/update', method: 'put', payload });
      }
      const userData = res && res.data;
      await dispatch(saveUser(userData));
    } catch ({ response, message }) {
      if (response) {
        await dispatch(updateFailure(response.data.error));
        return;
      }
      await dispatch(updateFailure(message));
    }
  },
};
