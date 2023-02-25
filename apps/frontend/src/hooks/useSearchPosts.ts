import { useCallback } from "react";
import { useEffect } from "react";
import { mockPost } from "@/components/SearchPage/PostCard";
import { IFilterOptions, IPost } from "@/components/SearchPage/types";
import { useState } from "react";
import { FeedStatus } from "./types/FeedStatus";
import useFilterForm from "./useFilterForm";

const mockFeed: IPost[] = [mockPost, mockPost, mockPost];

interface IFetchPosts {
  pageNo: number;
  search: string;
  filterOptions: IFilterOptions;
}

const fetchPosts = async (props: IFetchPosts): Promise<IPost[]> => {
  const { pageNo, search, filterOptions } = props;
  // TODO: fetch posts here with search and filter options

  console.log("fetching posts with search \t\t\t: ", search);
  console.log("fetching posts with filter options\t: ", filterOptions);

  // but now, mocking result
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(mockFeed);
    }, 1000);
  });
};

export const useSearchPosts = () => {
  const [pageNo, setPageNo] = useState<number>(1); // start with first page
  const [feed, setFeed] = useState<IPost[]>([]);
  const [feedStatus, setFeedStatus] = useState<FeedStatus>(FeedStatus.INITIAL);
  const [search, setSearch] = useState<string>("");

  const filterStuff = useFilterForm(); // init filter module

  useEffect(() => {
    if (search) {
      setFeedStatus(FeedStatus.LOADING);
      const postLoading: Promise<IPost[]> = fetchPosts({
        pageNo,
        search,
        filterOptions: filterStuff.options,
      });
      postLoading
        .then((post: IPost[]) => {
          setFeed(post);
          setFeedStatus(FeedStatus.SHOWING);
        })
        .catch((err) => {
          console.log("error fetching : ", err.stack);
          // TODO: Show error message via notification
        });
    }
  }, [pageNo, filterStuff.options]); // refetch feed when page number changes : pagination

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFeedStatus(FeedStatus.LOADING);

      console.log("manual search");

      const post: IPost[] = await fetchPosts({
        pageNo,
        search,
        filterOptions: filterStuff.options,
      });

      setFeed(post);
      setFeedStatus(FeedStatus.SHOWING);
    },
    [search, filterStuff.options]
  );

  return {
    feed,
    search,
    setSearch,
    pageNo,
    setPageNo,
    handleSearch,
    feedStatus,
    filterStuff,
  };
};
