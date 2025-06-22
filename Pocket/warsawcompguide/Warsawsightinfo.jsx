import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { warsaw, card, back, info } from '../warsawconstguide/styles';
import { sightfav, sightnotfav } from '../warsawimprtsguide/warsawicns';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';

const { height } = Dimensions.get('window');

const Warsawsightinfo = ({ sight }) => {
    const [warsawFavourite, setWarsawFavourite] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadFavourites();
        }, [])
    );

    useEffect(() => {
        loadFavourites();  
    }, [warsawFavourite]);
    
    const loadFavourites = async () => {
        try {
            const favData = await AsyncStorage.getItem('WARSAW_FAVOURITES');
            if (favData) {
            setWarsawFavourite(JSON.parse(favData));
            }
        } catch (err) {
            console.error('Failed to load favourites:', err);
        }
    };

    const toggleFavSight = () => {
        const isFav = warsawFavourite.includes(sight.address);
        const updated = isFav
            ? warsawFavourite.filter(addr => addr !== sight.address)
            : [...warsawFavourite, sight.address];

        setWarsawFavourite(updated);
        AsyncStorage.setItem('WARSAW_FAVOURITES', JSON.stringify(updated));
    };

    const favSight = () => {
        return warsawFavourite.includes(sight.address);
    };

    return (
        <View style={[warsaw.container, { paddingTop: 120 }]}>
            
            <View style={back.header}>
                <Warsawrouteheader
                    title={'Sight'}
                    goback
                />
            </View>

            <TouchableOpacity
                style={[card.favButton, {top: height * 0.08, right: 20, zIndex: 10}]}
                onPress={toggleFavSight}
            >
                <Image
                    source={favSight() ? sightfav : sightnotfav}
                    style={card.favButtonIcon}
                />
            </TouchableOpacity>

            <ScrollView
                style={{
                    width: '100%',
                    paddingHorizontal: 16,
                    paddingTop: 30
                }}
            >

                <Image
                    source={
                        typeof sight.image === 'string'
                        ? { uri: sight.image }
                        : sight.image
                    }
                    style={[card.image, { height: 240, marginBottom: 26 }]}
                />

                <Text style={info.title}>{sight.heading}</Text>

                <Text style={info.address}>{sight.address}</Text>

                {
                    Array.isArray(sight.description) ? (
                        sight.description.map((desc, index) => (
                            <Text key={index} style={info.text}>{desc}</Text>
                        ))
                    ) : (
                        <Text style={info.text}>{sight.description}</Text>
                    )
                }
                
                <View style={{ height: 100 }} />
            </ScrollView>
            
        </View>
    )
};

export default Warsawsightinfo;