import React from 'react'
import { StyleSheet, TouchableOpacity, View, Linking, Platform, Image } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { primaryColor } from '../Colors.js'

function Follow(props) {




  // const getPlatform = Platform.OS
  // console.log(getPlatform)




  //llamadas
  const followCall = async () => {
    console.log("calling")
    await Linking.openURL("tel:+573157857783")
  }

  //mensajes de texto
  //android = ?
  //ios = &
  const followSMS = async () => {
    console.log("SMS TEXT")
    await Linking.openURL("sms:+573157857783?body=Hola!")
  }

  //email
  const followEmail = async () => {
    console.log("email")
    await Linking.openURL('mailto:contacto@pielis.com?subject=Información&body=Description&body=Hola! Me gustaria saber acerca de sus productos y servicios.')

  }

  //whatsapp
  const followWhatsApp = async () => {
    console.log("whatsapp")
    await Linking.openURL("https://wa.me/+573157857783?text=Me gustaria saber más acerca de sus productos y servicios.")
  }

  //sitio web
  const followWWW = async () => {
    console.log("sitio web")
    await Linking.openURL("https://planmed.com.co/")
  }

  const followFacebook = async () => {
    await Linking.openURL("https://www.facebook.com/planmedicoquirurgico/")

  }


  const followInstagram = async () => {
    await Linking.openURL("https://www.instagram.com/planmed_cirugia/")

  }
  const followYoutube = async () => {
    // https://www.youtube.com/channel/UCp5gxT85tfrwWr-AnTjHipA
  }

  // function find_dimesions(layout){
  //   const {x, y, width, height} = layout;
  //   // console.warn(x);
  //   // console.warn(y);
  //   // console.warn(width);
  //   console.log(height)
  // }

  return (
    <View>
      {/* <View onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }} >
 */}
      <View style={styles.followWrap}>

        {/* <TouchableOpacity style={styles.fallow} onPress={() => followSMS()} >
          <Icon name='message-square-outline' width={25} height={25} fill={primaryColor} />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.fallow} onPress={() => followCall()} >
          <Icon name='phone-call-outline' width={25} height={25} fill={primaryColor} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.fallow} onPress={() => followEmail()} >
          <Icon name='email-outline' width={25} height={25} fill={primaryColor} />
        </TouchableOpacity> */}




        <TouchableOpacity style={styles.fallow} onPress={() => followWhatsApp()} >
          <Image
            style={{ width: 28, height: 28, left: 0 - 1 }}
            source={require("../src/images/icon_whatsapp_pink.png")}
          />
        </TouchableOpacity>


        <TouchableOpacity style={styles.fallow} onPress={() => followFacebook()} >
          <Image
            style={{ width: 28, height: 28, left: 0 - 1 }}
            source={require("../src/images/icon_facebook.png")}
          />
        </TouchableOpacity>



        <TouchableOpacity style={styles.fallow} onPress={() => followInstagram()} >
          <Image
            style={{ width: 28, height: 28, left: 0 - 1 }}
            source={require("../src/images/icon_instagram.png")}
          />
        </TouchableOpacity>






        <TouchableOpacity style={styles.fallow} onPress={() => followWWW()} >
          <Icon name='globe-outline' width={25} height={25} fill={primaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Follow;


const styles = StyleSheet.create({
  followWrap: {
    marginTop: 63,
    flexDirection: "row",
    bottom: 60,
    justifyContent: "space-evenly",
  },

  fallow: {
    justifyContent: "center",
    paddingLeft: 10,
    margin: 10,
    backgroundColor: "#FFF",
    width: 45,
    height: 45,
    borderRadius: 24,
    marginTop: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

});