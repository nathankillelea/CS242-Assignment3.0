import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, AppRegistry } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';

/**
 * The Following class creates and renders the following page. The following screen consists of a list of people you are
 * following. Each list item (user you follow) has their avatar and username displayed.
 */
export default class Following extends React.Component {
  static navigationOptions = {
    title: 'Following',
    header: null,
  };

  /**
   * The constructor is called before the component is mounted. It initializes state.
   */
  constructor() {
    super();
    this.state = {
      isLoading: true,
      following: []
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
   * /users/:username/following endpoint and the response data is kept in following.
   */
  componentDidMount() {
    axios.get('https://api.github.com/users/nathankillelea/following')
        .then((response) => {
          this.setState({
            following: response.data,
            isLoading: false
          });
          console.log(this.state.following);
        })
  }

  /**
   * This function renders the Following screen.
   * @returns {*} A loading indicator if it is loading or the following list when loading is finished.
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
            data={this.state.following}
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

AppRegistry.registerComponent('Following', () => Following);