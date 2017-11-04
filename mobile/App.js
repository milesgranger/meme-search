import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MainMenu from './components/home';


const SCREEN_WIDTH = Dimensions.get('window').width;


export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <MainMenu />
            </View>
        );
    }
}

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
