import axios from 'axios';

const API_URL = 'http://localhost:5001/api/v1/books'; 

export const AddBook = async (userData) => {
  return axios.post(`${API_URL}/add`, userData);
};

export const UpdateBook = async (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData);
};

export const  UniqueBook= async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const AllBooks = async () => {
  return axios.get(API_URL);
};

export const RemoveBook = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
