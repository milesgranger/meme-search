import React from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';

import Search from './search-bar';

export default class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentSearch: ''};
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        /*
        * Handle initial communication with server
        */
        axios.get('http://192.168.100.9:5555')
            .then((response) => console.log(response.data))
            .catch((err) => console.log('Error contactiing server: ' + err.toString()))
    }

    handleSearchChange(search) {
        console.log(search);
        axios.get('http://192.168.100.9:5555', {params: {'search-term': search}})
            .then((response) => console.log(response.data))
            .catch((err) => console.log('Error receiving from server: ' + err.toString()));
        this.setState({currentSearch: search})
    }

    render() {
        return (
            <View>
                <Text style={this.props.style}>{this.props.titleText + '  ' + this.state.currentSearch} </Text>
                <Search onSearchChange={this.handleSearchChange} style={this.props.style}/>
            </View>
        );
    }
}


MainMenu.defaultProps = {
    titleText: 'Default Main Menus'
};

// TODO: Add PropTypes;
