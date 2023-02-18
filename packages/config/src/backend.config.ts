/* eslint turbo/no-undeclared-env-vars: 0 */

export type BackendConfig = {
  port: number;
  bcrypt: {
    salt: number;
  };
  jwt: {
    secret: string;
    expire: number;
    refreshExpire: number;
  };
  swagger: {
    enable: boolean;
    prefixPath: string;
  };
  //   graphql: {
  //     debug: boolean;
  //     playground: boolean;
  //   };
};

export const loadBackendConfig = (): BackendConfig => ({
  port: parseInt(process.env.BACKEND_PORT ?? "", 10) || 3000,
  bcrypt: {
    salt: Number(process.env.BACKEND_BCRYPT_SALT) ?? 10,
  },
  jwt: {
    secret: process.env.BACKEND_JWT_SECRET ?? "xxxx-9ababe0jge9j",
    expire: Number(process.env.BACKEND_JWT_EXPIRE) ?? 600,
    refreshExpire: Number(process.env.BACKEND_REFRESH_TOKEN_EXPIRE) ?? 864000,
  },
  swagger: {
    enable: process.env.BACKEND_SWAGGER_ENABLE === "true",
    prefixPath: process.env.BACKEND_SWAGGER_PREFIX_PATH ?? "api",
  },
});
