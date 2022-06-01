import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator, } from "react-native";
import { Icon } from 'react-native-eva-icons';
//import styles from '../Styles';
import { showLocation } from 'react-native-map-link'
import { getSedes } from '../components/processItemShop'
import Sedes from './sedes.js'
import Toast from 'react-native-simple-toast';
import { primaryColor,colorLight } from '../Colors'
import Loading from '../components/loading.js'


function Index(props) {
  const { navigation } = props.props;
  const [Sedesdata, setSedesdata] = useState(0)
  const [Load, setLoad] = useState(true) //cargando?

  let randomCode
  if (props.props.route.params) { randomCode = props.props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    Get()
  }, [randomCode])


  async function Get() {
    const response = await getSedes()
    setSedesdata(response)
    setLoad(false)
  }

  function confirLoader() {
    try {
      return (
        <ScrollView horizontal={true} style={styles.scroll_view_pharmacy_slide}>
          {
            Sedesdata.map((i) => <Sedes i={i} key={i} props={{ ...props.props }} />)
          }
          
        </ScrollView>
      )
    }
    catch (e) { Toast.show("Verifique su conexion a internet") }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrap}>
        <View style={styles.pharmacy_slide_head}>
          <Text style={styles.pharmacy_slide_tittle}>Nuestras Sedes</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
          {
            Load == true &&
            <Loading color={primaryColor} />
          }
          {
            Load == false && Sedesdata !== [] &&
            confirLoader()
          }

        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    top:20
  },

  wrap: {
    borderRadius: 20,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "rgba(255,255,255,0.5)",
    borderBottomColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.5)"
  },


  scroll_view_pharmacy_slide: {},
  pharmacy_slide_head: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },


  pharmacy_slide_tittle: {
    fontWeight: "bold",
    fontSize: 16,
    color: primaryColor,
    backgroundColor:colorLight,
    borderRadius:10, padding:1, paddingHorizontal:20
  },


  pharmacy_slide_view_all: {
    // color: "#444",
    // fontSize: 16,
    // fontWeight: "bold"
  },
  loading: {
    // marginTop: 50,
  },
});
export default Index;