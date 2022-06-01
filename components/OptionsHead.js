import React from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import UserContext from '../contexts/UserContext'
import GS from '../GStyles';
import { primaryColor, TextDark ,colorTertiary} from '../Colors.js'


function App(props) {





  const { navigation } = props.props
  const userDetails = React.useContext(UserContext)

  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() }) 
  }

  function goToShop(screen, idfilterCategory) {
    navigation.navigate(screen, { randomCode: Math.random(), idfilterCategory })
  }

  function goToCitas(screen, user) {
   navigation.navigate(screen, { randomCode: Math.random(), user })
  }

  const WindowAlert = () =>
    Alert.alert(
      "Por favor inicie sesión para continuar",
      "Si no tiene una cuenta, registrese",
      [
        {
          text: "Login",
          onPress: () => goToScreen('Login')
          // onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Registrarme",
          onPress: () => goToScreen('Register')
        },
        {
          text: "Salir",
          onPress: () => console.log("OK Pressed"),
          style: "cancel"
        }
      ]
    );




  return (
    <View style={styles.content_options_head}>

      <View style={styles.content_items_head}>
        <TouchableOpacity onPress={() => goToShop("Shop2", 0)}>
          <View style={[styles.content_icon_head, GS.shadow]}>
            <Image
              style={styles.icon_head}
              source={require("../src/images/shop.png")} />
          </View>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color:  primaryColor }}>Tienda</Text>
          </View>
        </TouchableOpacity>
      </View>
      {
        userDetails.email == null &&
        <View style={styles.content_items_head}>
          <TouchableOpacity onPress={() => WindowAlert("DashboardPrp")}>
            <View style={[styles.content_icon_head, GS.shadow]}>
              <Image
                style={styles.icon_head}
                source={require("../src/images/prp.png")} />
            </View>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color:  primaryColor }}>PRP</Text>
            </View>
          </TouchableOpacity>
        </View>
      }
      {
        userDetails.email != null &&
        <View style={styles.content_items_head}>
          <TouchableOpacity onPress={() => goToScreen("DashboardPrp")}>
            <View style={[styles.content_icon_head, GS.shadow]}>
              <Image
                style={styles.icon_head}
                source={require("../src/images/prp.png")} />
            </View>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color:  primaryColor }}>PRP</Text>
            </View>
          </TouchableOpacity>
        </View>
      }

      <View style={styles.content_items_head}>
        <TouchableOpacity onPress={() => goToScreen("ProceduresList")}>
          <View style={[styles.content_icon_head, GS.shadow]}>
            <Image
              style={styles.icon_head}
              source={require("../src/images/icon_services2.png")} />
          </View>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color:  primaryColor }}>Servicios</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content_items_head}>
        {
          userDetails.email != null &&
          <TouchableOpacity onPress={() => goToCitas("MyCitas", userDetails.id_cliente)}>
            <View style={[styles.content_icon_head, GS.shadow]}>
              <Image
                style={styles.icon_head}
                source={require("../src/images/icon_calendar.png")} />
            </View>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color:  primaryColor }}>Mis Citas</Text>
            </View>
          </TouchableOpacity>
        }
        {
          userDetails.email == null &&
          <TouchableOpacity onPress={() => WindowAlert("PerfilUser")}>
            <View style={[styles.content_icon_head, GS.shadow]}>
              <Image
                style={styles.icon_head}
                source={require("../src/images/icon_calendar.png")} />
            </View>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color:  primaryColor }}>Mis Citas</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}
export default App;


const styles = StyleSheet.create({
  content_options_head: {
    
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10, //-15
    paddingLeft: 10,
    paddingRight: 10
  },
  content_items_head: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "25%"
  },
  content_icon_head: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    alignSelf: 'center',
    borderWidth:2,
    borderColor: primaryColor,
    
    //borderTopLeftColor: primaryColor,
    //borderTopBottomColor: primaryColor,
    //borderStyle:"dashed"
  },
  icon_head: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  },

})