/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ImageBackground
} from 'react-native';

import Head from '../components/Head';
import BigIcon from '../components/BigIcon'
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import { primaryColor, colorBack } from '../Colors.js'


import PRPinfo from '../components/prpinfo'

function App(props) {

  const userDetails = useContext(UserContext)

  const { navigation } = props
  function goToScreen(screen) {
    navigation.navigate(screen)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>

      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />

      <ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>
      <ScrollView style={{marginBottom:-70}}>

        <Head name_user={userDetails.nombres} />

        <View style={styles.gridIcons}>
          <View style={{ flexDirection: "row" }}></View>
          
          <BigIcon label='Mis Referidos' icon='people-outline' onPress={() => goToScreen('ReferredListScreen')} />
          <BigIcon label='Posts' icon='archive-outline' onPress={() => goToScreen('PostsDetailScreen')} />
          {/*
            <BigIcon label='Estadisticas' icon='trending-up-outline' onPress={() => goToScreen('ChartsScreen')} />
            <BigIcon label='Saldo' icon='credit-card-outline' onPress={()=>goToScreen('PostsDetailScreen')}/>
            */}
        </View>


      </ScrollView>
      <PRPinfo />
      <Menu props={{ ...props }} />
     
      </ImageBackground>
     
     
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({

//   <View style={styles.huevo}>
//   <Text style={styles.texto}> con solo css</Text>
// </View>
//   huevo: {
//     left: 10,
//     top: -10,
//     width: 200,
//     height: 200,
//     backgroundColor: "white",
//     borderTopRightRadius: 140,
//     borderTopLeftRadius: 90,
//     borderBottomRightRadius: 60,
//     borderBottomLeftRadius: 140,
//     transform: [{ rotate: '0deg' }],
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 3,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   texto: {
//     top: 40,
//     left: 60,
//     transform: [{ rotate: '0deg' }],
// },













  scroll: {
    flex: 1,
    flexDirection: 'column',
  },

  content: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  gridIcons: {

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 30
  }
});


export default App;