import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text,ImageBackground, TouchableOpacity } from 'react-native';
import Head from '../components/Head';
import OptionsHead from '../components/OptionsHead';
import Menu from '../components/Menu';
import InitProcess from '../components/InitProcess';
import Venues from '../components/Venues';
import News from '../components/News';
import UserContext from '../contexts/UserContext'
import { primaryColor, colorBack1, colorBack2 } from '../Colors.js'


function App(props) {
  const { navigation } = props
  function goToScreen(screen) { navigation.navigate(screen) }
  const userDetails = useContext(UserContext)


 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <StatusBar barStyle="light-content" backgroundColor="#075E54"/>
      <ImageBackground source={require('../src/images/background1.png')} style={{flex: 1,justifyContent: "flex-end", resizeMode: "cover",width: "100%",height: "100%"}}>
        <ScrollView style={{marginBottom:-70}}>
          <Head name_user={userDetails.nombres} />
{/* <TouchableOpacity onPress={()=> goToScreen("Splash")}><Text>GO</Text></TouchableOpacity> */}
          <OptionsHead props={props} />
          <InitProcess props={props} />
          <Venues props={{ ...props }} />
          <News props={{...props}} />
        </ScrollView>
        <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>
  )
}
export default App;