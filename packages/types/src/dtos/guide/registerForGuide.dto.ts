export class RegisterForGuideRequest {
  userId: number;
  certificate: Buffer;
}

export class RegisterForGuideResponse {
  message: string;
  guideId: number;
  certificate: string;
}
