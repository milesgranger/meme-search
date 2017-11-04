import React from 'react';
import {Avatar} from 'react-native-elements';
import {View, Keyboard} from 'react-native';


export default class Meme extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            allowPress: !!props.navigation  // If navigation is undefined, should not allow press to view larger meme
        };

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(){
        /*
        *   Only allowed to execute if this.state.allowPress
        *   disallowed if this component is being displayed as a result of 'navigate'
        * */
        const {navigate} = this.props.navigation;
        Keyboard.dismiss();

        // Navigate to a larger version of this image.
        navigate('MemeScreen', {
            source: this.props.source  // TODO: modify the source to point to higher-resolution meme, not icon
        })
    }

    render(){

        return (
            <View style={{padding: '1%', flex: 1 }}>
                <Avatar
                    onPress={this.state.allowPress ? this.handlePress : () => console.log('not allowing press')}
                    {...this.props}
                />
            </View>
        )
    }

}