import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { warsaw, card, back } from '../warsawconstguide/styles';
import warsawdiscounts from '../warsawconstguide/warsawdiscounts';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';
import React, { useRef, useEffect } from 'react';

const Warsawdiscounts = () => {
    const navigation = useNavigation();
    const animationsRef = useRef(warsawdiscounts.map(() => new Animated.Value(0)));

    useEffect(() => {
        const animations = animationsRef.current.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 400,
                delay: index * 100,
                useNativeDriver: true,
            })
        );

        Animated.stagger(100, animations).start();
    }, []);

    return (
        <View style={[warsaw.container, {paddingTop: 120}]}>

            <View style={back.header}>
                <Warsawrouteheader
                    title={'Warsaw Discounts'}
                />
            </View>

            <ScrollView style={{ width: '100%', paddingHorizontal: 16, paddingTop: 30 }}>
                {warsawdiscounts.map((discount, k) => {
                    const animatedStyle = {
                        opacity: animationsRef.current[k],
                        transform: [
                            {
                                translateY: animationsRef.current[k].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [20, 0],
                                }),
                            },
                        ],
                    };

                    return (
                        <Animated.View key={k} style={[animatedStyle, { marginBottom: 24 }]}>
                            <TouchableOpacity
                                style={{ width: '100%' }}
                                onPress={() => navigation.navigate('Warsawdiscountinfo', { discount })}
                            >
                                <Image source={discount.image} style={card.image} />
                                <Text style={card.heading} numberOfLines={1} ellipsizeMode="tail">
                                    {discount.title}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
                <View style={{height: 200}} />
            </ScrollView>
            
        </View>
    )
};

export default Warsawdiscounts;