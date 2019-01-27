import React from 'react'
import {Item, Input, Icon, H3, List, ListItem, Text, Button} from 'native-base'
import {View} from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

const TODAY = moment().startOf('day')

const getToday = (store, key) => {
  const category = store[key]
  if (category && category.length > 0) {
    return category.filter(c => moment(c.ts).isSame(TODAY, 'd')).length
  }
  return 0
}

export default class HomeScreen extends React.Component {
  pressed = false
  timeout = null
  state = {
    editMode: false,
    newExercise: ''
  }

  addExercise = () => {
    this.props.addExercise(this.state.newExercise)
    this.setState({editMode: false})
  }

  deleteExercise = (exercise) => {
    this.props.deleteExercise(exercise)
    this.setState({editMode: false})
  }

  onPressIn = (key) => {
    this.pressed = true
    this.handleHold(key, 100)
  }

  handleHold = (key, delay) => {
    this.timeout = setTimeout(() => {
      if (this.pressed) {
        this.props.plus(key)
        this.handleHold(key, Math.max(delay-10, 10))
      }
    }, delay)
  }

  onPressOut = (key) => {
    this.pressed = false
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  render() {
    const {store, plus} = this.props

    return <View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Button transparent onPress={() => this.setState({editMode: !this.state.editMode})}>
          <Icon name="create"/>
        </Button>

        <H3 style={{paddingRight: 18, flexGrow: 1, textAlign: 'right'}}>Reps for today</H3>
      </View>
      <List>
        {Object.keys(store).map(key => {
          return <ListItem key={key}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexGrow: 1, flex: 1, justifyContent: 'flex-start', flexDirection: 'row'}}>
                {this.state.editMode ? <Button style={{marginRight: 10}} transparent onPress={() => this.deleteExercise(key)}>
                    <Icon name="trash"/>
                  </Button> : null}
                <Text style={{textAlign: 'left'}}>{key}</Text>
              </View>
              <View><Text>{getToday(store, key)}</Text></View>
              <View style={{paddingLeft: 15}}>
                <Button primary bordered onPressIn={() => this.onPressIn(key)} onPressOut={() => this.onPressOut(key)} onPress={() => plus(key)}><Text>+</Text></Button>
              </View>
            </View>
          </ListItem>
        })}
      </List>
      {this.state.editMode ? <List>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
          <View style={{flexGrow: 1, flex: 1, justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 15}}>
            <Item><Input placeholder="new exercise" value={this.state.newExercise} onChangeText={(v) => this.setState({newExercise: v})}/></Item>
          </View>
          <View style={{paddingLeft: 15, paddingRight: 17}}>
            <Button primary onPress={this.addExercise}><Text>Add</Text></Button>
          </View>
        </View>
      </List> : null}
    </View>
  }
}

HomeScreen.propTypes = {
  store: PropTypes.shape().isRequired,
  plus: PropTypes.func.isRequired,
  addExercise: PropTypes.func.isRequired,
}