import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'https://nexus-school-server.vercel.app'
});

const useAxiosInstance = () => {
    return axiosInstance;
}

export default useAxiosInstance;