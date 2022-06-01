import React from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native'
import { colorLight, primaryColor } from '../Colors.js'
import { Icon } from 'react-native-eva-icons';
function BtnCategoryShop(props) {
  return (
    <View style={stylesValoration.content_filter} >
      <View style={{ left: 5, position: "absolute", zIndex: 999,  borderRadius: 20, top: 5 }}>
        <Icon name='arrow-ios-back-outline' width={30} height={30} fill={colorLight} />
      </View>
      <View style={stylesValoration.wrapperScroll}>
        <ScrollView style={stylesValoration.scrollkat} horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[stylesValoration.newBTN, { backgroundColor: props.IDK == 0 ? primaryColor : "rgba(255,255,255,0.5)" }]}
            onPress={() => props.setCategory(0)}
          >
            <Text style={[stylesValoration.newText, { color: props.IDK == 0 ? colorLight : primaryColor }]}>Inicio</Text>
          </TouchableOpacity>
          {
            props.category.map((i, key) => {
              return (
                <BotonCategoria i={i}
                  key={key}
                  setK={props.setCategory}
                  IDK={props.IDK} />
              )
            })
          }
        </ScrollView>
      </View>
      <View style={{ right: 5, position: "absolute", zIndex: 999,  borderRadius: 20, top: 5 }}>
        <Icon name='arrow-ios-forward-outline' width={30} height={30} fill={colorLight} />
      </View>
    </View>
  )
}
function BotonCategoria(props) {
  return (
    <TouchableOpacity style={[stylesValoration.newBTN, { backgroundColor: props.IDK == props.i.id ? primaryColor : "rgba(255,255,255,0.5)", }]}
      onPress={() => props.setK(props.i.id)}
    >
      <Text style={[stylesValoration.newText, { color: props.IDK == props.i.id ? colorLight : primaryColor }]}>
        {props.i.name}
      </Text>
    </TouchableOpacity>
  )
}
export default BtnCategoryShop;
const stylesValoration = StyleSheet.create({
  content_filter: {
    padding: 2,
    marginTop: 10,
    marginBottom: -10,
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  wrapperScroll: {
    padding: 2,
    width: "82%",
    height: 40,
    overflow: "hidden"
  },
  scrollkat: {
    alignContent: "center",
    width: "100%"
  },
  newBTN: {
    borderWidth: 0.5,
    marginLeft: 5,
    borderColor: primaryColor,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  newText: {
    textTransform:"capitalize",
    fontSize: 12,
    fontWeight: "bold",
  }
});