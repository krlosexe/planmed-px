import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { primaryColor,colorTertiary} from '../../Colors'
function Index(props) {


  function onChangeText(text) {
    console.log("text en la function ", text)
    props.setSearchText(text)
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        onChangeText={text => onChangeText(text)}
        value={props.searchText} />
      <Icon name={'search-outline'} width={20} height={48} fill={primaryColor} style={{ position: 'absolute', right: 10, top: -20 }} />
    </View>
  )
}



export default Index


const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    height: 70,
  justifyContent:"center",
    alignItems: 'center',
  alignContent:"center"
  },
  TextInput: {
    borderColor: 'black',
    backgroundColor: '#FFF',
    width: '90%',
    height: 50,
    borderRadius: 5,
    fontSize: 16,
    // borderColor:"#777",
    // borderWidth:1
  },
});