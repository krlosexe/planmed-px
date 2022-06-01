import React from 'react'
import { StyleSheet,View } from 'react-native'

function Index(props){

        return (
        <View style={styles.container}>
            <View style={styles.line}></View>
        </View>
        )
}


export default Index


const styles = StyleSheet.create({
    container : {
        display : 'flex',
        width : '100%',
        alignItems : 'center',
        marginTop : 20,
        marginBottom : 20
    },
    line : {
        borderTopWidth : 1,
        borderTopColor : '#ECECEC',
        width : '90%'
    }
  });