import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Head from '../components/Head';
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import { Api, base_url } from '../Env'
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-simple-toast';
import { colorBack1, colorBack2, primaryColor, colorTertiary, colorSecundary, colorLight, primaryColorOpacity } from '../Colors'
import AsyncStorage from '@react-native-community/async-storage'
function App(props) {
  const { navigation } = props
  const [menu, setMenu] = useState(false)
  const [modalQR, setmodalQR] = useState(false)
  const userDetails = React.useContext(UserContext)
  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const [CodeQr, setCodeQR] = useState(`${userDetails.id_cliente}`)
  const [editProfile, seteditProfile] = useState(false);
  const [OptionCamare, setOptionCamare] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id: userDetails.id_cliente,
    avatar: userDetails.avatar,
    nombres: userDetails.nombres,
    email: userDetails.email,
    telefono: userDetails.telefono,
    code_client: userDetails.code_client
  })
  console.log("userDetails: ", userDetails);
  function goToScreen1(screen,) {
    navigation.navigate(screen, { randomCode: Math.random() })
  }
  function goToScreen(screen, data, shop) {
    navigation.navigate(screen, { randomCode: Math.random(), data, shop })
  }
  function goToScreen2(screen, user, shop) {
    navigation.navigate(screen, { randomCode: Math.random(), user, shop })
  }
  function EditProfile(userDetails) {
    console.log("editar perfil")
    console.log(userDetails)
  }
  function ShowQR() {
    setmodalQR(!modalQR);
  }
  function EditProfile(data) {
    seteditProfile(!editProfile)
    //setMenu(!menu)
  }
  function getCamara() {
    console.log("get camara")
    setOptionCamare(!OptionCamare)
  }
  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }
  async function SaveChange() {
    console.log("SaveChange")
    seteditProfile(!editProfile)
    const data = {
      ...formInfo
    }
    await axios.post(base_url(Api, `client/edit`), data).then(function (response) {
      console.log("response")
      console.log(response.data)
      setUserDetails({ ...response.data })
    })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () { });
    console.log("save change")
    Toast.show("Cambios Guardados!")
  }
  function goToCar(screen, from) {
    navigation.navigate(screen, { randomCode: Math.random(), from })
  }
  async function logout() {
    console.log("saliendo")
    try {
      await AsyncStorage.removeItem('@Passport');
      console.log('logout')
      setUserDetails({})
      goToScreen1("Dashboard")
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%",
        }}>
        <ScrollView>
          <Head name_user="Mi Perfil" />
          <View style={styles.wrap}>
            <View style={{ position: "absolute", left: 0, top: -65, }}>
              {/* <TouchableOpacity style={styles.iconsUp} onPress={() => EditProfile(userDetails)}><Icon left={2} name={editProfile == true ? "close" : "edit-outline"} width={25} height={25} fill={primaryColor} /></TouchableOpacity> */}
              <View style={{ flexDirection: "row", }}>
                <TouchableOpacity onPress={() => EditProfile(userDetails)} style={{ marginTop: 10, marginLeft: -3, position: "relative", top: 50, left: 10 }} >
                  <Icon name={editProfile == true ? "close" : "edit-outline"} width={25} height={25} fill={primaryColor} />
                </TouchableOpacity>
              </View>
              <Image source={require('../src/images/btn8040.png')} style={{ transform: [{ rotateZ: '180deg' }], position: "relative", zIndex: -99 }} />
            </View>
            <View style={{ position: "absolute", right: 0, top: -50, zIndex: 1, height: 350, paddingLeft: 10 }}>
              <TouchableOpacity style={{ position: "relative", top: 53, left: 8 }} onPress={() => setMenu(!menu)} ><Icon name={menu == true ? "arrowhead-down-outline" : "menu"} width={25} height={25} fill={primaryColor} /></TouchableOpacity>
              <View style={styles.btnEdit}>
                {menu == true &&
                  <View style={{ paddingBottom: 20 }}>
                    <TouchableOpacity style={styles.iconsUp} onPress={() => logout()}><Icon name='log-out-outline' width={25} height={25} fill={primaryColor} /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconsUp} onPress={() => goToScreen("WishList")}><Icon name='heart' width={25} height={25} fill={primaryColor} /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconsUp} onPress={() => goToScreen("Mypurchases")}><Icon name='shopping-bag-outline' width={25} height={25} fill={primaryColor} /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconsUp} onPress={() => goToCar("ShopCar", "PerfilUser")}><Icon name='shopping-cart-outline' width={25} height={25} fill={primaryColor} /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconsUp} onPress={() => goToScreen2("MyCitas", userDetails.id_cliente)}><Icon name='calendar-outline' width={25} height={25} fill={primaryColor} /></TouchableOpacity>

                    <TouchableOpacity style={styles.iconsUp} onPress={() => goToScreen2("Quotation", userDetails.id_cliente)}>
                      <Image style={styles.icon_img} source={require("../src/images/calculator.png")} />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.iconsUp} onPress={() => ShowQR()}>
                      <Image style={styles.icon_img} source={require("../src/images/qr.png")} />
                    </TouchableOpacity>
                  </View>
                }
              </View>
              <Image source={require('../src/images/btn8040.png')} style={{ position: "relative", zIndex: -99 }} />
            </View>
            <View style={styles.upper}>
              <View style={styles.WrapperImg}>
                <View style={[styles.WrapImg, { transform: [{ translateX: 0 }] }]}>
                  {userDetails.avatar != null
                    ? (<Image style={styles.profileImg} source={{ uri: userDetails.avatar }} />)
                    : (<Image style={styles.profileImg} source={require('../src/images/default-user.png')} />)
                  }
                </View>
                {
                  OptionCamare == true &&
                  <View style={{ alignContent: "center", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", flexDirection: "row", top: 10, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 100, width: 100 }}>
                    <Icon name='image-outline' width={30} height={30} fill='#e67072' />
                    <Icon name='camera-outline' width={30} height={30} fill='#e67072' />
                  </View>
                }
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.row}>
                <Text style={styles.title}>Nombre</Text>
                {editProfile == false &&
                  <Text style={styles.subtitle}>{userDetails.nombres}</Text>
                }
                {editProfile == true &&
                  <TextInput value={formInfo.nombres} onChangeText={text => onChangeText(text, 'nombres')} placeholder="Nombre y Apellido..." style={styles.inputText} placeholderTextColor="#777" />
                }
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Email</Text>
                {editProfile == false &&
                  <Text style={styles.subtitle}>{userDetails.email}</Text>
                }
                {editProfile == true &&
                  <TextInput style={styles.inputText} value={formInfo.email} onChangeText={text => onChangeText(text, 'email')} placeholder="Email..." style={styles.inputText} placeholderTextColor="#777" />
                }
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Telefono</Text>
                {editProfile == false &&
                  <Text style={styles.subtitle}>{userDetails.telefono}</Text>
                }
                {editProfile == true &&
                  <TextInput style={styles.inputText} value={formInfo.telefono} onChangeText={text => onChangeText(text, 'telefono')} placeholder="Telefono Móvil..." style={styles.inputText} placeholderTextColor="#777" />
                }
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.row}>
                <Text style={styles.title}>Mi código PRP</Text>
                <Text style={styles.subtitle}>{userDetails.code_client}</Text>
              </View>
            </View>
            {
              editProfile == true &&
              <TouchableOpacity
                onPress={() => SaveChange()}
                style={styles.BtnPrimary}>
                <Icon name='checkmark-circle-outline' width={20} height={20} fill={primaryColor} />
                <Text style={styles.loginText}>Guardar Cambios</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={{ height: 40 }}></View>
        </ScrollView>
        <Menu props={{ ...props }} />
      </ImageBackground>

      {/* { modalQR == true && } */}
      <Modal animationType="slide" transparent={true} visible={modalQR} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.7)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <View style={{ top: "20%" }}>
            <TouchableOpacity
              onPress={() => setmodalQR(!modalQR)}
              style={{
                position: "absolute", right: -10, top: 10
              }}>
              <Icon name="close-circle-outline" fill="#FFF" width={40} height={40} />
            </TouchableOpacity>
            <View style={{ backgroundColor: "#FFF", marginTop: "15%", padding: "10%", borderRadius: 20, width: "90%" }}
            >
              <QRCode
                value={CodeQr}
                size={200}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  )
}
export default App;
const styles = StyleSheet.create({
  upper: {
    top: 10
  },
  btnEdit: {
    position: "absolute",
    top: 90,
    padding: 5,
    zIndex: 999999,
    flexDirection: "column",
    paddingBottom: 10
  },
  iconsUp: {
    position: "relative",
    zIndex: 99999,
    marginTop: 10,
    backgroundColor: colorLight,
    padding: 5,
    width: 35,
    height: 35,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 4,
  },
  icon_img: {
    width: 25,
    height: 25
  },
  WrapperImg: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WrapImg: {
    width: 140,
    height: 140,
    borderColor: primaryColor,
    borderWidth: 8,
    borderRadius: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    overflow: "hidden",
    elevation: 12
  },
  profileImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  btnCamera: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    top: 230,
    left: 260
  },
  wrap: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    borderRadius: 20,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "rgba(255,255,255,0.5)",
    borderBottomColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.5)",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 40,
    marginTop: 20,
    marginBottom: -10,
  },
  row: {
    width: "100%",
    padding: 4,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  title: {
    backgroundColor: colorLight,
    width: "80%",
    paddingVertical: 2,
    borderRadius: 10,
    height: 25,
    color: primaryColor,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 22,
    textAlign: "center"
  },
  subtitle: {
    top: 5,
    height: 40,
    color: "#555",
    fontSize: 16
  },
  footSpace: {
    marginBottom: 60
  },
  inputText: {
    textAlign: "center",
    width: "100%",
    height: 40,
    color: "#555",
    fontSize: 16,
    borderBottomColor: primaryColor,
    borderBottomWidth: 1
  },
  BtnPrimary: {
    flexDirection: "row",
    width: "70%",
    backgroundColor: colorLight,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 16,
    marginLeft: 20,
    color: primaryColor
  },
})