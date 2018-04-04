import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, AppRegistry } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';

/**
 * The Followers class creates and renders the followers page. The followers screen consists of a list of people that
 * follow you. Each list item (follower) has their avatar and username displayed.
 */
export default class Followers extends React.Component {
  static navigationOptions = {
    title: 'Followers',
    header: null,
  };

  /**
   * The constructor is called before the component is mounted. It initializes state.
   */
  constructor() {
    super();
    this.state = {
      isLoading: true,
      followers: []
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
   * /users/:username/followers endpoint and the response data is kept in followers.
   */
  componentDidMount() {
    axios.get('https://api.github.com/users/nathankillelea/followers')
      .then((response) => {
        this.setState({
          followers: response.data,
          isLoading: false
        });
        console.log(this.state.followers);
      })
  }

  /**
   * This function renders the Followers screen.
   * @returns {*} A loading indicator if it is loading or the followers list when loading is finished.
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
            data={this.state.followers}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                title={item.login}
                avatar={{uri: item.avatar_url}}
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

AppRegistry.registerComponent('Followers', () => Followers);