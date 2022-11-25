export interface Env {
    DATABASE_URL: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    SERVER_ACCESS_TOKEN: string;
    SERVER_USER_NAME: string;
    SERVER_USER_EMAIL: string;

    JWT_SECRET: string;
    JWT_LIFESPAN: number;
    LOGIN_LIFESPAN: number;
}
