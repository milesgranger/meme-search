import React from 'react';
import {Avatar} from 'react-native-elements';
import {View} from 'react-native';


export default class Meme extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            allowPress: true
        };

        this.handlePress = this.handlePress.bind(this);
    }

    componentDidMount(){
        if (!this.props.navigation){
            this.setState({allowPress: false})
        }
    }

    handlePress(){
        const {navigate} = this.props.navigation;

        navigate('MemeScreen', {
            source: this.props.source
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