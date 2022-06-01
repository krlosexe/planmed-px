/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
// import styles from '../Styles';
import Head from '../components/Head';
import Menu from '../components/Menu';
import Venues from '../components/Venues';
import UserContext from '../contexts/UserContext'

import AsyncStorage from '@react-native-community/async-storage'

function App(props){
  const userDetails  = React.useContext(UserContext)

  const [requesting , setRequesting ]  = useState(false)
  const [sendSuccess, setSendSuccess]  = useState(false)


  
  function onChangeText(text, key){
    console.log('writing into shedule valoration')
 /*   setFormInfo({
        ...formInfo,
        [key] : text
    })
  */
 }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#f27072" barStyle= "light-content"/>
      <ScrollView>
        <Head name_user = {userDetails.names} />

            <View style={stylesValoration.form}>
                {
                    !sendSuccess &&
                        <View>
                            <View style={stylesValoration.inputView} >
                                <TextInput  
                                    style={stylesValoration.inputText}
                                    multiline={true}
                                    numberOfLines={6}
                                    placeholder="¿Que procedimiento te quieres realizar?" 
                                    placeholderTextColor="#777"
                                    onChangeText={text => onChangeText(text, 'procedure')}
                                />
                            </View>


                            <TouchableOpacity style={stylesValoration.loginBtn} onPress={()=>sendForm()}   >
                                <Text style={stylesValoration.loginText}>ENVIAR</Text>
                            </TouchableOpacity>
                        </View>
                }

                {
                    sendSuccess &&
                    <View>
                        <Text>Tu solicitud fue enviada satisfactoriamente, en breve un asesor te contactara para confirmar tu cita</Text>
                        <TouchableOpacity
                        //style={styles.loginBtn}
                        onPress={()=>goToScreen("Dashboard")}   >
                            <Text style={{color: "white"}}>INICIO</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>



               
        <Venues props={props} />
      </ScrollView>
      <Menu props = {{...props}} />
    </SafeAreaView>
   
  )
}


const stylesValoration = StyleSheet.create({

  form : {
    backgroundColor : "#fff",
    width : "90%",
    alignSelf : "center",
    padding: 25,
    marginTop : 20,
    borderRadius: 20,

    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6,
    
  },  
    loginBtn:{
        width:"100%",
        backgroundColor:"#f27072",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:100
      },

      loginText:{
        color:"white"
      },
      inputView:{
        width:"100%",
        borderBottomColor: "#f27072",
        borderBottomWidth: 1,
        
        height:50,
        justifyContent:"center",
        padding:20,
        paddingStart: 0,
        marginBottom : 20
      },
      inputText:{
        width:"110%",
        height:100,
        minHeight:50,
maxHeight:200,
        color:"#777",
        
      },
});


export default App;