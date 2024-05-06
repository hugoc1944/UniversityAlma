import { View, Text, StyleSheet } from 'react-native'
import {React, useState} from 'react'

import Slider from '@react-native-community/slider'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons/faVolumeXmark'
import {faVolumeHigh} from '@fortawesome/free-solid-svg-icons/faVolumeHigh'
export default function Volume() {
  const [range, setRange] = useState('50%');
  const [sliding, setSliding] = useState('Inactive');

    console.log(range);
    return (
    <View>
      <Slider
        style={{width: 250, height: 40}}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor='#9BB1FD'
        maximumTrackTintColor='rgba(8,30,63,0.1)'
        thumbTintColor='#9BB1FD'
        value={.5}
        onValueChange={value => setRange(parseInt(value))}
        onSlidingStart={() => setSliding('Sliding')}
        onSlidingComplete={() => setSliding('Inactive')}
      />
      <View style={styles.volumeIcon}>
        <FontAwesomeIcon icon={faVolumeXmark} size={21} color={range === 0 ? 'rgb(155,177,253)' : 'rgba(155,177,253,0.5)'}/>
        <FontAwesomeIcon icon={faVolumeHigh} size={21} color={range > 0 ? 'rgb(155,177,253)' : 'rgba(155,177,253,0.5)'}/>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
    volumeIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginTop: -5
    }

})