import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { primaryColor } from '../../Colors'
function Index(props){





    const NormalStep = ( item )=>{
        return (<View style={{
            flexDirection : 'row', 
            height : 85, 
            alignItems : 'center', 
            backgroundColor : 'white', 
            borderLeftColor : primaryColor,
            paddingLeft : 15, 
            borderLeftWidth: 1,
            }}> 
                <View style={{position : 'relative', right : 28, borderRadius : 35, backgroundColor : primaryColor, width : 25, height:25, justifyContent:'center', alignItems : 'center'}}>

                    <Icon name={'checkmark-circle-2-outline'} width={20} height={20} fill='white'/>
                </View>
                <View>
                    <Text style={{fontSize : 18}}>{item.item.event == "Cirugia" ? "Procedimiento" : item.item.event}</Text>
                    <Text>{item.item.date_event}</Text>
                </View>
        </View>)
    }

    


   return (
        <View style={styles.container}>

                {
                    props.stepList.map((item, key) => {
                        return ( <NormalStep item={item} /> )

                    })
                }
           
        </View>
   )
}


export default Index


const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 20
    } 
  });