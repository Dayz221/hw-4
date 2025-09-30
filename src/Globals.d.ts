declare module "*.module.css";
declare module "*.module.scss";
declare module "*.scss";


interface ImportMetaEnv {
	readonly VITE_STRAPI_TOKEN?: string;
	readonly VITE_API_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}