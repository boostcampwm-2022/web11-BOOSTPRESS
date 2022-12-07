export interface Env {
    DATABASE_URL: string;

    REDIRECT_URL: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    SERVER_ACCESS_TOKEN: string;
    SERVER_USER_NAME: string;
    SERVER_USER_EMAIL: string;

    JWT_SECRET: string;
    JWT_LIFESPAN: number;
    LOGIN_LIFESPAN: number;

    NCLOUD_IMAGE_ENDPOINT: string;
    NCLOUD_IMAGE_ACCESSKEY: string;
    NCLOUD_IMAGE_SECRETKEY: string;
    NCLOUD_IMAGE_BUCKET: string;
    NCLOUD_IMAGE_REGION: string;

    TWITTER_CLIENT_ID: string;
    TWITTER_CLIENT_SECRET: string;
    TWITTER_REDIRECT_URL: string;

    LINKEDIN_CLIENT_ID: string;
    LINKEDIN_CLIENT_SECRET: string;
    LINKEDIN_REDIRECT_URL: string;

    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
    FACEBOOK_REDIRECT_URL: string;
}
