import { useCallback } from "react";
import { useEffect } from "react";
import { IFilterOptions, IPost } from "@/components/SearchPage/types";
import { useState } from "react";
import { FeedStatus } from "./types/FeedStatus";
import useFilterForm from "./useFilterForm";
import apiClient from "@/utils/apiClient";

interface IFetchPosts {
  pageNo: number;
  search: string;
  filterOptions: IFilterOptions;
}

export const templatePost: Partial<IPost> = {
  author: {
    id: 1,
    name: "John Doe",
    profile: "/images/searchPage/profile.jpeg", // webp is better
  },
  image: "/landing/travel1.png",
};
const POST_PER_PAGE = 5;

const fetchPosts = async (props: IFetchPosts): Promise<IPost[]> => {
  const { pageNo, search, filterOptions } = props;

  const resp = await apiClient.get("/posts/search", {
    params: {
      offset: (pageNo - 1) * POST_PER_PAGE,
      limit: POST_PER_PAGE,
      fee: filterOptions.price[0],
      reviewScore: filterOptions.rating[0],
      locations: filterOptions.location ? [filterOptions.location] : [],
      text: search,
    },
  });

  const fetchPost = resp.data;

  const editedPosts = Promise.all(
    fetchPost.map(async (post: any) => {
      const authorId = post.authorId;
      const resp = await apiClient.get(`/users/${authorId}`);
      return {
        ...templatePost,
        ...post,
        author: {
          id: authorId,
          name: resp.data.username,
        },
      };
    })
  );

  return editedPosts;
};

export const useSearchPosts = () => {
  const [pageNo, setPageNo] = useState<number>(1); // start with first page
  const [feed, setFeed] = useState<IPost[]>([]);
  const [feedStatus, setFeedStatus] = useState<FeedStatus>(FeedStatus.INITIAL);
  const [search, setSearch] = useState<string>("");
  const [tempSearch, setTempSearch] = useState<string>(""); // temp search for debouncing

  const filterStuff = useFilterForm(); // init filter module

  useEffect(() => {
    if (feedStatus !== FeedStatus.INITIAL) {
      setFeedStatus(FeedStatus.LOADING);
      fetchPosts({
        pageNo,
        search,
        filterOptions: filterStuff.options,
      })
        .then((posts: IPost[]) => {
          setFeed(posts);
          setFeedStatus(FeedStatus.SHOWING);
        })
        .catch((err) => {
          console.log("error fetching : ", err.stack);
        });
    }
  }, [search, pageNo, filterStuff.options]); // refetch feed when page number changes : pagination

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFeedStatus(FeedStatus.LOADING);
      setSearch(tempSearch); // update global search

      const posts: IPost[] = await fetchPosts({
        pageNo,
        search,
        filterOptions: filterStuff.options,
      });

      setFeed(posts);
      setFeedStatus(FeedStatus.SHOWING);
    },
    [tempSearch, search, filterStuff.options]
  );

  return {
    feed,
    pageNo,
    feedStatus,
    tempSearch,
    filterStuff,
    setTempSearch,
    setPageNo,
    handleSearch,
  };
};
