import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import ShopOfferts from './ShopOfferts';
import UserContext from '../contexts/UserContext'
import { primaryColor, colorLight, colorTertiary } from '../Colors.js'


function App(props) {
  const userDetails = React.useContext(UserContext);
  const { navigation } = props.props


  function goToCar(screen, car, from) {
    props.updateCarLocal()
    navigation.navigate(screen, { randomCode: Math.random(), car, from })
  }

  function goToScreen(screen, data, shop) {
    navigation.navigate(screen, { randomCode: Math.random(), data, shop })
  }


  return (
    <View style={styles.content}>
      <View style={styles.content_head}>
        <View style={styles.content_head_tittle}>
          <View style={styles.content_head_icon}>
            <TouchableOpacity
              style={styles.content_head_icon}
              onPress={() => goToScreen("Dashboard")}
            >
              <Icon name='chevron-left' width={35} height={35} fill={primaryColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content_head_logo}>
          <Image style={styles.icon} source={require('../src/images/LogoPlanmedVerde.png')} />
        </View>
        <TouchableOpacity
          style={styles.content_head_icon}
          onPress={() => goToCar("ShopCar", props.Car, "Shop2")}
        >
          {
            userDetails.email != null &&
            <Text style={styles.qty_car}>
              {
                props.Car == undefined ? "0" : props.Car.length
              }</Text>
          }
          <Icon name='shopping-cart-outline' width={30} height={30} fill={primaryColor} />
        </TouchableOpacity>
      </View>
      <ShopOfferts props={props} />
    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  qty_car: {
    color: primaryColor,
    marginLeft: 0,
    marginBottom: -5,
    fontWeight: "bold",
    width: 30,
    textAlign: "center"
  },
  content: {
    backgroundColor: colorLight,
  },
  content_head: {
    top:30,
    marginBottom:30,
    paddingVertical:20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center"
  },
  content_head_logo: {
    left: 10,
    width: "55%",
    marginLeft: -25,
    alignContent: "center",
    alignItems: "center"
  },
  content_head_tittle: {
    width: 40,

  },

  content_head_icon: {
    //  backgroundColor : "red"
  },
  text_head: {
    color: "#777",
    fontSize: 17,
  },
  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain"
  },
})

