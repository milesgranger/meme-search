import React from 'react';
import { SearchBar } from 'react-native-elements';
import {View} from 'react-native';

export default class Search extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <SearchBar onChangeText={this.props.handleSearchChange} round placeholder='Search for Memes...' />
            </View>
        );
    }
}