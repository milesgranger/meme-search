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
        /*
        *   Key is inside of state.imageTags, remove it.
        *   Occurs when user taps an element containing a previously entered tag
        * */
        let tags = this.state.imageTags;
        tags.splice(tags.indexOf(key), 1);
        this.setState({imageTags: tags});
    }

    render(){
        return (
            <View style={{flex: 1, alignItems: 'center', marginTop: '15%'}}>
                {
                    // Show Selected image if available, otherwise button to select an image
                    this.state.selectedImageUri ?
                        <View>
                            <Avatar
                                xlarge
                                source={{uri: this.state.selectedImageUri}}
                                onLongPress={() => this.setState({selectedImageUri: null, selectedImageData: null, imageTags: []})}
                            />
                            <Text>Press & hold to cancel...</Text>
                        </View>
                        :
                        <Button containerViewStyle={{flex: 1}} title='Select a Photo' onPress={this.handleImageSelection}/>
                }
                <View style={{flex: 2}}>
                    {this.state.imageTags.length ? <Text>Tap to remove a tag</Text> : null}
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        // Show meme tags as tappable components, if tapped, remove from displayed tags
                        this.state.imageTags ?
                            this.state.imageTags.map((tag, i) => {
                                return(
                                        <Badge containerStyle={{marginBottom: '1%', backgroundColor: 'white'}} key={i} onPress={() => this.handleTagRemoval(tag)}>
                                            <Text>"{tag}"</Text>
                                        </Badge>
                                    )
                            })
                            :
                            null
                    }
                    </View>

                    {
                        // Show form to add tags and upload only if image has been selected
                        this.state.selectedImageUri ?
                            <View style={{flex: 4}}>
                                <FormLabel>Meme Tags</FormLabel>
                                <Button
                                    title={ this.state.imageTags.length > 2 ? 'Upload to Meme-Search!' : 'Add more tags before uploading...'}
                                    disabled={this.state.imageTags.length < 3}
                                    buttonStyle={{backgroundColor: 'green'}}
                                    rounded
                                    onPress={() => console.log('Uploading to server!')}
                                />
                                <FormInput
                                    inputStyle={{ backgroundColor: 'white'}}
                                    value={this.state.tagInputValue}
                                    placeholder='Enter tags separated by commas'
                                    onChangeText={this.handleTagInputChange}
                                />
                            </View>
                            :
                            null
                    }


                </View>
            </View>
        )
    }
}