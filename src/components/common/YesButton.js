import React from 'react';
import {Text,TouchableOpacity, StyleSheet} from 'react-native';

const YesButton = ({onPress, buttonText}) => {

    const { buttonStyle, textStyle } = styles;

    return(
        <TouchableOpacity 
            onPress={onPress}
            style={buttonStyle}>
            <Text style={textStyle}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export { YesButton };

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 5,
        backgroundColor: '#ff0000',
        marginLeft: 7,
        marginRight: 7
    },
    textStyle: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 17,
        padding: 14
    }
})