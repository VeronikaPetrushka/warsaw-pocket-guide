import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Modal, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { warsaw, card, form, info, topButtons, modal, back } from '../warsawconstguide/styles';
import warsawsightsGeneral from '../warsawconstguide/warsawsightsGeneral';
import { sightfav, sightnotfav } from '../warsawimprtsguide/warsawicns';
import { actionbutton, emptystorage } from '../warsawimprtsguide/warsawimgs';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';
import MapboxGL from '@rnmapbox/maps';

const TopButtons = ({ currentView, setCurrentView, currentCategory, setCurrentCategory }) => {

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={topButtons.toggleBtnsConatiner}>
                <TouchableOpacity
                    style={[topButtons.toggleBtn, currentView === 'Map' && { backgroundColor: '#E934C4' }]}
                    onPress={() => setCurrentView('Map')}
                >
                    <Text style={topButtons.toggleBtnText}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[topButtons.toggleBtn, currentView === 'List' && { backgroundColor: '#E934C4' }]}
                    onPress={() => setCurrentView('List')}
                >
                    <Text style={topButtons.toggleBtnText}>List</Text>
                </TouchableOpacity>
            </View>

            <View style={topButtons.categoryBtnsConatiner}>
                <TouchableOpacity
                    style={topButtons.categoryBtn}
                    onPress={() => setCurrentCategory('General')}
                >
                    <View style={[topButtons.categoryLine, currentCategory === 'General' && { backgroundColor: '#343DE9' }]} />
                    <Text style={[topButtons.categoryBtnText, currentCategory === 'General' && { color: '#343DE9' }]}>General</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={topButtons.categoryBtn}
                    onPress={() => setCurrentCategory('Added')}
                >
                    <View style={[topButtons.categoryLine, currentCategory === 'Added' && { backgroundColor: '#343DE9' }]} />
                    <Text style={[topButtons.categoryBtnText, currentCategory === 'Added' && { color: '#343DE9' }]}>Added</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const MapSight = ({ sight, favSight, toggle }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={card.container}
            onPress={() => navigation.navigate('Warsawsightinfo', { sight })}
        >
            <View style={{width: '100%'}}>

                 <TouchableOpacity
                    style={card.favButton}
                    onPress={() => toggle(sight)}
                >
                    <Image
                        source={favSight(sight) ? sightfav : sightnotfav}
                        style={card.favButtonIcon}
                    />
                </TouchableOpacity>

                <Image
                    source={
                        typeof sight.image === 'string'
                        ? { uri: sight.image }
                        : sight.image
                    }
                    style={card.image}
                />

            </View>

            <Text style={card.heading} numberOfLines={1} ellipsizeMode='tail'>{sight.heading}</Text>
        </TouchableOpacity>
    )
}

