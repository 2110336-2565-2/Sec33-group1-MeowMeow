/* eslint turbo/no-undeclared-env-vars: 0 */

export type BackendConfig = {
  port: number;
  bcrypt: {
    hashRound: number;
  };
  mediaStorage: {
    local: {
      rootDir: string;
    };
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
  cors: {
    enable: boolean;
    allowOrigin: string[];
  };
  //   graphql: {
  //     debug: boolean;
  //     playground: boolean;
  //   };
  omise: {
    secretKey: string;
  };
};

export const loadBackendConfig = (): BackendConfig => {
  if (!process.env.BACKEND_OMISE_SECRET_KEY) {
    throw new Error("BACKEND_OMISE_SECRET_KEY is not set");
  }

  return {
    port: parseInt(process.env.BACKEND_PORT ?? "", 10) || 3000,
    bcrypt: {
      hashRound:
        parseInt(process.env.BACKEND_BCRYPT_HASH_ROUND ?? "", 10) || 10,
    },
    mediaStorage: {
      local: {
        rootDir: process.env.BACKEND_MEDIASTORAGE_LOCAL_ROOTDIR ?? "",
      },
    },
    jwt: {
      secret: process.env.BACKEND_JWT_SECRET ?? "xxxx-9ababe0jge9j",
      expire: parseInt(process.env.BACKEND_JWT_EXPIRE ?? "", 10) || 600,
      refreshExpire:
        parseInt(process.env.BACKEND_REFRESH_TOKEN_EXPIRE ?? "", 10) || 864000,
    },
    swagger: {
      enable: process.env.BACKEND_SWAGGER_ENABLE === "true",
      prefixPath: process.env.BACKEND_SWAGGER_PREFIX_PATH ?? "api",
    },
    cors: {
      enable: process.env.BACKEND_CORS_ENABLE === "false",
      allowOrigin: (
        process.env.BACKEND_CORS_ALLOW_ORIGIN ?? "http://localhost:3000"
      ).split(","),
    },
    omise: {
      secretKey: process.env.BACKEND_OMISE_SECRET_KEY,
    },
  };
};
