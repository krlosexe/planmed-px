import React from 'react'
import { View, StatusBar, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text,ImageBackground, ActivityIndicator } from 'react-native'
import ProfileProcess from '../components/ProfileProcess/Index'
import { colorBack, primaryColor } from '../Colors'
import axios from 'axios'
import { base_url, Api } from '../Env'
import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu';
import Head from '../components/Head';
import Loading from '../components/loading.js'

function ProcessListScreen(props) {

  const { navigation } = props
  // const [ display, setDisplay ] = React.useState('self')
  const [display, setDisplay] = React.useState('all')
  const [processes, setProcesses] = React.useState([])
  const userDetails = React.useContext(UserContext)
  const [Load, setLoad] = React.useState(false)
  function goToScreen(screen, data) {
    console.log(data)
    navigation.navigate(screen, data)
  }

  React.useEffect(() => {

    // setLoad(true)

    let request = base_url(Api, `prp/processes/${userDetails.id}/${display}`)
    console.log(request)
    axios.get(request).then((res) => {
      //setLoad(false)
      setProcesses(res.data)
      console.log(res.data)
    }).then(() => {
      //. . . 
    }).catch((e) => {
      console.log(e)
      //setLoad(false)
    })

  }, [])

  function changeQueryParam(value) {
    setDisplay(value)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <StatusBar
        barStyle="dark-content" backgroundColor="white"
      //hidden={false}  translucent={true}
      />



      <Head
        name_user={userDetails.nombres}
      />

<ImageBackground source={require('../src/images/background1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>


        
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{
          flexDirection: 'column',
          width: "100%",
          marginTop: -40,
          paddingTop: 50,
          alignContent: "center",
          alignItems: "center",
          paddingVertical: (userDetails.type_user === 'Asesor') ? 70 : 10
        }} >

          {
            (userDetails.type_user === 'Asesor') && <View style={styles.buttonsTabsContainer}>
              <TouchableOpacity style={styles.buttonTab} onPress={() => changeQueryParam('self')}>
                <Text style={styles.buttonText}>Mios</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonTab} onPress={() => changeQueryParam('all')}>
                <Text style={styles.buttonText}>Todos</Text>
              </TouchableOpacity>
            </View>
          }


          {Load &&
            <View style={{ marginTop: 100 }}>
              <Loading color={primaryColor} />
            </View>
          }


          {
            !Load &&
            processes.map((item, key) => {
              return <TouchableOpacity
                style={{ backgroundColor: "white", marginBottom: 15, width: "90%", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10 }}
                onPress={
                  () => goToScreen('ProcessDetailScreen', { "item": { ...item } })
                }
                key={key}>
                <ProfileProcess name={item.name} />
              </TouchableOpacity>
            })
          }


          {
            processes.length <= 0 && !Load &&
            <View style={{top:200, borderColor: primaryColor, borderWidth: 1, width: "90%", height: 60, borderRadius: 20, borderStyle: 'dashed', }}>
              <Text style={{color:primaryColor, fontSize:20, lineHeight: 35, textAlign: "center", marginTop: 10 }}>No hay datos cargados</Text>
            </View>
          }



        </View>
      </ScrollView>
      <Menu props={{ ...props }} />

      </ImageBackground>
    </SafeAreaView>
  )
}



export default ProcessListScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 0,
    backgroundColor: colorBack
  },

  scroll: {
    flex: 1,
    flexDirection: 'column',
  },

  content: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  buttonsTabsContainer: {
    position: 'absolute',
    flexDirection: 'row'
  },
  buttonTab: {
    backgroundColor: primaryColor,
    height: 50,
    width: '50%',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }

});

