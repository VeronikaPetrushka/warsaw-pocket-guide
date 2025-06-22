import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { warsaw, learn, back, topButtons } from '../warsawconstguide/styles';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';
import warsawlearn from '../warsawconstguide/warsawlearn';
import { award } from '../warsawimprtsguide/warsawicns';

const TopButtons = ({ currentCategory, setCurrentCategory }) => {

    return (
        <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <View style={topButtons.categoryBtnsConatiner}>
                <TouchableOpacity
                    style={topButtons.categoryBtn}
                    onPress={() => setCurrentCategory('Study')}
                >
                    <View style={[topButtons.categoryLine, currentCategory === 'Study' && { backgroundColor: '#343DE9' }]} />
                    <Text style={[topButtons.categoryBtnText, currentCategory === 'Study' && { color: '#343DE9' }]}>Study</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={topButtons.categoryBtn}
                    onPress={() => setCurrentCategory('Tests')}
                >
                    <View style={[topButtons.categoryLine, currentCategory === 'Tests' && { backgroundColor: '#343DE9' }]} />
                    <Text style={[topButtons.categoryBtnText, currentCategory === 'Tests' && { color: '#343DE9' }]}>Tests</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const { height } = Dimensions.get('window');

const Warsawlearn = () => {
    const navigation = useNavigation();
    const [currentCategory, setCurrentCategory] = useState('Study');
    const [awards, setAwards] = useState(0);

    const animations = useRef(warsawlearn.map(() => new Animated.Value(-50))).current;
    const opacities = useRef(warsawlearn.map(() => new Animated.Value(0))).current;

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

    useEffect(() => {
        const animatedItems = warsawlearn.map((_, i) => {
            return Animated.parallel([
                Animated.timing(animations[i], {
                    toValue: 0,
                    duration: 300,
                    delay: i * 100,
                    useNativeDriver: true
                }),
                Animated.timing(opacities[i], {
                    toValue: 1,
                    duration: 300,
                    delay: i * 100,
                    useNativeDriver: true
                })
            ]);
        });

        Animated.stagger(100, animatedItems).start();
    }, []);

    const handleNavigatelearning = (complexity, studyAward, testAward, words) => {
        if (currentCategory === 'Study') {
            navigation.navigate('Warsawstudywords', { complexity, award: studyAward, words });
        } else {
            navigation.navigate('Warsawtestswords', { complexity, award: testAward, words });
        }
    };

    return (
        <View style={[warsaw.container, {paddingTop: 170}]}>

            <View style={back.header}>
                <Warsawrouteheader
                    title={'Warsaw Learn'}
                    additional={
                        <TopButtons
                            currentCategory={currentCategory}
                            setCurrentCategory={setCurrentCategory}
                        />
                    }
                />
            </View>

            <View style={[learn.awardBox, {position: 'absolute', top: height * 0.08, right: 20, zIndex: 10}]}>
                <Text style={learn.awardText}>{awards}</Text>
                <Image source={award} style={learn.awardIcon} />
            </View>

            <ScrollView style={{ width: '100%', paddingHorizontal: 16, paddingTop: 30 }}>
                
                {
                    warsawlearn.map((item, j) => (
                        <Animated.View
                            key={j}
                            style={{
                                transform: [{ translateY: animations[j] }],
                                opacity: opacities[j],
                            }}
                        >
                            <TouchableOpacity
                                style={learn.button}
                                onPress={() =>
                                    handleNavigatelearning(
                                        item.level,
                                        item.studyAward,
                                        item.testAward,
                                        item.words
                                    )
                                }
                            >
                                <Text style={learn.level}>{item.label}</Text>
                                <Text style={learn.level}>{item.level}</Text>
                                <View style={learn.awardBox}>
                                    <Text style={learn.awardText}>+ {currentCategory === 'Study' ? item.studyAward : item.testAward}</Text>
                                    <Image source={award} style={learn.awardIcon} />
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))
                }

                <View style={{height: 200}} />
            </ScrollView>
            
        </View>
    )
};

export default Warsawlearn;