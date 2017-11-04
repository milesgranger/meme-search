import React from 'react';
import {Avatar} from 'react-native-elements';
import {View} from 'react-native';


export default class Meme extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <View style={{padding: '1%', flex: 1 }}>
                <Avatar
                    {...this.props}
                />
            </View>
        )
    }

}