import React, { useRef, useEffect } from 'react';
import { Image, StyleSheet, StatusBar, ImageBackground, Animated, Text, View } from 'react-native';
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 2000, }).start();
  }, [fadeAnim])

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>{props.children}</Animated.View>
  );
}
export default () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ImageBackground source={require('../src/images/BGSplash.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
        <FadeInView>
          <Image style={{ width: 200, height: 200, resizeMode: "contain", }} source={require('../src/images/LogoPlanmedVerde.png')} />
        </FadeInView>
        </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 40
  }
});