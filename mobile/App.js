import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './components/home';

export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <MainMenu style={styles.intro}/>
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
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});
