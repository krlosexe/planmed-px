import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { colorTertiary, primaryColor } from '../Colors.js'

function Index(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.label}</Text>
      <View style={styles.item}>
        <View style={styles.stroke}>
          <Icon name={props.icon} width={48} height={48} fill={primaryColor} />
        </View>
      </View>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({

  container: {
    width:100, alignItems:"center", alignContent:"center", padding:5
  },



  title: {
    color: "#555",
    fontSize: 14,
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
    width:100,
    fontWeight:"bold"
  },

  item: {
    borderRadius: 20,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "rgba(255,255,255,0.5)",
    borderBottomColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.5)",


    // width: "90%",

    // height: 240,
    // flexDirection: "column",
    // justifyContent: "space-between",
    // padding: 20,
    // paddingBottom: 40,
    // marginTop: 20,
    // marginBottom: -10,






    // padding: 6,
    // backgroundColor: primaryColor,
    width: 80,
   height: 80,
    // borderTopLeftRadius:6,
    // borderTopRightRadius:6,
    // marginHorizontal: 10,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderBottomWidth:2,
    // borderBottomColor: colorTertiary
  },

  stroke: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
   borderTopLeftRadius:8
  },

  
});

export default Index;