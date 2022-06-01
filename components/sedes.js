import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, SafeAreaView } from "react-native";
import { colorTertiary, primaryColor, colorLight } from '../Colors.js'


function Sede(props) {
  function goToScreen(screen, data) {
    props.props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <TouchableOpacity style={styles.pharmacy_slide_card} onPress={() => goToScreen("InfoSede", props.i)}>

      <View style={styles.wrapText}>
        <Text style={styles.pharmacy_slide_card_tittle}>{props.i.name}</Text>
        <Text style={styles.pharmacy_slide_card_text}>{props.i.address}</Text>
      </View>


      <View style={styles.wrpaImg}>
        <Image
          source={{ uri: props.i.images }}
          style={styles.image_card}
        />
      </View>

    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  pharmacy_slide_card: {
    backgroundColor: "white",
    width: 180,
    height: 220,
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  wrapText: {
    width: "100%",
    height: 100
  },

  pharmacy_slide_card_tittle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#313450"
  },

  pharmacy_slide_card_text: {
    top: 2,
    fontSize: 14,
    width: "90%",
    color: "#000",
  },

  wrpaImg: {
    overflow: "hidden",
    height: 100,
  },

  image_card: {
    borderRadius:20,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  
  // pharmacy_slide_card: {
  //   backgroundColor: colorLight,
  //   width: 180,
  //   marginRight: 7,
  //   marginLeft: 7,
  //   marginBottom: 20,
  //   padding: 20,
  //   borderRadius: 12,
  //   shadowOffset: { width: 0, height: 3},
  //   shadowOpacity: 0.27,
  //   shadowRadius: 4.65,
  //   elevation: 6,
  // },
  // pharmacy_slide_card_tittle: {
  //   fontWeight: "bold",
  //   fontSize: 16,
  //   color: "#313450"
  // },
  // pharmacy_slide_card_text: {
  //   fontSize: 12,
  //   width: "90%",
  //   color: "#898A8F",
  // },
  // image_card: {
  //   width: 140,
  //   height: 140,
  //   resizeMode: "contain",
  // },

});

export default Sede;