const Warsawsights = () => {
    const navigation = useNavigation();
    const [currentView, setCurrentView] = useState('Map');
    const [currentCategory, setCurrentCategory] = useState('General');
    const [warsawsightsAdded, setWarsawsightsAdded] = useState([]);
    const [warsawFavourite, setWarsawFavourite] = useState({
        General: [],
        Added: []
    });
    const [actionModal, setActionModal] = useState(false);
    const [selectedSight, setSelectedsight] = useState(null);
    const [selectedMapSight, setSelectedMapSight] = useState(null);

    const warsawsights = currentCategory === 'General' ? warsawsightsGeneral : warsawsightsAdded;

    useFocusEffect(
        useCallback(() => {
            loadAddedSights();
            loadFavourites();
        }, [])
    );

    useEffect(() => {
        loadAddedSights();  
    }, [warsawsightsAdded]);

    useEffect(() => {
        loadFavourites();  
    }, [warsawFavourite]);

    const loadAddedSights = async () => {
        try {
            const data = await AsyncStorage.getItem('WARSAW_ADDED_PLACES');
            if (data) {
            setWarsawsightsAdded(JSON.parse(data));
            }
        } catch (err) {
            console.error('Failed to load added sights:', err);
        }
    };

    const loadFavourites = async () => {
        try {
            const favData = await AsyncStorage.getItem('WARSAW_FAVOURITES');
            if (favData) {
                const defaultStructure = {
                    General: [],
                    Added: []
                };
                const parsedData = JSON.parse(favData);
                setWarsawFavourite({
                    ...defaultStructure,
                    ...parsedData
                });
            }
        } catch (err) {
            console.error('Failed to load favourites:', err);
        }
    };

    const openSightActions = (sight) => {
        setSelectedsight(sight);
        setActionModal(true);
    };

    const closeSightActions = () => {
        setSelectedsight(null);
        setActionModal(false);
    };

    const deleteAddedSight = async () => {
        try {
            const data = await AsyncStorage.getItem('WARSAW_ADDED_PLACES');
            if (!data) return;

            const parsed = JSON.parse(data);
            const updated = parsed.filter(item => item.address !== selectedSight.address);

            await AsyncStorage.setItem('WARSAW_ADDED_PLACES', JSON.stringify(updated));
            setWarsawsightsAdded(updated);
        } catch (err) {
            console.error('Failed to delete sight:', err);
        } finally {
            setSelectedsight(null);
            setActionModal(false);
        }
    };

    const editAddedSight = () => {
        setActionModal(false);
        navigation.navigate('Warsawnewplace', { place: selectedSight });
    }

    const toggleFavSight = async (sight) => {
        try {
            const category = currentCategory === 'General' ? 'General' : 'Added';
            const isFav = warsawFavourite[category].includes(sight.address);
            
            const updatedFavourites = {
                ...warsawFavourite,
                [category]: isFav
                    ? warsawFavourite[category].filter(addr => addr !== sight.address)
                    : [...warsawFavourite[category], sight.address]
            };

            setWarsawFavourite(updatedFavourites);
            await AsyncStorage.setItem('WARSAW_FAVOURITES', JSON.stringify(updatedFavourites));
        } catch (err) {
            console.error('Failed to toggle favorite:', err);
        }
    };

    const favSight = (sight) => {
        const category = currentCategory === 'General' ? 'General' : 'Added';
        return warsawFavourite[category].includes(sight.address);
    };

    return (
        <View style={warsaw.container}>

            <View style={back.header}>
                <Warsawrouteheader
                    title={'Warsaw Sights'}
                    additional={
                        <TopButtons
                            currentView={currentView}
                            currentCategory={currentCategory}
                            setCurrentView={setCurrentView}
                            setCurrentCategory={setCurrentCategory}
                        />
                    }
                />
            </View>

            {
                currentView === 'Map' && (
                    <MapboxGL.MapView style={{ flex: 1 }} styleURL={MapboxGL.StyleURL.Dark}>
                        <MapboxGL.Camera
                            zoomLevel={12}
                            centerCoordinate={[21.0122, 52.2297]}
                        />

                        {
                            warsawsights.map((sight, index) => (
                                sight.coordinates && (
                                    <MapboxGL.PointAnnotation
                                        key={`marker-${index}`}
                                        id={`marker-${index}`}
                                        coordinate={sight.coordinates}
                                        onSelected={() =>
                                            selectedMapSight === sight ? setSelectedMapSight(null) : setSelectedMapSight(sight)
                                        }
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
                            ))
                        }

                        {selectedMapSight && (
                            <MapSight sight={selectedMapSight} favSight={favSight} toggle={toggleFavSight} />
                        )}
                    </MapboxGL.MapView>
                )
            }

            {
                currentView === 'List' && (
                    <ScrollView style={{ width: '100%', paddingTop: 250 }}>
                        {
                            warsawsights.length > 0 ? (
                                <View style={{width: '100%', paddingHorizontal: 16}}>
                                    {
                                        warsawsights.map((sight, i) => (
                                            <TouchableOpacity
                                                key={i}
                                                style={{ marginBottom: 24 }}
                                                onPress={() => navigation.navigate('Warsawsightinfo', { sight })}
                                            >

                                                <View style={{ marginBottom: 8 }}>

                                                    {
                                                        currentCategory === 'Added' && (
                                                            <TouchableOpacity
                                                                style={card.dotsButton}
                                                                onPress={() => openSightActions(sight)}
                                                            >
                                                                <Image
                                                                    source={actionbutton}
                                                                    style={card.dotsIcon}
                                                                />
                                                            </TouchableOpacity>
                                                        )
                                                    }

                                                    <TouchableOpacity
                                                        style={card.favButton}
                                                        onPress={() => toggleFavSight(sight)}
                                                    >
                                                        <Image
                                                            source={favSight(sight) ? sightfav : sightnotfav}
                                                            style={card.favButtonIcon}
                                                        />
                                                    </TouchableOpacity>

                                                    <Image
                                                        source={
                                                            typeof sight.image === 'string'
                                                            ? { uri: sight.image }
                                                            : sight.image
                                                        }
                                                        style={card.image}
                                                    />

                                                </View>

                                                <Text style={card.heading} numberOfLines={1} ellipsizeMode='tail'>{sight.heading}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }

                                </View>
                            ) : (
                                    <View style={{ width: '100%', marginTop: 120, alignItems: 'center' }}>
                                        <Image source={emptystorage} style={warsaw.nothingImage} />
                                        <Text style={warsaw.nothingText}>There aren’t any locations you add, you can add something</Text>
                                    </View>
                            )
                        }

                        {
                            currentCategory === 'Added' && (
                                <TouchableOpacity
                                    style={warsaw.button}
                                    onPress={() => navigation.navigate('Warsawnewplace')}
                                >
                                    <Text style={warsaw.buttonText}>Add new place</Text>
                                </TouchableOpacity>
                            )
                        }
                        
                        <View style={{height: 200}} />
                    </ScrollView>
                )
            }

            <Modal
                transparent={true}
                visible={actionModal}
                animationType='slide'
                onRequestClose={closeSightActions}
            >

                <View style={modal.back}>
                    <View style={modal.container}>

                        <TouchableOpacity
                            style={modal.button}
                            onPress={editAddedSight}
                        >
                            <Text style={[modal.buttonText, {fontWeight: '600'}]}>Edit place</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={modal.button}
                            onPress={deleteAddedSight}
                        >
                            <Text style={modal.buttonText}>Delete place</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[modal.button, {borderBottomWidth: 0}]}
                            onPress={closeSightActions}
                        >
                            <Text style={[modal.buttonText, {color: '#343DE9', fontWeight: '600'}]}>Close</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Modal>
            
        </View>
    )
};

export default Warsawsights;