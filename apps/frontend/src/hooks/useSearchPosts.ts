import { useCallback, useContext } from "react";
import { useEffect } from "react";
import {
  IFilterOptions,
  IPost,
  ISearchPosts,
} from "@/components/SearchPage/types";
import { useState } from "react";
import { FeedStatus } from "./types/FeedStatus";
import useFilterForm from "./useFilterForm";
import apiClient from "@/utils/apiClient";
import { NotificationContext } from "@/context/NotificationContext";
import { SearchPostsResponse } from "types";
import { POST_PER_PAGE, templatePost } from "@/constants/SearchPage";

interface IFetchPosts {
  pageNo: number;
  search: string;
  filterOptions: IFilterOptions;
}

const fetchPosts = async (props: IFetchPosts) => {
  const { pageNo, search, filterOptions } = props;

  const params = {
    offset: (pageNo - 1) * POST_PER_PAGE,
    limit: POST_PER_PAGE,
    fee: filterOptions.price[1],
    reviewScore: filterOptions.rating[0],
    locations: filterOptions.location ? [filterOptions.location] : [],
    text: search,
  };

  const resp = await apiClient.get("/posts/search", { params: params });
  const respData: SearchPostsResponse = resp.data;

  const myPostsLoading: Promise<IPost[]> = Promise.all(
    respData.posts.map(async (post: any) => {
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
  let myPosts: IPost[] = [];
  await myPostsLoading
    .then((post) => {
      myPosts = post;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return {
    posts: myPosts,
    count: respData.postsCount,
  };
};

export const useSearchPosts = () => {
  const [pageNo, setPageNo] = useState<number>(1); // start with first page
  const [feed, setFeed] = useState<IPost[]>([]);
  const [feedStatus, setFeedStatus] = useState<FeedStatus>(FeedStatus.INITIAL);
  const [search, setSearch] = useState<string>("");
  const [tempSearch, setTempSearch] = useState<string>(""); // temp search for debouncing
  const [allPage, setAllPage] = useState<number>(1);

  const { addNotification } = useContext(NotificationContext);

  const filterStuff = useFilterForm(); // init filter module

  const fetchAndSetFeed = useCallback(() => {
    fetchPosts({
      pageNo,
      search,
      filterOptions: filterStuff.options,
    })
      .then((resp: ISearchPosts) => {
        setFeed(resp.posts);
        setAllPage(Math.ceil(resp.count / POST_PER_PAGE) || 1);
        setFeedStatus(FeedStatus.SHOWING);
      })
      .catch((err) => {
        if (err instanceof Error) {
          if (err.message[0] === "fee must not be less than 30") {
            setFeed([]);
            setFeedStatus(FeedStatus.SHOWING);
          }
          addNotification(err.message, "error");
        }
      });
  }, [pageNo, search, filterStuff.options, addNotification]);

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFeedStatus(FeedStatus.LOADING);
      setSearch(tempSearch); // update global search

      fetchAndSetFeed();
    },
    [tempSearch, fetchAndSetFeed]
  );

  useEffect(() => {
    if (feedStatus !== FeedStatus.INITIAL) {
      setFeedStatus(FeedStatus.LOADING);
      fetchAndSetFeed();
    }
  }, [search, pageNo, filterStuff.options]); // refetch feed when page number changes : pagination

  return {
    feed,
    pageNo,
    feedStatus,
    tempSearch,
    filterStuff,
    setTempSearch,
    setPageNo,
    handleSearch,
    allPage,
  };
};
