import React from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'
import { useState, useEffect } from "react";

export default function Map (props) {

    const [marker, setMarker] = useState(null)

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        setMarker(coords)
    }

    return(
        <MapView
            style={styles.map}
            region={props.location}
            mapType = {props.mapType}
            onLongPress={showMarker}
            >
            {marker && 
                <Marker 
                title="Ding"
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                />
            }
        </MapView>
    )

}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '100%'
    }
  });
  