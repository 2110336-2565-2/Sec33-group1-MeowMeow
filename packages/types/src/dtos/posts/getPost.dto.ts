import { PickType } from "@nestjs/swagger";
import { Post } from "./post.dto";

export class GetPostResponse extends PickType(Post, [
  "message",
  "id",
  "authorId",
  "title",
  "content",
  "tags",
  "fee",
  "createdAt",
  "updatedAt",
] as const) {}
