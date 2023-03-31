import apiClient from "@/utils/apiClient";

export const deletePost = async (id: number) => {
  return apiClient.delete(`/posts/${id}`);
};
