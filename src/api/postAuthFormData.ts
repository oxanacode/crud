import axios from 'axios';

import { AuthFormData } from '../components/AuthForm';
import { AUTH, BASE_PATH, HOST } from '../constants/HOST';

export const postAuthFormData = (formData: AuthFormData) => {
  return axios.post(`${HOST}${BASE_PATH}${AUTH}`, formData);
};
