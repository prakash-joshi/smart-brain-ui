import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css'


class App extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <Navigation />
                </div>
            </div>
        )
    }
}
export default App;