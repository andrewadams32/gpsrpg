import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyle from '../assets/mapStyle.json'

import { distance_in_m } from '../helpers/helpers'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default MapComponent = React.memo(({pos, children, press}) => {

    const mapRef = useRef();

    const [region, setRegion] = useState({
        latitude: pos.lat,
        longitude: pos.lon,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })

    useEffect(()=>{
        setRegion({
            latitude: pos.lat,
            longitude: pos.lon,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA, 
        })
    },[pos])

    return (
        <MapView   
            ref={mapRef}
            onPress={(e)=>{press(e)}}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={region}
            moveOnMarkerPress={false}
            customMapStyle={MapStyle}
            showsCompass={false}
            showsBuildings={false}
            showsIndoors={false}
            showsIndoorLevelPicker={false}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            zoomTapEnabled={false}
            toolbarEnabled={false}
            loadingEnabled={false}
            zoomControlEnabled={false}
        >
            {children}
        </MapView>
    )
})

const styles = StyleSheet.create({
    map: {
      height: "100%",
      width: "100%"
    }
});