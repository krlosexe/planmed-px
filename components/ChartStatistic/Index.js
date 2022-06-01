import React from 'react'
import { View, Dimensions } from 'react-native'
import {
    LineChart
  } from "react-native-chart-kit";
  import { primaryColor } from '../../Colors'

function Index(props){
    


    function hexToRgbA(hex){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
        }
        throw new Error('Bad Hex');
    }
    
    hexToRgbA('#fbafff')


    return(
  

<View>
    <LineChart
        data={props.data}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => hexToRgbA(primaryColor),
            strokeWidth: 2, // optional, default 3
            barPercentage: 0,
            decimalPlaces : 0
        }}
        bezier
        style={{
        marginVertical: 0,
        borderRadius: 0
        }}
    />
</View>
    )
}



export default Index