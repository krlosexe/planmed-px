import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, StyleSheet, Image } from 'react-native'

import { Icon } from 'react-native-eva-icons';
import { colorBack, primaryColor, modalBack, colorLight } from '../Colors.js'

function PRPinfo() {

  const [show, setshow] = useState(false)



  function set() {
    console.log("set")
  }

  if (show == false) {
    return (



      <View style={{ backgroundColor: colorBack, alignItems: "center", bottom: 10, height: 40, marginBottom: -15 }}>

        <TouchableOpacity
          onPress={() => setshow(true)}
          style={[style.btn_show, { backgroundColor: colorLight }]}
        >
          <Icon name='alert-circle-outline' width={34} height={34} fill={primaryColor} style={{ top: 3, left: 3 }} />
        </TouchableOpacity>
      </View>




    )
  }





  else {


    return (
      <View style={style.wrap}>
        <TouchableOpacity
          onPress={() => setshow(false)}
          style={style.btn_hidde}
        >
          <Icon name='close-circle-outline' width={34} height={34} fill="#FFF" style={{ top: 3, left: 3 }} />
        </TouchableOpacity>
        <View style={style.container}>
          <ScrollView scrollEventThrottle={16}>





            <View style={{ alignItems: "center", marginBottom: 20 }}>

              <Image style={{
                width: 200, height: 200
              }} source={require('../src/images/Financiacion.png')} />
            </View>
            <Text style={style.parrafo}>
              <Text style={style.negrita}>
                <View style={style.sangrado}></View>
              Nuestro
              <Text style={style.pink}> programa de remisión de pacientes </Text>
              fue creado para retribuir la confianza puesta por nuestras pacientes en nosotros y nuestros especialistas, y la confianza que siguen depositando a la hora de recomendarnos con sus amig@s, familiares y vecinos, asi como cualquier persona que desee vincularse con Plan Médico y Quirúrgico y recibir todos los beneficios que a continuación se van a detallar.
              </Text>
              {"\n"}{"\n"}
              <Text style={style.bigpink}> ¿En que consiste el programa de remisión de pacientes?</Text>
              {"\n"}
              Cada que recomiendes a alguien con nosotros, entrarás a nuestra base de datos bajo un código que te será asignado, una vez dicha persona se opere con <Text style={style.negrita}>PLAN MÉDICO Y QUIRÚRGICO,</Text> vas a recibir una bonificación que puedes hacerla efectiva recibiendola de manera física, abonarla a cuotas de tu crédito o incluso que sea abonada para una próxima cirugía de tu preferencia.
              {"\n"}{"\n"}
              <Text style={style.bigpink}> ¿Que debes hacer?</Text>
              {"\n"}  {"\n"}
              * Una vez que te registres a través de nuestro sitio web o en nuestra App serás parte de nuestro PRP y para referirnos con alguien lo podras hacer así:
              {"\n"}{"\n"}
              * Le puedes dar nuestra linea de atención <Text style={style.negrita}>315 7857783</Text> en este caso debes indicarle a tu referida que debe dar tu nombre o código para que sepamos que fuiste tu quien la refirió.
              {"\n"}{"\n"}
              * Puedes darle el numero de tu referida a nuestra asesora en este numero de Whatsapp <Text style={style.negrita}>315 7857783,</Text> nosotros nos encargaremos de contactarla y prestarle la asesoría.
              {"\n"} {"\n"}
              <Text style={style.bigpink}> ¿Como y cuando puedo redimir mi bono?</Text>
              {"\n"}
              Una vez operada tu referida nuestro grupo se pondrá en contacto contigo los siguientes 10 días hábiles luego de la cirugía para informarte sobre el valor de tu bono (depende de la cirugía y valor cotizado) en caso de que la paciente acceda a nuestro crédito directo el pago de este bono se hará a los 4 meses.
            </Text>
            <View style={style.foot}>
              <Image style={style.foot_img} source={require('../src/images/Logo-blue.png')} />
            </View>
          </ScrollView>
        </View>
      </View>
    )

  }

}

const style = StyleSheet.create({

  btn_show: {
    zIndex: 99999999999,
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 40,
    height: 40,
    borderRadius: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4,
    // elevation: 6,
  },

  wrap: {
    paddingTop: 20,
    backgroundColor: modalBack,
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  btn_hidde: { position: "absolute", right: 10, top: 25 },


  container: {
    top: 45,
    backgroundColor: "#FFF",
    height: "75%",
    width: "90%",
    marginLeft: "5%",
    padding: 20,
    borderRadius: 20
  },




  parrafo: {

    textAlign: "justify",
    color: "#777"
  },
  sangrado: {
    width: 20
  },


  negrita: {
    fontWeight: "bold",
    color: "#555"
  },


  pink: {
    color: primaryColor,
    textTransform: "capitalize",
    fontWeight: "bold"
  },



  bigpink: {
    color: primaryColor,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
  },





  foot: {
    minHeight: 120,
    flex: 1
  },

  foot_img: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain"
  }




})

export default PRPinfo;
