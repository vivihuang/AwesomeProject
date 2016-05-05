/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json'

import React, { Component } from 'react'
import { AppRegistry, Image, StyleSheet, Text, View, ListView } from 'react-native'

class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    }
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true
        })
      })
      .done()
  }

  render() {
    if (!this.state.loaded) {
      return renderLoadingView()
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={renderMovie}
        style={styles.listView}
      />
    )
  }
}

const renderLoadingView = () => (
  <View style={styles.container}>
    <Text>
      Loading movies..
    </Text>
  </View>
)

const renderMovie = (movie) => (
   <View style={styles.container}>
     <Image
       source={{uri: movie.posters.thumbnail}}
       style={styles.thumbnail}
     />
     <View style={styles.rightContainer}>
       <Text style={styles.title}>{movie.title}</Text>
       <Text style={styles.year}>{movie.year}</Text>
     </View>
   </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
