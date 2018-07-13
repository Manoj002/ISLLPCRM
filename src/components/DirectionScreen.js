import React, { Component } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Card, Divider } from 'react-native-elements';
import axios from 'axios';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDluHCjVWQX6wW134babqAHRdYRG-84Dz0'
const ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const URL_2 = '&key=AIzaSyDV8ZIEZa7xq8WH_QzoyQcB-W3HN16io94';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

export default class DirectionScreen extends React.Component {

  state={
    mapRegion: {
      latitude: 19.20,
      longitude: 72.9,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },
    error: '',
    custlat: 21,
    custlng: 78,
    distance:'',
    hrs: '',
    min: ''
  }

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

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  _renderMapViewDirections = async () =>  {
    try {

      let obj = await axios.get(`${ROOT_URL}${this.props.record.Address}${URL_2}`)
      
      this.setState({
        custlat: obj.data.results[0].geometry.location.lat,
        custlng: obj.data.results[0].geometry.location.lng
      })
    }
    catch(e) {}
  }
  
  render() {

    const {
        Latitude,
        Logitude,
        Address
    } = this.props.record;

    return (
      <View style ={{flex: 1}}>

        <MapView
          style={{ flex: 1}}
          mapType='standard'
          loadingEnabled
          loadingBackgroundColor='#FFFFFF'
          loadingIndicatorColor='#007aff'
          region={ this.state.mapRegion }
          provider={'google'}
          showsBuildings
          showsCompass
          showsUserLocation
          showsMyLocationButton
          zoomControlEnabled
          zoomEnabled
          rotateEnabled
          toolbarEnabled
          >
            <Marker
                title="Customer"
                description="Customer's location"
                coordinate={
                    {
                    latitude: parseFloat(this.state.custlat),
                    longitude: parseFloat(this.state.custlng)
                }
            }
            />

          <MapViewDirections
            mode='driving'
            //resetOnChange={true}
            //waypoints={(this.state.markers[0].coordinate.length > 2) ? this.state.markers.coordinate.slice(1, -1): null}
            origin={{latitude: parseFloat(this.state.mapRegion.latitude), longitude: parseFloat(this.state.mapRegion.longitude)}}
            destination={{latitude: parseFloat(this.state.custlat), longitude: parseFloat(this.state.custlng)}}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={14}
            strokeColor='#005d61'
            onReady={(result) => {
              this.setState({ distance: parseInt(result.distance)})
              this.setState({ hrs: parseInt((result.duration)/60)})
              this.setState({ min: parseInt((result.duration)%60)})
            }}
          />
          
        </MapView>

        <View
          style={{position:"absolute", left: 0, right: 0, flexDirection: 'row', bottom: 0, padding: 0}}
        >
          <Card 
            containerStyle={{flex: 1, margin: 0, padding: 0}}
          >

            <View style={{flexDirection: 'row', flex: 1, paddingTop: 10, paddingBottom: 10}}>
            
              <Text style={{ marginLeft: 10, fontSize: 30, fontWeight: '400', marginBottom: 5 }}>
                {this.state.hrs}
              </Text>

              <Text
                style={{paddingTop: 18}}
              > hrs </Text>

              <Text
                style={{ marginLeft: 10, fontSize: 30, fontWeight: '400', marginBottom: 5 }}
              >
                {this.state.min}
              </Text>

              <Text style={{paddingTop: 18}}> min</Text>

              <Text
                style={{ marginLeft: 10, fontSize: 30, fontWeight: '400', marginBottom: 5 }}
              >({this.state.distance})</Text>

              <Text style={{paddingTop: 18}}> km</Text>

            </View>

            <Divider style={{ backgroundColor: '#b2b2b2' }} />

            {/* <View style={{flexDirection: 'row', flex: 1, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-around'}}>

              <View
                style={{flex: 1, marginLeft: 10}}
              >

                <Text
                  style={{fontSize: 18, fontWeight: '300', color: '#007aff'}}
                  onPress={this.showNewMap}
                >
                  Search More
                </Text>

              </View>

              <Button
                title="Show Traffic"
                buttonStyle={{borderRadius:5, backgroundColor:"#007aff", flex: 2}}
                textStyle={{color:"#FFFFFF"}}
                onPress={() => this.setState({ traffic: !this.state.traffic })}
              />

            </View> */}

          </Card>

        </View>
        
      </View>
    );
  }
}