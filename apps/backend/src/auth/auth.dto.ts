export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

export interface LogoutRequest {}

export interface LogoutResponse {
  message: string;
}
