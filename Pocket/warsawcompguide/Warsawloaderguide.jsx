import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native'
import { warsaw, loader } from '../warsawconstguide/styles';
import { blue, pink } from '../warsawimprtsguide/warsawimgs';

const { height } = Dimensions.get('window');

const Warsawloaderguide = () => {
    const navigation = useNavigation();

    const titleAnim = useRef(new Animated.Value(-50)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const pinkAnim = useRef(new Animated.Value(-50)).current;
    const pinkOpacity = useRef(new Animated.Value(0)).current;
    const blueAnim = useRef(new Animated.Value(-50)).current;
    const blueOpacity = useRef(new Animated.Value(0)).current;
    const circleScale = useRef(new Animated.Value(0.5)).current;
    const circleOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.sequence([
            Animated.parallel([
                Animated.timing(titleAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]),
            Animated.parallel([
                Animated.timing(pinkAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(pinkOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(blueAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(blueOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.spring(circleScale, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.timing(circleOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ]);

        animation.start(() => {
            setTimeout(() => {
                navigation.navigate('Warsawsights');
            }, 2000);
        });

        return () => animation.stop();
    }, []);

    return (
        <View style={warsaw.container}>

            <Animated.Text
                style={[
                    loader.text,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: titleAnim }]
                    }
                ]}
            >
                Warsaw Pocket Guide
            </Animated.Text>

             <Animated.Image
                source={pink}
                style={[
                    loader.line,
                    {
                        top: 130,
                        opacity: pinkOpacity,
                        transform: [{ translateY: pinkAnim }]
                    }
                ]}
            />
            <Animated.Image
                source={blue}
                style={[
                    loader.line,
                    {
                        top: 180,
                        opacity: blueOpacity,
                        transform: [{ translateY: blueAnim }]
                    }
                ]}
            />

            <Animated.View
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: height * 0.4,
                    opacity: circleOpacity,
                    transform: [{ scale: circleScale }],
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Progress.Circle 
                    size={32} 
                    indeterminate={true} 
                    color="#E934C4" 
                    borderWidth={3}
                />
            </Animated.View>
            
        </View>
    )
};

export default Warsawloaderguide;