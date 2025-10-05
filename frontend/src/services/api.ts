import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quizz-app-ijaf.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
