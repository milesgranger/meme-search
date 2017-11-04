import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
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