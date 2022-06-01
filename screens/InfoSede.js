import React, { useState, useContext } from 'react';
import { StatusBar,View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, SafeAreaView, ImageBackground } from "react-native";

import { Icon } from 'react-native-eva-icons';
import UserContext from '../contexts/UserContext'
import Head from '../components/Head';
import OptionsHead from '../components/OptionsHead';
import { showLocation } from 'react-native-map-link';
import InitProcess from '../components/InitProcess';
import { primaryColor, colorTertiary } from '../Colors.js'
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../components/Menu';

function InfoSede(props) {
  // console.log("View Sede: ", props.route.params.data.name)
  const userDetails = useContext(UserContext)
  const { navigation } = props
  const [fullscreen, setFullscreen] = useState(false);
  const [imagenScreen, setimagenScreen] = useState("");

  function goToScreen(screen) { navigation.navigate(screen, { randomCode: Math.random() }) }


  function GotoMaps(lat, lon) {
    showLocation({
      latitude: lat,
      longitude: lon,
      googleForceLatLon: false,
      // sourceLatitude : lat,
      // sourceLongitude : lon,   
     // title: props.route.params.data.name,
    })
  }



  function fullscreenImg(data) {
    setimagenScreen(data)
    setFullscreen(true)

  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#d8cdd3" }}>
      <StatusBar barStyle="light-content" backgroundColor="#075E54"/>
      <ImageBackground source={require('../src/images/background1.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>

      
      <ScrollView scrollEventThrottle={16}  showsHorizontalScrollIndicator={true}>
         
      <Head name_user={userDetails.nombres} />
       <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 0, width: "100%" }}>
            <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <Text style={stylesVanues.name} >{props.route.params.data.name}</Text>
              <View style={stylesVanues.data}>
                <View style={stylesVanues.row}>
                  <Icon style={stylesVanues.icon} name='pin-outline' width={20} height={20} fill={primaryColor} />
                  <Text style={stylesVanues.address}>{props.route.params.data.address}</Text>
                </View>
              </View>
              <View style={stylesVanues.data}>
                <Text style={stylesVanues.galeriaTitle}>Gelería de imágenes</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {props.route.params.data.galeria.map((i, key) => {
                    return (
                      <TouchableOpacity onPress={() => fullscreenImg(i.img)}>
                        <Image key={key} style={stylesVanues.image_card} source={{ uri: i.img }} />
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>

              <View style={stylesVanues.data}>
                <Text style={stylesVanues.galeriaTitle}>Horario de Atención</Text>
                <View style={stylesVanues.box}>
                  {props.route.params.data.horario.map((i, key) =>
                    <View style={stylesVanues.row2} key={key}>
                      <Text style={stylesVanues.item}>{i.dia}</Text>
                      <Text style={stylesVanues.item}>{i.open} - {i.close}</Text>
                    </View>
                  )}
                </View>
              </View>



              <View style={stylesVanues.foot}>
                <TouchableOpacity style={stylesVanues.go} onPress={() => GotoMaps(props.route.params.data.latitud, props.route.params.data.longitud)}>
                  <Text style={stylesVanues.vermas} >Cómo Llegar</Text>
                </TouchableOpacity>

                <View style={stylesVanues.go}>
                  <TouchableOpacity onPress={() => goToScreen("Dashboard")}>
                    <Text style={stylesVanues.vermas} >Ver más sedes</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </ScrollView>






        <Menu props={{ ...props }} />



        {fullscreen &&
          <View style={{ alignItems: "center", alignContent: "center", justifyContent: "center", width: "100%", height: "100%", position: "absolute", backgroundColor: "rgba(0,0,0,0.8)" }}>
            <TouchableOpacity style={{ right: 10, top: 10, position: "absolute" }} onPress={() => setFullscreen(false)}>
              <Icon fill='white' name="close" width={30} height={30} />
            </TouchableOpacity>

            <View style={{ height: "90%", width: "100%" }}>
              <Image style={{ height: "100%", width: null, resizeMode: "contain" }} source={{ uri: imagenScreen }} />
            </View>
          </View>
        }


      </ImageBackground>
    </SafeAreaView>
  )
}
const stylesVanues = StyleSheet.create({
  section: {
    padding: 20,
  },
  scroll_view_pharmacy_slide: {
    paddingVertical: 10,
    paddingBottom: 10,
    width: "100%",
  },
  image_card: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  title: {
    opacity: 0,
    display: "none",
    position: "absolute",
    marginRight: 200,
    width: "100%",
    backgroundColor: "#e67072",
    padding: 5,
    textAlign: "right",
    borderRadius: 20,
    transform: [{ translateX: -100 }, { translateY: 0 }],
  },
  name: {
    color: primaryColor,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -10
  },
  data: {
    width: "90%",
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 10,
    paddingTop: -5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomColor: primaryColor,
    borderBottomWidth: 2
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    padding: 5,
  },
  icon: {
    lineHeight: 30
  },
  phone: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginLeft: 20,
  },
  address: {
    fontSize: 16,
    color: "#888",
    marginLeft: 20,
    right: 5
  },
  about: {
    width: "80%",
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
    marginLeft: 20,
    textAlign: "justify"
  },
  galeria: {
    marginTop: 40,
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 10
  },
  galeriaTitle: {
    marginBottom: 10,
    padding: 10,
    paddingBottom: 0,
    fontSize: 16,
    fontWeight: '700',
    color: '#555'
  },
  image_card: {
    width: 200,
    height: 160,
    borderRadius: 5,
    margin: 10,
    shadowOffset: { width: 0, height: 3, },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  horario: {
    marginTop: 40,
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 10
  },
  box: {
    borderColor: 'silver',
    borderWidth: 2,
    borderRadius: 10,
    width: "90%",
    margin: "5%",
    overflow: "hidden",
    paddingBottom: -7
  },
  row2: {
    flexDirection: "row",
    borderBottomColor: "silver",
    borderBottomWidth: 2,
    padding: 2
  },
  item: {
    textTransform: 'capitalize',
    justifyContent: 'space-around',
    margin: 5,
    width: "45%"
  },
  vermas: {
    textAlignVertical: "center",
    height: "100%",
    width: 200,
    margin: "auto",
    backgroundColor: primaryColor,
    textAlign: "center",
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    borderRadius: 20,
    // borderBottomWidth: 4,
    // borderBottomColor: primaryColor
  },
  foot: {
    marginBottom: 50,
  },
  go: {
    marginTop: 20,
    width: "100%",
    height: 50,
    alignItems: "center",
  },
});
export default InfoSede;