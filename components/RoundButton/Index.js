import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { primaryColor, colorLight } from '../../Colors'

function Index(props) {
  return (
    <View style={{ alignItems: "center", bottom: 15, height: 60, marginBottom: -10 }}>
      <TouchableOpacity style={styles.container} onPress={() => props.onPressHandler()}>
        <View style={styles.item}>
          <Icon name={props.icon} width={20} height={20} fill={primaryColor} />
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default Index
const styles = StyleSheet.create({
  item: {
    backgroundColor: colorLight,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

