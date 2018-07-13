import React from 'react';
import {Text,TouchableOpacity, StyleSheet} from 'react-native';

const SoftButton = ({onPress, buttonText}) => {

    const { buttonStyle, textStyle } = styles;

    return(
        <TouchableOpacity 
            onPress={onPress}
            style={buttonStyle}>
            <Text style={textStyle}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export { SoftButton };

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        marginLeft: 7,
        marginRight: 7
    },
    textStyle: {
        alignSelf: 'center',
        color: '#7f7f7f',
        fontSize: 17,
        padding: 14
    }
})