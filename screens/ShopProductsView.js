import React, { useState, useEffect } from 'react';
import { ImageBackground, Alert, View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { colorDark, colorTertiary, colorLight, primaryColor, colorSecundary, colorBack1, colorBack2, primaryColorOpacity } from '../Colors.js'
import LinearGradient from 'react-native-linear-gradient';

function App(props) {
  const { navigation } = props
  const data = props.route.params.data
  const userDetails = React.useContext(UserContext)
  const [localCar, setlocalCar] = useState([]);
  const [Count, setCount] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  let randomCode


  if (props.route.params) { randomCode = props.route.params.randomCode }


  useEffect(() => {
    const backAction = () => {
      goToShop("Shop2")
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    console.log("** random -> getCarLocal()")
    getCarLocal()
  }, [randomCode]);



  useEffect(() => {
    updateCarLocal()
    setTimeout(() => {
      if (localCar !== []) {
        //console.log(localCar.data.length)
        //setCount("e")
        setCount(localCar.length)
      }
    }, 1000);
  }, [localCar]);


  useEffect(() => {
    if (cantidad < 1) {
      setCantidad(1)
      Toast.show("Cantidad minima es 1")
    }
  }, [cantidad]);



  async function getCarLocal() {
    console.log("get local")
    try {
      let car = JSON.parse(await AsyncStorage.getItem('carrito'))

      if (car == null) {
        console.log("carrito local no existe")
        let data = {
          "data": [],
          "total": "0,00",
          "total_pay": 0
        }
      }
      else {
        setlocalCar(car.data)
        console.log("datos de carrito local obtenidos en otro screen!")
      }
    } catch (error) {
      console.log(error)
    }
  }


  function goToScreen(screen, data, shop) {
    navigation.navigate(screen, { randomCode: Math.random(), data, shop })
  }

  function goToShop(screen) {
    navigation.navigate(screen, { randomCode: Math.random() });
  }

  function goToBack() {
    setCantidad(1);
    console.log("F: ", props.route.params.from);
    navigation.navigate(props.route.params.from, { randomCode: Math.random(), });
  }


  function goToCar() {
    setCantidad(1)
    let screen = "ShopCar"
    let car = props.route.params.car
    let from = "ShopProductsView"
    navigation.navigate(screen, { randomCode: Math.random(), car, from })
  }


  const WindowAlert = () =>
    Alert.alert(
      "Por favor inicie sesión para añadir productos al carrito",
      "Si no tiene una cuenta, registrese",
      [
        { text: "Login", onPress: () => goToScreen('Login') },
        { text: "Registrarme", onPress: () => goToScreen('Register') },
        { text: "Salir", onPress: () => console.log("OK Pressed"), style: "cancel" }]);

  async function AddCar(id, i, cantidad) {
    console.log("AddCar", id)
    const user_info = userDetails.id
    const item_info = id
    const item_price = i.price_cop
    const created_at = i.created_at
    const updated_at = i.updated_at
    const description = i.description
    const photo = i.photo
    const presentation = i.presentation
    const Value = cantidad
    let NewRegister = []

    if (localCar.length == 0) {
      console.log("no hay registros, registrando nuevo...")
      NewRegister = {
        "id_client": user_info,
        "id_product": item_info,
        "qty": Value,
        "price_cop": item_price,
        "created_at": created_at,
        "updated_at": updated_at,
        "description": description,
        "photo": photo,
        "presentation": presentation
      }
    }
    else {
      console.log("existen registros - buscando item...")
      let Updating = localCar.find(id => id.id_product == item_info)
      if (Updating === undefined) {
        console.log("undefinido (no encontardo)")
        NewRegister = {
          "id_client": user_info,
          "id_product": item_info,
          "qty": Value,
          "price_cop": item_price,
          "created_at": created_at,
          "updated_at": updated_at,
          "description": description,
          "photo": photo,
          "presentation": presentation
        }
      }
      else {
        console.log("actualixando a: ", item_info)
        let NewQty = Updating.qty + Value
        console.log("nueva qty: ", NewQty)
        for (var i in localCar) {
          if (localCar[i].id_product == item_info) {
            localCar[i].qty = NewQty;
            break;
          }
        }
        setlocalCar(localCar)
        Toast.show("Producto Actualizado")
        setlocalCar([...localCar])
        return false
      }
    }
    Toast.show("Producto agregado al carrito de compras")
    console.log("send: ", NewRegister)
    setlocalCar([...localCar, NewRegister])
    console.log(localCar.length)
    console.log("_________________________________ end")
  }


  async function updateCarLocal() {
    console.log("updateCarLocal")
    var total = 0
    for (var i in localCar) {
      total += localCar[i].price_cop * localCar[i].qty
    }
    let data = {
      "data": localCar,
      "total": total,
      "total_pay": total / 100
    }
    await AsyncStorage.setItem('carrito', JSON.stringify(data))
  }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>

      <StatusBar backgroundColor={primaryColor} barStyle="dark-content" />




      <ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>


        <ScrollView>





          <View style={styles.content_head}>
            <TouchableOpacity onPress={() => goToBack()}>
              <Icon name='chevron-left' width={35} height={35} fill={primaryColor} />
            </TouchableOpacity>




            <View syle={styles.wrapImg}>
              <Image
                style={styles.img}
                source={require('../src/images/LogoPlanmedVerde.png')}
              />
            </View>




            <TouchableOpacity onPress={() => goToCar()}>
              <Text style={styles.qty_car}>{Count}</Text>
              <Icon name='shopping-cart-outline' width={30} height={30} fill={primaryColor} />
            </TouchableOpacity>
          </View>





          <Text style={styles.title_product}>{data.description}</Text>



          <View style={styles.product_detail_content}>
            <View style={styles.product_detail_content_img}>
              {data.photo != null
                ? (<Image style={styles.product_detail_img} source={{ uri: data.photo }} />)
                : (<Image style={styles.product_detail_img} source={require('../src/images/emtyp.png')} />)
              }
            </View>
          </View>



          <View style={styles.wrapperInfo}>
            <View style={styles.info}>
              <View style={styles.group}>
                <Text style={styles.infoTitle}>Descripción</Text>
                <Text style={styles.infoResponse}>{data.description}</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.infoTitle}>Precio</Text>
                <Text style={styles.infoResponse}>COP. {data.price_cop}</Text>
              </View>
              <View style={styles.panel}>
                <View style={styles.newcantidad}>
                  <TouchableOpacity onPress={() => setCantidad(cantidad - 1)} style={styles.iconCantidad}>
                    <Icon name='minus' width={10} height={10} fill={colorLight} />
                  </TouchableOpacity>
                  <Text style={styles.cantidad}>
                    {cantidad}
                  </Text>
                  <TouchableOpacity onPress={() => setCantidad(cantidad + 1)} style={styles.iconCantidad}>
                    <Icon name='plus' width={10} height={10} fill={colorLight} />
                  </TouchableOpacity>
                </View>
                {userDetails.email == null &&
                  <TouchableOpacity onPress={() => WindowAlert()} style={styles.BtnPrimary}>
                    <Icon name='shopping-cart-outline' width={16} height={16} fill='#fff' />
                    <Text style={styles.loginText}>Añadir al carrito</Text>
                  </TouchableOpacity>
                }
                {userDetails.email != null &&
                  <TouchableOpacity onPress={() => AddCar(data.id, data, cantidad)} style={styles.BtnPrimary}>
                    <Icon name='shopping-cart-outline' width={16} height={16} fill={colorLight} />
                    <Text style={styles.loginText}>Añadir al carrito</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>


          </View>



          {/* <ImageBackground source={{ uri: data.photo }}
        style={{position:"absolute",zIndex:-3,flex: 1,justifyContent: "flex-end",resizeMode: "cover",width: "120%",height: "120%",opacity:0.2}}>
        </ImageBackground> */}



        </ScrollView>





        <Menu props={{ ...props }} />

      </ImageBackground>


    </SafeAreaView>
  )
}
export default App;


const styles = StyleSheet.create({
  content_head: {
    height: 100,
    backgroundColor: colorLight,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomRightRadius:40,
    borderBottomLeftRadius:40,
  },
  wrapImg: {
    flex: 1,
    backgroundColor: "yellow"
  },
  img: {
    top:15,
    width: 90,
    height: 65,
    resizeMode: "contain",
  },
  title_product: {
    textAlign: "center",
    fontSize: 22,
    width: "100%",
    marginVertical: 20,
    color: "black"
  },
  product_detail_content: {
    marginTop: -10,
    marginBottom: -20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  product_detail_content_img: { //caja
    flex: 1,
    width: "60%",
    overflow: "hidden",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: colorLight,



    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,

  },
  product_detail_img: {
    width: "110%",
    height: 300,


  },



  qty_car: {
    color: primaryColor,
    marginLeft: 0,
    marginBottom: -5,
    fontWeight: "bold",
    width: 30,
    textAlign: "center"
  },



  wrapperInfo: {
    top:-10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },

  info: {
    paddingTop:40,
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 40,
    padding: 20,
    height: 320,
    marginBottom: 100,
    borderWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)",
    borderLeftColor: "rgba(255,255,255,0.5)",
    borderRightColor: "white",
    borderBottomColor: "white",
  },


  group: {
    paddingVertical: 10,
    borderColor: "white",
    borderBottomWidth: 1
  },

  infoTitle: {
    color: "#262626"
  },

  infoResponse: {
    color: "black",
    fontWeight: "bold"
  },

  panel: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  newcantidad: {
    flexDirection: "row",
    top: 20
  },

  iconCantidad: {
    top: 2,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: primaryColor,
    width: 25,
    height: 25
  },
  cantidad: {
    backgroundColor: colorLight,
    borderRadius: 12,
    textAlign: "center",

    width: 50,
    padding: 4,
    fontWeight: "bold",
    color: "#000",
    fontSize: 14
  },
  BtnPrimary: {
    flexDirection: "row",
    width: "70%",
    backgroundColor: primaryColor,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 30,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 12,

  },
  loginText: {
    marginLeft: 20,
    fontWeight: "bold",
    color: colorLight
  },



  // product_detail: {
  //   flexDirection: "row",
  //   alignContent: "center",
  //   alignItems: "center"
  // },



  // product_detail_content_description: {
  //   width: null,
  //   height: null,
  //   resizeMode: 'cover',
  // },
  // product_detail_data: {
  //   marginLeft: 20,
  //   marginTop: 20
  // },
  // product_detail_data_title: {
  //   fontSize: 12,
  //   color: "#888"
  // },
  // product_detail_data_sub_title: {
  //   fontSize: 16,
  // },
  // description: {
  //   padding: 20,
  // },
  // description_text: {
  //   fontSize: 17
  // },
  // description_text_content: {
  //   color: "#777",
  //   textAlign: "justify",
  //   lineHeight: 20,
  //   marginTop: 20
  // },


  // BtnPrimary: {
  //   flexDirection: "row",
  //   width: "70%",
  //   backgroundColor: primaryColor,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 40,
  //   marginBottom: 40,
  //   shadowOffset: {
  //     width: 10,
  //     height: 30,
  //   },
  //   shadowOpacity: 1.27,
  //   shadowRadius: 4.65,
  //   elevation: 6,
  //   borderRadius: 12
  //   // borderBottomWidth:4,
  //   //  borderBottomColor:colorTertiary
  // },



  // loginText: {
  //   marginLeft: 20,
  //   color: "white"
  // },
  // BtnCars: {
  //   width: 50,
  //   height: 50,
  //   backgroundColor: primaryColor,
  //   borderRadius: 100,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 40,
  //   marginBottom: 10,
  //   position: "absolute",
  //   right: 30,
  //   bottom: -30,
  //   shadowOffset: {
  //     width: 10,
  //     height: 30,
  //   },
  //   shadowOpacity: 1.27,
  //   shadowRadius: 4.65,
  //   elevation: 6
  // }

})

