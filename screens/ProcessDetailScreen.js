import React from 'react'
import { View, StatusBar, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native'
import ProfileProcess from '../components/ProfileProcess/Index'
import Divider from '../components/Divider/Index'
import { colorBack } from '../Colors'
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { base_url, Api } from '../Env'
import Steps from '../components/Steps/Index'
import Head from '../components/Head';
import Menu from '../components/Menu';


function ProcessDetailScreen(props) {
  const { navigation } = props
  const { item } = props.route.params;
  const userDetails = React.useContext(UserContext)
  const [detail, setDetail] = React.useState([])

  let i = 0;




  React.useEffect(() => {
    let request = base_url(Api, `prp/processes/details/${item.id}/all`)
    console.log(request)
    axios.get(request).then((response) => {
      console.log(response.data)
      setDetail(response.data)
    }).then(() => {
      //. . . 
    }).catch((error) => {
      console.log(error)
      console.log(error.response)
    })
  }, [])






  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#ECE5DD",}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Head name_user={userDetails.nombres} />
      <ScrollView >
        <View style={styles.scroll}>
          <View style={styles.content}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" translucent={true} />
            <View style={{ paddingHorizontal: 20 }}>
              <ProfileProcess name={item.name} />
            </View>
            <Divider />
            <Steps stepList={detail} />
          </View>
        </View>
      </ScrollView>
      <Menu props={{ ...props }} />
    </SafeAreaView>)
}



export default ProcessDetailScreen

const styles = StyleSheet.create({

 

  scroll: {
    paddingTop: 20,
    alignItems: "center",
    alignContent: "center",

    // flex : 1,
    // flexDirection : 'column',
  },

  content: {
    padding: 10,
    width: "90%",
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'column',

  },




  gridIcons: {

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 30

  }
});

