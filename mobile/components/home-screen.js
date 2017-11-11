import React from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-elements';

import Meme from './meme';
import Search from './search-bar';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'MemeSearch - Home'
    };

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
            .catch((err) => console.log('Error contacting meme_search_server: ' + err.toString()));

        // TODO: Remove this after done making upload screen
        let {navigate} = this.props.navigation;
        navigate('UploadScreen');
    }

    handleSearchChange(search) {
        /*
        *   Handle contacting server to search for memes based on current entry
        * */
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

        let {navigate} = this.props.navigation;

        return (
            <View style={{flex: 1}}>

                <View style={{flex: 0.5, paddingTop: '8%'}}>
                    <Text>{!this.state.currentSearch ? '' : 'Searching for: ' + this.state.currentSearch} </Text>
                    <Search handleSearchChange={this.handleSearchChange}/>
                    <Button containerViewStyle={{marginTop: '1%'}} title='Upload a Meme' onPress={() => navigate('UploadScreen')}/>
                </View>

                <View style={{flex: 2, flexDirection: 'row'}}>
                    {
                        this.state.searchResults.map((result, i) => {
                            return (
                                <Meme
                                    key={i}
                                    xlarge
                                    activeOpacity={0.7}
                                    source={{uri: result.meme_url}}
                                    {...this.props}
                                />
                            )
                        })
                    }
                </View>
            </View>
        );
    }
}


HomeScreen.defaultProps = {
    titleText: 'Default Main Menus'
};

// TODO: Add PropTypes;
