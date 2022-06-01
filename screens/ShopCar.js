import React, { useState, useEffect } from 'react';
import {
  TextInput,
  RefreshControl,
  Pressable,
  Modal,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../contexts/UserContext'
import { validateCupon } from '../components/processItemShop'
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { colorDark, colorLight, primaryColor, colorBack1,colorBack2, } from '../Colors.js'

import Loading from '../components/loading.js'


function App(props) {
  const userDetails = React.useContext(UserContext);
  //const { navigation } = props.props
  const { navigation } = props
  const [localCar, setlocalCar] = useState([]);
  const [Count, setCount] = useState(0);
  const [total, setTotal] = useState(0)
  const [totalPay, setTotalPay] = useState(0)
  const [Load, setLoad] = useState(true)//load data
  const [PriceDescount, setPriceDescount] = useState(0)
  const [descount, setDescount] = useState(0)
  const [number, onChangeNumber] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // refrescar el screen
  const [formInfo, setFormInfo] = useState({ code: '' })
  const [ViewOptions, setViewOptions] = useState(false)
  const [ModalCupon, setModalCupon] = useState(false) //modal para cupon
  const [loadCupon, setLoadCupon] = useState(false) //load cupon validate
  const [Cupon, setCupon] = useState(false) //valor del cupon
  const [porcentaje, setPorcentaje] = useState("")// porcentaje de descuento del cupon 30%
  // const [Envio, setEnvio] = useState(false);
  // const [chekEnvio, setChekEnvio] = useState(false);
  // const [modalEnvio, setModalEnvio] = useState(false)
  //const [priceEnvio, setPriceEnvio] = useState(0)
  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    console.log("first");
    getCarLocal();
  }, [randomCode])


  async function getCarLocal() {
    console.log("get local")
    try {
      let car = JSON.parse(await AsyncStorage.getItem('carrito'))
      console.log("carrito carlos?", car)
      if (car == null) {
        console.log("carrito local no existe")
        let data = {
          "data": [],
          "total": "0,00",
          "total_pay": 0
        }
        await AsyncStorage.setItem('carrito', JSON.stringify(data))
        console.log("carrito local creado...")
      }
      else {
        setCount(car.data.length)
        setlocalCar(car.data)
        if (porcentaje === "") {
          console.log("no se aplica descuento")
          setTotal(car.total)
          setTotalPay(car.total_pay)
        }
        else {
          if (Cupon == true) {
            console.log("aplicando porcentaje por defecto")
            let valorPrice = (total / 100) * porcentaje
            setTotal(total - valorPrice)
            setPriceDescount(valorPrice)
          }
        }
        console.log("*ShopCar: datos de carrito local obtenidos!")
      }
    } catch (error) {
      console.log(error)
    }
    setLoad(false)
  }

  async function updateCarLocal() {
    let data = {
      "data": localCar,
      "total": total,
      "total_pay": totalPay
    }
    try {
      await AsyncStorage.setItem('carrito', JSON.stringify(data))
    } catch (error) {
      console.log("error update ", error)
    }
    getCarLocal()
  }


  //--------------------------------//
  //                                //
  //   UPDATING STATE LOCAL CAR     //
  //________________________________//
  async function updating(i, v) {
    console.log("up: ", i, " ", v)
    let Updating = localCar.find(id => id.id_product == i)
    let NewQty = Updating.qty + v
    if (NewQty == 0) { deleting(i); return false; }
    for (var g in localCar) { if (localCar[g].id_product == i) { localCar[g].qty = NewQty; break; } }
    setlocalCar(localCar)
    console.log("set totales")
    let totales = 0
    for (var t in localCar) {
      totales += localCar[t].qty * localCar[t].price_cop
    }



    if (porcentaje === "") {
      console.log("no se aplica descuento")
      setTotal(totales)
      setTotalPay(totales/100)
    }
    else {
      if (Cupon == true) {
        console.log("aplivando porcentaje por defecto")
        let valorPrice = (totales / 100) * porcentaje
        setTotal(totales - valorPrice)
        setPriceDescount(valorPrice)
        setTotalPay(totales / 100)
      }
    }
    Toast.show("Producto actualizado.")
  }










  async function deleting(id) {
    const change = localCar.filter(data => data.id_product !== id)
    setlocalCar(change)
    Toast.show("Producto Removido.")
    setCount(localCar.length - 1)


    
  }






  useEffect(() => {
console.log("automatic calc")

    if (localCar.length == 0) {
      setTotal(0)
      setTotalPay(0)
    }
    else {
     
 let totales = 0
     for (var t in localCar) {
       totales += localCar[t].qty * localCar[t].price_cop
     }
     if (porcentaje === "") {
       console.log("no se aplica descuento")
       setTotal(totales)
       setTotalPay(totales/100)
     }
     else {
       if (Cupon == true) {
         console.log("aplivando porcentaje por defecto")
         let valorPrice = (totales / 100) * porcentaje
         setTotal(totales - valorPrice)
         setPriceDescount(valorPrice)
         setTotalPay(totales / 100)
       }
     }
    }
  }, [localCar]);






  //--------------------------------//
  //         CALCULAR PRECIOS       //
  //             AND PAY            //
  //________________________________//
  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }

  async function sendForm() {
    setLoadCupon(true)
    const data = {
      ...formInfo
    }

    let valor = await validateCupon(data.code)
    setPorcentaje(valor)
    setLoadCupon(false)



  }




  async function AplicateCupon() {
    console.log("aplicando cupon")
    setModalCupon(false)
    setCupon(true)
    let valorPrice = (total / 100) * porcentaje
    setPriceDescount(valorPrice)
    setTotal(total - valorPrice)
  }



  function deshabiliticupon() {
    console.log("deshabilitando cupon")
    setCupon(false)
    setTotal(total + PriceDescount)
    setPorcentaje("")
    setPriceDescount(0)
    setDescount(0)

  }




  //--------------------------------//
  //         FUNCTION ROUTES        //
  //             SCREEN             //
  //________________________________//
  async function GoToPay(concept) {
    await updateCarLocal()
    // let amount = 0
    // for (var t in localCar) {
    //   amount += localCar[t].qty * localCar[t].price_cop
    // }
    // console.log(amount)
    await navigation.navigate("MethodPay", {
      randomCode: Math.random(),
      amount_in_cents: Math.round(total + 1),// +1?
      payment_concept: concept
    })
  }





  async function goToBack() {
    await updateCarLocal()
    console.log("from in ShopCar: ",props.route.params.from )
    props.navigation.navigate(props.route.params.from, { randomCode: Math.random() })
  }




  useEffect(() => {
    const backAction = () => {
      goToBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);


async  function refresh() {
    console.log("refresh")
    
await updateCarLocal()
    getCarLocal()
    //Get()
  }



  //--------------------------------//
  //        SIMPLES FUNCTIONS       //
  //            SET STATES          //
  //________________________________//
  function setOptions() { setViewOptions(!ViewOptions) }
  function currencyFormat(num) { return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }




  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: "#ECE5DD"}}>

     <Modal animationType="slide" transparent={true} visible={ModalCupon}>
        <View style={styles.modalWrapper}>
          <Pressable style={styles.btnClose} onPress={() => setModalCupon(false)}><Icon name='close-circle-outline' width={45} height={45} fill={colorLight} /></Pressable>
          <View style={styles.modalWrap}>
            <Icon name="gift-outline" fill={primaryColor} width={60} height={60} />
            <Text style={styles.modalTitle}>Cupon de Descuento!</Text>
            <Text style={styles.modalSubTitle} >Si posee un cupon de descuento por favor ingrese el codigo de validación.</Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TextInput value={formInfo.code} style={{ width: 200, height: 40, margin: 12, textAlign: "center", borderBottomWidth: 1, borderBottomColor: primaryColor }} placeholder="XXXX-XXXX" placeholderTextColor="#c3c3c3" onChangeText={text => onChangeText(text, 'code')} />
              <TouchableOpacity style={{ top: 10 }} onPress={() => sendForm()}>
                <Icon name='arrow-circle-right-outline' width={40} height={40} fill={primaryColor} />
              </TouchableOpacity>
            </View>
            {loadCupon == true &&
            <Loading color={primaryColor}/>
            }
            {isNaN(porcentaje) &&
              <Text> {porcentaje}</Text>}
            {porcentaje > 0 &&
              <View style={{ flexDirection: "row" }}>
                <Text style={{ right: 10, top: 10 }}>Cupón del {porcentaje}% de descuento</Text>
                <Pressable style={{ padding: 10, backgroundColor: primaryColor }} onPress={() => AplicateCupon()}>
                  <Text style={{ color: "#FFF", fontWeight: "bold" }}>Aplicar?</Text>
                </Pressable>
              </View>
            }
          </View>
        </View>
      </Modal> 




<ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>


      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => refresh()}/>
          }
        >

        <View style={styles.content_head}>
          <View style={styles.content_head_tittle}>
            <TouchableOpacity onPress={() => goToBack()} style={styles.content_head_icon}>
              <Icon name='chevron-left' width={35} height={35} fill={primaryColor} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Mi Pedido</Text>
          <TouchableOpacity onPress={() => refresh()}>
            <View style={styles.content_head_icon}>
              <Text style={styles.qty_car}>{Count}</Text>
              <Icon name='shopping-cart-outline' width={30} height={30} fill={primaryColor} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.content_cart}>

          {
            localCar.length == 0 && Load == false &&
            <View style={{ marginTop:160,borderColor: primaryColor, borderWidth: 2, padding: 10, borderRadius: 20, borderStyle: 'dashed', textAlign: "center", }}>
              <Text style={{ textAlign: "center", width: "100%", color: primaryColor, textTransform: "uppercase", fontSize: 16, }}>carrito de compras vacio</Text>
            </View>
          }

          {
            Load == true &&
            <Loading color={primaryColor}/>
          }
          {
            Load == false &&
            localCar.map((i, key) => {
              return (
                <View style={styles.content_cart_product_item} key={key}>
                  {i.photo != null
                    ? (<Image style={styles.product_detail_img} source={{ uri: i.photo }} />)
                    : (<Image style={styles.product_detail_img} source={require('../src/images/emtyp.png')} />)
                  }
                  <View
                    style={{
                      left: 10,
                      flexDirection: "column",
                      width: "55%"
                    }}>
                    <View style={{paddingTop: 10,height: 50}}>
                      <Text>{i.description}</Text>
                      <Text style={{ fontWeight: "bold", color: primaryColor }}>{currencyFormat(i.price_cop)}</Text>
                    </View>
                    <View style={{
                      top: 10,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 40,
                      paddingVertical: 2,
                      paddingBottom: 15
                    }}>

                      <TouchableHighlight

                        onPress={() => updating(i.id_product, -1,)}
                        style={{ ...styles.ButtonPlusMinus, backgroundColor: primaryColor, marginTop: 10 }}
                      >
                        <Text style={{ textAlign: "center" }}>
                          <Icon name='minus' width={10} height={10} fill={colorLight} />
                        </Text>
                      </TouchableHighlight>
                      <Text style={{ marginTop: 7, fontWeight: "bold", color: "#777", fontSize: 14 }}>
                        {i.qty}
                      </Text>
                      <TouchableHighlight
                        onPress={() => updating(i.id_product, 1)}
                        style={{ ...styles.ButtonPlusMinus, backgroundColor: primaryColor, marginTop: 10 }}
                      >
                        <Text style={{ textAlign: "center" }}>
                          <Icon name='plus' width={10} height={10} fill={colorLight} />
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => deleting(i.id_product)}
                    style={{ left: 0 }}
                  >
                    <Text style={styles.content_cart_product_item_delete}>
                      <Icon name='trash' width={20} height={20} fill={primaryColor} />
                    </Text>
                  </TouchableOpacity>
                </View>)
            })}
        </View>
      </ScrollView>






      <View style={styles.wraptotal}>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => setOptions()} style={{ width: "100%", flexDirection: "row", borderBottomColor: "#777", borderBottomWidth: 0.3 }}>
           
            <Icon
              style={{ marginHorizontal:20, top: -5, }}
              name={ViewOptions == true ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'}
              width={25} height={25} fill='#777' />
               <Text>Opciones </Text>
          </TouchableOpacity>
          {
            Cupon == false &&
            <View style={[styles.row, { width: "150%", height: ViewOptions == true ? 40 : 0 }]}>

              <CheckBox value={ModalCupon} onValueChange={setModalCupon} style={styles.checkbox} />
              <Text style={styles.pregunta}>Cupon de descuento?</Text>
            </View>
          }
          {
            Cupon == true &&
            <TouchableOpacity
              onPress={() => deshabiliticupon()}
              style={[styles.row, { width: "150%", height: ViewOptions == true ? 40 : 0 }]}>
              <Icon name='close-square-outline' width={20} height={20} fill={"#777"} style={{ top: 7, marginRight: 5 }} />
              <Text style={styles.pregunta}>Deshabilitar cupón?</Text>
            </TouchableOpacity>
          }
          {
            Cupon == true && ViewOptions == true &&
            <Text>Descueto de {porcentaje}% = <Text style={{ color: "#1ABC9C", fontWeight: "bold" }}>COP. {currencyFormat(PriceDescount)}  </Text></Text>
          }
         

          <View style={[styles.row, { width: "150%", height: ViewOptions == true ? 20 : 0 }]}>
          </View>
        </View>
        <View style={styles.total}>
          {
            localCar.length == 0 &&
            <TouchableOpacity onPress={() => Toast.show("No hay productos en el carrito")} style={styles.BtnPrimary}>
              <Icon name='credit-card-outline' width={35} height={35} fill='#FFF' />
            </TouchableOpacity>
          }
          {
            localCar.length != 0 &&
            <TouchableOpacity onPress={() => GoToPay("CompraPlanmed")} style={styles.BtnPrimary}>
              <Icon name='credit-card-outline' width={35} height={35} fill='#FFF' />
            </TouchableOpacity>
          }
          <Text style={{marginTop:10, marginLeft: 15, fontSize: 20, fontWeight: "bold", justifyContent: "center" }}>
            COP. {currencyFormat(total)}
          </Text>
        </View>
      </View>
      </ImageBackground>
    </SafeAreaView>
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
  content_head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop:40,
    backgroundColor: colorLight,
height:100,
borderBottomLeftRadius:40,
borderBottomRightRadius:40,

  },
  title_product: {
    marginTop: 20,
    fontSize: 30,
    width: "100%"
  },
  content_cart: {
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    flex: 1,
    paddingBottom:200
  },
  content_cart_product_item: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: colorLight,
    padding: 4,
    paddingTop: 8,
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 20,



    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  content_cart_product_item_description: {
    width: "57%",
    paddingTop: 10,
    paddingLeft: 10
  },
  content_cart_product_item_delete: {
    marginTop: 40,
    textAlign: "center",
    alignSelf: "center",
  },
  product_detail_img: {
    marginLeft: 5,
    width: "33%",
    height: 100,
    resizeMode: "contain",
    borderRadius: 15
  },
  BtnPrimary: {
    width: "40%",
    backgroundColor: primaryColor,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  loginText: {
    color: "white"
  },
  BtnCars: {
    width: 50,
    height: 50,
    backgroundColor: primaryColor,
    borderRadius: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    right: 30,
    bottom: -30,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  wraptotal: {
    flexDirection: "column",
    padding: 10,
    paddingLeft: 35,
    paddingRight: 35,
    width: "100%",
    backgroundColor: colorLight,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    alignItems: "center"
  },
  options: {
    width: "100%",
    marginBottom: 10
  },
  row: { flexDirection: "row", marginBottom: 5, height: 40, padding: 2, overflow: "hidden" },
  pregunta: { width: "50%", lineHeight: 35 },
  checkbox: { width: "10%", top: 3, marginRight: 5 },
  respuesta: { width: "40%", lineHeight: 35 },
  total: {
    flexDirection: "row",
    width: "100%",
  },
  ButtonPlusMinus: {
    borderRadius: 15,
    padding: 5,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  modalWrapper: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignContent:"center", alignItems:"center", justifyContent:"center"
  },
  btnClose: {
    position: "relative",
    marginRight: 35,
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  modalWrap: {
    width: "80%",
    backgroundColor: colorLight,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10
  },
  modalTitle: { fontSize: 22, color: primaryColor },
  modalSubTitle: { textAlign: "center", width: "85%" },
})