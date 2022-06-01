import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  primaryColor, colorSecundary, colorTertiary, colorSilver, colorBack, colorDark, colorLight, disableColor, primaryColorOpacity, TextDark, TextLight, modalBack
} from '../Colors.js'
import LinearGradient from 'react-native-linear-gradient';



const windowWidth = Dimensions.get('window').width;




function App(props) {



  return (
    <View style={styles.wrapper}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y:1}} colors={["#075E54","#25D366"]} style={[styles.wrap, { width: windowWidth + 4, height: windowWidth / 3 }]}> 
        <View syle={styles.wrapImg}>




          <Image
            style={props.name_user==undefined?styles.img2:styles.img}
            source={require('../src/images/LogoPlanmedBlanco.png')}
          />



        </View>

        <View style={styles.wrapText}>
          <Text style={styles.text_head}>
          {props.name_user}
          </Text>
        </View>
        </LinearGradient>
 
    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  wrapper: {
    // left:-1,
    // alignItems: "center",
    // alignContent: "center",
    // marginBottom: 10,
    // padding: 1,
    // shadowColor: "#000",
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 6,
    // shadowOffset: { width: 0, height: 3, },
  },

  wrap: {
    alignContent: "center", alignItems: "center",
    flexDirection: "column",
    padding: 10,
    height: 120,
    width: "104%", left: "-1%", top: "-4%",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    shadowColor: "#000",
    shadowRadius: 4.65,
    elevation: 12,
    shadowOffset: { width: 0, height: 3, },
  },

  wrapImg: {
    flex: 1,
  },

  img: {
    top: 25,
    width: 100,
    height: 50,
    marginBottom:-10,
    resizeMode: "contain",
  },

  img2: {
    top: 5,
    width: 100,
    height: 90,
    marginBottom:-10,
    resizeMode: "contain",
  },

  wrapText: {
    top:60,
    width: "85%",
    paddingHorizontal: 10,
    justifyContent: "center",
    //backgroundColor:"red"
  },
  
  text_head: {
    lineHeight:25,
    textAlign: "center",
    top: -20,
    color: colorLight,
    fontSize: 22,
    textTransform: "capitalize"
  },

})