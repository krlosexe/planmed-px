import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { colorLight, primaryColor } from '../../Colors';
import { noImage } from '../../Env';

function Index(props) {





  //101 al 132
  function getBackgroundColor(value) {
    const letter = value[0].toUpperCase()
    const ascii = letter.charCodeAt(letter)
    if (ascii >= 90) return '#F0B7B3'
    if (ascii >= 80) return '#88D18A'
    if (ascii >= 70) return '#FF8C42'
    if (ascii >= 50) return '#FFF275'
  }





  return <View style={styles.container}>
    <View style={styles.content}>
      <View style={{
        width: 50, height: 50, justifyContent: 'center',
        backgroundColor: '#FFF275',//backgroundColor: getBackgroundColor(props.name),
        alignItems: 'center', borderRadius: 30
      }}>
        <Text style={{ fontWeight: 'bold', textTransform: "uppercase" }}>
          {props.name[0]}
        </Text>
      </View>
      <View>
        <Text style={styles.bigTitle}>{props.name}</Text>
        {(props.state) && <Text style={styles.miniTitle}>Estado: {props.state}</Text>}
        {(props.name_affiliate) && <Text style={styles.miniTitle}>Por: {props.name_affiliate}</Text>}
      </View>
    </View>
  </View>
}


export default Index


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colorLight,
  },
  content: {
    display: "flex",
    alignItems: 'center',
    flexDirection: "row",
  },
  bigTitle: {
    textTransform: "capitalize",
    fontSize: 18,
    color: '#000',
    marginLeft: 15,
    fontWeight: 'bold'
  },
  miniTitle: {
    fontSize: 14,
    color: '#000',
    marginLeft: 15,
    textTransform: "capitalize"

  }

});