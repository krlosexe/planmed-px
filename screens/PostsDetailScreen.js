import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  Clipboard,
  ToastAndroid,
  Platform,
  ImageBackground
} from 'react-native'
import Share from 'react-native-share';
import { BlurView } from "@react-native-community/blur";
import UserContext from '../contexts/UserContext'
import { primaryColor, colorBack2 } from '../Colors'
import PostsContext from '../contexts/PostsContext'
import { base_url, postsServer, server1 } from '../Env'
import axios from 'axios'
//import { Card } from 'react-native-shadow-cards';
import { Icon } from 'react-native-eva-icons';
import Menu from '../components/Menu'
import Head from '../components/Head';
import Loading from '../components/loading.js'
function PostsDetailScreen(props) {
  const userDetails = React.useContext(UserContext)
  const { navigation } = props
  const { navigate } = navigation
  const socket = React.useContext(PostsContext)
  const [posts, setPosts] = React.useState([])
  const [shareId, setShareId] = React.useState(0)
  const [newPost, setNewPost] = React.useState({})
  const [displayOptions, setDisplayOptions] = React.useState(false)
  const [shareItem, setShareItem] = React.useState(false)
  const [Load, setLoad] = useState(false);
  const [Load2, setLoad2] = useState(false);
  React.useEffect(() => {
    setLoad(true)
    console.log(base_url(postsServer, `api/get/posts/16`))
    axios.get(base_url(postsServer, `api/get/posts/16`)).then((response) => {
      setPosts(response.data)
      setLoad(false)
    }).then(() => {
      //. . . 
    }).catch((e) => {
      console.log(e)
    })
    setTimeout(() => {
      StatusBar.setHidden(true);
    }, 3000)
  }, [])
  useEffect(() => {
    setPosts([newPost, ...posts])
  }, [newPost])
  useEffect(() => {
    console.log("compartiendo....")
    if (shareId !== 0) {
      console.log('Downloading base64 image from : ')
      console.log(base_url(postsServer, `api/get/post/${shareId}`))
      axios.get(base_url(postsServer, `api/get/post/${shareId}`)).then((response) => {
        const icon = 'https://i.stack.imgur.com/68g6v.jpg'
        const options = Platform.select({
          ios: {
            activityItemSources: [
              { // For using custom icon instead of default text icon at share preview when sharing with message.
                placeholderItem: {
                  type: 'url',
                  content: icon
                },
                item: {
                  default: {
                    type: 'text',
                    content: `${response.data.post} ${response.data.base_64}`
                  },
                },
                linkMetadata: {
                  title: response.data.post,
                  icon: icon
                }
              },
            ],
          },
          default: {
            title: 'Share',
            message: response.data.post,
            url: response.data.base_64
          },
        });
        if(Platform.OS === "android"){
          Share.open(options).catch(err => console.log(err));
        }else{
          Share.open({
            title: 'Share',
            //message: response.data.post,
           // message: "TEST",
             url: response.data.base_64
          }).catch(err => console.log(err));

        }
        setDisplayOptions(false)
      }).then(() => {
        console.log('Compartido con exito', shareId)
        setSharedPost()
        setShareId(0)
        console.log(userDetails)
      }).catch((e) => {
        console.log(e)
        console.log('No compartido o cancelado por el usuario')
      })
    }
    setLoad2(false)
  }, [shareId])
  const openPostsOptions = (item) => {
    setShareItem(item)
    setDisplayOptions(true)
  }
  async function share(item) {
    setLoad2(true)
    console.log("share", item)
    if (item != false) {
      setShareItem(item)
      setShareId(item._id)
    }
  }
  useEffect(() => {
    console.log("set share Item")
  }, [shareItem]);



  const copyText = (props) => {
    Clipboard.setString(props.post)
    ToastAndroid.showWithGravity(
      "Texto copiado al porta papeles",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    setDisplayOptions(false)
  }



  const setSharedPost = async () => {
    console.log("aja")
    const query_share = `${server1}/set-shared-post`
    const data = {
      post_id: shareId,
      user_id: userDetails.id_client
    }
    console.log('Consultando datos de : ', query_share)
    console.log(data)
    let result
    try {
      result = await axios.post(query_share, data)
    } catch (error) {
      console.log(error)
    }
  }
  const PostOptions = () => {
    return (
      <View style={{ flex: 1, position: 'absolute', zIndex: 100, flexDirection: 'row', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <BlurView style={styles.blurView} reducedTransparencyFallbackColor="gray" blurType="light" blurAmount={10} />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => share()}>
          <Icon name={'share-outline'} width={20} height={20} fill='white' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => copyText()}>
          <Icon name={'copy-outline'} width={20} height={20} fill='white' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => setDisplayOptions(false)}>
          <Icon name={'close-circle-outline'} width={20} height={20} fill='white' />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ECE5DD" }}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <ImageBackground
        source={require('../src/images/background1.png')}
        style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}
      >
        {
          displayOptions && <PostOptions />
        }
        <Head name_user={"Informate!"} />
        {Load2 == true &&
          <View style={{ width: "100%", height: "100%", position: "absolute", zIndex: 99999999999, backgroundColor: "rgba(0,0,0,0.1)", justifyContent: "center", alignItems: "center" }}>
            <Loading color={primaryColor} />
          </View>
        }
        <ScrollView>
          <View style={{ alignContent: "center", alignItems: "center", }}>
            {Load &&
              <Loading color={primaryColor} />
            }
            {!Load &&
              posts.map((item, key) => {
                if (!item.extension) {
                  return (
                    <Card1 item={item} key={key} copyText={copyText} share={share} />
                  )
                }
                else {
                  return (
                    <Card2 item={item} key={key} copyText={copyText} share={share} />
                  )
                }
              })}
          </View>
        </ScrollView>
        <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>
  )
}
function Card1(props) {
  const [showMore, setShowMore] = useState(false);
  function Wrapper() {
    console.log(showMore ? "show" : "hidden");
    setShowMore(!showMore);
  }
  return (
    <View style={{ backgroundColor: "white", top: 20, marginBottom: 30, padding: 10, width: '90%', borderRadius: 20 }}>
      <View style={{ width: '100%', padding: 20 }}>
        <Text style={{ textAlign: "right", bottom: 10, fontSize: 11, right: 5 }}>{props.item.create_at}</Text>
        <Text style={{ height: showMore ? null : 45, padding: 5, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', }}>
          {props.item.post}</Text>
        <TouchableOpacity onPress={() => Wrapper()} style={{ alignSelf: "flex-end" }}><Text style={{ color: "#777", fontSize: 14 }}>{showMore ? "Ver menos..." : "Ver más..."}</Text></TouchableOpacity>
      </View>
      <View style={{ borderTopColor: "#c3c3c3", borderTopWidth: 0.5, paddingVertical: 5, flexDirection: 'row', justifyContent: "space-around", }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.share(props.item)}
        >
          <Icon style={styles.buttonIcon} name={'share-outline'} width={20} height={20} fill={primaryColor} />
          <Text style={styles.buttonText}>Compartir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.copyText(props.item)}>
          <Icon style={styles.buttonIcon} name={'copy-outline'} width={20} height={20} fill={primaryColor} />
          <Text style={styles.buttonText}>Copiar Texto</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
function Card2(props) {
  const [showMore, setShowMore] = useState(false);
  function Wrapper() {
    console.log(showMore ? "show" : "hidden");
    setShowMore(!showMore);
  }
  return (
    <View style={{ backgroundColor: "white", top: 20, marginBottom: 30, padding: 10, width: '90%', borderRadius: 20 }}>
      <View style={{ width: '100%', padding: 20, }}>
        <Text style={{ textAlign: "right", bottom: 10, fontSize: 11, right: 5, flexWrap: 'wrap' }}>
          {props.item.create_at}
        </Text>
        <Text style={{ height: showMore ? null : 45, padding: 5, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', }}>
          {props.item.post}
        </Text>
        <TouchableOpacity onPress={() => Wrapper()} style={{ alignSelf: "flex-end" }}><Text style={{ color: "#777", fontSize: 14 }}>{showMore ? "Ver menos..." : "Ver más..."}</Text></TouchableOpacity>
      </View>
      <Image resizeMode={'cover'} style={{ width: '100%', height: 350, }} source={{ uri: base_url(postsServer, props.item.file) }} />
      <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: "space-around", borderTopColor: "#c3c3c3", borderTopWidth: 0.5 }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.share(props.item)}>
          <Icon style={styles.buttonIcon} name={'share-outline'} width={20} height={20} fill={primaryColor} />
          <Text style={styles.buttonText}>Compartir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.copyText(props.item)}>
          <Icon style={styles.buttonIcon} name={'copy-outline'} width={20} height={20} fill={primaryColor} />
          <Text style={styles.buttonText}>Copiar Texto</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default PostsDetailScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white',
    paddingTop: 0
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
    width: 50,
    justifyContent: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -65,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  buttonContainer: {
    marginTop: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  post: {},
  buttonText: { color: primaryColor },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%'
  }
});