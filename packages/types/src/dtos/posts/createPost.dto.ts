import { PickType } from "@nestjs/swagger";
import { Post } from "./post.dto";

export class CreatePostRequest extends PickType(Post, [
  "title",
  "content",
  "fee",
  "tags",
  "locations",
  "maxParticipant",
  "contactInfo",
] as const) {}

export class CreatePostResponse extends PickType(Post, [
  "message",
  "title",
  "content",
  "fee",
  "tags",
  "locations",
  "maxParticipant",
  "contactInfo",
  "id",
  "authorId",
  "createdAt",
] as const) {}
