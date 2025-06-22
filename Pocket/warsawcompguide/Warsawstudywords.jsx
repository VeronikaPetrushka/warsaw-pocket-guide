import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { warsaw, back, learn } from '../warsawconstguide/styles';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';
import { done } from '../warsawimprtsguide/warsawimgs';
import { award as awardIcon, goback } from '../warsawimprtsguide/warsawicns';

const { height } = Dimensions.get('window');

const Warsawstudywords = ({ complexity, award, words }) => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [awards, setAwards] = useState(0);

    useEffect(() => {
        const loadAwards = async () => {
            try {
                const existing = await AsyncStorage.getItem('WARSAW_AWARDS');
                setAwards(existing ? parseInt(existing) : 0);
            } catch (err) {
                console.error('Error loading awards:', err);
            }
        };
        loadAwards();
    }, []); 

    const completeStudy = async () => {
        try {
            const existing = await AsyncStorage.getItem('WARSAW_AWARDS');
            const parsedAward = parseInt(award);
            const total = existing ? parseInt(existing) + parsedAward : parsedAward;
            await AsyncStorage.setItem('WARSAW_AWARDS', total.toString());
            setAwards(total);
            setIndex(4);
        } catch (err) {
            console.error('Error saving award:', err);
        }
    };

    const restartStudy = () => {
        setIndex(0);
    };

    const renderWords = () => {
        const start = index % 2 === 0 ? 0 : 5;
        const end = start + 5;
        const isPolish = index > 1;

        return words.slice(start, end).map((word, k) => (
            <View key={k} style={[learn.button, { justifyContent: 'center' }]}>
                <Text style={[learn.level, {fontSize: 18, fontWeight: '500'}]}>{isPolish ? word.polish : word.english}</Text>
            </View>
        ));
    };

    return (
        <View style={[warsaw.container, {paddingTop: 120}]}>

            <View style={back.header}>
                <Warsawrouteheader
                    title={`${complexity}`}
                    goback
                />
            </View>

            <View style={[learn.awardBox, {position: 'absolute', top: height * 0.08, right: 20, zIndex: 10}]}>
                <Text style={learn.awardText}>{awards}</Text>
                <Image source={awardIcon} style={learn.awardIcon} />
            </View>

            {index < 4 && (
                <ScrollView style={{width: '100%', paddingHorizontal: 16, paddingTop: 30}}>
                    {renderWords()}
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <View style={[warsaw.row, { justifyContent: 'center', marginBottom: 20 }]}>
                            {index > 0 && (
                                <TouchableOpacity onPress={() => setIndex((prev) => prev - 1)} style={{ marginHorizontal: 20 }}>
                                    <Image source={goback} style={{ tintColor: '#343DE9', width: 24, height: 24 }} />
                                </TouchableOpacity>
                            )}
                            {index < 3 && (
                                <TouchableOpacity onPress={() => setIndex((prev) => prev + 1)} style={{ marginHorizontal: 20 }}>
                                    <Image source={goback} style={{ tintColor: '#343DE9', width: 24, height: 24, transform: [{ rotate: '180deg' }] }} />
                                </TouchableOpacity>
                            )}
                        </View>

                        <TouchableOpacity
                            style={[
                                warsaw.button,
                                { marginTop: 0, width: '100%' },
                                index < 3 && {backgroundColor: '#2A2A2A'}
                            ]}
                            onPress={completeStudy}
                            disabled={index < 3}
                        >
                            <Text style={warsaw.buttonText}>Learned</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}

            {
                index === 4 && (
                    <View style={{ width: '100%', height: '100%', paddingTop: 70, alignItems: 'center' }}>
                        
                        <Text style={learn.title}>Success!</Text>

                        <View style={[learn.awardBox, {padding: 18, marginBottom: 50}]}>
                            <Text style={[learn.awardText, {fontSize: 24}]}>+ {award}</Text>
                            <Image source={awardIcon} style={[learn.awardIcon, {width: 32, height: 32, marginLeft: 8}]} />
                        </View>

                        <Image source={done} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}} />

                        <View style={{width: '100%', position: 'absolute', bottom: 50, alignItems: 'center', alignSelf: 'center'}}>
                            <TouchableOpacity
                                style={[warsaw.button, { marginTop: 0 }]}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={warsaw.buttonText}>Take</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[warsaw.button, { backgroundColor: '#343DE9', marginTop: 16 }]}
                                onPress={restartStudy}
                            >
                                <Text style={warsaw.buttonText}>Try again</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )
            }
            
        </View>
    )
};

export default Warsawstudywords;