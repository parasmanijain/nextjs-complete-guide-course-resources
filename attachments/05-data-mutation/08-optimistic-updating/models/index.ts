export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
  createdAt: string; // SQLite CURRENT_TIMESTAMP → ISO string
  userId: number;
}

export interface Like {
  userId: number;
  postId: number;
}

export interface PostWithMeta {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: boolean;
}

export interface CreatePostInput {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
}

export interface PostDTO {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
  };
  likes: number;
  isLiked: boolean;
}
