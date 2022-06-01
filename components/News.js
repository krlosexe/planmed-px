import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator, } from "react-native";
import { Icon } from 'react-native-eva-icons';
//import styles from '../Styles';
import { showLocation } from 'react-native-map-link'
import { getSedes } from '../components/processItemShop'
import Sedes from './sedes.js'
import Toast from 'react-native-simple-toast';
import { primaryColor, colorLight } from '../Colors'
import { base_url, postsServer, server1 } from '../Env'
import axios from 'axios'

function Index(props) {
  const { navigation } = props.props;
  const [Sedesdata, setSedesdata] = useState(0)
  const [Load, setLoad] = useState(true) //cargando?


  const [posts, setPosts] = React.useState([])
  const [shareId, setShareId] = React.useState(0) //_________________
  const [newPost, setNewPost] = React.useState({})
  const [displayOptions, setDisplayOptions] = React.useState(false)
  const [shareItem, setShareItem] = React.useState(false) //_______________



  function goToScreen(screen,data)
  {   
     navigation.navigate(screen, {randomCode : Math.random(),data})
  }


  
  let randomCode
  if (props.props.route.params) { randomCode = props.props.route.params.randomCode }
  else { randomCode = 1 }

//   useEffect(() => {
//     Get()
//   }, [randomCode])



  React.useEffect(() => {
    setLoad(true)
    console.log(base_url(postsServer, `api/news/get/posts/16`))
    axios.get(base_url(postsServer, `api/news/get/posts/16`)).then((response) => {
      setPosts(response.data)
      setLoad(false)
    }).then(() => {
      //. . . 
    }).catch((e) => {
      console.log(e)
    })
  }, [randomCode])



//   async function Get() {
//     const response = await getSedes()
//     setSedesdata(response)
//     setLoad(false)
//   }

function confirLoader() {
   try {
  return (<>



<View style={styles.wrapper}>
      <View style={styles.wrap}>
        <View style={styles.pharmacy_slide_head}>
          <Text style={styles.pharmacy_slide_tittle}>¡Lo más reciente!</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
          {
            Load == true &&
            <Loading color={primaryColor} />
          }
          {
            Load == false && posts !== [] &&
       
            <ScrollView horizontal={true} style={styles.scroll_view_pharmacy_slide}>
              {
              posts.map((item) => <TouchableOpacity style={styles.pharmacy_slide_card} onPress={() => goToScreen("PostsDetailScreen")}>
                                    <Text style={styles.pharmacy_slide_card_tittle}>{item.post.substring(0,70)}...</Text>
                                    <View style={{width:140, height:140, overflow:"hidden", backgroundColor:primaryColor}}>
                                      <Image
                                          source={{ uri: base_url(postsServer, item.file) }}
                                          style={styles.image_card}
                                      /> 
                                    </View>
                                
                                </TouchableOpacity>  )
              }
                </ScrollView>
         
          }

        </View>
      </View>
    </View>

             
 
        </>
      )
    }
    catch (e) {

        console.log(e, "ERROR")
        Toast.show("Verifique su conexion a internet")
    
    }
  }

    return (
      <View>




       



        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
          {
            Load == true &&
            <ActivityIndicator style={styles.loading} size="large" color="#f27072" />
          }
          {
          Load == false && Sedesdata !==[] &&
            confirLoader()
          }




        </View>










      </View>
    )
  }
  const styles = StyleSheet.create({
    wrapper: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      top:45
    },
  
    wrap: {
      borderRadius: 20,
      borderTopColor: "white",
      borderLeftColor: "white",
      borderRightColor: "rgba(255,255,255,0.5)",
      borderBottomColor: "rgba(255,255,255,0.5)",
      borderWidth: 1,
      width: "90%",
      backgroundColor: "rgba(255,255,255,0.5)"
    },
  
  
    scroll_view_pharmacy_slide: {},
    pharmacy_slide_head: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
    },
  
  
    pharmacy_slide_tittle: {
      fontWeight: "bold",
      fontSize: 16,
      color: primaryColor,
      backgroundColor:colorLight,
      borderRadius:10, padding:1, paddingHorizontal:20
    },
  
  
    pharmacy_slide_view_all: {
      // color: "#444",
      // fontSize: 16,
      // fontWeight: "bold"
    },
    loading: {
      // marginTop: 50,
    },


    pharmacy_slide_card: {
      backgroundColor: colorLight,
      width: 180,
      marginRight: 7,
      marginLeft: 7,
      marginBottom: 5,
      padding: 20,
      borderRadius: 12,
      shadowOffset: { width: 0, height: 3},
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    pharmacy_slide_card_tittle: {
      fontWeight: "bold",
      fontSize: 16,
      color: "#313450"
    },
    pharmacy_slide_card_text: {
      fontSize: 12,
      width: "90%",
      color: "#898A8F",
    },
    image_card: {
      width: 180,
      height: 180,
      resizeMode: "contain",
      alignSelf: "center"
    },


  });
  export default Index;