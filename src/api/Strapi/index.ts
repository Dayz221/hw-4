import APIClient from "../APIClient";

const STRAPI_BASE_URL = import.meta.env.VITE_API_URL || "https://front-school-strapi.ktsdev.ru/api";
const STRAPI = new APIClient(STRAPI_BASE_URL);

export default STRAPI;
