import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import CornerButton from '../elements/CornerButton'; 
import ProfilePicture from '../elements/ProfilePicture';
export default function TopHeader({ data, view }) {
    //data: {user: "", heading: ""}
    const user = data.user;
    const heading = data.heading;

    return (
        <View style={styles.wrapper}>
            <CornerButton />
            <ProfilePicture imageUrl='https://storage.googleapis.com/sticker-prod/3BtTZYTk8OZCQ9mA21oX/9.png' />
            <View style={styles.heading}>
                <Text style={styles.headingText}>{heading}</Text>
                <Text style={styles.spanText}>{user + "!"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    heading: {
        marginTop: 120,
        marginLeft: 22,
    },
    headingText: {
        fontFamily: 'Roboto',
        fontWeight: '800',
        fontSize: 32,
        color: '#081E3F'
    },
    spanText: {
        fontFamily: 'Roboto',
        fontSize: 32,
        position: 'relative',
        bottom: 10
    }
})
