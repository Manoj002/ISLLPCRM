import React from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CustomersList from './components/CustomersList';
import CustomerDetail from './components/CustomerDetail';
import MapScreen from './components/MapScreen';
import DirectionScreen from './components/DirectionScreen';


const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene 
                        key="login"
                        component={LoginForm} 
                        title="Integrity CRM"
                    />
                </Scene>

                <Scene key="main">
                    <Scene
                        onRight={() => Actions.auth()}
                        rightTitle="Log Out"
                        key="customersList"
                        component={CustomersList} 
                        title="Customers" 
                        initial 
                    />
                    <Scene
                        key="customerDetail"
                        component={CustomerDetail} 
                        title="Customer Detail" 
                    />
                    <Scene 
                        key="mapScreen"
                        component={MapScreen}
                        title="Location"
                    />
                    <Scene 
                        key="directionScreen"
                        component={DirectionScreen}
                        title="Direction"
                    />
                </Scene>
            </Scene>
        </Router>
    )
}

export default RouterComponent;
// A router is a top level component and must be provided with only one child component
// root scene is root of all other scenes