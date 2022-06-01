import React, { useState, useRef, useEffect } from 'react'
import { StatusBar, Dimensions, SafeAreaView, ImageBackground, Modal, Pressable, Animated, View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import Head from '../components/Head';
import Menu from '../components/Menu';
import { getMyPurchases } from '../components/processItemShop'
import Loading from '../components/loading.js'
import { primaryColor, colorSecundary, primaryColorOpacity, colorDark, colorBack, modalBack, colorLight, colorTertiary } from '../Colors.js'
import Toast from 'react-native-simple-toast';

function Mypurchases(props) {
  let deviceWidth = Dimensions.get('window').width
  let deviceHeight = Dimensions.get('window').height
  const userDetails = React.useContext(UserContext)
  const [mypurchases, setMypurchases] = useState([])
  const [Load, setLoad] = useState(true) //cargando?

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    async function Get() {
      const data = await getMyPurchases(userDetails.id_cliente)
      await setMypurchases(data)
      setLoad(false)
    }
    Get()
  }, [randomCode])
  function confirLoader() {
    try {
      return (
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {mypurchases.map((i, key) => { return <Children i={i} k={key} /> })}
          <View style={style.footSpace}></View>
        </ScrollView>
      )
    } catch (error) {
      Toast.show("Verifique su conexion a internet")
    }
  }


  function vacio() {
    if (mypurchases == undefined) {
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
            lista de pedidos vacía
        </Text>
        </View>
      )
    }

    if (mypurchases == []) {
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
            lista de pedidos vacía
          </Text>
        </View>
      )
    }

    if (mypurchases.length == 0) {
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
            lista de pedidos vacía
        </Text>
        </View>
      )
    }
  }
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: "#d8cdd3" }}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%",
        }}>

      <ScrollView>
        <Head name_user={userDetails.nombres} />
        <View style={{
          zIndex: -2,
          alignItems:"center", alignContent:"center",
          marginTop: -60,
          marginBottom: 10,
          justifyContent: "center",
        }}>
          <Text style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            lineHeight: 25,
            fontSize: 16,
            width: "60%",
            textAlign: "center",
            color: colorLight,
            backgroundColor:primaryColor,
            paddingTop:60,
            height:100,
            borderRadius:50
          }}>
            mi lista de pedidos
          </Text>
        </View>
        {Load == true && <Loading color={primaryColor} />}
        {Load == false && vacio()}
        {Load==false && mypurchases !==[] && confirLoader()}
      </ScrollView>
      <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>
  )
}
{/* ------------------------------------------------------- */ }
function Children(props) {
  const [view, setView] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  function viewer() {
    setView(!view)
  }
  return (
    <View style={style.children}>
      {/* ------ modal start ------ */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} >
        <View style={style.centeredView}>
          <Pressable style={style.btnClose} onPress={() => setModalVisible(false)}><Icon name='close-circle-outline' width={30} height={30} fill='#FFF' /></Pressable>
          <ScrollView>
            <View style={style.modalView}>
              <View style={style.modalhead}>
                <View style={{ width: "70%" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={style.text1}>Nº. </Text>
                    <Text style={style.text2}>{props.k + 1}</Text>
                    <Text style={style.text1}> / Serial: </Text>
                    <Text style={style.text2}>0{props.i.id}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={style.text1}>Status: </Text>
                    <Text style={style.text2}>{props.i.status}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={style.text1}>Fecha: </Text>
                    <Text style={style.text2}>{props.i.created_at}</Text>
                  </View>
                </View>
                <View style={{
                   top: 4,
                  right: -25,
                  width:70,height:70,
                  borderRadius:35, overflow:"hidden"
                }}>
                  <Image style={{
                    height: "100%",
                    width: "100%",
                  }} source={require('../src/images/isotype.png')} />
                </View>
              </View>
              <View style={style.modalbody}>
                {props.i.products.map((i, key) => {
                  return (
                    <View style={{ flexDirection: "row", padding: 5, borderBottomColor: "#555", borderBottomWidth: 0.2 }}>

                      <Text style={{ color: "#555", width: 20, lineHeight: 40 }}>{key + 1}</Text>
                      {i.photo != null
                        ? (<Image style={{ width: 55, height: 55, borderRadius: 30 }} source={{ uri: i.photo }} />)
                        : (<Image style={{ width: 55, height: 55, borderRadius: 30 }} source={require('../src/images/emtyp.png')} />)
                      }
                      <View style={{ flexDirection: "column", marginLeft: 10 }}>
                        <Text>{i.description}</Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text>Cant: {i.qty} X Precio: $.{i.price}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ color: colorDark, fontWeight: "bold" }}>TOTAL: $ {i.price_total}</Text>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
              <View style={style.modalfoot}>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={style.text1}>Total Pagado: </Text>
                    <Text style={style.text2}>COP. {props.i.total_invoice}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={style.text1}>Metodo de pago:</Text>
                    <Text style={style.text2}> {props.i.method_pay}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={style.text1}>Referencia de pago: </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={style.text2}>{props.i.reference_pay}</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {/* <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text> */}
        </View>
      </Modal>
      {/* ------ modal end ------ */}
      <View style={view?style.visibleOn:style.visibleOff}>
        <View style={style.datos}>
          <Text style={style.title}>Nº {props.k + 1} - {props.i.status}</Text>
        </View>
        <View style={style.options}>
          <TouchableOpacity onPress={() => setModalVisible(true)}><Icon name='external-link-outline' width={30} height={30} fill={primaryColor} /></TouchableOpacity>
          <TouchableOpacity onPress={() => viewer()}>
            <Icon name={view == true ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} left={8} width={30} height={30} fill={primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          style.panel,
          // { transform: view == true ? [{ translateY: 0 }] : [{ translateY: 60 }] },
          { height: view == true ? 120 : 0 },
        ]}>
        <View style={{ margin: 5 }}>
          <View style={{ paddingLeft: 10, flexDirection: "row", width: "100%", height: "50%", borderBottomColor: primaryColor, borderBottomWidth: 0.5 }}>

              <Text style={style.dato1}>Precio</Text>
              <Text style={[style.dato2,{marginLeft:10}]}>COP. {props.i.total_invoice}</Text>
            
            
          </View>
          <View style={{ paddingLeft: 10, flexDirection: "row", width: "100%", height: "50%", top: 4 }}>
            <View style={{ width: "50%" }}><Text style={style.dato1}>Estado de compra</Text><Text style={style.dato2}>{props.i.status}</Text></View>
            <View style={{ width: "50%" }}><Text style={style.dato1}>Fecha de solicitud</Text><Text style={style.dato2}>{props.i.created_at.split(" ")[0]}</Text></View>
          </View>
        </View>
      </View>
    </View >
  )
}
const style = StyleSheet.create({
  loading: {
    marginTop: 50,
  },
  footSpace: {
    height: 40,
  },
  /* ------- children --------- */
  children: {
    marginBottom: 10,
    minHeight: 30,
    margin: 4
  },
  visibleOn: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderColor:"white", borderWidth:2,
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  visibleOff: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderColor:"white", borderWidth:2,
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
  },
  datos: {
    height: 40,
    width: "70%",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 35,
    color: primaryColor,
    marginLeft: 10,
    textTransform: "capitalize"
  },
  options: {
   height:35,
  flexDirection: "row",
  alignSelf: "flex-end",
  width: "30%",
  justifyContent: "center"
  },
  panel: {
    backgroundColor: "rgba(255,255,255,0.5)",
    overflow: "hidden",
    height: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dato1: {
    color: "#000"
  },
  dato2: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000"
  },
  /* ------- modal --------- */
  centeredView: {
    backgroundColor: modalBack,
    flex: 1,
    marginTop: 0
  },
  btnClose: {
    position: "relative",
    marginRight: 10,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  modalView: {
    margin: "5%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalhead: {
    marginTop: -20,
    width: "100%",
    borderBottomColor: primaryColor,
    borderBottomWidth: 2,
    padding: 5,
    paddingBottom: 15,
    marginBottom: 15,
    flexDirection: "row"
  },
  text1: { fontSize: 14, marginTop: 2, color: primaryColor },
  text2: { fontWeight: "bold", top: 2 },
  modalbody: { flexDirection: "column", },
  modalfoot: {
    marginTop: -1,
    width: "100%",
    borderTopColor: primaryColor,
    borderTopWidth: 2,
    padding: 5,
    flexDirection: "row"
  }
})
export default Mypurchases;