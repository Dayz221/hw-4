import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

class APIClient {
    client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            timeout: 1000
        })

        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("jwt");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        })
    }

    async get(path: string, options: AxiosRequestConfig = {}) {
        return await this.client.get(path, options);
    }

    async post(path: string, data: unknown = {}, options: AxiosRequestConfig = {}) {
        return await this.client.post(path, data, options);
    }

    async delete(path: string, options: AxiosRequestConfig = {}) {
        return await this.client.delete(path, options);
    }
}

export default APIClient