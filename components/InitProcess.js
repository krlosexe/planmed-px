import React from 'react';
import { StyleSheet, Alert, View, Text, Image, TouchableOpacity } from "react-native";
import UserContext from '../contexts/UserContext'
//import styles from '../Styles';
import { colorTertiary, colorBack1, colorBack2, primaryColor, colorLight } from '../Colors.js'
import LinearGradient from 'react-native-linear-gradient';

function Index(props) {
  const userDetails = React.useContext(UserContext)
  const { navigation } = props.props
  function goToScreen(screen, id) { navigation.navigate(screen, { randomCode: Math.random(), id }) }
  function goToCita(screen, user) {
    const procedure = 0
    navigation.navigate(screen, { randomCode: Math.random(), user, procedure })
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
  if (userDetails.email != null) {
    return (
      <TouchableOpacity onPress={() => goToCita("NewCita", userDetails.id_cliente)} style={styles.card_init_process}>
        <View style={styles.card_init_process_content}>

          <View style={{ width: "60%" }}>
            <Text style={styles.card_init_process_titile}>Solicitar una Cita</Text>
            <Text style={styles.card_init_process_info}>Reserva tu cita en línea con nosotros</Text>
            <Text style={styles.card_init_process_info2}>¡Solicitar Ahora!</Text>
          </View>
          <View style={{ width: "40%" }}>
            <Image
              style={styles.card_init_process_image}
              source={require("../src/images/cita.png")} />
          </View>

        </View>
      </TouchableOpacity>
    )
  }
  else {
    return (
      <TouchableOpacity onPress={() => WindowAlert("DashboardPrp")} style={styles.card_init_process}>
        <View style={styles.card_init_process_content}>


          <View style={{ width: "60%" }}>
            <Text style={styles.card_init_process_titile}>Solicitar una Cita</Text>
            <Text style={styles.card_init_process_info}>Reserva tu cita en línea con nosotros</Text>
            <Text style={styles.card_init_process_info2}>¡Solicitar Ahora!</Text>
          </View>

          <View style={{ width: "40%" }}>
            <Image
              style={styles.card_init_process_image}
              source={require("../src/images/cita.png")} />
          </View>

        </View>
      </TouchableOpacity>
    )

  }
}


const styles = StyleSheet.create({
  card_init_process: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,

  },
  card_init_process_content: {
    borderRadius: 20,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "rgba(255,255,255,0.5)",
    borderBottomColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  card_init_process_titile: {
    top:10,
    textAlign:"center",
    fontSize: 17,
    color: primaryColor,
    fontWeight: "bold",
    backgroundColor:colorLight,
    borderRadius:10, padding:1
  },

  card_init_process_info: {
    top:20,
    fontSize: 12,
    color:"black",
textAlign:"center"
  },


  card_init_process_info2: {
    top:30,
    fontSize: 12,
    color:"black",
textAlign:"center",
fontWeight:"bold",
textDecorationLine: "underline"
  },



  card_init_process_image: {
    width: 130,
    height: 130,
    resizeMode: "contain"
  },
})


export default Index;

