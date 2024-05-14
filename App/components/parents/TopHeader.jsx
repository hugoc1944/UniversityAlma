import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {React, useState} from 'react'

import CornerButton from '../elements/CornerButton'; 
import ProfilePicture from '../elements/ProfilePicture';
import PopUp from '../elements/PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function TopHeader({ data, onProfileClick, mentorOn, onPress }) {
    //data: {user: "", heading: ""}
    const user = data.user;
    const heading = data.heading;
    return (
        <>
            <View style={styles.wrapper}>
                {!mentorOn &&
                <TouchableOpacity style={styles.mentorIcon} onPress={onPress}>
                    <FontAwesomeIcon  size={42} icon={faCirclePlus} color={"#C2A5F7"} />
                </TouchableOpacity>
                }
                <CornerButton />
                <ProfilePicture onClick={onProfileClick}/>
                <View style={styles.heading} >
                    <Text style={styles.headingText}>{heading}</Text>
                    <Text style={styles.spanText}>{user + "!"}</Text>
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
    },
    mentorIcon: {
        position: 'absolute',
        top: 50,
        right: 85,
        top: 55,
    }
})
