import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import HeadShop from '../components/HeadShop';
//import ShopProductsList from '../components/ShopProductsList';
import ShopProductsList2 from '../components/ShopProductsList2';
import Menu from '../components/Menu';
import BtnCategoryShop from '../components/BtnCategoryShop.js'
import UserContext from '../contexts/UserContext'
import { getcategories, likeMeGET } from '../components/processItemShop'
import axios from 'axios'
import { Icon } from 'react-native-eva-icons';
import { Api, base_url } from '../Env'
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { primaryColor, colorBack1, colorBack2, colorDark } from '../Colors.js'
import Loading from '../components/loading.js'


function App(props) {
  const userDetails = React.useContext(UserContext);
  const [Load, setLoad] = useState(true);
  const [Car, setCar] = useState([]);
  const [ShopServer, setShopServer] = useState(false);
  const [ShopServer2, setShopServer2] = useState([]);
  const [Category, setCategory] = useState(false);
  const [Like, setLike] = useState([]);
  const [Join, setJoin] = useState(false);
  const [idK, setIDK] = useState(0);
  const [page, setpage] = useState(1);
  const [Next, setNext] = useState(0);
  const [Prev, setPrev] = useState(0);
  const [LastPage, setLastPage] = useState(7);
  const [localCar, setlocalCar] = useState([]);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = Math.random() }

  useEffect(() => {
    Get();
    //newcar();
    getCarLocal();
    GlobalPage(1);
  }, [randomCode])

  useEffect(() => {
    GlobalPage(1);
  }, [idK]);

  useEffect(() => {
    mezcla()
  }, [ShopServer, Like]);



  //----------------------------//
  //   get datos del locales    //
  //____________________________//
  async function newcar() {
    let data = {
      "data": [],
      "total": "0,00",
      "total_pay": 0
    }
    await AsyncStorage.setItem('carrito', JSON.stringify(data))
  }


  async function getCarLocal() {
    console.log("get local")
    try {
      let car = JSON.parse(await AsyncStorage.getItem('carrito'))
      if (car == null) {
        console.log("carrito local no existe")
        newcar()
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
    let data = {
      "data": localCar,
      "total": total,
      "total_pay": total / 100
    }
    await AsyncStorage.setItem('carrito', JSON.stringify(data))
  }



  //----------------------------//
  //   get datos del servidor   //
  //____________________________//
  async function Get() {
    getlikesinit()
    getcategoriesinit()
  }

  async function getlikesinit() {
    console.log("get likes")
    const likeme = await likeMeGET(userDetails.id_cliente)
    setLike(likeme)
  }


  async function getcategoriesinit() {
    console.log("Get categories")
    const categoriesAll = await getcategories()
    setCategory(categoriesAll)
  }

  async function GlobalPage(pagina) {
    console.log("global paginate: ", pagina)
    setLoad(true)
    let endpoint
    if (idK === 0) { endpoint = base_url(Api, `paginate/products?page=${pagina}`) }
    else {
      if (idK === 999) {
        return false
      }
      else {
        endpoint = base_url(Api, `paginate/products/${idK}`)
      }
    }
    await axios.get(endpoint).then(function (response) {
      setpage(response.data.current_page)
      setShopServer(response.data.data)
      setNext(response.data.next_page_url)
      setPrev(response.data.prev_page_url)
      setLastPage(response.data.last_page)
    })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
      })
    setLoad(false)
  }

  //----------------------------//
  //   revision si el producto  //
  //     existe en favoritos    //
  //____________________________//
  async function mezcla() {
    console.log("mezclando -> S:", ShopServer.length, "& L:", Like.length)
    await ShopServer.map(async (shop) => {
      let favorite = await Like.find(valid => valid.id_product == shop.id);

      if (favorite) {
        shop.wishMe = true
        shop.wishId = favorite.id
      } else {
        shop.wishMe = false
        shop.wishId = false
      }
    })
    await setShopServer2(ShopServer)
  }


  //----------------------------//
  //  AGREGAR AL CARRITO LOCAL  //
  //____________________________//
  async function AddCar(i, v, id) {
    console.log("AddCar")
    const user_info = userDetails.id_cliente
    const item_info = i.id
    const item_price = i.price_cop
    const created_at = i.created_at
    const updated_at = i.updated_at
    const description = i.description
    const photo = i.photo
    const presentation = i.presentation
    const Value = v
    const idArray = id;
    let NewRegister = []
    if (localCar.length == 0) {
      console.log("no hay registros, registrando nuevo...")
      NewRegister = {
        "id_client": user_info,
        "id_product": item_info,
        "qty": 1,
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
    console.log("_________________________________ end")
    console.log(localCar)
  }


  //----------------------------//
  //     AGREGAR / ELIMINAR     //
  //   A LA LISTA DE FAVORITOS  //
  //____________________________//
  async function wishDel(i) {
    console.log("deleting favorite array :", i)
    await axios.get(base_url(Api, `favorites/delete/${i}`)).then(function (response) {
      console.log("borrado")
    })
      .catch(function (error) { console.log(error) })
      .then(function () { });
    Toast.show("Removido de tu lista de deseos!")
    refresh()
  }


  async function ff() {
    console.log("what about us")
    const likeme = await likeMeGET(userDetails.id_cliente)
    setLike(likeme)
    mezcla()
    refresh()
  }




  async function wishAdd(i) {
    console.log("add wish")
    console.log(i)
    let arr = {}
    arr = Like.find(id => id.id_product == i)
    if (arr == undefined) {
      console.log("agregar")
      if (Like.length === 0) {
        console.log("favorite list empty")
        arr = { "id_client": userDetails.id_cliente, "id_product": i }
      }
      else {
        console.log("favorite list full, searching id...", i)

        let Updating = Like.find(i => i.id_product == i)
        if (Updating == undefined) {
          console.log("producto no está en la lista de favoritos")
          arr = { "id_client": userDetails.id_cliente, "id_product": i }
        }
        else {
          console.log("El producto ya esta en tu lista de deseos!")
        }
      }
      await axios.post(base_url(Api, `favorites/add`), arr).then(function (response) { console.log("like me!") })
        .catch(function (error) { console.log(error.response.data) })
        .then(function () { });
      const likeme = await likeMeGET(userDetails.id_cliente)
      setLike(likeme)
      Get()
      Toast.show("Agregado a tu lista de deseos!")
    }
    else {
      console.log("eliminar")
      wishDel(i)
    }
  }



  //----------------------------//
  //   FILTRAR POR CATEGORIA    //
  //____________________________//
  function SETIDK(e) {
    console.log("idk: ", e)
    setIDK(e)
  }

  //----------------------------//
  //     RECARGAR LA PAGINA     //
  //____________________________//
  function refresh() {
    GlobalPage(page)
    getCarLocal()
    Get()
  }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD"}}>
      <StatusBar backgroundColor={primaryColor} barStyle="dark-content" />


      <ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>

      <ScrollView refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => refresh()
          }
        />
      }>


         <HeadShop
          props={{ ...props }}
          name_user={userDetails.name}
          Car={localCar}
          updateCarLocal={updateCarLocal}
        /> 


     
          {Load && <Loading color={primaryColor} />}
          {
            Load == false && Category.length > 0 &&
            <BtnCategoryShop
              setCategory={SETIDK}
              category={Category}
              IDK={idK}
            />
          }
          {
           Load == false &&
            <View style={{ marginTop: 20, marginBottom: -20, flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                {page > 1 &&
                  <TouchableOpacity style={{ width: 40, height: 40 }} onPress={() => GlobalPage(page - 1)}>
                    <Icon name='chevron-left-outline' width={35} height={35} top={-2} fill='rgba(0,0,0,0.1)' />
                  </TouchableOpacity>
                }
              </View>
                <View style={{ height: 30, width: 30, alignItems: "center", backgroundColor: "rgba(0,0,0,0.1)", justifyContent: "center", borderRadius: 25 }}>
                  <Text style={{fontSize:14, lineHeight: 25, fontWeight: "bold", color: "white" }}>{page + "/" + LastPage}</Text>
                </View>
              <View style={{ width: "35%", alignItems: "flex-start" }}>
                {
                 page < LastPage &&
                  <TouchableOpacity style={{ width: 40, height: 40 }} onPress={() => GlobalPage(page + 1)}>
                    <Icon name='chevron-right-outline' width={35} height={35} top={-2} fill='rgba(0,0,0,0.1)' />
                  </TouchableOpacity>
                }
              </View>
            </View>
          }
          {
            !Load && ShopServer2.length > 0 &&
            <ShopProductsList2
              props={{ ...props }}
              ShopServer={ShopServer2}
              updateCarLocal={updateCarLocal}
              Car={localCar.length}
              likes={Like}
              AddCar={AddCar}
              wishDel={wishDel}
              wishAdd={wishAdd}
              refresh={refresh}
            />
          }


          
          {
          !Load && ShopServer2.length == 0 &&
            <View style={{marginVertical:40, alignItems: "center", alignContent: "center" }}>
              <View style={{ borderColor: colorDark, borderWidth: 2, padding: 10, borderRadius: 20, borderStyle: 'dashed', textAlign: "center", }}>
                <Text style={{ textAlign: "center", width: "100%", color: colorDark, textTransform: "uppercase", fontSize: 16, }}>no hay productos disponibles</Text>
              </View>
            </View>
          }
          {
          Load == false &&
            <View style={{ marginTop: -10, marginBottom: 20, flexDirection: "row", justifyContent: "space-around" }}>
              <View style={{ width: "35%", alignItems: "flex-end" }}>
                {
                  page > 1 &&
                  <TouchableOpacity style={{ width: 40, height: 40 }} onPress={() => GlobalPage(page - 1)}>
                    <Icon name='chevron-left-outline' width={35} height={35} top={-2} fill='rgba(0,0,0,0.1)' />
                  </TouchableOpacity>
                }
              </View>

              <View style={{ height: 30, width: 30, alignItems: "center", backgroundColor: "rgba(0,0,0,0.1)", justifyContent: "center", borderRadius: 25 }}>
                <Text style={{fontSize:14, lineHeight: 25, fontWeight: "bold", color: "white" }}>{page + "/" + LastPage}</Text>
              </View>

              <View style={{ width: "35%", alignItems: "flex-start" }}>
                {
                 page < LastPage &&
                  <TouchableOpacity style={{ width: 40, height: 40 }} onPress={() => GlobalPage(page + 1)}>
                    <Icon name='chevron-right-outline' width={35} height={35} top={-2} fill='rgba(0,0,0,0.1)' />
                  </TouchableOpacity>
                }
              </View>
            </View>
          }

      </ScrollView>
      <Menu props={{ ...props }} updateCarLocal={updateCarLocal} delta={true} />

    </ImageBackground>
    </SafeAreaView>
  )
}
const stylesValoration = StyleSheet.create({
  btnPage: {
    backgroundColor: "rgba(255,255,255,0.2)",
    height: "100%",
    alignItems: "center",
    paddingTop: "50%"
  },

  loginBtn: {
    width: "100%",
    backgroundColor: "#f27072",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 100
  },

  loginText: {
    color: "white"
  },
  inputView: {
    width: "100%",
    borderBottomColor: "#f27072",
    borderBottomWidth: 1,
    height: 50,
    justifyContent: "center",
    padding: 20,
    paddingStart: 0,
    marginBottom: 20
  },
  inputText: {
    height: 50,
    color: "#777"
  },
});
export default App;