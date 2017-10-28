import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Home from './components/home';


export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Home/>
                <Text>Welcome to Meme-Search!</Text>
                <Text>Type some key words to search.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
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
