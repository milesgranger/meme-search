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
                <SearchBar
                    clearIcon
                    round
                    onChangeText={this.props.handleSearchChange}
                    placeholder='Search for Memes...'
                    {...this.props}
                />
            </View>
        );
    }
}