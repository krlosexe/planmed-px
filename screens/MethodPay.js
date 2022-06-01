import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import Menu from '../components/Menu';
import { primaryColor,colorTertiary } from '../Colors.js'


function Index(props) {

  const { navigation } = props
  // function goToScreen(screen) {
  //   navigation.navigate(screen, { randomCode: Math.random() })
  // }
  function goToScreen(screen,from) {
    props.navigation.navigate(screen, { randomCode: Math.random(), from })
  }



  let randomCode
  if (props) {
    randomCode = props.route.params.randomCode
    //randomCode = Math.random()
  } else {
    randomCode = Math.random()
  }

  const [Check, setCheck] = useState(false)
  const [AmountFee, setAmountFee] = useState(0)


  useEffect(() => {
    setAmountFee(props.route.params.amount_in_cents)
    setCheck(false)
  }, [randomCode])




  useEffect(() => {
    if (Check) {
      const comission = ((AmountFee / 100) * 5)
      const NewFee = Math.round((AmountFee + comission))
      setAmountFee(NewFee)
    } else {
      setAmountFee(props.route.params.amount_in_cents)
    }
  }, [Check])




  async function GoToStepTwo(type_pay) {
    const payment_method = {
      "type": type_pay,
    }
    let screen
    if (type_pay == "CARD") {
      screen = "PayToCard"
      if (!Check) {
        Toast.show("Debes aceptar los gastos bancarios (+5%)")
        return false;
      }
    }
    if (type_pay == "NEQUI") {
      if (!Check) {
        Toast.show("Debes aceptar los gastos bancarios (+5%)")
        return false;
      }
      screen = "PayToNequi"
    }
    if (type_pay == "OTHER")
      screen = "PayToOther"
    await navigation.navigate(screen, {
      randomCode: Math.random(),
      amount_in_cents: AmountFee,
      payment_concept: props.route.params.payment_concept,
      payment_method: payment_method,
      id_fee: props.route.params.id_fee
    })
  }



  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <View style={styles.header}>
        <View><Text style={styles.tittleHeader}>Escoge un método de pago</Text></View>
        <View><Text style={styles.SubtittleHeader}>Paga tu {props.route.params.payment_concept}.</Text></View>
        <View><Text style={styles.SubtittlePrice}>COP <Text style={styles.Price}>{currencyFormat(AmountFee)}</Text></Text></View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={Check}
            onValueChange={setCheck}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Pagar el <Text style={{ fontWeight: "bold" }}>5% adicional</Text> por gastos bancarios</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => GoToStepTwo('CARD')}>
            <View style={styles.card}>
              <View style={styles.card_image_content} >
                <Image
                  style={{ width: 130, height: 100, resizeMode: "contain", }}
                  source={require('../src/images/card_pay.png')} />
              </View>
              <View style={styles.card_content_title}>
                <Text style={styles.card_subtitle}>Usa tus Tarjetas</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GoToStepTwo('NEQUI')}>
            <View style={styles.card}>
              <View style={styles.card_image_content} >
                <Image
                  style={{ width: 130, height: 100, resizeMode: "contain", }}
                  source={require('../src/images/nequi.png')} />
              </View>
              <View style={styles.card_content_title}>
                <Text style={styles.card_subtitle}>Usa tu cuenta Nequi</Text>
              </View>
            </View>
          </TouchableOpacity>


          {/* <TouchableOpacity onPress={() => GoToStepTwo('OTHER')}>
            <View style={styles.card}>
              <View style={styles.card_image_content} >
                <Image
                  style={{ width: 130, height: 100, resizeMode: "contain", }}
                  source={require('../src/images/fileuploadiconpink.png')} />
              </View>
              <View style={styles.card_content_title}>
                <Text style={styles.card_subtitle}>Adjuntar Evidencia de Pago</Text>
              </View>
            </View>
          </TouchableOpacity> */}




<View style={{width:"100%", top:20, justifyContent:"center", alignContent:"center", alignItems:"center"}}>
  <TouchableOpacity onPress={() => {  goToScreen("ShopCar", "MethodPay") }}
  style={{backgroundColor:primaryColor, width:"70%", height:40, borderBottomWidth:4, borderBottomColor:colorTertiary}}
  >
    <Text style={{fontWeight:"bold", color:"white", textAlign:"center", lineHeight:35}}>Volver</Text>
  </TouchableOpacity>
</View>




        </View>
        <View style={{ height: 150 }}></View>
      </ScrollView>
      <Menu props={{ ...props }} />
    </View>
  )
}

export default Index;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#eee',
    flexDirection: "column"
  },
  header: {
    padding: 30,
    backgroundColor: 'white',
    paddingBottom: 20,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    width: "100%"
  },
  tittleHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20
  },
  SubtittleHeader: {
    color: '#777'
  },
  SubtittlePrice: {
    color: primaryColor,
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
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20
  },
  card: {
    color: '#777',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftColor: primaryColor,
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
});

