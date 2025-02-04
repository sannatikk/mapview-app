import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'
import { useState, useEffect } from "react";

export default function Map (props) {

    // array instead of single variable
    const [markers, setMarkers] = useState([])

    const addMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        // append array instead of replacing single variable
        setMarkers((prevMarkers) => [...prevMarkers, coords])
    }

    // useEffect(() => {
    //     console.log(markers)
    // }, [markers])

    return(
        <MapView
            style={styles.map}
            region={props.location}
            mapType = {props.mapType}
            onLongPress={addMarker}
            >
            {markers.map((marker, index) => (
                <Marker 
                    key={index} 
                    title={`Marker ${index+1}`} 
                    coordinate={marker} 
                    />
            ))}
        </MapView>
    )

}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '100%'
    }
  })