import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {primaryColor} from '../../Colors'



function Index(props){



    function getBackgroundColor(value){

        const letter = value[0].toUpperCase()
        const ascii = letter.charCodeAt(letter)
    
        if(ascii >= 90)
            return '#F0B7B3'
    
        if(ascii >= 80)
            return '#88D18A'
        
        if(ascii >= 70)
            return '#FF8C42'
        
        if(ascii >= 50)
            return '#FFF275'        
    }


   return <View style={styles.content}>
            <View style={{width : 50,height : 50, justifyContent : 'center', backgroundColor : getBackgroundColor(props.name), alignItems : 'center', borderRadius : 30}}>
            <Text style={{fontWeight : 'bold'}}>{props.name[0].toUpperCase()}</Text>
            </View>
                <View> 
                    <Text style={styles.bigTitle}>{props.name}</Text>
                </View>
            </View>
}


export default Index


const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 20
    },
    label : {
        color : 'white',
        fontSize : 9,
        marginVertical : 10,
        marginHorizontal : 10,
        position : 'absolute',
        left : 50,
        top : 50,
        backgroundColor : '#62D248',
        padding : 5,
        borderRadius : 20,
        zIndex : 2
    },
    content : {
      width:"100%",
        display : "flex",
        alignItems : 'center',
        flexDirection : "row",
        
    },
    bigTitle : {
        fontSize : 18,
        color : '#313450',
        marginLeft : 15,
        fontWeight : 'bold'
    },
    miniTitle : {
        fontSize : 14,
        color : '#898A8F',
        marginLeft : 15
    },
    miniTitleSuccess : {
        fontSize : 14,
        color : primaryColor,
        marginLeft : 15
    }
    
  });