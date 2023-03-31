export interface IPost {
  id: number;
  title: string;
  content: string;
  fee: number;
  author: {
    id: number;
    name: string;
    profile: string;
  };
  image: string;
  locations: string[];
  maxParticipant: number;
}

export interface IFilterOptions {
  location: string;
  price: number[];
  rating: number[];
  startDate: Date | null;
  endDate: Date | null;
}
