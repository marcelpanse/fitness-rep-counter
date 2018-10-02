import React, {Component} from 'react'

import {Header, Left, Button, Icon, Body, Title} from 'native-base'

export default class AppHeader extends Component {
  render() {
    return <Header androidStatusBarColor="#50514F" style={{backgroundColor: '#247BA0'}}>
      <Left>
        <Button transparent onPress={() => this.props.openDrawer()}>
          <Icon name='menu'/>
        </Button>
      </Left>
      <Body>
        <Title>Fitness Rep Counter</Title>
      </Body>
    </Header>
  }
}

module.exports = AppHeader