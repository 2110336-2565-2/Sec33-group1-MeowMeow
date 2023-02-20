export interface IPost {
  id: number;
  title: string;
  body: string;
  price: number;
  author: {
    name: string;
    profile: string;
  };
  image: string;
  location: string;
  amount: number;
}
