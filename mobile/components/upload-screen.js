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
            selectedImageName: null,
            imageTags: ["tag1", "tag2", "tag3"]  // list of strings
        };

        this.handleImageSelection = this.handleImageSelection.bind(this);
        this.handleTagInputChange = this.handleTagInputChange.bind(this);
        this.handleTagRemoval = this.handleTagRemoval.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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
                console.log('Selected this image: ' + response.uri + ' this fileName: ' + response.fileName);
                this.setState({
                    selectedImageData: response.data,
                    selectedImageUri: response.uri,
                    selectedImageName: response.fileName,
                    tagInputValue: '', // Current input in the tag section
                    uploadProgressPctComplete: 0
                })
            }
        })
    }

    handleTagInputChange(value) {
        /*
        *   Handle the user input changes in the tag input section.
        * */
        console.log('tag input: ' + value);

        // Before adding, check that it is a value and this value.toLowerCase() is not in the tags already
        if (value.includes(',')) {
            let tags = this.state.imageTags;
            value.split(',').map((value) => {
                if (value && !tags.includes(value.toLowerCase())){
                    tags.push(value.toLowerCase());
                }
            });
            this.setState({imageTags: tags, tagInputValue: ''});
        }

        // Otherwise, set the input value as whatever the user is typing
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

    inferImageType = (filename) => {
        let fileEnding = filename.split('.').pop();
        switch (fileEnding.toLowerCase().trim()) {
            case 'jpg':
                return 'image/jpg';
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'bmp':
                return 'image/bmp';
            default:
                return 'image/jpeg';
        }
    };

    handleUpload(){
        console.log('Starting upload with file: ' + this.state.selectedImageUri);

        const xhr = new XMLHttpRequest();

        // Update user progress
        xhr.upload.addEventListener("progress", (evt) => {
            if (evt.lengthComputable) {
                let percentComplete = parseInt((evt.loaded / evt.total) * 100);
                console.log('Percent uploaded: ' + percentComplete);
                this.setState({uploadProgressPctComplete: percentComplete});
            }
        });

        // Define uploading endpoint & image to send
        xhr.open('POST', 'http://192.168.100.9:5556/api-v1/?tags=' + this.state.imageTags, true);
        let postData = new FormData();
        postData.append('meme', {
            uri: this.state.selectedImageUri,
            type: this.inferImageType(this.state.selectedImageName),
            name: this.state.selectedImageName
        });

        // Define what to do on success or failure
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 204) {
                    console.log('Successfully uploaded entire image!');
                }
                else if (xhr.status === 415) {
                    console.log('Expected either a JPG or PNG type image');
                }
                else if (xhr.status === 400) {
                    console.log('This error indicates the postData is not in compliance.');
                }
                else {
                    console.log('Error in processing upload, response from server was: ' + xhr.status)
                }
            }
        };

        // Launch uploading!
        xhr.send(postData);
    }

    render(){

        return (

            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#e6e8ed'}}>

                {
                    // Uploading status
                    this.state.uploadProgressPctComplete ?
                        <Text style={{color: 'green', paddingTop: '5%'}}>
                            {'Uploading: ' + this.state.uploadProgressPctComplete + '% complete...'}
                        </Text>
                        :
                        null
                }

                <View style={{marginTop: '10%'}}>
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
                        <Button containerViewStyle={{flex: 1}} rounded buttonStyle={{backgroundColor: '#528ff2'}} title='Select a Photo' onPress={this.handleImageSelection}/>
                }
                </View>

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
                                    buttonStyle={{backgroundColor: '#528ff2'}}
                                    rounded
                                    containerViewStyle={{marginBottom: '5%'}}
                                    onPress={this.handleUpload}
                                />
                                <FormInput
                                    inputStyle={{ backgroundColor: 'white', borderRadius: 15}}
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