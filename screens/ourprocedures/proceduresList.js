import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Animated,
  ImageBackground

} from 'react-native';
import Menu from '../../components/Menu';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../../contexts/UserContext'
import { AllProcedures } from '../../components/processItemShop'
import Head from '../../components/Head';
import { colorBack1, colorBack2, colorLight, colorTertiary, primaryColor, primaryColorOpacity } from '../../Colors.js'
import Loading from '../../components/loading.js'
import LinearGradient from 'react-native-linear-gradient';



function ProceduresList(props) {
  const [slider, setslider] = useState(1);
  const [Load, setLoad] = useState(true)
  const [allPro, setAllPro] = useState([])
  const userDetails = useContext(UserContext)

  const animate = useRef(new Animated.Value(0)).current


  React.useEffect(() => {
    Animated.timing(
      animate,
      {
        toValue: 20,
        duration: 3000,
      }
    ).start();
  }, [animate])




  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }


  setTimeout(() => {
    console.log("cambiando slider")
    if (slider == 4) { setslider(1) }
    else { setslider(slider + 1) }
  }, 5000);


  useEffect(() => {
    Get()
  }, [randomCode])



  async function Get() {
    const pro = await AllProcedures()
    await setLoad(false)
    setAllPro(pro)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />

      <ImageBackground source={require('../../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>





        <ScrollView>

          <Head name_user={userDetails.nombres} />

          {
            Load == true &&
            <View style={{ marginTop: 80 }}>
              <Loading color={primaryColor} />
            </View>
          }

          <View style={{ alignContent: "center", alignItems: "center" }}>
            {!Load &&
              <FlatList

                data={allPro}
                numColumns={2}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                  <Card i={item} key={index} props={{ ...props }} width={140} height={200} mt={80} />
                )}
              />
            }
          </View>

          {!Load &&
            <View style={style.sliderShow}>
              {slider == 1 &&
                <View style={style.slider}>
                  <View style={style.wrapImg}>
                    <Image source={require('../../src/images/icon1.png')} style={style.iconImg} />
                  </View>
                  <Text style={style.title}>Asesoras quirúrgicas</Text>
                  <Text style={style.info}>Ponemos a tu disposición un equipo de asesorar quirúrgicas que estarán a tu disposición antes, durante y después de tu cirugía.</Text>
                </View>
              }

              {slider == 2 &&
                <View style={style.slider}>
                  <View style={style.wrapImg}>
                    <Image source={require('../../src/images/icon3.png')} style={style.iconImg} />
                  </View>

                  <Text style={style.title}>Clínica habilitadas</Text>
                  <Text style={style.info}>Con sedes en Medellín y Cali.</Text>
                </View>
              }

              {slider == 3 &&
                <View style={style.slider}>
                  <View style={style.wrapImg}>
                    <Image source={require('../../src/images/icon2.png')} style={style.iconImg} />
                  </View>
                  <Text style={style.title}>Cirujanos plasticos</Text>
                  <Text style={style.info}>Con más de 15 años de experiencia.</Text>
                </View>
              }

              {slider == 4 &&
                <View style={style.slider}>
                  <View style={style.wrapImg}>
                    <Image source={require('../../src/images/icon4.png')} style={style.iconImg} />
                  </View>
                  <Text style={style.title}>Equipo quirúrgico</Text>
                  <Text style={style.info}>Contamos con un equipo quirúrgico altamente calificado y capacitado para prestar sus servicios en pro de la seguridad de nuestros pacientes.</Text>
                </View>
              }
            </View>
          }


        </ScrollView>
        <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>

  )
}


function Card(props) {
  const [show, setShow] = useState(false)
  const userDetails = React.useContext(UserContext)
  const { navigation } = props
  function goToScreen(screen, id, from) {
    let data = id.child
    props.props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
    console.log("go to...")
  }

  return (
    <View style={[style.wrapCard, { width: props.width, height: props.height }]}>

      {
        show == false &&
        <TouchableOpacity style={style.btnCard} onPress={() => goToScreen('ProceduresView', props.i, props.i.name)}>
          <Text style={[style.textCar, style.textFront, { marginTop: props.mt }]}>{props.i.name}</Text>
        </TouchableOpacity>
      }
      <Image
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -2
        }}
        source={{ uri: props.i.img }} />
    </View>
  )
}

const style = StyleSheet.create({
  wrapCard: {
    margin: 15,
    maxHeight: 280,
    justifyContent: "space-between",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3, },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  btnCard: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
  },

  textCar: {
    textAlign: "center",
    fontWeight: "bold",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
  },

  textFront: {
    textTransform: "capitalize",
    position: "relative",
    color: "#FFF",
    fontSize: 20,
  },

  textBack: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold"
  },

  btnViewMore: {
    position: "absolute",
    bottom: -40,
    left: 40,
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: 100,
    borderRadius: 20,
    justifyContent: "center",
  },

  sliderShow: {
    marginBottom: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },


  slider: {
    borderRadius: 20,
    borderTopColor: "rgba(255,255,255,0.5)",
    borderLeftColor: "rgba(255,255,255,0.5)",
    borderRightColor: "white",
    borderBottomColor: "white",
    borderWidth: 1,
    width: "70%",
    backgroundColor: "rgba(255,255,255,0.5)",
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 15,
    textAlign: "center",
  },

  sliderIcon: {},

  title: {
    textAlign: "center",
    color: "#075E54",
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold"
  },

  info: {
    fontSize: 12,
    textAlign: "center",
    color: "#000"
  },

  wrapImg: {
    width: 50,
    height: 50,
    flex: 1
  },

  iconImg: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain"
  }
});

export default ProceduresList;