import React, { Component } from 'react';
import './App.css'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';

const backgroundDesigns = ["color", "ball", "lines", "thick", "circle", "cobweb", "polygon", "square", "tadpole", "fountain", "random", "custom"]
class App extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <ParticlesBg type={backgroundDesigns[(Math.floor(Math.random() * backgroundDesigns.length))]} bg={true} />
                    <Navigation />
                    <Logo />
                    <Rank />
                    <ImageLinkForm />
                </div>
            </div>
        )
    }
}
export default App;