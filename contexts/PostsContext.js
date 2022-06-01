import { createContext } from 'react'

const PostsContext = createContext({
  setPosts: post => {}
})

export default PostsContext