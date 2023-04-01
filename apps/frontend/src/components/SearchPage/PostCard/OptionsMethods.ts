import apiClient from "@/utils/apiClient";

export const deletePost = async (id: number) => {
  return apiClient.delete(`/posts/${id}`);
};

// may be more
// - edit
// - report
