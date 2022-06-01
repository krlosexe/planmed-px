  import React, { useState } from 'react'
  import PostsContext from './PostsContext'
  import SocketIOClient from 'socket.io-client/dist/socket.io.js'
  import UserContext from './UserContext'
  import messaging from '@react-native-firebase/messaging';
  import {postsServer} from '../Env'

  const PostProvider =  ({ children }) => {
  const userDetails  = React.useContext(UserContext)
  const [ socket , setPosts ] = useState(false)




	React.useEffect(()=>{

		if(userDetails.user_id){
			console.log(['. . . . . . . . . .  POSTS SERVER CONNECTING . . . . . . . . . . . . . . '])
			setPosts(SocketIOClient(postsServer))
		}

	},[userDetails])

	React.useEffect(()=>{
		if(socket && userDetails.user_id !== null ){

			console.log(['. . . . . . . . . .  POSTS SERVER PROVISIONING . . . . . . . . . . . . . . '])

			socket.on('askForUserId', () => {
				console.log(['. . . . . . . . . .  POSTS SERVER CONNECTED . . . . . . . . . . . . . . '])
				socket.emit('userIdReceived',userDetails.user_id);
			})

			socket.on('disconnect', () => {
				console.log(['. . . . . . . . . . . . . . . . . . . POSTS SERVER DISCONNECTED  . . . . . . . . . . . . . . . . . . .'])
			})
		}
	},[socket, userDetails])



  return (
    <PostsContext.Provider value={socket}>
      {children}
    </PostsContext.Provider>
  )
  
}

export default PostProvider
