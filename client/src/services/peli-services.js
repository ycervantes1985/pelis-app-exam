import axios from 'axios';

export const createPeli = (peli) => {
    const newPeli = axios.post('/api/peli', peli);
    return newPeli;
}

export const getAllPelis = () => axios.get('/api/peli');

export const deletePeli = (id) => axios.delete(`/api/peli/${id}`);

export const updatePeli = (id, peli) => axios.put(`/api/peli/${id}`, peli);

export const getPeli = (id) => axios.get(`/api/peli/${id}`);

export const addCommentToPeli = (id, review) => axios.post(`/api/peli/review/${id}`, review);