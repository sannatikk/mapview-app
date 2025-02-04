// NOTE: The above contains extra complications because of how iOS re-renders map markers.
// iOS does not immediately re-render markers when their properties change, so the map always lags one long press behind.
// This is why there is a separate 'marker' state for the current marker and a 'markers' state for all markers.
// For Android, you can simply update the marker properties and the marker will re-render immediately.
// Code for Android is commented out below the iOS code.

// IOS & ANDROID COMPATIBLE CODE:
import { useState } from "react"
import { StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps"

export default function Map(props) {
    const [marker, setMarker] = useState(null) // current marker, extra state for iOS
    const [markers, setMarkers] = useState([])
    const [markerCount, setMarkerCount] = useState(0)  // counter for unique titles

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate;
        const newMarker = {
            id: markerCount,  // unique id for each marker
            coordinate: coords,
            title: `Marker ${markerCount + 1}`,  // title based on the marker count
        };

        setMarker(coords);  // show the current marker, for iOS
        setMarkers(prevMarkers => [...prevMarkers, newMarker])
        setMarkerCount(prevCount => prevCount + 1);  // increment the count for next title
    }

    return (
        <MapView
            style={styles.map}
            region={props.location}
            mapType={props.mapType}
            onLongPress={showMarker}
        >
            {markers.map((marker) => (
                <Marker
                    key={marker.id}  // use the unique 'id' as the key
                    coordinate={marker.coordinate}
                    title={marker.title}  // set the title from the marker object
                />
            ))}
            {marker && (
                <Marker
                    coordinate={marker}
                    title="Newest Marker"  // temporary title for the last marker, for iOS
                />
            )}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%',
    }
});



// // ANDROID ONLY COMPATIBLE CODE:
// import React from "react"
// import { StyleSheet } from "react-native"
// import MapView, { Marker } from "react-native-maps"
// import { useState } from "react"

// export default function Map (props) {

//     // array instead of single variable
//     const [markers, setMarkers] = useState([])

//     const addMarker = (e) => {
//         const coords = e.nativeEvent.coordinate
//         // append array instead of replacing single variable
//         setMarkers((prevMarkers) => [...prevMarkers, coords])
//     }

//     return(

//         <MapView
//             style={styles.map}
//             region={props.location}
//             mapType = {props.mapType}
//             onLongPress={addMarker}
//             >
//             {markers.map((marker, index) => (
//                 <Marker 
//                     key={index} 
//                     title={`Marker ${index+1}`} 
//                     coordinate={marker} 
//                     />
//             ))}
//         </MapView>
//     )

// }

// const styles = StyleSheet.create({
//     map: {
//       width: '100%',
//       height: '100%'
//     }