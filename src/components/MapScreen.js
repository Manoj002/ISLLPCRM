import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';


const ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

const QUERY_URL = 'http://api.integritysoftwares.com//api/Loaction?lat=';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

export default class MapScreen extends React.Component {

  state = {
    mapRegion: {
      latitude: 19.20,
      longitude: 72.9,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },
    error: '',
    custlat: 21,
    custlng: 78,
  };

  componentWillMount() {
    try {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
         mapRegion: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 500 },
    );}
    catch(e) {
      alert(`${e}`);
    }
  }

  componentDidMount() {
    this._renderMapViewDirections()
  }

  _renderMapViewDirections = async () =>  {

    let obj = await axios.get(`${ROOT_URL}${this.props.record.Address}${URL_2}`)
    
    this.setState({
      custlat: obj.data.results[0].geometry.location.lat,
      custlng: obj.data.results[0].geometry.location.lng
    })
    
    axios.post(`${QUERY_URL}${this.state.custlat}&Lag=${this.state.custlng}&CustomerID=${this.props.record.CustomerID}&LocationID=${this.props.record.LocationID}`);
    
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

   render() {

    const {
      CustomerID,
      LocationID
    } = this.props.record;

    return (
      <View style ={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          mapType="standard"
          loadingEnabled
          loadingIndicatorColor="#007aff"
          loadingBackgroundColor="#FFFFFF"
          showsCompass
          //provider={'google'}
          showsBuildings
          showsMyLocationButton
          showsUserLocation
          toolbarEnabled
          zoomControlEnabled
          zoomEnabled
          region={this.state.mapRegion}
          >
            <Marker
              title="Customer"
              description="Customer's location"
              coordinate={
                {
                  latitude: this.state.custlat,
                  longitude: this.state.custlng
                }
              }
            />
        </MapView>
      </View>
        
    );
  }
}
