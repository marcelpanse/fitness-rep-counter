import React from 'react'
import {H3, List, ListItem, Text, Button} from 'native-base'
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

const HomeScreen = ({store, plus}) => {
  return <View>
    <H3 style={{paddingRight: 18, paddingTop: 10, paddingBottom: 8, width: '100%', textAlign: 'right'}}>Reps for today</H3>
    <List>
      {Object.keys(store).map(key => {
        return <ListItem key={key}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexGrow: 1, flex: 1, justifyContent: 'flex-start', flexDirection: 'row'}}>
              <Text style={{textAlign: 'left'}}>{key}</Text>
            </View>
            <View><Text>{getToday(store, key)}</Text></View>
            <View style={{paddingLeft: 15}}>
              <Button primary bordered onPress={() => plus(key)}><Text>+</Text></Button>
            </View>
          </View>
        </ListItem>
      })}
    </List>
  </View>
}

HomeScreen.propTypes = {
  store: PropTypes.shape().isRequired,
  plus: PropTypes.func.isRequired,
}

export default HomeScreen