import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ToastAndroid, ScrollView } from 'react-native';

import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';


import { serverQa, base_url } from '../Env'
import axios from 'axios'

import PhotoUpload from 'react-native-photo-upload'
import Menu from '../components/Menu';
import {getCar} from '../components/processItemShop'



function Index(props) {
  const [requesting, setRequesting] = useState(false)
  const [Error, setError] = useState(false)
  const [PaySuccess, setPaySuccess] = useState(false)
  const [acceptance_token, setacceptance_token] = useState(false)
  const userDetails = useContext(UserContext)
  const { setUserDetails } = useContext(UserContext)
  const [fileToUpload, setFileToUpload] = React.useState(false)

  const [monto, setMonto] = useState(0)

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() })
  }



  let randomCode
  if (props) {
    randomCode = props.route.params.randomCode
    //randomCode = Math.random()
  } else {
    randomCode = Math.random()
  }



  const { navigation } = props

  function goToScreen(screen) {
    navigation.navigate(screen)
  }





  useEffect(() => {
    async function Get() {
      console.log("get car")
      const car = await getCar(userDetails.id)
      setMonto(car.total_pay)
    }
    Get()
  }, [randomCode])






  useEffect(() => {
    setPaySuccess(false)

    console.log(props.route.params.payment_concept)
  }, [randomCode])




  function GotoPay() {

    if (!fileToUpload) {

      ToastAndroid.showWithGravity(
        "Debe seleccionar una Imagen",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      return false;

    }


      saveDataStudyCredit()
    

  }






  function saveDataStudyCredit() {
    console.log("exito guardando la data")
    console.log("nuevo pedido")
    let status = "Pendiente"
    let newPedido = {
      "id_client": userDetails.id,
      "total_invoice": props.route.params.amount_in_cents * 100,
      "method_pay": props.route.params.payment_method.type,
      "reference_pay": RefferedPay,
      "status": status,
      "products": Car
    }
    console.log("datos enviados para crear nuevo pedido")
    console.log(newPedido)
    axios.post(base_url(Api, `order`), newPedido).then(function (response) {
      console.log("orden creada con exito")
    })
      .catch(function (error) {
        console.log("this my error ")
        console.log(error.response.data)
      })
      .then(function () { });



      
    // const data = {
    //   "id_client": userDetails.id_client,
    //   "id_transactions": "null",
    //   "amount": props.route.params.amount_in_cents,
    //   "payment_method": props.route.params.payment_method.type,
    //   "photo_recived": fileToUpload
    // }

    // setRequesting(true)
    // axios.post(base_url(serverQa, `client/pay/to/study/credit`), data).then(function (response) {
    //   setRequesting(false)
    //   setPaySuccess(true)
    // }).catch(function (error) {
    //   setRequesting(false)
    //   console.log('Error al enviar formulario2')
    //   //console.log(error);
    //   console.log(error.response, "EL ERROR2");

    // }).then(function () {

    // });
  }









  React.useEffect(() => {
    // console.log(fileToUpload)

  }, [fileToUpload]);

  if (requesting) {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}>
        <Text style={{

        }}>Espere un momento por favor . . .</Text>
      </View>)
  }





  if (PaySuccess) {

    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "white"
      }}>


        <View><Icon name='checkmark-circle-2-outline' width={200} height={200} fill='#1c712e' /></View>
        <Text style={styles.title_succesfull} >Transacción APROBADA</Text>
        <Text style={styles.title} >Información de la transacción</Text>
        <Text style={styles.item_succesfull}>Email <Text style={styles.item_succesfull_bold}>{userDetails.email}</Text> </Text>
        <Text style={styles.title} >Información del pagador</Text>
        <Text style={styles.item_succesfull}>Nombre <Text style={styles.item_succesfull_bold}>{userDetails.nombres}</Text></Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => goToScreen("Dashboard")}   >
          <Text style={styles.loginText}>Finalizar</Text>
        </TouchableOpacity>
      </View>)

  }






  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  return (

    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View>


          <View style={styles.card}>
           
           
            <Text style={{fontSize:16, fontWeight:"bold"}}>Siga los siguientes pasos:</Text>

            <View style={{flexDirection:"row",marginTop:10}}>
              <Text>1-</Text>
              <Text>Realice la consignación o transferencia a la siguiente cuenta bancaria desde el banco de su preferencia.</Text>
            </View>


            <View style={{borderColor:"#555", borderWidth:0.5, borderRadius:5, paddingHorizontal:10, paddingVertical:10, margin:5, marginTop:15}} >
            <View style={{flexDirection:"row"}}>
                <Text>Banco: </Text>
                <Text style={{fontWeight:"bold"}}>DAVIVIENDA</Text>
              </View>
              <View style={{flexDirection:"row",marginTop:5}}>
                <Text>Nº: </Text>
                <Text style={{fontWeight:"bold"}}>005-000014-39</Text>
              </View>
              <View style={{flexDirection:"row",marginTop:5}}>
                <Text>Tipo de cuenta: </Text>
                <Text style={{fontWeight:"bold"}}>AHORRO</Text>
              </View>
              <View style={{flexDirection:"row",marginTop:5}}>
                <Text>Monto: </Text>
                <Text style={{fontWeight:"bold", color:"#f27072"}}>COP. {currencyFormat(monto)}</Text>
              </View>
            </View>




            <View style={{flexDirection:"row",marginTop:10}}>
              <Text>2-</Text>
              <Text>Suba el comprobante de pago en la siguiente sección</Text>
            </View>
            <View style={{flexDirection:"row",marginTop:10}}>
              <Text>3-</Text>
              <Text>Haga Clic en el boton <Text style={{fontWeight:"bold"}}>"Enviar"</Text></Text>
            </View>


            <Text style={{fontSize:12, color:"#555", top: 10}}> * El estado de su pedido será de <Text style={{fontWeight:"bold"}}>"PENDIENTE"</Text> mientras se valida su pago.</Text>
           

          </View>


          <View style={styles.card}>
            {
              Error &&
              <Text style={styles.TextError} >Los datos ingresados son incorrectos</Text>
            }
            <View style={styles.inputView} >
              <Text>Toca y sube tu comprobante</Text>
            </View>
            <PhotoUpload onPhotoSelect={avatar => {
              if (avatar) {
                setFileToUpload(avatar)
              }
            }
            }>
              <Image style={{
                paddingVertical: 30,
                width: 190,
                height: 140,
              }}
                title="jaja"
                source={require('../src/images/fileuploadiconpink.png')} />
            </PhotoUpload>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => GotoPay()}   >
            <Text style={styles.loginText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Menu props={{ ...props }} />
    </View>
  )



}

