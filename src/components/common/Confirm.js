import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SoftButton } from './SoftButton';
import { YesButton } from './YesButton';
import { CardSectionWithoutBorder } from './Index';
import Modal from 'react-native-modal';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
    
    const { containerStyle, textStyle, cardSectionStyle, viewStyle, secondCardSectionStyle} = styles;

    return(
        <View style={{flex: 1}}>
            <Modal  //react-native-modal github
                isVisible={visible}
                style={{flex: 1, margin: 0}}
                // animationType="slide"
                // onRequestClose={() => {}}
            >
                <View style={containerStyle}>
                    <CardSectionWithoutBorder style={cardSectionStyle}>
                        <Text style={textStyle}>{children}</Text>
                    </CardSectionWithoutBorder>

                    <CardSectionWithoutBorder style={secondCardSectionStyle}>
                        <YesButton
                            onPress={onAccept}
                            buttonText='Yes'
                        />
                        <SoftButton
                            onPress={onDecline}
                            buttonText='No'
                        />
                    </CardSectionWithoutBorder>
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    cardSectionStyle: {
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 0.5
    },
    secondCardSectionStyle: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    textStyle: {
        flex: 1,
        color: '#007aff',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 40,
        paddingTop: 12,
        paddingBottom: 12,
        fontWeight: '100'
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        paddingLeft: 30,
        paddingRight: 30,
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
})

export { Confirm };