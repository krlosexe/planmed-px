import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Api, base_url } from '../Env'
import axios from 'axios'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import { primaryColor } from '../Colors.js'
import Loading from '../components/loading.js'

function Index(props) {
  const { navigation } = props
  function goToScreen(screen) {
    navigation.navigate(screen)
  }

  const [notificationToken, setNotificationToken] = React.useState('GDGD')
  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const [editable, setEditable] = React.useState(false)
  const [Load, setLoad] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setEditable(true)
    }, 100)
  }, [])

  const [formInfo, setFormInfo] = React.useState({

    nombres: "",
    identificacion: "",
    telefono: "",
    email: "",
    fcmToken: "",
    promotion_code: "",
    id_line: 16,
    password: ""
  })





  React.useEffect(() => {
    async function getToken() {
      const fcmToken = await messaging().getToken();
      if (fcmToken) { setNotificationToken(fcmToken) }
      else { console.log('user doesnt have a device token yet') }
      console.log(fcmToken, "TOKENs")
    }
    getToken()
  }, [])


  const _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@Passport', JSON.stringify(data));
      console.log(data, 'Authentication successfully')
      setUserDetails({ ...data })
      setLoad(false)
      props.navigation.navigate("Home")
    }
    catch (error) {
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
    const data = { ...formInfo }
    data.fcmToken = notificationToken
    //if( data.name === '' || data.identificacion === '' || data.phone === '' || data.email === '' || data.fcm_token === '' || data.promotion_code === '' || data.password === ''){
    if (data.nombres === '' || data.identificacion === '' || data.telefono === '' || data.email === '' || data.password === '') {
      Toast.show("Completa el formulario")
      setLoad(false)
      return false;
    }
    else {
      setLoad(true)
      console.log(data)
      console.log(base_url(Api, `v2/prp/register/client`))
      axios.post(base_url(Api, `v2/prp/register/client`), data).then(function (res) {
        _storeData(res.data)
      })
        .catch(function (error) {
          console.log(error.response.data)
          Toast.show(error.response.data)
          setLoad(false)

        })
        .then(function () { })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../src/images/LogIn.png')}
        style={{
          flex: 1,
          justifyContent: "center",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>
        {Load &&
          <View style={{ backgroundColor: "rgba(0,0,0,0.2)", width: "100%", height: "100%", position: "absolute", zIndex: 99, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <Loading color={primaryColor} />
          </View>
        }
        <ScrollView style={{ marginTop: 20, backgroundColor: "rgba(0,0,0,0.5)", }} scrollEventThrottle={16} >
          <View style={{ marginTop: "20%", width: "90%", alignItems: 'center', backgroundColor: "rgba(255,255,255,0)", alignSelf: "center", borderRadius: 20, paddingTop: 30, paddingBottom: 30 }}>
            <View style={{ width: "80%", flexDirection: "row" }}>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  style={{ ...styles.inputText }}
                  placeholder="Nombre y Apellido..."
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  editable={editable}
                  value={formInfo.nombres}
                  onChangeText={text => onChangeText(text, 'nombres')} />
              </View>
            </View>
            <View style={{ width: "80%", flexDirection: "row" }}>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  style={{ ...styles.inputText }}
                  placeholder="Número de Identificación..."
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  keyboardType={'numeric'}
                  editable={editable}
                  value={formInfo.identificacion}
                  onChangeText={text => onChangeText(text, 'identificacion')} />
              </View>
            </View>
            <View style={{ width: "80%", flexDirection: "row" }}>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  style={{ ...styles.inputText }}
                  placeholder="Teléfono..."
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  keyboardType={'numeric'}
                  editable={editable}
                  value={formInfo.telefono}
                  onChangeText={text => onChangeText(text, 'telefono')} />
              </View>
            </View>
            <View style={{ width: "80%", flexDirection: "row" }}>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  style={{ ...styles.inputText }}
                  placeholder="Email..."
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  keyboardType={'email-address'}
                  editable={editable}
                  value={formInfo.email}
                  onChangeText={text => onChangeText(text, 'email')} />
              </View>
            </View>
            <View style={{ width: "80%", flexDirection: "row" }}>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  secureTextEntry
                  style={{ ...styles.inputText }}
                  placeholder="Contraseña..."
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  value={formInfo.password}
                  onChangeText={text => onChangeText(text, 'password')} />
              </View>
            </View>
            <View style={{ width: "80%", flexDirection: "row" }}>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  style={{ ...styles.inputText }}
                  placeholder="Código de promoción..."
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  editable={editable}
                  keyboardType={'numeric'}
                  maxLength={4}
                  value={formInfo.promotion_code}
                  onChangeText={text => onChangeText(text, 'promotion_code')} />
              </View>
            </View>
            <TouchableOpacity style={styles.BtnPrimary} onPress={() => sendForm()}>
              <Text style={styles.loginText}>REGISTRARME</Text>
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 20, width: "100%", flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>

            <TouchableOpacity style={styles.newBtn} onPress={() => goToScreen('Login')}>
              <Text style={styles.loginText}>Iniciar Sesión</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.newBtn} onPress={() => goToScreen('RecoveryAccount')}>
              <Text style={styles.loginText}>Olvido su contraseña?</Text>
            </TouchableOpacity>

          </View >
          <Image
            style={styles.icon}
            source={require('../src/images/LogoPlanmedBlanco.png')}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    color: "#fff",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    paddingLeft: 5,
    borderRadius: 5
  },
  inputText: {
    height: 50,
    color: "#000"
  },
  forgot: {
    color: "#fff",
    fontSize: 15
  },
  BtnPrimary: {
    width: "80%",
    backgroundColor: primaryColor,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  loginText: {
    color: "white",
    textAlign: "center",
  },
  register: {
    marginTop: 20,
    color: "#fff"
  },
  icon: {
    top: 0,
    marginBottom:50,
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginTop: 20,
    alignSelf: "center",
  },
  newBtn: {
    width: "40%",
    height: 25,
    margin: 5,
    textAlign: "center",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1
  },
});
export default Index;