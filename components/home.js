import React from 'react';
import {Text} from 'react-native';
import axios from 'axios';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userInfo: 'No user data yet.'}
    }

    componentDidMount() {
        axios.get('https://api.github.com/users/milesgranger')
            .then(
                (response) => {
                    console.log(response.data);
                    this.setState({userInfo: response.data});
                })
    }

    render() {
        return (
            <Text>Welcome to the home screen! {this.state.userInfo.toString()}</Text>
        )
    }
}

