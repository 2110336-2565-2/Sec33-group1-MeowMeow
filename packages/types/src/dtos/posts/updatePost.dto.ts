import { PartialType, PickType } from "@nestjs/swagger";
import { CreatePostRequest } from "./createPost.dto";
import { Post } from "./post.dto";

export class UpdatePostRequest extends PartialType(CreatePostRequest) {}

export class UpdatePostResponse extends PickType(Post, [
  "message",
  "id",
  "authorId",
  "createdAt",
  "updatedAt",
  "title",
  "content",
  "tags",
  "locations",
  "fee",
  "maxParticipant",
  "contactInfo",
] as const) {}
