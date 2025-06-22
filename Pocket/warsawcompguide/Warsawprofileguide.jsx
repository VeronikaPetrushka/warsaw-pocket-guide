import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, TextInput, Linking, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { warsaw, back, form, settings, info, learn } from '../warsawconstguide/styles';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';
import { launchImageLibrary } from 'react-native-image-picker';
import {
    resetInput,
    resetImage,
    settingsfav,
    settingspp,
    settingsarrow,
    imageholder,
    settingstheme,
    award
} from '../warsawimprtsguide/warsawicns';

const { height } = Dimensions.get('window');

const Warsawprofileguide = () => {
    const navigation = useNavigation();
    const [edit, setEdit] = useState(false);
    const [userimage, setUserimage] = useState(null);
    const [username, setUsername] = useState(null);
    const [userabout, setUserabout] = useState(null);
    const [awards, setAwards] = useState(0);

    const animatedValues = [
        useState(new Animated.Value(-100))[0],
        useState(new Animated.Value(-100))[0],
        useState(new Animated.Value(-100))[0],
        useState(new Animated.Value(-100))[0],
    ];

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

    useFocusEffect(
        useCallback(() => {
            const loadUserProfile = async () => {
                try {
                    const savedUsername = await AsyncStorage.getItem('username');
                    const savedAbout = await AsyncStorage.getItem('userabout');
                    const savedImage = await AsyncStorage.getItem('userimage');
                    if (savedUsername) setUsername(savedUsername);
                    if (savedAbout) setUserabout(savedAbout);
                    if (savedImage) setUserimage(savedImage);
                } catch (error) {
                    console.error('Error loading user profile:', error);
                }
            };
            
            const animateElements = () => {
                const animations = animatedValues.map((val, i) =>
                    Animated.timing(val, {
                        toValue: 0,
                        duration: 500,
                        delay: i * 150,
                        useNativeDriver: true,
                    })
                );
                Animated.stagger(100, animations).start();
            };

            loadUserProfile();
            animateElements();
        }, [])
    );

    const uploadUserimagephoto = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (!result.didCancel && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setUserimage(uri);
        }
    };

    const saveUserprofileinfo = async () => {
        try {
            await AsyncStorage.setItem('username', username || '');
            await AsyncStorage.setItem('userabout', userabout || '');
            if (userimage) await AsyncStorage.setItem('userimage', userimage);
            else await AsyncStorage.removeItem('userimage');
            setEdit(false);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const showWarsawPocketGuidePP = () => {
        Linking.openURL('https://www.termsfeed.com/live/a5dfc694-e386-4a0d-a669-308514531de4');
    };

    return (
        <View style={[warsaw.container, {paddingTop: 150}]}>

            <View style={back.header}>
                <Warsawrouteheader
                    title={'Profile'}
                />
            </View>

            <View style={[learn.awardBox, {position: 'absolute', top: height * 0.08, alignSelf: 'center', zIndex: 10}]}>
                <Text style={learn.awardText}>{awards}</Text>
                <Image source={award} style={learn.awardIcon} />
            </View>

            {
                !edit && (
                    <TouchableOpacity
                        style={settings.editButton}
                        onPress={() => setEdit(true)}
                    >
                        <Text style={[info.address, {marginBottom: 0}]}>Edit</Text>
                    </TouchableOpacity>
                )
            }


            <ScrollView style={{ width: '100%', paddingHorizontal: 16 }}>

                {
                    edit ? (
                        <View style={{ width: '100%' }}>

                            <TouchableOpacity style={{position: 'absolute', top: 32, right: 30}}>
                                <Image source={settingstheme} style={{ width: 80, height: 36, resizeMode: 'contain'}} />
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={[settings.imageBox, {backgroundColor: '#E934C4'}]}
                                onPress={uploadUserimagephoto}
                            >
                                <Image
                                    source={userimage ? { uri: userimage } : imageholder}
                                    style={[userimage ? settings.userimage : settings.imageIcon]}
                                />

                                {
                                    userimage && (
                                        <TouchableOpacity
                                            style={form.resetImageButton}
                                            onPress={() => setUserimage(null)}
                                        >
                                            <Image
                                                source={resetImage}
                                                style={form.resetImageIcon}
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            </TouchableOpacity>

                            <Text style={form.label}>Your name</Text>
                            <View style={{width: '100%'}}>
                                {
                                    username && (
                                        <TouchableOpacity
                                            style={form.resetInputButton}
                                            onPress={() => setUsername(null)}
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
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder='Name'
                                    placeholderTextColor='#999999'
                                />
                            </View>

                            <Text style={form.label}>About you</Text>
                            <View style={{width: '100%'}}>
                                {
                                    userabout && (
                                        <TouchableOpacity
                                            style={form.resetInputButton}
                                            onPress={() => setUserabout(null)}
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
                                    value={userabout}
                                    onChangeText={setUserabout}
                                    placeholder='Comment'
                                    placeholderTextColor='#999999'
                                    multiline
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    warsaw.button,
                                    { width: '100%', marginTop: 0, marginBottom: 32 }
                                ]}
                                onPress={saveUserprofileinfo}
                            >
                                <Text style={warsaw.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                            <Animated.View style={{ transform: [{ translateY: animatedValues[0] }] }}>
                                <View style={settings.imageBox}>
                                    <Image
                                        source={userimage ? { uri: userimage } : imageholder}
                                        style={[userimage ? settings.userimage : settings.imageIcon]}
                                    />
                                </View>
                                <Text style={settings.username}>{username || 'Username'}</Text>
                                <Text style={settings.about}>{userabout || 'About me'}</Text>
                            </Animated.View>
                    )
                }
                
                {/* <Animated.View style={{ transform: [{ translateY: animatedValues[1] }] }}> */}
                    <TouchableOpacity
                        style={settings.button}
                        onPress={() => navigation.navigate('Warsawfavouritesguide')}
                    >
                        <View style={[warsaw.row, {width: 'content', alignItems: 'center'}]}>
                            <Image
                                source={settingsfav}
                                style={settings.buttonIcon}
                            />
                            <Text style={settings.buttonText}>Favourites</Text>
                        </View>
                        <Image
                            source={settingsarrow}
                            style={settings.arrow}
                        />
                    </TouchableOpacity>
                {/* </Animated.View> */}

                {/* <Animated.View style={{ transform: [{ translateY: animatedValues[2] }] }}> */}
                    <TouchableOpacity
                        style={settings.button}
                        onPress={showWarsawPocketGuidePP}
                    >
                        <View style={[warsaw.row, {width: 'content', alignItems: 'center'}]}>
                            <Image
                                source={settingspp}
                                style={settings.buttonIcon}
                            />
                            <Text style={settings.buttonText}>Privacy Policy</Text>
                        </View>
                        <Image
                            source={settingsarrow}
                            style={settings.arrow}
                        />
                    </TouchableOpacity>
                {/* </Animated.View> */}

                <View style={{height: 200}} />
            </ScrollView>
            
        </View>
    )
};

export default Warsawprofileguide;