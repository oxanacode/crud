import axios from 'axios';

import { DataTableType } from '../components/DataTable';

import { BASE_PATH, GET_DATA, CREATE_DATA, SET_DATA, DELETE_DATA, HOST } from '../constants/HOST';

export const getTableData = async (token: string) => {
  const response = await axios.get(`${HOST}${BASE_PATH}${GET_DATA}`, {
    headers: {
      'x-auth': token,
    },
  });

  return response.data;
};

export const createTableRow = async (body: DataTableType, token: string) => {
  const response = await axios.post(`${HOST}${BASE_PATH}${CREATE_DATA}`, body, {
    headers: {
      'x-auth': token,
    },
  });

  return response.data;
};

export const setTableRow = async (id: string, body: DataTableType, token: string) => {
  const response = await axios.post(`${HOST}${BASE_PATH}${SET_DATA}${id}`, body, {
    headers: {
      'x-auth': token,
    },
  });

  return response.data;
};

export const deleteTableRow = async (id: string, token: string) => {
  const response = await axios.delete(`${HOST}${BASE_PATH}${DELETE_DATA}${id}`, {
    headers: {
      'x-auth': token,
    },
  });

  return response.data;
};
