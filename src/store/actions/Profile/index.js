import { axiosCall } from '@utils/axiosConfig';
import { saveUser, setUser } from '@actions/Auth';
import { getImgLink } from '@utils';

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
      await dispatch(updateSuccess());
      saveUser({ user: userData });
      await dispatch(setUser({ user: userData }));
    } catch ({ response, message }) {
      /* istanbul ignore next */
      if (response) {
        await dispatch(updateFailure(response.data.error));
        return;
      }
      /* istanbul ignore next */
      await dispatch(updateFailure(message));
    }
  },
};
