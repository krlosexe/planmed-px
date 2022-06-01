/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';
 import {
   Alert,
   View,
   Text,
   StyleSheet,
   Image,
   SafeAreaView,
   StatusBar,
   ScrollView,
   TouchableOpacity,
   BackHandler
 } from 'react-native';
 
 import { Icon } from 'react-native-eva-icons';
 import Menu from '../components/Menu';
 import UserContext from '../contexts/UserContext'
 //import { getCar, AddCar } from '../components/processItemShop'
 import AsyncStorage from '@react-native-community/async-storage';
 import Toast from 'react-native-simple-toast';
 import { colorDark,colorTertiary, colorLight, primaryColor, colorSecundary, colorBack2, primaryColorOpacity } from '../Colors.js'
 
 function App(props) {
   const { navigation } = props
   const data = props.route.params.data
   const userDetails = React.useContext(UserContext)
   const [localCar, setlocalCar] = useState([]);
   const [Count, setCount] = useState(0);
   const [cantidad, setCantidad] = useState(2);
   // const [total, setTotal] = useState(0);
   // const [totalpay, setTotalpay] = useState(0);
 
 
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
 
 
 
 
 
 
 
 
 
 
 
   let randomCode
   if (props.route.params) {
     randomCode = props.route.params.randomCode
   } 
 
   useEffect(() => {
     console.log("** random -> getCarLocal()")
     getCarLocal()
   }, [randomCode]);
 
 
 
 
 
   function goToScreen(screen, data, shop) {
     navigation.navigate(screen, { randomCode: Math.random(), data, shop })
   }
 
 
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
         // await AsyncStorage.setItem('carrito', JSON.stringify(data))
         // console.log("carrito local creado...")
       }
       else {
         setlocalCar(car.data)
         // setTotal(car.total)
         // setTotalpay(car.total_pay)
         console.log("datos de carrito local obtenidos en otro screen!")
       }
     } catch (error) {
       console.log(error)
     }
   }
 
 
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
 
 
 
   function goToShop(screen) {
 
 
     navigation.navigate(screen, { randomCode: Math.random() })
 
   }
 
 
 function goToBack(){
 
 console.log("F: ",props.route.params.from)
 
 navigation.navigate(props.route.params.from, { randomCode: Math.random(),})
 
 
 }
 
 
 
 
   function goToCar() {
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
   // end AddCAr
 
 
 
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
 
 
 
 useEffect(() => {
 
 if(cantidad < 1 ){
   setCantidad(1)
   Toast.show("Cantidad minima es 1")
 }
 
 
 
 
 
 }, [cantidad]);
 
   return (
     <SafeAreaView style={{ flex: 1, backgroundColor: colorLight }}>
       <StatusBar backgroundColor={primaryColor} barStyle="dark-content" />
       <ScrollView>
         <View style={styles.content}>
 
 
           <View style={styles.content_head}>
             <View style={styles.content_head_tittle}>
               <TouchableOpacity onPress={() => goToBack()} style={styles.content_head_icon}>
                 <Icon name='chevron-left' width={35} height={35} fill={primaryColor} />
               </TouchableOpacity>
             </View>
             <TouchableOpacity onPress={() => goToCar()}>
               <View style={styles.content_head_icon}>
                 <Text style={styles.qty_car}>
                   {Count}
                 </Text><Icon name='shopping-cart-outline' width={30} height={30} fill={primaryColor} /></View>
             </TouchableOpacity>
           </View>
 
 
 
 
           <Text style={styles.title_product}>{data.description}</Text>
           <View style={styles.product_detail}>
            
             <View style={styles.product_detail_content_img}>
 
 
               {data.photo != null
                 ? (<Image style={styles.product_detail_img} source={{ uri: data.photo }} />)
                 : (<Image style={styles.product_detail_img} source={require('../src/images/emtyp.png')} />)
               }
             </View>
 
 {/* 
             <View style={styles.product_detail_content_description}>
               <View style={styles.product_detail_data}>
                 <Text style={styles.product_detail_data_title}>Precio</Text>
                 <Text style={styles.product_detail_data_sub_title}>COP {data.price_cop}</Text>
               </View>
               <View style={styles.product_detail_data}>
 
                 <Text style={styles.product_detail_data_title}>Categoria</Text> 
                 <Text style={styles.product_detail_data_sub_title}>{data.category}</Text>
               </View>
             </View>
  */}
           </View>
         </View>
 
         <View style={styles.description}>
 
 
 
 
 
           <Text style={styles.description_text}>Descripción</Text>
           <Text style={styles.description_text_content}>{data.description}</Text>
 
 
 
 
 
 
 <View style={{width:"100%", alignContent:"center", alignItems:"center", justifyContent:"center"}}>
 
 
 
 <View style={styles.newcantidad}>
 
 <TouchableOpacity
 onPress={() =>setCantidad(cantidad-1)}
 style={styles.iconCantidad}
 >
   <Icon name='minus' width={10} height={10} fill={colorLight} />
 </TouchableOpacity>
 
 
 <Text style={styles.cantidad}>
 {cantidad}
 </Text>
 
 <TouchableOpacity
 onPress={() => setCantidad(cantidad+1)}
 style={styles.iconCantidad}
 >
   <Icon name='plus' width={10} height={10} fill={colorLight} />
 </TouchableOpacity> 
 
 
 
 </View>
 
 
 
           {
             userDetails.email == null &&
             <TouchableOpacity onPress={() => WindowAlert()} style={styles.BtnPrimary}>
               <Icon name='shopping-cart-outline' width={16} height={16} fill='#fff' />
               <Text style={styles.loginText}>Añadir al carrito</Text>
             </TouchableOpacity>
           }
 
           {
             userDetails.email != null && 
             <TouchableOpacity onPress={() => AddCar(data.id, data, cantidad)} style={styles.BtnPrimary}>
               <Icon name='shopping-cart-outline' width={16} height={16} fill={colorLight} />
               <Text style={styles.loginText}>Añadir al carrito</Text>
             </TouchableOpacity>
           }
 
 </View>
 
 
 
 
 
 
 
 
 
         </View>
       </ScrollView>
       <Menu props={{ ...props }} />
     </SafeAreaView>
   )
 }
 export default App;
 
 
 const styles = StyleSheet.create({
 
 
 
   newcantidad:{flexDirection:"row", top:20},
   iconCantidad:{
 marginHorizontal:20,
 borderRadius:15, justifyContent:"center",
 alignItems:"center",alignContent:"center",
     backgroundColor:primaryColor, width:25, height:25
   },
   cantidad:{borderColor:"silver",borderRadius:12, textAlign:"center", borderWidth:1, width:50, padding:4, fontWeight: "bold", color: "#777", fontSize: 14 },
 
 
 
 
   qty_car: {
     color: primaryColor,
     marginLeft: 0,
     marginBottom: -5,
     fontWeight: "bold",
     width: 30,
     textAlign: "center"
   },
   content: {
     backgroundColor: colorBack2,
     padding: 20
   },
   content_head: {
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between"
   },
   title_product: {
 
 textAlign:"center",
     fontSize: 25,
     width: "100%",
     marginVertical:20
   },
   product_detail: {
     flexDirection: "row",
     alignContent: "center",
     alignItems: "center"
   },
   product_detail_img: {
     width: "110%",
     height: 300,
 
     // flex: 1,
     // height: null,
     // width: null,
     // resizeMode: "contain"
   },
 
 
   product_detail_content_img: { //caja
     flex: 1,
     width: "60%",
     overflow: "hidden",
     justifyContent: "center",
     alignContent: "center",
     alignItems: "center",
     borderRadius:20
 
   },
   product_detail_content_description: {
     width: null,
     height: null,
     resizeMode: 'cover',
   },
   product_detail_data: {
     marginLeft: 20,
     marginTop: 20
   },
   product_detail_data_title: {
     fontSize: 12,
     color: "#888"
   },
   product_detail_data_sub_title: {
     fontSize: 16,
   },
   description: {
     padding: 20,
   },
   description_text: {
     fontSize: 17
   },
   description_text_content: {
     color: "#777",
     textAlign: "justify",
     lineHeight: 20,
     marginTop: 20
   },
 
 
   BtnPrimary: {
     flexDirection: "row",
     width: "70%",
     backgroundColor: primaryColor,
     height: 50,
     alignItems: "center",
     justifyContent: "center",
     marginTop: 40,
     marginBottom: 40,
     shadowOffset: {
       width: 10,
       height: 30,
     },
     shadowOpacity: 1.27,
     shadowRadius: 4.65,
     elevation: 6,
     borderRadius:12
    // borderBottomWidth:4,
   //  borderBottomColor:colorTertiary
   },
 
 
 
   loginText: {
     marginLeft: 20,
     color: "white"
   },
   BtnCars: {
     width: 50,
     height: 50,
     backgroundColor: primaryColor,
     borderRadius: 100,
     alignItems: "center",
     justifyContent: "center",
     marginTop: 40,
     marginBottom: 10,
     position: "absolute",
     right: 30,
     bottom: -30,
     shadowOffset: {
       width: 10,
       height: 30,
     },
     shadowOpacity: 1.27,
     shadowRadius: 4.65,
     elevation: 6
   }
 
 })
 
 