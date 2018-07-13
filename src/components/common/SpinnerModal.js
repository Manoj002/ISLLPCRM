import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import { SpinnerCard, Card, CardSectionWithoutBorder } from './Index';

const SpinnerModal = ({size}) => {
    return(
        <Modal
            onRequestClose={() => {}}
        >
            <View style={styles.containerStyle}>
                    <CardSectionWithoutBorder style={styles.cardSectionStyle}>
                        <ActivityIndicator
                            color='#007aff'
                            size={size || 'large'}
                        />
                    </CardSectionWithoutBorder>
            </View>
        </Modal>
    )
}

export { SpinnerModal };

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        paddingLeft: 140,
        paddingRight: 140,
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    cardSectionStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})