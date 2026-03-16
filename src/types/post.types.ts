export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views?: number;
  userId: number;
}

export interface PostInput {
  title: string;
  body: string;
  tags: string[];
    userId: string; // add this

}
export interface User {
  id: number;
  username: string;
  email: string;
}
//We create types in postTypes.ts because your project uses TypeScript,
//  and TypeScript needs to know what structure the data has.