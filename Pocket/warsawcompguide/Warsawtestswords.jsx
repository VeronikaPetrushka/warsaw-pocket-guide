import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { warsaw, back, learn } from '../warsawconstguide/styles';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';
import { done } from '../warsawimprtsguide/warsawimgs';
import { award as awardIcon } from '../warsawimprtsguide/warsawicns';

const { height } = Dimensions.get('window');

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const Warsawtestswords = ({ complexity, award, words }) => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [awards, setAwards] = useState(0);
    const [gameWords, setGameWords] = useState([]);
    const [shuffledPolish, setShuffledPolish] = useState([]);
    const [matched, setMatched] = useState([]);
    const [selectedEnglish, setSelectedEnglish] = useState(null);
    const [selectedPolish, setSelectedPolish] = useState(null);
    const [wrongPair, setWrongPair] = useState(false);

    useEffect(() => {
        const loadAwards = async () => {
            const existing = await AsyncStorage.getItem('WARSAW_AWARDS');
            setAwards(existing ? parseInt(existing) : 0);
        };
        const setupWords = () => {
            const random = shuffle(words).slice(0, 5);
            setGameWords(random);
            setShuffledPolish(shuffle(random));
        };
        loadAwards();
        setupWords();
    }, []);

    useEffect(() => {
        if (selectedEnglish && selectedPolish) {
            const isCorrect = gameWords.find(
                (w) => w.english === selectedEnglish && w.polish === selectedPolish
            );
            if (isCorrect) {
                setMatched((prev) => [...prev, selectedEnglish]);
                setSelectedEnglish(null);
                setSelectedPolish(null);
            } else {
                setWrongPair(true);
                setTimeout(() => {
                    setWrongPair(false);
                    setSelectedEnglish(null);
                    setSelectedPolish(null);
                }, 800);
            }
        }
    }, [selectedEnglish, selectedPolish]);

    useEffect(() => {
        if (matched.length === 5) {
            completeStudy();
        }
    }, [matched]);

    const completeStudy = async () => {
        try {
            const existing = await AsyncStorage.getItem('WARSAW_AWARDS');
            const parsedAward = parseInt(award);
            const total = existing ? parseInt(existing) + parsedAward : parsedAward;
            await AsyncStorage.setItem('WARSAW_AWARDS', total.toString());
            setAwards(total);
            setIndex(1);
        } catch (err) {
            console.error('Error saving award:', err);
        }
    };

    const restartStudy = () => {
        const random = shuffle(words).slice(0, 5);
        setGameWords(random);
        setShuffledPolish(shuffle(random));
        setMatched([]);
        setSelectedEnglish(null);
        setSelectedPolish(null);
        setWrongPair(false);
        setIndex(0);
    };

    const renderButton = (text, onPress, isDisabled, isSelected) => (
        <TouchableOpacity
            key={text}
            onPress={onPress}
            disabled={isDisabled}
            style={[
                learn.button,
                isDisabled && { opacity: 0.5 },
                isSelected && { backgroundColor: '#343DE9' },
                wrongPair && isSelected && { borderColor: 'red', borderWidth: 2 },
                {justifyContent: 'center', alignItems: 'center'}
            ]}
        >
            <Text style={learn.level}>{text}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[warsaw.container, { paddingTop: 150 }]}>
            <View style={back.header}>
                <Warsawrouteheader title={complexity} goback />
            </View>

            <View style={[learn.awardBox, { position: 'absolute', top: height * 0.08, right: 20 }]}>
                <Text style={learn.awardText}>{awards}</Text>
                <Image source={awardIcon} style={learn.awardIcon} />
            </View>

            {index === 0 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        {gameWords.map((word) =>
                            renderButton(
                                word.english,
                                () => setSelectedEnglish(word.english),
                                matched.includes(word.english),
                                selectedEnglish === word.english
                            )
                        )}
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        {shuffledPolish.map((word) =>
                            renderButton(
                                word.polish,
                                () => setSelectedPolish(word.polish),
                                matched.includes(word.english),
                                selectedPolish === word.polish
                            )
                        )}
                    </View>
                </View>
            )}

            {index === 1 && (
                <View style={{ width: '100%', height: '100%', paddingTop: 70, alignItems: 'center' }}>
                    <Text style={learn.title}>Success!</Text>

                    <View style={[learn.awardBox, { padding: 18, marginBottom: 50 }]}>
                        <Text style={[learn.awardText, { fontSize: 24 }]}>+ {award}</Text>
                        <Image source={awardIcon} style={[learn.awardIcon, { width: 32, height: 32, marginLeft: 8 }]} />
                    </View>

                    <Image source={done} style={{ width: 200, height: 200, resizeMode: 'contain' }} />

                    <View style={{ width: '100%', position: 'absolute', bottom: 50, alignItems: 'center' }}>
                        <TouchableOpacity style={[warsaw.button, { marginTop: 0 }]} onPress={() => navigation.goBack()}>
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
            )}
        </View>
    );
};

export default Warsawtestswords;
