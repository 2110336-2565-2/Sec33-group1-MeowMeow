import { PickType } from "@nestjs/swagger";
import { Post } from "./post.dto";

export class GetPostResponse extends PickType(Post, [
  "message",
  "id",
  "authorId",
  "title",
  "content",
  "tags",
  "locations",
  "fee",
  "maxParticipant",
  "contactInfo",
  "createdAt",
  "updatedAt",
] as const) {}
