import APIClient from "../APIClient";

const STRAPI = new APIClient("https://front-school-strapi.ktsdev.ru/api", process.env.STRAPI_TOKEN);

export default STRAPI;
