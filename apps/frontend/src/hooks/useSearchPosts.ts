import { useCallback } from "react";
import { useEffect } from "react";
import { mockPost } from "@/components/SearchPage/PostCard";
import { IPost } from "@/components/SearchPage/types";
import { useState } from "react";

const mockFeed: IPost[] = [mockPost, mockPost, mockPost];

export const useSearchPosts = () => {
  const [pageNo, setPageNo] = useState<number>(0);
  const [feed, setFeed] = useState<IPost[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    console.log("refreshing feed");

    if (search) {
      const postLoading: Promise<IPost[]> = fetchPosts();
      postLoading
        .then((post: IPost[]) => {
          setFeed(post);
        })
        .catch((err) => {
          console.log("error fetching : ", err.stack);
        });
    }
  }, [pageNo]); // refetch feed when page number changes : pagination

  const fetchPosts = useCallback(async (): Promise<IPost[]> => {
    // TODO: fetch posts here

    // mocking result
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(mockFeed);
      }, 1000);
    });
  }, []);

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("search", search);

      const post: IPost[] = await fetchPosts();
      setFeed(post);
    },
    [search]
  );

  return {
    feed,
    search,
    setSearch,
    pageNo,
    setPageNo,
    handleSearch,
  };
};
