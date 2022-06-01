import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ImageBackground } from "react-native";
import { Icon } from 'react-native-eva-icons';
//import styles from '../Styles';
import { showLocation } from 'react-native-map-link'
import {Slideshow} from 'react-native-slideshow';


function Index(props) {
  const { navigation } = props.props.props
  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() })
  }
  const [offerts, setOfferts] = useState([
    { "banner": "https://danielandrescorreaposadacirujano.com/wp-content/uploads/2020/08/App-Correa-Banners-11.png", "goto": "Shop2" },
    { "banner": "https://danielandrescorreaposadacirujano.com/wp-content/uploads/2020/08/App-Correa-Banners-12.png", "goto": "Shop2" },
    { "banner": "https://danielandrescorreaposadacirujano.com/wp-content/uploads/2020/08/App-Correa-Banners-13.png", "goto": "Shop2" },
  ])





  return (
    <View>
      <View style={{width:"100%", justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom:30}}> 
        <ScrollView horizontal={true} style={styles.scroll_view_pharmacy_slide}>
          {
            offerts.map((index, key) => {
              return (
                <TouchableOpacity key={key} style={styles.pharmacy_slide_card} onPress={() => goToScreen(index.goto)} >
                  <ImageBackground source={{
                    uri: index.banner
                  }}
                    style={{
                      flex: 1,
                      resizeMode: "cover",
                      width: "100%",
                      height: 200
                    }}
                    imageStyle={{ borderRadius: 20 }}
                  ></ImageBackground>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>


      </View>
    </View>
  )

}



const styles = StyleSheet.create({
  scroll_view_pharmacy_slide: {
    width: "90%"
  },

  pharmacy_slide_head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pharmacy_slide_tittle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#777"
  },
  pharmacy_slide_view_all: {
    color: "#444",
    fontSize: 16,
    fontWeight: "bold"
  },
  pharmacy_slide_card: {
    backgroundColor: "#eee",
    width: 320,
    marginRight: 7,
    marginLeft: 7,
    borderRadius: 20,
  },
  pharmacy_slide_card_tittle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#313450"
  },
  pharmacy_slide_card_text: {
    fontSize: 12,
    width: "90%",
    color: "#898A8F",
  },
});

export default Index;