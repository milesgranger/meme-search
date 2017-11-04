import React from 'react';
import {View} from 'react-native';

import Meme from './meme';


export default class MemeScreen extends React.Component {

    static navigationOptions = {
        title: 'Single Meme View'
    };

    constructor(props){
        super(props);
        this.state = {}
    };

    render(){

        console.log('MemeScreen rendering with this source: ' + this.props.source);

        return (
            <View style={{flex: 1}}>
                <Meme
                    xlarge
                    {...this.props.navigation.state.params}
                />
            </View>
        )
    }


}