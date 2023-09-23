import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const backgroundDesigns = ["circle", "cobweb", "square", "tadpole", "random", "custom", "fountain", "color"]
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
            box: [],
            route: 'signin',
            isSignedIn: false
        }
    }

    calculateFaceLocation = (data) => {
        const regions = data.outputs[0].data.regions;
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
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({ isSignedIn: false })
        }
        else {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route })
    }
    render() {
        return (
            <div>
                <div className="App">
                    {/* <ParticlesBg type={backgroundDesigns[(Math.floor(Math.random() * backgroundDesigns.length))]} bg={true} /> */}
                    <ParticlesBg type='cobweb' bg={true} />

                    <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
                    {this.state.route === 'home'
                        ? <div>
                            <Logo />
                            <Rank />
                            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                            <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
                        </div>
                        : (
                            this.state.route === 'signin'
                                ? <SignIn onRouteChange={this.onRouteChange} />
                                : <Register onRouteChange={this.onRouteChange} />
                        )
                    }
                </div>
            </div>
        )
    }
}
export default App;