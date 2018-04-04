/*
 Sources:
 https://stackoverflow.com/questions/33553112/react-native-asyncstorage-fetches-data-after-rendering
 https://stackoverflow.com/questions/29447715/react-native-fixed-footer
*/

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, AppRegistry } from 'react-native';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';

/**
 * The Profile class creates and renders a profile page. The profile screen consists of an avatar, name, username,
 * following count, followers count, repository count, and the date the account was created.
 */
export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    header: null,
  };

  /**
   * The constructor is called before the component is mounted. It initializes state.
   */
  constructor() {
    super();
    this.state = {
      isLoading: true,
      profileImage: '',
      name: '',
      username: '',
      bio: '',
      website: '',
      email: '',
      publicReposCount: '',
      followersCount: '',
      followingCount: '',
      createDate: ''
    }
  }

  /**
   * This function is invoked once the component is mounted. A GET request is made to the github API at the
   * /users/:username endpoint and the response is parsed into state variables.
   */
  componentDidMount() {
    axios.get('https://api.github.com/users/nathankillelea')
      .then((response) => {
        this.setState({
          profileImage: response.data.avatar_url,
          name: response.data.name,
          username: response.data.login,
          bio: response.data.bio,
          website: response.data.blog,
          email: response.data.email,
          publicReposCount: response.data.public_repos,
          followersCount: response.data.followers,
          followingCount: response.data.following,
          createDate: response.data.created_at,
          isLoading: false
        });
        console.log(response.data);
      });
  }

  /**
   * This function renders the Profile screen.
   * @returns {*} A loading indicator if it is loading or the profile when loading is finished.
   */
  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            xlarge
            rounded
            source={{uri: this.state.profileImage}}
          />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{this.state.name}</Text>
        <Text style={styles.standardText}>{this.state.username}</Text>
        <View style={styles.followContainer}>
          <TouchableOpacity style={{ marginRight: 15 }} onPress={()=> {navigate('Following')}}>
            <Text>
              <Text style={styles.numberText}>{this.state.followingCount}</Text>
              <Text style={styles.standardText}> Following</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={()=> {navigate('Followers')}}>
            <Text>
              <Text style={styles.numberText}>{this.state.followersCount}</Text>
              <Text style={styles.standardText}> Followers</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={()=> {navigate('Repositories')}}>
          <Text>
            <Text style={styles.numberText}>{this.state.publicReposCount}</Text>
            <Text style={styles.standardText}> Repositories</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.standardText}>Account created on {Moment(this.state.createDate).format('LLLL')}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: 80,
  },
  standardText: {
    color: '#898989',
  },
  numberText: {
    fontWeight: 'bold',
  },
  followContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  }
});

AppRegistry.registerComponent('Profile', () => Profile);