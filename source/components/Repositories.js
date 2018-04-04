/*
 Sources:
 https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
*/

import React from 'react';
import { StyleSheet, Text, View, AppRegistry, FlatList, ActivityIndicator, Linking } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';

/**
 * The Repositories class creates and renders the repository page. The repository screen consists of a list of
 * repositories. Each list item (repository) has the name, creator, and description displayed. If a list item is
 * pressed, the repository is opened in a web browser outside of the app.
 */
export default class Repositories extends React.Component {
  static navigationOptions = {
    title: 'Repositories',
    header: null,
  };

  /**
   * The constructor is called before the component is mounted. It initializes state.
   */
  constructor() {
    super();
    this.state = {
      isLoading: true,
      repoData: []
    }
  }

  /**
   * This function is used by the FlatList component to render a separator between list items.
   * @returns {*} A line to separate items in a list.
   */
  renderSeparator = () => {
    return (
      <View style={{ height: 1, backgroundColor: '#CED0CE', width: '100%' }} />
    );
  };

  /**
   * This function is invoked once the component is mounted. A GET request is made to the github API at the
   * /users/:username/repos endpoint and the response data is kept in repoData.
   */
  componentDidMount() {
    axios.get('https://api.github.com/users/nathankillelea/repos')
      .then((response) => {
        this.setState({
          repoData: response.data,
          isLoading: false
        });
        console.log(this.state.repoData);
      })
  }

  /**
   * This function renders the Repositories screen.
   * @returns {*} A loading indicator if it is loading or the repository list when loading is finished.
   */
  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{backgroundColor: '#fff'}}>
        <List containerStyle={{ borderTopWidth: 0 }}>
          <FlatList
            style={{height: '100%'}}
            data={this.state.repoData}
            renderItem={({ item }) => (
              <ListItem
                containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                title={item.name}
                subtitle={item.owner.login + "\n" + item.description}
                subtitleNumberOfLines={2}
                onPress={() => { Linking.openURL(item.html_url) }}
              />
            )}
            keyExtractor={item => item.html_url}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('Repositories', () => Repositories);