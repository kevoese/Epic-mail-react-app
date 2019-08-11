import { axios } from '@utils/axiosConfig';

/* istanbul ignore next */
// eslint-disable-next-line import/prefer-default-export
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
