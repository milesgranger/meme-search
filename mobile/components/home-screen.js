import React from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import Meme from './meme';
import Search from './search-bar';


export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Meme-Search.io - Tell a friend :)'
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
        //let {navigate} = this.props.navigation;
        //navigate('UploadScreen');
    }

    handleSearchChange(search) {
        /*
        *   Handle contacting server to search for memes based on current entry
        * */
        console.log(search);
        axios.get('http://192.168.100.9:5556/api-v1/', {params: {'query': search}})
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

                {/* View containing the search and button for uploading a meme */}
                <View style={{flex: 0.5, paddingTop: '8%'}}>

                    {/* Display message if current search doesn't yield any results */}
                    <Text>
                        {
                            this.state.currentSearch && !this.state.searchResults.length ?
                                'No results for: ' + this.state.currentSearch
                                :
                                ''
                        }
                    </Text>

                    {/* Search bar - Hide button for uploading if user has typed anything in search bar */}
                    <Search handleSearchChange={this.handleSearchChange}/>
                    {
                        this.state.currentSearch ?
                            null
                            :
                            <Button
                                rounded
                                buttonStyle={{backgroundColor: '#528ff2'}}
                                containerViewStyle={{marginTop: '1%'}}
                                title='Upload a Meme'
                                onPress={() => navigate('UploadScreen')}
                            />
                    }
                </View>

                {/* view containing resulting memes based on search */}
                <View style={{flex: 2, flexDirection: 'row', flexWrap: 'wrap'}}>
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
