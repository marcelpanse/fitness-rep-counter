import React from 'react'
import {Drawer, Container, Content, Footer, FooterTab, Icon, Text, Button} from 'native-base'
import Sidebar from './Sidebar'
import AppHeader from './AppHeader'
import HomeScreen from './HomeScreen'
import StatsScreen from './StatsScreen'
import {AsyncStorage} from 'react-native'

const KEY = '@RepStore:v1'

export default class Main extends React.Component {
  state = {
    tab: 'track',
    store: {
      pullups: [],
      pushups: [],
      squads: [],
    }
  }

  componentDidMount = () => {
    this.loadData()
  }

  storeData = (store) => {
    AsyncStorage.setItem(KEY, JSON.stringify(store))
  }

  loadData = async () => {
    try {
      const fromStorage = await AsyncStorage.getItem(KEY)
      if (fromStorage) {
        console.log('loading data from storage', fromStorage)
        this.setState({store: JSON.parse(fromStorage)})
      }
    } catch (e) {
      console.warn('error loading store', e)
    }
  }

  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => {
    this.drawer._root.open()
  }

  plus = (category) => {
    const store = this.state.store
    store[category].push({ts: Date.now(), action: 'plus'})
    this.setState({store})
    this.storeData(store)
  }

  addExercise = (exercise) => {
    const store = this.state.store
    store[exercise] = []
    this.setState({store})
    this.storeData(store)
  }

  deleteExercise = (exercise) => {
    const store = this.state.store
    delete store[exercise]
    this.setState({store})
    this.storeData(store)
  }

  renderTab = () => {
    if (this.state.tab === 'stats') {
      return <StatsScreen store={this.state.store} />
    } else {
      return <HomeScreen store={this.state.store} plus={this.plus} addExercise={this.addExercise} deleteExercise={this.deleteExercise}/>
    }
  }

  render() {
    return <Drawer ref={(ref) => this.drawer = ref} content={<Sidebar/>} onClose={() => this.closeDrawer()}>
      <AppHeader
        openDrawer={this.openDrawer.bind(this)}
      />

      <Container>
        <Content padder>
          {this.renderTab()}
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: '#247BA0'}}>
            <Button vertical onPress={() => this.setState({tab: 'track'})}>
              <Icon name="book"/>
              <Text>Track</Text>
            </Button>
            <Button vertical onPress={() => this.setState({tab: 'stats'})}>
              <Icon name="stats"/>
              <Text>Stats</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </Drawer>
  }
}