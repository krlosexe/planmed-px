import React, { useState } from 'react'
import UserContext from './UserContext'


const UserProvider = ({ children }) => {
  

  const [ userDetails, setUserDetails ] = useState({
    id : null,
    identificacion : null,
    nombre: null,
    email: null,
    telefono: null,
    code_client: null,
})

  const _retrieveData = async () => {

    try {
      
        const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
        if (value && value.email != null) {
       
            setUserDetails(value)
            return value
      }
    } catch (error) {
      // Error retrieving data
    }
  };



  setInterval(()=>{
    _retrieveData()   
    },2000)


  
  const obj = { ...userDetails , setUserDetails }
  

  return (
    <UserContext.Provider value={obj}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider