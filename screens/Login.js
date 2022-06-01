import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ImageBackground } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { Api, base_url } from '../Env'
import axios from 'axios'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import { primaryColor } from '../Colors.js'
import Toast from 'react-native-simple-toast';
import Loading from '../components/loading.js'

function Index(props) {
  const { navigation } = props
  function goToScreen(screen) {
    navigation.navigate(screen)
  }

  const [Load, setLoad] = useState(false);
  const [notificationToken, setNotificationToken] = React.useState('')
  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const [editable, setEditable] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setEditable(true)
    }, 100)
  }, [])

  const [formInfo, setFormInfo] = React.useState({
    email: '',
    password: ''
  })

  React.useEffect(() => {
    async function getToken() {
      const fcmToken = await messaging().getToken();
      if (fcmToken) { setNotificationToken(fcmToken) }
      else { console.log('user doesnt have a device token yet') }
      console.log(fcmToken, "TOKEN")
    }
    getToken()
  }, [])

  const _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@Passport', JSON.stringify(data));
      //console.log(data)
      console.log('Authentication successfully')
      setLoad(false)
      setUserDetails({ ...data })
      goToScreen("Dashboard")
    }
    catch (error) {
      // Error saving data
    }
  }


  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }

  function sendForm() {
    setLoad(true)
    const data = {
      ...formInfo
    }
    data.fcmToken = notificationToken
    if (data.email === '' || data.password === '') {
      Toast.show("Introduce tus datos de acceso")
      setLoad(false)
      return false;
    }




    axios.post(base_url(Api, `v2/prp/login`), data).then(function (res) {
      _storeData(res.data)
    })
      .catch(function (error) {
        console.log('Error al enviar formulario')
        console.log(error)
        setLoad(false)
        Toast.show("Correo o clave invalida")
      })
      .then(function () { });
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />



      {Load &&
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "space-around"
          }}>
          <Loading color={primaryColor} />
        </View>
      }
      <ImageBackground source={require('../src/images/LogIn.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%",
        }}>
        <ScrollView style={{ paddingTop: "25%", backgroundColor: "rgba(0,0,0,0.5)", }}>
          <View style={{
            width: "100%", height: "100%",
            paddingHorizontal: 15,
            paddingVertical: 40,
            justifyContent: "center",
            alignContent: "center",
            alignItems: 'center',
          }}>
            <View style={{ width: "85%", flexDirection: "row" }}>
              <View style={{ paddingTop: 10, marginRight: 10 }}><Icon name='email-outline' width={25} height={25} fill='#fff' /></View>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  style={{ ...styles.inputText }}
                  placeholder="Email..."
                  placeholderTextColor="#fff"
                  keyboardType={'email-address'}
                  editable={editable}
                  value={formInfo.email}
                  onChangeText={text => onChangeText(text, 'email')} />
              </View>
            </View>
            <View style={{ width: "85%", flexDirection: "row" }}>
              <View style={{ paddingTop: 10, marginRight: 10 }}><Icon name='lock-outline' width={25} height={25} fill='#fff' /></View>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  style={styles.inputText}
                  placeholder="Contraseña..."
                  placeholderTextColor="#fff"
                  value={formInfo.password}

                  secureTextEntry
                  onChangeText={text => onChangeText(text, 'password')} />
              </View>
            </View>
            <TouchableOpacity style={styles.BtnPrimary} onPress={() => sendForm()}>
              <Text style={styles.loginText}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToScreen('RecoveryAccount')}>
              <Text style={styles.forgot}>Olvido su contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToScreen('Register')}>
              <Text style={styles.register}>Registrarme</Text>
            </TouchableOpacity>
            <Image
              style={styles.icon}
              source={require('../src/images/LogoPlanmedBlanco.png')}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
export default Index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: "85%",
    borderColor: "#eee",
    borderBottomWidth: 1,
    color: "#fff",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    paddingLeft: 5
  },
  inputText: {
    height: 50,
    color: "#fff"
  },
  forgot: {
    color: "#fff",
    fontSize: 15
  },
  BtnPrimary: {
    opacity: 0.8,
    width: "80%",
    backgroundColor: primaryColor,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white"
  },
  register: {
    marginTop: 20,
    color: "#fff"
  },
  icon: {
    top: 50,
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginBottom: 150
  }
})