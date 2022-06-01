import React from 'react';
import { ActivityIndicator, View, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { primaryColor } from '../Colors';

function Loading( props) {
  return (
    <View
      style={{
      margin:10,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center", 
      }}>



<Image
          style={{
            width: 48,
            height: 48,
            resizeMode: "contain",
            //marginBottom: 40,
            // backgroundColor:"rgba(255,0,0,0.5)",
            top: 67, left: 3
          }}
          source={require('../src/images/IsologoPlanMedVerde.png')}
        />

      {/* <Icon
        name="activity-outline"
        width={40}
        height={40}
        fill={props.color}
        style={{
          position:"absolute", top: 13, left: -17 }}
      /> */}
      <ActivityIndicator
        style={{
          top: 3,
          left: 3
        }}
        size={80}
        color={props.color}
      />
    </View>
  )
}

export default Loading;