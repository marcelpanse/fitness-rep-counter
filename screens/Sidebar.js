import React, {Component} from 'react'
import {TouchableOpacity, Linking, Image, Text, View} from 'react-native'

import {H3, Content} from 'native-base'
import { Constants } from 'expo'

export default class Sidebar extends Component {
  render() {
    return (
      <Content style={{backgroundColor: '#DDDDDD'}}>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', paddingTop: 25}}>
          <Image
            style={{height: 75, width: 75}}
            source={require('../assets/images/icon.png')}
          />

          <H3 style={{marginBottom: 5}}>Fitness Rep Counter</H3>
          <Text style={{marginBottom: 30}}>v{Constants.manifest.version}</Text>
          <Text style={{marginBottom: 30}}>By Marcel Panse</Text>

          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/marcelpanse/fitness-rep-counter')}>
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/images/github.png')}
            />
          </TouchableOpacity>
          <Text>Open source</Text>

        </View>
      </Content>
    )
  }
}

module.exports = Sidebar