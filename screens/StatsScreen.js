import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'react-native-svg'
import {BarChart, XAxis} from 'react-native-svg-charts'
import moment from 'moment'
import {View, ScrollView} from 'react-native'
import * as scale from 'd3-scale'
import {H3} from 'native-base'

const getData = (category) => {
  const groupedPerDay = []
  for (let i = 7; i >= 0; i--) {
    groupedPerDay.push({day: moment().subtract(i, 'days').startOf('day').format('DD-MM'), total: 0})
  }

  for (const entry of category) {
    const day = moment(entry.ts).startOf('day').format('DD-MM')
    const existingItem = groupedPerDay.find(gpd => gpd.day === day)
    if (existingItem) {
      existingItem.total++
    }
  }
  return groupedPerDay
}

export default class StatsScreen extends React.Component {
  _scrollView = null

  render() {
    const {store} = this.props
    const Labels = ({x, y, bandwidth, data}) => {
      return data.map((value, index) => {
        const total = value
        return <Text
          key={index}
          x={x(index) + (bandwidth / 2)}
          y={y(total) + 20}
          fontSize={14}
          fill={'white'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {total}
        </Text>
      })
    }

    return <View>
      {Object.keys(store).map(key => {
        return <View key={key} style={{paddingTop: 20}}>
          <H3 style={{paddingLeft: 8}}>{key} ({store[key].length})</H3>
          <ScrollView ref={(view) => this._scrollView = view}
                      horizontal showsHorizontalScrollIndicator={true} style={{height: 230}}
                      onContentSizeChange={() => this._scrollView.scrollToEnd({animated: false})}>
            <View style={{flex: 1, flexDirection: 'column', width: 1000}}>
              <BarChart
                style={{height: 200}}
                svg={{fill: '#70C1B3'}}
                data={getData(store[key]).map(d => d.total)}
                contentInset={{top: 10, bottom: 10}}
              >
                <Labels/>
              </BarChart>
              <XAxis
                style={{marginTop: 10}}
                data={getData(store[key]).map(d => d.total)}
                scale={scale.scaleBand}
                formatLabel={(_, index) => getData(store[key])[index].day}
                labelStyle={{color: 'black'}}
              />
            </View>
          </ScrollView>
        </View>
      })}
    </View>
  }
}

StatsScreen.propTypes = {
  store: PropTypes.shape().isRequired,
}
