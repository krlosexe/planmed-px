import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { Api, base_url } from '../Env'
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { primaryColor } from '../Colors.js'
import Toast from 'react-native-simple-toast';
import Loading from '../components/loading.js'

function RecoveryAccount(props) {
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
    id: ""
  })




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
    if (data.id === '') {
      Toast.show("Introduce tu nro de identidad")
      setLoad(false)
      return false;
    }


    console.log(data)
    console.log(base_url(Api, `client/recovery/account`))


    axios.post(base_url(Api, `client/recovery/account`), data).then(function (res) {
      Toast.show("Hemos enviado los datos de acceso a tu correo")
      setTimeout(() => {
        console.log("go to screen")
        setLoad(false)
        goToScreen("Login")
      }, 3000);
    })
      .catch(function (error) {
        console.log('Error al enviar formulario')
        console.log(error)
        setLoad(false)
        Toast.show("Identificación invalida")
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
            backgroundColor: "rgba(0,0,0,0.1)",
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
          height: "100%"
        }}>
        <ScrollView style={{ paddingTop: "10%", backgroundColor: "rgba(0,0,0,0.5)", }}>
          <View style={{top:"15%", paddingVertical:50, alignSelf: "center", width: "100%", alignContent: "center", alignItems: 'center', }}>


            <View style={{ marginBottom: 40, paddingHorizontal: 40 }}>

              <Text style={{ textAlign: "center", color: "#FFF" }}>Para recuperar su contraseña es requerido su nro de identidad</Text>
            </View>

            <View style={{ width: "85%", flexDirection: "row" }}>

              <View style={{ paddingTop: 10, marginRight: 10 }}><Icon name='lock-outline' width={25} height={25} fill='#fff' /></View>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  value={formInfo.id}
                  style={{ ...styles.inputText }}
                  placeholder="Nro de Identidad"
                  placeholderTextColor="#fff"
                  //keyboardType={'email-address'}
                  editable={editable}
                  onChangeText={text => onChangeText(text, 'id')} />
              </View>
            </View>


            {/* <View style={{ width: "85%", flexDirection: "row" }}>
              <View style={{ paddingTop: 10, marginRight: 10 }}><Icon name='lock-outline' width={25} height={25} fill='#fff' /></View>
              <View style={{ ...styles.inputView }} >
                <TextInput
                  style={styles.inputText}
                  placeholder="Contraseña..."
                  placeholderTextColor="#fff"
                  onChangeText={text => onChangeText(text, 'password')} />
              </View>
            </View> */}



            <TouchableOpacity style={styles.BtnPrimary} onPress={() => sendForm()}>
              <Text style={styles.loginText}>Recuperar</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => goToScreen('RecoveryAccount')}>
              <Text style={styles.forgot}>Olvido su contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToScreen('Register')}>
              <Text style={styles.register}>Registrarme</Text>
            </TouchableOpacity> */}



            <View style={{marginTop:10, width: "100%", flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center" }}>

              <TouchableOpacity style={styles.newBtn} onPress={() => goToScreen('Login')}>
                <Text style={styles.loginText}>Iniciar Sesión</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.newBtn} onPress={() => goToScreen('Register')}>
                <Text style={styles.loginText}>Registrarme</Text>
              </TouchableOpacity>

            </View >


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
export default RecoveryAccount;
const styles = StyleSheet.create({


  newBtn: {
    width: "30%",
    height: 25,
    margin: 5,
    textAlign: "center",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1
  },

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
    color: "white",
    textAlign: "center"
  },
  register: {
    marginTop: 20,
    color: "#fff"
  },
  icon: {
    top:10,
    marginBottom:450,
    width: 120,
    height: 100,
    resizeMode: "contain",
    marginBottom: 150
  }
})