import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { warsaw, card, back, info } from '../warsawconstguide/styles';
import Warsawrouteheader from '../warsawcommonguide/Warsawrouteheader';

const Warsawdiscountinfo = ({ discount }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                warsaw.container,
                { paddingTop: 120, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
        >

            <View style={back.header}>
                <Warsawrouteheader
                    title={'Discount'}
                    goback
                />
            </View>

            <ScrollView
                style={{
                    width: '100%',
                    paddingHorizontal: 16,
                    paddingTop: 30
                }}
            >

                <Animated.Image
                    source={discount.image}
                    style={[card.image, {
                        height: 240,
                        marginBottom: 26,
                        opacity: fadeAnim,
                        transform: [{ scale: fadeAnim }]
                    }]}
                />

                <Text style={info.title}>{discount.title}</Text>

                {discount.description.map((desc, index) => {
                    const itemAnim = useRef(new Animated.Value(0)).current;

                    useEffect(() => {
                        Animated.timing(itemAnim, {
                            toValue: 1,
                            duration: 400,
                            delay: index * 100,
                            useNativeDriver: true,
                        }).start();
                    }, []);

                    return (
                        <Animated.Text
                            key={index}
                            style={[
                                info.text,
                                {
                                    opacity: itemAnim,
                                    transform: [{
                                        translateY: itemAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [20, 0],
                                        })
                                    }]
                                }
                            ]}
                        >
                            {desc}
                        </Animated.Text>
                    );
                })}
                
                <View style={{ height: 100 }} />
            </ScrollView>
            
        </Animated.View>
    )
};

export default Warsawdiscountinfo;