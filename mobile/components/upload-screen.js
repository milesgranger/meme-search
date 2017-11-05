import React from 'react';
import {
    View,
    Text
} from 'react-native';

import { Button, Avatar, FormLabel, FormInput, Badge } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';


export default class UploadScreen extends React.Component {

    static navigationOptions = {
        title: 'Upload a Meme'
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedImageUri: null,
            selectedImageData: null,
            imageTags: []  // list of strings
        };

        this.handleImageSelection = this.handleImageSelection.bind(this);
        this.handleTagInputChange = this.handleTagInputChange.bind(this);
        this.handleTagRemoval = this.handleTagRemoval.bind(this);
    }

    handleImageSelection(){
        /*
        *   Select an image from camera to upload
        * */
        let options = {
            title: 'Select Meme'
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response from image selection: ' + response);

            if (response.didCancel) {
                console.log('User canncelled image selection');
            }
            else if (response.error) {
                console.log('Error selecting image: ' + response.error);
            }
            else {
                console.log('Selected this image: ' + response.uri);
                this.setState({
                    selectedImageData: response.data,
                    selectedImageUri: response.uri,
                    tagInputValue: '' // Current input in the tag section
                })
            }
        })
    }

    handleTagInputChange(value) {
        console.log('tag input: ' + value);
        if (value.includes(',')) {
            let tags = this.state.imageTags;
            value.split(',').map((value) => {
                if (value){
                    tags.push(value);
                }
            });
            this.setState({imageTags: tags, tagInputValue: ''});
        }
        else {
            this.setState({tagInputValue: value});
        }
    }

    handleTagRemoval(key){
        console.log('Handling tag removal using key: ' + key);
        this.setState({imageTags: this.state.imageTags.splice(this.state.imageTags.indexOf(key), 1)});
    }

    render(){
        return (
            <View style={{flex: 1, alignItems: 'center', marginTop: '15%'}}>
                {
                    this.state.selectedImageUri ?
                        <View>
                            <Avatar
                                xlarge
                                source={{uri: this.state.selectedImageUri}}
                                onLongPress={() => this.setState({selectedImageUri: null, selectedImageData: null})}
                            />
                            <Text>Press and hold image to cancel...</Text>
                        </View>
                        :
                        <Button containerViewStyle={{flex: 1}} title='Select a Photo' onPress={this.handleImageSelection}/>
                }
                <View style={{flex: 2}}>
                    {
                        this.state.imageTags ?
                            this.state.imageTags.map((tag, i) => {
                                return(
                                        <Badge key={i} onPress={() => this.handleTagRemoval(tag)}>
                                            <Text>{tag}</Text>
                                        </Badge>
                                    )

                            })
                            :
                            null
                    }
                    <FormLabel>Meme Tags</FormLabel>
                    <FormInput value={this.state.tagInputValue} placeholder='Enter tags separated by commas' onChangeText={this.handleTagInputChange} />
                </View>
            </View>
        )
    }
}