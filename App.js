import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Feather } from '@expo/vector-icons';

import Profile from './source/components/Profile.js';
import Repositories from './source/components/Repositories.js';
import Following from './source/components/Following.js';
import Followers from './source/components/Followers.js';

/**
 * Creates a tab bar navigator for easy navigation between screens.
 */
export const Tabs = TabNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (<Feather name="user" size={35} color={tintColor} />)
    }
  },
  Repositories: {
    screen: Repositories,
    navigationOptions: {
      tabBarLabel: 'Repositories',
      tabBarIcon: ({ tintColor }) => (<Feather name="list" size={35} color={tintColor} />)
    }
  },
  Following: {
    screen: Following,
    navigationOptions: {
      tabBarLabel: 'Following',
      tabBarIcon: ({ tintColor }) => (<Feather name="user-check" size={35} color={tintColor} />)
    }
  },
  Followers: {
    screen: Followers,
    navigationOptions: {
      tabBarLabel: 'Followers',
      tabBarIcon: ({ tintColor }) => (<Feather name="users" size={35} color={tintColor} />)
    }
  }
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom'
});

/**
 * Creates a stack navigator with the tab navigator as the only screen to allow for navigation from the profile page
 * to every other page.
 */
export const Navigation = StackNavigator({
  Tabs: { screen: Tabs },
}, {
  headerMode: 'screen'
});

/**
 * The App class renders the navigation/screens for the app.
 */
export default class App extends React.Component {
  render() {
    return (
      <Navigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

AppRegistry.registerComponent('App', () => App);