export default Index;



const styles = StyleSheet.create({

  header: {
    padding: 30,
    backgroundColor: 'white',
    paddingBottom: 20,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    width: "100%"
  },

  menu: {
    padding: 10,
    width: "100%",
    backgroundColor: 'white',
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
    borderTopColor: "#ddd",
    borderTopWidth: 1
  },

  itemMenu: {
    alignItems: "center"
  },


  texMenu: {
    color: "#777"
  },

  texMenuActive: {
    color: "#f27072"
  },



  ItemsHeaderFlex: {
    flexDirection: "row",
    justifyContent: "space-between",

  },

  container: {
    height: "100%",
    backgroundColor: '#eee',
    flexDirection: "column"
    // backgroundColor: '#eee',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: "100%",
  },

  icon: {
    width: 80,
    height: 80,
    marginTop: -20
  },
  profile: {
    width: 50,
    height: 50,
    marginTop: -10
  },

  tittleHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  },

  SubtittleHeader: {
    color: '#777'
  },

  SubtittlePrice: {
    color: '#f27072',
    fontSize: 20,
    marginTop: 10
  },

  Price: {
    fontWeight: "bold"
  },

  scrollView: {
    width: "90%",
    marginHorizontal: "5%",
    height: "100%",
    paddingTop: 80,
    marginTop: -80,
    zIndex: -2
    // marginTop: 1,
    // marginHorizontal: 90,
    // marginBottom: 80,
    // width: "90%",
    // height: "100%"
  },

  card: {
    color: '#777',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30,
    width: "100%",

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,

    borderLeftColor: "#f27072",
    borderLeftWidth: 5
  },

  card_image: {
    color: "black",
    marginRight: 10
  },

  card_title: {
    fontWeight: "bold",
    marginTop: 15
  },

  card_title_center: {
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center"
  },
  card_subtitle: {
    color: "#777",
    marginLeft: 10,
    width: "60%",
  },


  card_content_title: {
    width: "80%",
    justifyContent: "space-evenly"
  },


  inputView: {
    width: "100%",
    borderBottomColor: "#f27072",
    borderBottomWidth: 1,


    justifyContent: "center",

    paddingStart: 0,
    marginBottom: 20
  },
  inputText: {
    height: 50,
    color: "#777",
    backgroundColor: "#eee",
    paddingLeft: 10
  },
  icon_money: {
    color: "#f27072",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
    marginEnd: 20
  },


  icon_calendar: {
    marginTop: 25,
    marginRight: 10
  },

  amount: {
    fontSize: 20,
    marginTop: 10,
    color: "#f27072"
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

  btnCLose: {
    width: "100%",
    color: "#3f4a56",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  CloseText: {
    color: "#3f4a56",
    fontSize: 17
  },

  loginText: {
    color: "white"
  },


  btnQuote: {
    width: "100%",
    backgroundColor: "#f27072",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  form: {
    width: "100%"
  },
  card_image_content: {
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    paddingRight: 10
  },

  selects_row: {
    flexDirection: "row",

  },


  select_month_content: {
    width: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f27072",
    backgroundColor: "#eee",
    marginRight: 20
  },
  select_month: {
    height: 40,
    color: "#777",

  },



  select_year_content: {
    width: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f27072",
    backgroundColor: "#eee"
  },
  select_year: {
    width: 100,
    height: 40,
    color: "#777",
  },

  Instrucciones: {
    padding: 10,
    marginTop: 15,
    backgroundColor: "#f2f9ff",
    borderRadius: 5,
    borderColor: "#bfe1ff",
    borderWidth: 1,

  },
  TextInstrucciones: {
    marginBottom: 10,
    color: "#3f4a56",
    lineHeight: 18
  },
  bold: {
    fontWeight: "bold"
  },
  contentImageCard: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  ImageCard: {
    resizeMode: "contain",
    width: 120
  },



  contentAcceptCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f7f9fa",
    borderColor: "#dfe6ee",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  contentAcceptCardText: {
    color: "#777",
    fontSize: 12
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color: "#777",
    lineHeight: 20
  },


  TextError: {
    color: "red",
    marginBottom: 10
  }




});

