import React from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';

export default class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        /*
        * Handle initial communication with server
        */
        axios.get('http://localhost:5555')
            .then((response) => console.log(response.data))
            .catch((err) => console.log('Error contactiing server: ' + err.toString()))
    }

    render() {
        return (
            <Text style={this.props.style}>{this.props.titleText}</Text>
        );
    }
}


MainMenu.defaultProps = {
    titleText: 'Default Main Menus'
};

// TODO: Add PropTypes;
