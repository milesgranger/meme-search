/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { StyleSheet, Dimensions, Text, View, Platform } from 'react-native';
import {StackNavigator} from 'react-navigation';

import HomeScreen from './components/home-screen';
import MemeScreen from './components/meme-screen';


const SCREEN_WIDTH = Dimensions.get('window').width;

const App = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    MemeScreen: {
        screen: MemeScreen,
    }

});

const styles = StyleSheet.create({
    intro: {
    },
    search: {

    },
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        justifyContent: 'center'
    },
});

export default App;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


