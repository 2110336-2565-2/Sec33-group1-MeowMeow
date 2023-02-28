export class DeletePostRequest {
  // Todo: Implement this
}

export class DeletePostResponse {
  // Todo: Implement this
  message: string;
  id: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  tags: string[];
  fee: number;
}
