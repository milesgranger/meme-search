import React from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';

import Meme from './meme';
import Search from './search-bar';

export default class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSearch: '',
            searchResults: [],  // [{'name': string, 'location': url}]
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        /*
        * Handle initial communication with meme_search_server
        */
        axios.get('http://192.168.100.9:5556')
            .then((response) => console.log(response.data))
            .catch((err) => console.log('Error contacting meme_search_server: ' + err.toString()))
    }

    handleSearchChange(search) {
        console.log(search);
        axios.get('http://192.168.100.9:5556/api-v1/', {params: {'search-term': search}})
            .then((response) => {
                console.log(response.data);
                this.setState({searchResults: response.data});
            })
            .catch((err) => console.log('Error receiving from meme_search_server: ' + err.toString()));
        this.setState({currentSearch: search});
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.5, paddingTop: '8%'}}>
                    <Text>{!this.state.currentSearch ? '' : 'Searching for: ' + this.state.currentSearch} </Text>
                    <Search handleSearchChange={this.handleSearchChange}/>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    {
                        this.state.searchResults.map((result, i) => {
                            return (
                                <Meme
                                    key={i}
                                    xlarge
                                    onPress={() => console.log('Meme working!!')}
                                    activeOpacity={0.7}
                                    source={{uri: result.location}}
                                />
                            )
                        })
                    }
                </View>
            </View>
        );
    }
}


MainMenu.defaultProps = {
    titleText: 'Default Main Menus'
};

// TODO: Add PropTypes;
