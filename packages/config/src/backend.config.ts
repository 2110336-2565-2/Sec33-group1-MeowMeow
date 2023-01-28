/* eslint turbo/no-undeclared-env-vars: 0 */

export type BackendConfig = {
  port: number;
  //   bcrypt: {
  //     salt: number;
  //   };
  //   jwt: {
  //     secret: string;
  //     expire: number;
  //   };
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
  swagger: {
    enable: process.env.BACKEND_SWAGGER_ENABLE === "true",
    prefixPath: process.env.BACKEND_SWAGGER_PREFIX_PATH ?? "api",
  },
});
