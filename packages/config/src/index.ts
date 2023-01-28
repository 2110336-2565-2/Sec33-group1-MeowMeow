import * as dotenv from "dotenv";
import { BackendConfig, loadBackendConfig } from "./backend.config";

dotenv.config();

export const backendConfig: BackendConfig = loadBackendConfig();
