import React, { Component } from 'react';
import { View, FlatList, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { PermissionsAndroid } from 'react-native';
import CustomerDetail from './CustomerDetail';

class CustomersLists extends React.PureComponent {  

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        alert('Turn Location services onn for better performance!');
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Integrity CRM',
              'message': 'Integrity CRM needs access to your location ' +
                         'for better experience.'
            }
          )
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            alert('Enable location services for better performance!')
            return 0;
        }
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
            BackHandler.exitApp();    
        })
    }

    render() {
        if(this.props.response === null) {
            return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No Customers available at the moment!</Text>
                </View>
            )
        }
        return(
            <View style={{flex: 1}}>
                <FlatList
                    style={{flex: 1}}
                    extraData={this.props.response}
                    keyExtractor={(x, i) => i.toString()}
                    data={this.props.response}
                    renderItem={({ item }) =>
                        <CustomerDetail 
                            key={item.CustomerID} 
                            record={item} 
                        />
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { response } = auth;

    return { response };
}

export default connect(mapStateToProps)(CustomersLists);