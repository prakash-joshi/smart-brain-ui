import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css'


const backgroundDesigns = ["color", "ball", "lines", "thick", "circle", "cobweb", "polygon", "square", "tadpole", "fountain", "random", "custom"]
const PAT = 'a9b4ebcc1ec54675a183c5b8e951c2eb';
const USER_ID = 'joshi-prakash';
const APP_ID = 'facerecognitionbrain';
const MODEL_ID = 'face-detection';
const returnClarifyAPIRequestOptions = (imageUrl) => {
    // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105'; //  this is optional
    const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg"; //imageUrl;
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgUrl: '',
        }
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
        this.setState({ imgUrl: this.state.input });
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifyAPIRequestOptions(this.state.input))
            .then(response => response.json())
            .then(result => {
                console.log('deep data : ', result.outputs[0].data.regions[0].region_info.bounding_box);
            })
            .catch(error => console.log('error', error));

    }
    render() {
        return (
            <div>
                <div className="App">
                    <ParticlesBg type={backgroundDesigns[(Math.floor(Math.random() * backgroundDesigns.length))]} bg={true} />
                    <Navigation />
                    <Logo />
                    <Rank />
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                    <FaceRecognition imgUrl={this.state.imgUrl} />
                </div>
            </div>
        )
    }
}
export default App;