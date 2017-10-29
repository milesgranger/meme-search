import React from 'react';
import { SearchBar } from 'react-native-elements';

export default class Search extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SearchBar round style={this.props.style} placeholder='Search for Memes...' />
        );
    }
}