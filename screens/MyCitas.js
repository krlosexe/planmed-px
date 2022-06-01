import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-eva-icons';
import Head from '../components/Head';
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import { getCitas } from '../components/processItemShop'
import { colorDark, primaryColor, colorBack, colorLight, colorTertiary } from '../Colors.js'
import Toast from 'react-native-simple-toast';
import Loading from '../components/loading.js'

function MyCitas(props) {
  const [Citas, setCitas] = useState([])
  const [Load, setLoad] = useState(false) //cargando?
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const userDetails = React.useContext(UserContext)
  const { navigation } = props

  // { "title": "valorations", "child": [{ "datao1": 1, "dato2": 2, "dato3": 3 }] },
  // { "title": "Procedimientos", "child": [] },
  // { "title": "Revisiones", "child": [] },
  // { "title": "Masajes", "child": [{ "dato2": 2, "dato3": 3 }, { "dato2": 2, "dato3": 3 }] }


  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }



  useEffect(() => {
    Get(),
      setLoad(true)
  }, [randomCode])





  async function Get() {
    const citas = await getCitas(props.route.params.user)
    if (citas == "[Error: Network Error]") {

      Toast.show("Verifique su conexión a internet.")
    }
    else {
      setCitas(citas)
      setLoad(false)
    }
  }


  function goToScreen(screen, user) {
    const procedure = 0
    props.navigation.navigate(screen, { randomCode: Math.random(), user, procedure })
  }



  function confirLoader() {
    try {
      return (
        <View style={styles.contained}>
          <View style={styles.group}>
            <TouchableOpacity style={open1 ? styles.headOpen : styles.headClose} onPress={() => { setOpen1(!open1) }}>
              <Icon style={styles.arrow} name={open1 === false ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'} width={20} height={20} fill={colorTertiary} />
              
              {
                Citas.queries !== [] && Citas.queries !== undefined &&
                <View style={styles.number}>
                  <Text style={styles.numberText}>
                    {Citas.queries.length}
                  </Text>
                </View>
              }
              <Text style={styles.title}>Valoraciones</Text>
              
            </TouchableOpacity>
            {
              open1 && !Load && Citas.queries !== [] && Citas.queries !== undefined &&
              <View style={{ width: "100%" }}>
                {
                  Citas.queries.map((i, key) => {
                    return (
                      <View style={styles.wrap}>
                        <View style={styles.row}><Text style={styles.text1}>Fecha:</Text><Text style={styles.text2}>{i.fecha}</Text></View>
                        <View style={styles.row}><Text style={styles.text1}>Hora Inicio:</Text><Text style={styles.text2}>{i.time}</Text></View>
                        <View style={styles.row}><Text style={styles.text1}>Hora Fin: </Text><Text style={styles.text2}>{i.time_end}</Text></View>
                        <View style={styles.row}><Text style={styles.text1}>Especialista: </Text><Text style={styles.text2}>{i.surgeon}</Text></View>
                        <View style={styles.row}><Text style={styles.text1}>Lugar: </Text><Text style={styles.text2}>{i.name_comercial}</Text></View>
                      </View>
                    )
                  })
                }
              </View>
            }{
              open1 && !Load && Citas.queries.length == 0 &&
              <View style={styles.wrap}>
                <View style={{ borderColor: primaryColor, borderWidth: 1, padding: 10, borderRadius: 20, borderStyle: 'dashed', textAlign: "center", }}>
                  <Text style={{ textAlign: "center", width: "100%", color: primaryColor, textTransform: "uppercase", fontSize: 12, }}>aun no hay citas de este tipo.</Text>
                </View>
              </View>
            }
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={open2 ? styles.headOpen : styles.headClose} onPress={() => { setOpen2(!open2) }}>
              <Icon style={styles.arrow} name={open2 === false ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'} width={20} height={20} fill={colorTertiary} />
              {
                Citas.procedures !== [] && Citas.procedures !== undefined &&
                <View style={styles.number}>
                  <Text style={styles.numberText}>
                    {Citas.procedures.length}
                  </Text>
                </View>
              }
               <Text style={styles.title}>procedimientos</Text>
            </TouchableOpacity>
            {
              open2 && !Load && Citas.procedures !== [] && Citas.procedures !== undefined &&
              <View style={{ width: "100%" }}>
                {
                  Citas.procedures.map((i, key) => {
                    return (
                      <View style={styles.wrap}>
                        <View style={styles.row}><Text style={styles.text1}>Fecha: </Text><Text style={styles.text2}>{i.fecha}</Text></View>
                        <View style={styles.row}><Text style={styles.text1}>Especialista: </Text><Text style={styles.text2}>{i.surgeon}</Text></View>
                        <View style={styles.row}><Text style={styles.text1}>Lugar: </Text><Text style={styles.text2}>{i.name_clinic}</Text></View>
                      </View>
                    )
                  })
                }
              </View>
            }
            {
              open2 && !Load && Citas.procedures.length == 0 &&
              <View style={styles.wrap}>
                <View style={{ borderColor: primaryColor, borderWidth: 1, padding: 10, borderRadius: 20, borderStyle: 'dashed', textAlign: "center", }}>
                  <Text style={{ textAlign: "center", width: "100%", color: primaryColor, textTransform: "uppercase", fontSize: 12, }}>aun no hay citas de este tipo.</Text>
                </View>
              </View>
            }
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={open3 ? styles.headOpen : styles.headClose} onPress={() => { setOpen3(!open3) }}>
              <Icon style={styles.arrow} name={open3 === false ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'} width={20} height={20} fill={colorTertiary} />
              {
                Citas.revisiones !== [] && Citas.revisiones !== undefined &&
                <View style={styles.number}>
                  <Text style={styles.numberText}>
                    {Citas.revisiones.length}
                  </Text>
                </View>
              }
              <Text style={styles.title}>Revisiones</Text>
            </TouchableOpacity>
            {
              open3 && !Load && Citas.revisiones !== [] && Citas.revisiones !== undefined &&
              <View style={{ width: "100%" }}>
                {
                  Citas.revisiones.map((i, key) => {
                    return (
                      <View style={styles.wrap}>
                        <View style={styles.row}>
                          <Text style={styles.text1}>Estatus: </Text>
                          <Text style={styles.text2}>{i.status}</Text>
                        </View>


                        <View style={styles.row}>
                          <Text style={styles.text1}>cirugía: </Text>
                          <Text style={styles.text2}>{i.cirugia}</Text>
                        </View>


                        <View style={styles.row}>
                          <Text style={styles.text1}>cirujano: </Text>
                          <Text style={styles.text2}>{i.cirujano}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text1}>enfermera: </Text>
                          <Text style={styles.text2}>{i.enfermera}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text1}>fecha: </Text>
                          <Text style={styles.text2}>{i.fecha}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text1}>hora inicio: </Text>
                          <Text style={styles.text2}>{i.time}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text1}>hora fin: </Text>
                          <Text style={styles.text2}>{i.time_end}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text1}>Lugar: </Text>
                          <Text style={styles.text2}>{i.name_clinic}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            }
            {
              open3 && !Load && Citas.revisiones.length == 0 &&
              <View style={styles.wrap}>
                <View style={{ borderColor: primaryColor, borderWidth: 1, padding: 10, borderRadius: 20, borderStyle: 'dashed', textAlign: "center", }}>
                  <Text style={{ textAlign: "center", width: "100%", color: primaryColor, textTransform: "uppercase", fontSize: 12, }}>aun no hay citas de este tipo.</Text>
                </View>
              </View>
            }
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={open4 ? styles.headOpen : styles.headClose} onPress={() => { setOpen4(!open4) }}>
              <Icon style={styles.arrow} name={open4 === false ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'} width={20} height={20} fill={colorTertiary} />
              {
                Citas.masajes !== [] && Citas.masajes !== undefined &&
                <View style={styles.number}>
                  <Text style={styles.numberText}>
                    {Citas.masajes.length}
                  </Text>
                </View>
              }
              <Text style={styles.title}>Masajes</Text>
            </TouchableOpacity>
            {
              open4 && !Load && Citas.masajes !== [] && Citas.masajes !== undefined &&
              <View style={{ width: "100%" }}>
                {
                  Citas.masajes.map((i, key) => {
                    return (
                      <View style={styles.wrap}>
                        <View style={styles.row}>
                          <Text style={styles.text1}>fecha: </Text>
                          <Text style={styles.text2}>{i.fecha}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text1}>hora: </Text>
                          <Text style={styles.text2}>{i.time}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.text1}>lugar: </Text>
                          <Text style={styles.text2}>{i.name_clinic}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            }
            {
              open4 && !Load && Citas.masajes.length == 0 &&
              <View style={styles.wrap}>
                <View style={{ borderColor: primaryColor, borderWidth: 1, padding: 10, borderRadius: 20, borderStyle: 'dashed', textAlign: "center", }}>
                  <Text style={{ textAlign: "center", width: "100%", color: primaryColor, textTransform: "uppercase", fontSize: 12, }}>aun no hay citas de este tipo.</Text>
                </View>
              </View>
            }
          </View>
        </View>
      )
    } catch (error) {
      Toast.show("Verifique su conexion a internet")
    }
  }

  function vacio() {
    if (Citas == undefined) {
      return (
        <View style={{
          marginLeft: "10%",
          width: "80%",
          marginTop: 100,
          borderColor: primaryColor,
          borderWidth: 2,
          padding: 10,
          borderRadius: 20,
          borderStyle: 'dashed',
          textAlign: "center",
        }}>
          <Text style={{
            textAlign: "center",
            width: "100%",
            color: primaryColor,
            textTransform: "uppercase",
            fontSize: 16,
          }}>
            lista de citas vacía
        </Text>
        </View>
      )
    }

    if (Citas == []) {
      return (
        <View style={{
          marginLeft: "10%",
          width: "80%",
          marginTop: 100,
          borderColor: primaryColor,
          borderWidth: 2,
          padding: 10,
          borderRadius: 20,
          borderStyle: 'dashed',
          textAlign: "center",
        }}>
          <Text style={{
            textAlign: "center",
            width: "100%",
            color: primaryColor,
            textTransform: "uppercase",
            fontSize: 16,
          }}>
            lista de citas vacía
          </Text>
        </View>
      )
    }


    if (Citas.length == 0) {
      return (
        <View style={{
          marginLeft: "10%",
          width: "80%",
          marginTop: 100,
          borderColor: primaryColor,
          borderWidth: 2,
          padding: 10,
          borderRadius: 20,
          borderStyle: 'dashed',
          textAlign: "center",
        }}>
          <Text style={{
            textAlign: "center",
            width: "100%",
            color: primaryColor,
            textTransform: "uppercase",
            fontSize: 16,
          }}>
            lista de citas vacía
        </Text>
        </View>
      )
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%",
        }}>
        <ScrollView >
          <Head name_user={props.route.params.user == userDetails.id_cliente ? "Mis Citas" : "Citas"} />
          {Load == true && <Loading color={primaryColor} />}
          {Load == false && vacio()}
          {!Load && Citas !== [] && confirLoader()}
        </ScrollView>
        <View style={{ alignItems: "center", bottom: 15, }}>
          <TouchableOpacity
            onPress={() => goToScreen('NewCita', props.route.params.user == userDetails.id_cliente ? userDetails.id_cliente : props.route.params.user)}
            style={{
              alignItems: "center",
              backgroundColor: colorLight,
              width: 50, height: 50,
              borderRadius: 25,
              paddingTop: 6,
            }}>
            <Icon name='plus' width={35} height={35} fill={primaryColor} />
          </TouchableOpacity>
        </View>
        <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default MyCitas;
const styles = StyleSheet.create({
  contained: {
    padding: "5%",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingBottom: 80
  },


  group: {
    marginHorizontal: 10,
    marginTop: 10,
    width: "100%",
    borderRadius: 0,
  },



  headOpen: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    backgroundColor: colorLight,
   // borderRadius: 40
   borderTopLeftRadius:20,
   borderTopRightRadius:20
  },

  headClose: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    backgroundColor: colorLight,
    borderRadius: 20
  },



  title: {
    lineHeight: 20,
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    textTransform: "capitalize",
  },


  arrow: {
    marginRight: 15,
    top: 4,
    marginLeft: 5,
    marginRight: 5,
  },


  number: {
    left: 5,
    marginRight:10,
    top: 5,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorTertiary,
    width: 20,
    height: 20
  },


  numberText: {
    lineHeight: 15,
    fontSize: 10,
  },


  wrap: {
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 10,
    borderWidth: 2,
    borderColor: colorLight,
    marginBottom: 4,
    marginTop: -6,

  },

  row: {
    flexDirection: "row"
  },

  text1: {
    fontWeight: "bold",
    fontSize: 15,
    width: "35%",
    textAlign: "right",
    paddingRight: 5,
    textTransform: "capitalize"
  },

  text2: {
    fontSize: 13
  }
})