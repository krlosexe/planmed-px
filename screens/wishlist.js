import React, { useContext, useEffect, useRef, useState, } from 'react'
import { ActivityIndicator, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, FlatList, View, Text, RefreshControl, TouchableOpacity, Alert } from 'react-native'
import UserContext from '../contexts/UserContext'
import Head from '../components/Head';
import Menu from '../components/Menu';
import { Api, base_url } from '../Env'
import axios from 'axios'
import { likeMeDELETE, likeMeGET } from '../components/processItemShop'
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-simple-toast';
import { colorLight, colorBack1, colorBack2, colorDark, primaryColor, colorSecundary } from '../Colors'
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../components/loading.js'
import LinearGradient from 'react-native-linear-gradient';


function WishList(props) {
  const userDetails = useContext(UserContext)
  const [Load, setLoad] = useState(true) //cargando?
  const [Like, setLike] = useState([])
  const [localCar, setlocalCar] = useState([]);
  const [item, setitem] = useState(0);
  const [modal, setmodal] = useState(false);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }



  useEffect(() => {
    console.log("randon code -> Get()")
    setLoad(true)
    Get()
  }, [randomCode])



  async function Get() {
    getCarLocal()
    const MeGusta = await likeMeGET(userDetails.id_cliente)
    setLike(MeGusta)
    setLoad(false)
  }











  async function getCarLocal() {
    console.log("get local")
    try {
      let car = JSON.parse(await AsyncStorage.getItem('carrito'))
      if (car == null) {
        console.log("carrito local no existe")
        let data = { "data": [], "total": "0,00", "total_pay": 0 }
        await AsyncStorage.setItem('carrito', JSON.stringify(data))
        console.log("carrito local creado...")
      }
      else {
        setlocalCar(car.data)
        console.log("datos de carrito local obtenidos!")
      }
    } catch (error) {
      console.log(error)
    }
  }







  async function updateCarLocal() {
    console.log("updateCarLocal")
    var total = 0
    for (var i in localCar) {
      total += localCar[i].price_cop * localCar[i].qty
    }
    let data = { "data": localCar, "total": total, "total_pay": total / 100 }
    await AsyncStorage.setItem('carrito', JSON.stringify(data))
  }


  useEffect(() => {
    console.log("updating local car")
    updateCarLocal()
  }, [localCar]);



  function goToScreen(screen, i, from) {
    let data = {
      id: i.id_product,
      created_at: i.created_at,
      description: i.name_product,
      photo: i.photo,
      price_cop: i.price_cop,
      updated_at: i.updated_at,
      wishId: i.id,
      wishMe: true,
    }
    props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }



  function goToCar(screen,from) {
    props.navigation.navigate(screen, { randomCode: Math.random(),from })
  }

  async function deleting(id) {
    setmodal(false)
    await likeMeDELETE(id)
    await Get()
    Toast.show("Producto removido de la lista de deseos")
  }


  async function AddCar(i) {
    setmodal(true)
    setitem(i.id)
    // const user_info = userDetails.id_cliente
    // const item_info = i.id_product
    // const item_price = i.price_cop
    // const created_at = i.created_at
    // const updated_at = i.updated_at
    // const description = i.description
    // const photo = i.photo
    // const presentation = i.presentation
    // const Value = 1
    const created_at = i.created_at
    const user_info = userDetails.id_cliente
    const item_info = i.id_product
    const item_price = i.price_cop
    const updated_at = i.updated_at
    const description = i.name_product
    const photo = i.photo
    const presentation = i.name_product
    const Value = 1
    let NewRegister = []


    if (localCar.length === 0) {
      console.log("no hay registros, registrando nuevo...")
      NewRegister = {
        "id_client": user_info,
        "id_product": item_info,
        "qty": 1,
        "price_cop": item_price,
        "created_at": created_at,
        "updated_at": updated_at,
        "description": presentation,
        "photo": photo,
        "presentation": presentation
      }
      Toast.show("Producto agregado al carrito de compras")
      setlocalCar([...localCar, NewRegister])
      updateCarLocal()
    }
    else {
      console.log("existen registros - buscando item...")
      let Updating = localCar.find(id => id.id_product == item_info)
      console.log(Updating)
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
        Toast.show("Producto agregado al carrito de compras")
        setlocalCar([...localCar, NewRegister])
        updateCarLocal()
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
  }




  function confirLoader() {
    try {
      return (
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={Like}
            numColumns={2}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <View style={style.card_product}>
                <View style={style.card_product_head}>
                  <TouchableOpacity style={style.card_product_head_icon} onPress={() => deleting(item.id)}>
                    <Icon name='heart' width={20} height={20} fill={primaryColor} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => goToScreen('ShopProductsView', item, "WishList")} style={style.bigBtn}>
                  {item.photo != null
                    ? (<Image style={style.card_product_head_img} source={{ uri: item.photo }} />)
                    : (<Image style={style.card_product_head_img} source={require('../src/images/emtyp.png')} />)
                  }
                  <View style={style.card_product_head_content_title}>
                    <Text style={style.card_product_head_content_title_text}>{item.name_product}</Text>
                    <View style={{ justifyContent: 'space-around', flexDirection: "row" }}>
                      <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                      <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                      <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                      <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                      <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                    </View>
                    <Text style={{ ...style.card_product_head_content_title_text, fontSize: 12, color: colorDark }}>{item.category}</Text>
                    <Text style={{ ...style.card_product_head_content_title_text, fontSize: 13, color: primaryColor }}>COP {item.price_cop}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => AddCar(item)} style={{ position: "absolute", zIndex: 999, backgroundColor: primaryColor, width: 25, height: 25, borderTopStartRadius: 20, paddingTop: 7, paddingLeft: 7, position: "absolute", bottom: 0, right: 0 }}>
                  <Icon name='shopping-cart-outline' width={16} height={16} fill={colorLight} />
                </TouchableOpacity>
              </View>
            )} />
        </View>
      )
    } catch (error) {
      console.log("Verifique su conexion a internet")
      Toast.show("Verifique su conexion a internet")
    }
  }


  function vacio() {
    if (Like == undefined) {
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
            lista de deseos vacía
        </Text>
        </View>
      )
    }

    if (Like == []) {
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
            lista de deseos vacía
          </Text>
        </View>
      )
    }


    if (Like.length == 0) {
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
            lista de deseos vacía
        </Text>
        </View>
      )
    }
  }




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <ScrollView style={{backgroundColor:colorBack2 }} refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => Get()}
        />
      }>
        <Head name_user={userDetails.nombres} />
        {
          localCar.length > 0 &&
          <View style={{
            position: "absolute",
            top: 100,
            left: 10,
            minHeight: 60, marginBottom: 50
          }}>
            <TouchableOpacity
              onPress={() => goToCar('ShopCar','WishList')}
              style={{
                backgroundColor: primaryColor,
                height: 40,
                width: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#FFF",
                alignItems: "center",
                alignContent: "center",
              }}>
              <Text style={{ color: "#FFF", bottom: -3, fontSize: 12 }}>{localCar.length}</Text>
              <Icon name='shopping-cart-outline' width={20} height={20} fill="#FFF" />
            </TouchableOpacity>
          </View>
        }
        {Load == true && <Loading color={primaryColor} />}
        {Load == false && vacio()}
        {Load == false && Like !== [] && confirLoader()}
      </ScrollView>
      {
        modal &&
        <View style={{ backgroundColor: "rgba(0,0,0,0.3)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
          <View
            style={{ backgroundColor: "white", width: "80%", top: "-10%", padding: 10, borderRadius: 20, alignContent: "center", alignItems: "center", }}>
            <Icon name='question-mark-outline' width={50} height={50} fill={primaryColor} />
            <Text style={{ width: "80%", textAlign: "center" }}>¿Desea remover el producto de su lista de deseos?</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 20, width: "100%" }}>
              <TouchableOpacity onPress={() => deleting(item)} style={{ width: 80, backgroundColor: primaryColor, height: 30, alignItems: "center", borderRadius: 3 }}><Text style={{ fontSize: 20, color: colorLight }}>Si</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setmodal(!modal)} style={{ width: 80, backgroundColor: colorSecundary, height: 30, alignItems: "center", borderRadius: 3 }}><Text style={{ fontSize: 20, color: colorLight }}>No</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      }
      <Menu props={{ ...props }} />
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  card_product: {
    marginLeft: 24,
    backgroundColor: colorLight,
    width: "40%",
    minWidth: "40%",
    marginTop: 20,
    borderRadius: 15,
    shadowOffset: { width: 10, height: 30, },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
  },
  card_product_head: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  card_product_discount: {
    backgroundColor: "#f27072",
    width: 30,
    height: 30,
    paddingTop: 6,
    alignItems: "center",
    borderRadius: 100
  },
  card_product_discount_text: {
    color: "white",
    alignSelf: "center",
    fontSize: 12
  },
  card_product_head_icon: {
    marginTop: 5
  },
  card_product_head_content_img: {
  },
  card_product_head_img: {
    width: "100%",
    height: 100,
    resizeMode: "contain"
  },
  card_product_head_content_title: {
    padding: 10
  },
  card_product_head_content_title_text: {
    fontWeight: "bold",
  }
})
export default WishList