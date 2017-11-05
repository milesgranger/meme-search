import React from 'react';
import {View, Dimensions, CameraRoll, Platform, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob';
import Share from 'react-native-share';

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
        this.saveToCameraRollAndShare = this.saveToCameraRollAndShare.bind(this);
        this.shareMeme = this.shareMeme.bind(this);
    };

    handleShareButton(){
        /*
        *   Download this meme to CameraRoll and share
        * */
        console.log('Downloading image from: ' + this.props.navigation.state.params.source.uri);
        this.saveToCameraRollAndShare(this.props.navigation.state.params.source.uri);
    }

    shareMeme(path) {
        /*
        *   Share the meme.
        *   path: location of the downloaded Meme on camera roll
        * */
        RNFetchBlob.fs.readFile(path, 'base64')
            .then((data) => {
                let shareOptions = {
                    title: 'Meme-Search',
                    message: 'Sent via Meme-Search',
                    url: `data:image/jpg;base64,${data}`,
                    subject: ''
                };
                Share.open(shareOptions)
                    .then((res) => console.log('res: ' + res))
                    .catch(err => console.log('err: ' + err))
            })
            .catch(err => console.log('Error reading saved meme: ' + err + '-- Located at path: ' + path))
    }

    saveToCameraRollAndShare(image_url){
        /*
        *   Handle downloading a remote image to camera roll
        *   image_url: Absolute http url to an image
        * */
        RNFetchBlob
            .config({
                fileCache: true,
                appendExt: 'jpg'
            })
            .fetch('GET', image_url)
            .then((res) => {
                console.log('Got image: ' + res);
                CameraRoll.saveToCameraRoll(res.path(), 'photo')
                    .then((save_result) => {
                        console.log('Save result: ' + save_result.toString() + ' -- Path: ' + res.path());
                        this.shareMeme(res.path());
                    })
                    .catch(err => console.log('Error saving file: ', err))
            })
            .catch(err => console.log('Err downloading remote image: ' + err.toString()))
    }

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