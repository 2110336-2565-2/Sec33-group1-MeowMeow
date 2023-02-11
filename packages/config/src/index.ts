import * as dotenv from "dotenv";
import { BackendConfig, loadBackendConfig } from "./backend.config";
import { FrontendConfig, loadFrontendConfig } from "./frontend.config";

dotenv.config();

export const backendConfig: BackendConfig = loadBackendConfig();
export const frontendConfig: FrontendConfig = loadFrontendConfig();
