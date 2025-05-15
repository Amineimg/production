// src/api/axios.js
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true, // باش نخدمو بالكوكي (اختياري إذا كنت كتحط token ف Authorization فقط)
});
