import React from 'react';
import {View, Dimensions, CameraRoll, Platform, Alert} from 'react-native';
import {Button} from 'react-native-elements';
//import RNFetchBlob from 'react-native-fetch-blob';

import Meme from './meme';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class MemeScreen extends React.Component {

    static navigationOptions = {
        title: 'Single Meme View'
    };

    constructor(props){
        super(props);
        this.state = {};
        this.handleShareButton = this.handleShareButton.bind(this);
        //this.saveToCameraRoll = this.saveToCameraRoll.bind(this);
    };

    handleShareButton(){
        /*
        *   Download this meme to CameraRoll and share
        * */
        console.log('downloading image from: ' + this.props.navigation.state.params.source.uri);

    }

    /*saveToCameraRoll(image_url){
        if (Platform.OS === 'android'){
            RNFetchBlob
                .config({
                    fileCache: true,
                    appendExt: 'jpg'
                })
                .fetch('GET', image_url)
                .then((res) => {
                    console.log(res);
                    CameraRoll.saveToCameraRoll(res.path(), 'jpg')
                        .then(Alert.alert('Success', 'Photo added to camera roll'))
                        .catch(err => console.log('Error saving file: ', err))
                })
        } else {
            CameraRoll.saveToCameraRoll(image_url)
                .then(Alert.alert('Success', 'Photo added to camera roll!'))
        }
    }*/

    render(){
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 4}}>
                    <Meme
                        width={SCREEN_WIDTH}
                        {...this.props.navigation.state.params}
                    />
                </View>
                <View style={{flex: 1, paddingTop: 5}}>
                    <Button
                        raised
                        onPress={this.handleShareButton}
                        title={'Share Meme'}
                    />
                </View>
            </View>
        )
    }
}