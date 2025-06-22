import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, TextInput, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { warsaw, back, form } from '../warsawconstguide/styles';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';
import { launchImageLibrary } from 'react-native-image-picker';
import MapboxGL from '@rnmapbox/maps';
import { plus, resetImage, resetInput } from '../warsawimprtsguide/warsawicns';

const token = 'pk.eyJ1IjoidnBldHJ1c2hrYSIsImEiOiJjbWJ1Z25ncmkwOXUyMmxxdWpqendsdTlsIn0.HkqHV66FJEjhodXqvQqb-g';

const Warsawnewplace = ({ place }) => {
    const navigation = useNavigation();
    const [heading, setHeading] = useState(place ? place.heading : null); 
    const [description, setDescription] = useState(place ? place.description : null); 
    const [address, setAddress] = useState(place ? place.address : ''); 
    const [coordinates, setCoordinates] = useState(place ? place.coordinates : []); 
    const [image, setImage] = useState(place ? place.image : null); 

    const uploadPlaceimage = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                Alert.alert('Error', 'Try to pick image one more time or try again later...')
                console.error('ImagePicker Error:', response.errorMessage);
                return;
            }

            const uri = response.assets?.[0]?.uri;
            if (uri) setImage(uri);
        });
    };

    const handleMapPress = async (e) => {
        const coords = e.geometry.coordinates; // [longitude, latitude]
        setCoordinates(coords);
        setAddress('Loading address...');

        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${token}`);
            const data = await response.json();
            const placeName = data.features?.[0]?.place_name;

            if (placeName) {
                setAddress(placeName);
            } else {
                setAddress('Unknown location');
            }
        } catch (error) {
            Alert.alert('Geocoding error', 'Choose another place or try again later...')
            console.error('Geocoding error:', error);
            setAddress('Failed to fetch address');
        }
    };


    const addNewPlace = async () => {
        const newPlace = {
            id: place?.id || Date.now().toString(),
            heading,
            description,
            address,
            coordinates,
            image,
        };

        try {
            const stored = await AsyncStorage.getItem('WARSAW_ADDED_PLACES');
            const currentPlaces = stored ? JSON.parse(stored) : [];

            let updatedPlaces;

            if (place?.id) {
                updatedPlaces = currentPlaces.map(p =>
                    p.id === place.id ? newPlace : p
                );
            } else {
                updatedPlaces = [...currentPlaces, newPlace];
            }

            await AsyncStorage.setItem('WARSAW_ADDED_PLACES', JSON.stringify(updatedPlaces));
            navigation.navigate('Warsawsights');
        } catch (error) {
            Alert.alert('Hmmm', 'Failed to save place, try again later...')
            console.error('Failed to save place:', error);
        }
    };

    return (
        <View style={[warsaw.container, {paddingTop: 120}]}>

            <View style={back.header}>
                <Warsawrouteheader
                    title={place ? 'Edit the place' : 'New place'}
                    goback
                />
            </View>

            <ScrollView style={{ width: '100%', paddingHorizontal: 16, paddingTop: 30 }}>
                
                <Text style={form.label}>Name of place</Text>
                <View style={{width: '100%'}}>
                    {
                        heading && (
                            <TouchableOpacity
                                style={form.resetInputButton}
                                onPress={() => setHeading(null)}
                            >
                                <Image
                                    source={resetInput}
                                    style={form.resetImageIcon}
                                />
                            </TouchableOpacity>
                        )
                    }
                    <TextInput
                        style={form.input}
                        value={heading}
                        onChangeText={setHeading}
                        placeholder='Place name'
                        placeholderTextColor='#999999'
                    />
                </View>

                <Text style={form.label}>Description</Text>
                <View style={{width: '100%'}}>
                    {
                        description && (
                            <TouchableOpacity
                                style={form.resetInputButton}
                                onPress={() => setDescription(null)}
                            >
                                <Image
                                    source={resetInput}
                                    style={form.resetImageIcon}
                                />
                            </TouchableOpacity>
                        )
                    }
                    <TextInput
                        style={form.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder='Comment'
                        placeholderTextColor='#999999'
                        multiline
                    />
                </View>

                <Text style={form.label}>Cover</Text>
                <TouchableOpacity
                    style={form.imageButton}
                    onPress={uploadPlaceimage}
                >

                    <Image
                        source={image ? { uri: image } : plus}
                        style={[image ? form.image : form.plusIcon]}
                    />

                    {
                        image && (
                            <TouchableOpacity
                                style={form.resetImageButton}
                                onPress={() => setImage(null)}
                            >
                                <Image
                                    source={resetImage}
                                    style={form.resetImageIcon}
                                />
                            </TouchableOpacity>
                        )
                    }

                </TouchableOpacity>

                <MapboxGL.MapView
                    style={{ width: '100%', height: 200, borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}
                    styleURL={MapboxGL.StyleURL.Dark}
                    onPress={handleMapPress}
                >
                    <MapboxGL.Camera
                        zoomLevel={12}
                        centerCoordinate={coordinates.length > 0 ? coordinates : [21.0122, 52.2297]}
                    />
                    {
                        coordinates.length > 0 && (
                            <MapboxGL.PointAnnotation
                                id={`selected-address`}
                                coordinate={coordinates}
                            >
                                <View style={{
                                    borderColor: '#E934C4',
                                    borderWidth: 7,
                                    backgroundColor: '#fff',
                                    width: 30,
                                    height: 30,
                                    borderRadius: 100
                                }} />
                            </MapboxGL.PointAnnotation>
                        )
                    }
                </MapboxGL.MapView>

                <Text style={form.label}>Address of place</Text>
                <View style={{width: '100%'}}>
                    {
                        address && (
                            <TouchableOpacity
                                style={form.resetInputButton}
                                onPress={() => { setAddress(null); setCoordinates([]); }}
                            >
                                <Image
                                    source={resetInput}
                                    style={form.resetImageIcon}
                                />
                            </TouchableOpacity>
                        )
                    }
                    <TextInput
                        style={form.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder='Mark on a map'
                        placeholderTextColor='#999999'
                        editable={false}
                    />
                </View>

                <View style={{height: 150}} />
            </ScrollView>

            <TouchableOpacity
                style={[
                    warsaw.button,
                    (!heading || !address || !coordinates || !description || !image) && { backgroundColor: '#2A2A2A' },
                    {position: 'absolute', bottom: 50}
                ]}
                onPress={addNewPlace}
                disabled={!heading || !address || !coordinates || !description || !image}
            >
                <Text
                    style={[warsaw.buttonText, 
                        (!heading || !address || !coordinates || !description || !image) && { color: '#999' }
                    ]}
                >
                    Save
                </Text>
            </TouchableOpacity>
            
        </View>
    )
};

export default Warsawnewplace;