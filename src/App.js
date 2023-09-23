import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css'


const backgroundDesigns = ["circle", "cobweb", "square", "tadpole", "random", "custom", "ball", "thick", "lines", "polygon", "fountain", "color"]
const PAT = 'a9b4ebcc1ec54675a183c5b8e951c2eb';
const USER_ID = 'joshi-prakash';
const APP_ID = 'facerecognitionbrain';
const MODEL_ID = 'face-detection';
const returnClarifyAPIRequestOptions = (imageUrl) => {
    // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105'; //  this is optional
    const IMAGE_URL = imageUrl;
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
            box: []
        }
    }

    calculateFaceLocation = (data) => {
        const regions = data.outputs[0].data.regions;
        // console.log('sasd: ', clarifaiFace);
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);


        let box_arr = regions.map(region => {
            const clarifaiFace = region.region_info.bounding_box;
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height)
            }

        })
        return box_arr;
    }

    displayFaceBox = (box) => {
        this.setState({ box: box });
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
        this.setState({ imgUrl: this.state.input });
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifyAPIRequestOptions(this.state.input))
            .then(response => response.json())
            .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
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
                    <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
                </div>
            </div>
        )
    }
}
export default App;