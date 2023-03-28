import { PickType } from "@nestjs/swagger";
import { Post } from "./post.dto";

export class DeletePostResponse extends PickType(Post, [
  "message",
  "id",
  "authorId",
  "createdAt",
  "updatedAt",
  "title",
  "content",
  "tags",
  "locations",
  "maxParticipant",
  "contactInfo",
  "fee",
] as const) {}
