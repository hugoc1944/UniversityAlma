import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {React, useState} from 'react'

import CornerButton from '../elements/CornerButton'; 
import ProfilePicture from '../elements/ProfilePicture';

export default function TopHeader({ data, onProfileClick, page }) {
    //data: {user: "", heading: ""}
    const user = data.user;
    const heading = data.heading;
    return (
        <>
            <View style={styles.wrapper}>
                <CornerButton currentScreen={page}/>
                <ProfilePicture onClick={onProfileClick}/>
                <View style={styles.heading} >
                    <Text style={styles.headingText}>{heading}</Text>
                    {user && (
                        <>
                            <Text style={styles.spanText}>{user + "!"}</Text>
                        </>
                    )}
                </View>
            </View>
        </>

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
        
        fontWeight: '800',
        fontSize: 32,
        color: '#081E3F'
    },
    spanText: {
        
        fontSize: 32,
        position: 'relative',
        bottom: 10
    },
    mentorIcon: {
        position: 'absolute',
        top: 50,
        right: 85,
        top: 55,
    }
})
