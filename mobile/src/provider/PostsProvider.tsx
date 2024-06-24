import { createContext, useContext, useState } from "react";

import { PostType } from "@/types/post";

type PostsContextType = {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
};

const PostsContext = createContext<PostsContextType>({
  posts: [],
  setPosts: () => {}
});

type PostsProviderProps = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
