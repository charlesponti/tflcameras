import React, { Component } from 'react';

import './App.css';
import CamerasService from './utils/tfl-cameras';
import { addCamerasToMap } from './utils/google-cameras';

class App extends Component {

  async componentDidMount() {
    const service = new CamerasService()
    const { cameras } = await service.get()
    addCamerasToMap(cameras)
  }

  render() {
    return (
      <div id="map-canvas" style={{ height: '100vh', width: '100%'}}></div>
    );
  }
}

export default App;
