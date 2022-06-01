import React, { useContext, useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Touchable } from "react-native";
import { Icon } from 'react-native-eva-icons';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import Follow from './follow'
import { primaryColor, colorLight, colorTertiary } from '../Colors.js'

function Index(props) {
  const userDetails = useContext(UserContext)
  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const [follow, setFollow] = useState(false)
  const [heightMenu, setHeightMenu] = useState(47)

  function followUs() {
    setFollow(!follow)
    if (follow != false) { setHeightMenu(47) }
    else { setHeightMenu(120) }
  }

  function goToScreen(screen) {
    if (props.delta == true) {
      // delta={true} es un parametro enviado desde el screen "Shop",
      //si es true se ejecuta una function la cual tambien se envia por props desde shop,
      //de no existir, o si otro screen no lo envia no pasa nada,
      //esto permite guardar datos en el local Storage si se sale del screen "Shop" 
      console.log("delta true")
      props.updateCarLocal()
    }
    props.props.navigation.navigate(screen, { randomCode: Math.random() })
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@Passport');
      console.log('logout')
      setUserDetails({})
      goToScreen("Dashboard")
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <View style={[styles.wrappermenu, { height: heightMenu, }]}>
      <View style={styles.menu}>


        <TouchableOpacity onPress={() => goToScreen("Dashboard")} >
          <View style={styles.itemMenu}>
            <View><Icon name='home-outline' width={20} height={20} fill={primaryColor} /></View>
            <Text style={styles.texMenu}>Inicio</Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => goToScreen("ProceduresList")} >
          <View style={styles.itemMenu}>
            <Image
              style={{ width: 20, height: 20 }}
              //source={require("../src/images/icon_resurlaser.png")}
              source={require("../src/images/icon_services2.png")}
            />

            <Text style={styles.texMenu}>Servicios</Text>
          </View>
        </TouchableOpacity>

        {
          userDetails.email != null &&

          <TouchableOpacity onPress={() => goToScreen("PerfilUser")} >
            <View style={styles.itemMenu}>
              <View><Icon name='person-outline' width={20} height={20} fill={primaryColor} /></View>
              <Text style={styles.texMenu}>Perfil</Text>
            </View>
          </TouchableOpacity>

        }
     {
          userDetails.email == null &&

          <TouchableOpacity onPress={() => goToScreen("Login")} >
            <View style={styles.itemMenu}>
              <View><Icon name='log-in-outline' width={20} height={20} fill={primaryColor} /></View>
              <Text style={styles.texMenu}>Login</Text>
            </View>
          </TouchableOpacity>

        }
          {/*  {
          userDetails.email != null &&

          <TouchableOpacity onPress={() => logout()} >
            <View style={styles.itemMenu}>
              <View><Icon name='undo-outline' width={20} height={20} fill={primaryColor} /></View>
              <Text style={styles.texMenu}>Salir</Text>
            </View>
          </TouchableOpacity>

        } */}

{
        userDetails.email != null &&
        
        <TouchableOpacity onPress={() => goToScreen("DashboardPrp")} >
        <View style={styles.itemMenu}>
            <Image style={{width: 25,height: 25,marginBottom:-5, top: -2}} source={require("../src/images/prp.png")} />
          <Text style={styles.texMenu}>PRP</Text>
        </View>
      </TouchableOpacity>
        
        
        }











        {
          userDetails.email == null &&

          <TouchableOpacity onPress={() => goToScreen("Register")} >
            <View style={styles.itemMenu}>
              <View><Icon name='person-add-outline' width={20} height={20} fill={primaryColor} /></View>
              <Text style={styles.texMenu}>Registrate</Text>
            </View>
          </TouchableOpacity>

        }
        {
          follow == false &&

          <TouchableOpacity onPress={() => followUs()} >
            <View style={styles.itemMenu}>
              <View>
                {/* <Icon name='menu-outline' width={20} height={20} fill={primaryColor} /> */}
                <Image
                  // style={stylesHere.card_product_head_img}
                  style={{ width: 25, height: 25, marginBottom: -5, top: -2 }}
                  source={require('../src/images/follow.png')}
                />
              </View>
              <Text style={styles.texMenu}>Síguenos</Text>
            </View>
          </TouchableOpacity>

        }
        {
          follow == true &&

          <TouchableOpacity onPress={() => followUs()} >
            <View style={styles.itemMenu}>
              <View><Icon name='arrow-ios-downward-outline' width={20} height={20} fill={primaryColor} /></View>
              <Text style={styles.texMenu}>Síguenos</Text>
            </View>
          </TouchableOpacity>

        }

      </View>
      { follow == true && <Follow />}
    </View>
  )
}

const styles = StyleSheet.create({

  wrappermenu: {
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },



  menu: {
    padding: 5,
    width: "100%",
    backgroundColor: colorLight,
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // borderTopColor: primaryColor,
    // borderTopWidth: 1,
  },





  itemMenu: {
    alignItems: "center"
  },
  texMenu: {
    fontSize:12,
    color: primaryColor
  },
  texMenuActive: {
    color: "#0093d9"
  },
});
export default Index;