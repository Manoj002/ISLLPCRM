import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';
import MapView from 'react-native-maps';   //if{MapView} then error check CustomerDetail render method
import { 
    Confirm,
    CardSectionWithoutBorder 
} from './common/Index';
import { connect } from 'react-redux';
import { 
    selectCustomer,
    selectModal
} from '../actions/CustomerAction';
import {
    loginAgent
} from '../actions/Index'; 
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class CustomerDetail extends React.Component {

    componentDidMount() {
        if(Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        } 
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }
    
    componentWillMount() {
        if(this.props.record.Latitude == '' || this.props.record.Logitude == '') {
            this.props.record.Latitude = 0.0;//Using Address Instead Of Longitude And Latitude With react-native-maps #1666
            this.props.record.Logitude = 0.0;// Replace by react-native-geocoder
        }
    }

    getMap(record) {
        Actions.mapScreen({record});
    }

    getDirection(record) {
        Actions.directionScreen({record});
    }

    onDecline = () => {
        this.props.selectModal(this.props.showModal)
    }

    onAccept = async () => {
        const {
            ServiceScheduleID,
            ServiceID,
            CustomerID,
            AgentID
        } = this.props.record;
        
        let currentTime = new Date();
        let month = currentTime.getMonth() + 1;
        let day = currentTime.getDate();
        let year = currentTime.getFullYear();
        let status = day + "/" + month + "/" + year;
        try {
        let obj = await axios.post(`http://api.integritysoftwares.com//api/ServiceDone?ServiceSecheduleID=${ServiceScheduleID}&ServiceID=${ServiceID}&CustomerID=${CustomerID}&ServiceGivenDate=${status}&Status=2&Remark=Done`)
        } catch(e) {console.log(e)}
        this.props.selectModal(this.props.showModal)
        this.props.loginAgent(AgentID)
    }

    renderDescription() {
        const { record, expanded } = this.props;

        if(expanded) {
            return (
                <View>

                    <CardSectionWithoutBorder 
                        style={{ borderBottomWidth:0.5, flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >

                        <View 
                            style={styles.expandedContainerStyle}
                        >

                            <Text 
                                style={styles.addressStyle}
                            >
                                {record.Address}
                            </Text>

                            <Text 
                                style={styles.addressStyle}
                            >
                                {record.ServiceDate}
                            </Text>

                        </View>

                    </CardSectionWithoutBorder>

                    <Confirm 
                        visible={this.props.showModal}
                        onAccept={this.onAccept}
                        onDecline={this.onDecline}
                    >
                        Service Completed ?
                    </Confirm>

                </View>
            )
        }
    }

    render() {
        const { 
            CustomerName,
            Address,
            Latitude,
            Logitude,
            CustomerID,
            ServiceDate
        } = this.props.record;

        const {
            mainContainerStyle, 
            textContainerStyle, 
            textHeaderStyle,
            imageContainerStyle,
            imageStyle,
            rowStyle,
            icontextStyle
        } = styles;  {/*destructuring objects*/}

        return(
            <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => this.props.selectCustomer(`${CustomerID}`)}
            >

                <View>

                    <CardSectionWithoutBorder 
                        style={{borderBottomWidth:0.5, flex: 1, flexDirection: 'row'}}
                    > 

                        <View 
                            style={styles.rowStyle}
                        >

                            <Text 
                                style={styles.textHeaderStyle}
                            >
                                {`${CustomerName}`}
                            </Text>

                            {/* <ListButton 
                                //https://github.com/FaridSafi/react-native-gifted-chat
                                buttonText=' Chat '
                            /> */}
                        </View>

                        <View 
                            style={styles.imageContainerStyle}
                        >

                            <TouchableOpacity
                                onPress={() => this.getMap(this.props.record)}
                            >

                                <View 
                                    style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}
                                >

                                    <Image
                                        style={styles.imageStyle} 
                                        source={require('./loc2.png')}
                                    />

                                    <Text 
                                        style={styles.icontextStyle}
                                    >
                                        Location
                                    </Text>
                                    
                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.getDirection(this.props.record)}
                            >

                                <View 
                                    style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}
                                >

                                    <Image 
                                        style={styles.imageStyle}
                                        source={require('./dir1.png')}
                                    />

                                    <Text 
                                        style={styles.icontextStyle}
                                    >
                                        Direction 
                                    </Text>
                                    
                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.selectModal(this.props.showModal)}
                            >

                                <View 
                                    style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}
                                >

                                    <Image 
                                        style={styles.imageStyle}
                                        source={require('./status2.png')}
                                    />

                                    <Text 
                                        style={styles.icontextStyle}
                                    >
                                        Status 
                                    </Text>

                                </View>

                            </TouchableOpacity>

                        </View>

                    </CardSectionWithoutBorder>
                    {this.renderDescription()}

                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    mainContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    textContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    textHeaderStyle: {
        flex: 2,
        fontStyle: 'normal',
        color: '#007aff',
        fontSize: 17,
        fontWeight: '200',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },

    rowStyle: {
        flex: 2,
    },

    addressStyle: {
        color: '#007aff',
        fontSize: 16,
        paddingLeft: 22,
        paddingRight: 8,
        paddingBottom: 10
    },

    imageContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    imageStyle: {
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        marginLeft: 5,
        height: 30,
        width: 30,
        alignContent: 'center'
    },

    expandedContainerStyle: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },

    icontextStyle: {
        fontWeight: '100',
        fontStyle: 'normal',
        fontSize: 8,
        color: '#007aff',
        alignContent: 'center'
    },

})

const mapStateToProps = ({ customer }, ownProps) => {
    const { CustomerID, showModal } = customer;

    const expanded = customer.CustomerID == ownProps.record.CustomerID;

    return { expanded, showModal };
}

export default connect(mapStateToProps, { 
    selectCustomer,
    selectModal,
    loginAgent
})(CustomerDetail);