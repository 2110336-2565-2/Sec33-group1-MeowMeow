export class LoginRequest {
  email: string;
  password: string;
}

export class LoginResponse {
  message: string;
}

export class AccountMetadata {
  userId: number;
  username: string;
  role: string;
}

export class LogoutRequest {}

export class LogoutResponse {
  message: string;
}
