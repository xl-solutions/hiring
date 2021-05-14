export interface ChildrenProviderProps {
  children: ReactNode
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface Post {
  useId: number
  id: number
  title: string
  body: string
}

export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface Album {
  userId: number
  id: number
  title: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Posts {
  allPostsData: [
    {
      id: number
      date: string
      title: string
    }
  ]
}

// interface MainGridProps {
//   setAlbuns: Dispatch<SetStateAction<undefined>>
//   children: ReactNode
// }

export interface UserFileContextData {
  callUsers: () => void
  callAlbuns: (id: number) => Promise<void>
  callPhotos: (id: number) => Promise<void>
  callPosts: (id: number) => Promise<void>
  callComments: (id: number) => Promise<void>
  deletePost: (id: number) => Promise<number>
  users?: [User]
  albuns?: [Album]
  photos?: [Photo]
  posts?: [Post]
  comments?: [Comment]
  selectedEnum: string
}

// export enum SwicthCard {
//   User = 1,
//   Album,
//   Photos,
// }
