export interface IPost {
  id: number;
  title: string;
  content: string;
  fee: number;
  author: {
    id: number;
    name: string;
    profile: string;
    guideId: number;
  };
  image: string;
  locations: string[];
  maxParticipant: number;
  tags: string[];
}

export interface IFilterOptions {
  location: string;
  price: number[];
  rating: number[];
  startDate: Date | null;
  endDate: Date | null;
}

export interface ISearchPosts {
  posts: IPost[];
  count: number;
}
