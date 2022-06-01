import React, { useState, useContext } from 'react'
import { Alert, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import { primaryColor, colorLight, colorBack, colorTertiary } from '../Colors.js'


function ShopProductsList2(props) {
  const { navigation } = props.props
  const userDetails = useContext(UserContext)
  const [heart, setheart] = useState(props.likes);

  const WindowAlert = () =>
    Alert.alert(
      "Por favor inicie sesión para añadir productos al carrito",
      "Si no tiene una cuenta, registrese",
      [{ text: "Login", onPress: () => goToScreen('Login') }, { text: "Registrarme", onPress: () => goToScreen('Register') }, { text: "Salir", onPress: () => console.log("OK Pressed"), style: "cancel" }]
    );



  function goToScreen(screen, data, from) {
    props.updateCarLocal()
    //props.refresh()
    navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }


  return (
    <ScrollView style={stylesHere.wrap}>
      <View style={stylesHere.content}>
        <FlatList
          data={props.ShopServer}
          numColumns={2}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <View style={stylesHere.card_product}>
              <View style={stylesHere.card_product_head}>
                {
                  heart !== undefined && item.wishMe == true &&
                  <TouchableOpacity style={stylesHere.card_product_head_icon} onPress={() => props.wishDel(item.wishId)}>
                    <Icon name='heart' width={20} height={20} fill={colorTertiary} />
                  </TouchableOpacity>
                }
                {
                  heart !== undefined && item.wishMe == false &&
                  <TouchableOpacity style={stylesHere.card_product_head_icon} onPress={() => props.wishAdd(item.id)} >
                    <Icon name='heart-outline' width={20} height={20} fill={colorTertiary} />
                  </TouchableOpacity>
                }
              </View>
              <TouchableOpacity
                onPress={() => goToScreen('ShopProductsView', item, "Shop2")}
                style={stylesHere.bigBtn}>
                {item.photo != null
                  ? (<Image style={stylesHere.card_product_head_img} source={{ uri: item.photo }} />)
                  : (<Image style={stylesHere.card_product_head_img} source={require('../src/images/emtyp.png')} />)
                }
                <View style={stylesHere.card_product_head_content_title}>
                  <Text style={stylesHere.card_product_head_content_title_text}>
                    {item.description}
                  </Text>
                  <View style={{ width: "90%", margin: "5%", justifyContent: 'space-around', flexDirection: "row" }}>
                    <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                    <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                    <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                    <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                    <View><Icon name='star' width={17} height={17} fill={primaryColor} /></View>
                  </View>
                  {/* <Text style={{ ...stylesHere.card_product_head_content_title_text, fontSize: 12, color: "#999" }}>{item.category}</Text> */}
                  <Text style={{ ...stylesHere.card_product_head_content_title_text, fontSize: 13, color: primaryColor }}>COP {item.price_cop}</Text>
                </View>
              </TouchableOpacity>
              {
                userDetails.email != null &&
                <TouchableOpacity onPress={() => props.AddCar(item, 1, 0)} style={{ position: "absolute", zIndex: 999, backgroundColor: primaryColor, width: 25, height: 25, borderTopStartRadius: 20, paddingTop: 7, paddingLeft: 7, position: "absolute", bottom: 0, right: 0 }}>
                  <Icon name='shopping-cart-outline' width={16} height={16} fill='#fff' />
                </TouchableOpacity>
              }
              {
                userDetails.email == null &&
                <TouchableOpacity onPress={() => WindowAlert(props.Car, item.id, userDetails, 1)} style={{ position: "absolute", zIndex: 999, backgroundColor: colorTertiary, width: 25, height: 25, borderTopStartRadius: 20, paddingTop: 7, paddingLeft: 7, position: "absolute", bottom: 0, right: 0 }}>
                  <Icon name='shopping-cart-outline' width={16} height={16} fill='#fff' />
                </TouchableOpacity>
              }
            </View>
          )}
        />
      </View>
    </ScrollView>
  )
}


const stylesHere = StyleSheet.create({
  loading: {
    marginTop: 40,
  },


  bigBtn: {
    marginTop: -5
  },

  wrap: {
    display: "flex",
  },

  content_filter: {
    padding: 2,
    marginTop: 10,
    marginBottom: -10,
    flexDirection: "row"
  },

  scrollkat: {
    alignContent: "center",
  },

  item_filter: {
    marginLeft: 40,
    width: 40,
    height: 40,
    paddingTop: 8,
    alignItems: "center",
    borderRadius: 10,
  },

  spacedown: {
    height: 5,
    marginBottom: 100
  },

  content: {
    width: "100%",
    paddingBottom: 20,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row"
  },

  card_product: {
    overflow: "hidden",
    marginLeft: 24,
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "40%",
    marginTop: 20,
    marginBottom: 10,
    minHeight: 240,
    maxHeight: 250,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderBottomColor: "rgba(255,255,255,0.5)",
    borderRightColor: "rgba(255,255,255,0.5)",
    borderWidth: 1
  },


  card_product_head: {
    backgroundColor: colorBack,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },


  card_product_head_icon: {
    marginTop: 3
  },


  card_product_head_content_img: {
  },

  card_product_head_img: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    borderRadius: 50
  },

  card_product_head_content_title: {
    position: "absolute",
    paddingHorizontal: 10,
    bottom: 4,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: -110,
    paddingVertical: 5
  },

  card_product_head_content_title_text: {
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 12
  }
})
export default ShopProductsList2;