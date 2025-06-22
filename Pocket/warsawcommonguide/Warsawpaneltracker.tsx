import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import useWarsawPocketGuideNavigationTracker from './Warsawroutetracker';
import { panel } from '../warsawconstguide/styles';
import warsawpanel from '../warsawconstguide/warsawpanel';

const Warsawpaneltracker: React.FC = () => {
    const { activeWarsawGuideRoute, handleWarsawGuideRouteChange } = useWarsawPocketGuideNavigationTracker();

    return (
        <View style={panel.container}>

            {
                warsawpanel.map((route, k) => (
                    <TouchableOpacity
                        key={k}
                        style={panel.box}
                        onPress={() => handleWarsawGuideRouteChange(route.route)}
                    >
                        <Image
                            source={route.image}
                            style={[
                                panel.image,
                                activeWarsawGuideRoute === route.route && { tintColor: '#E934C4' }
                            ]}
                        />
                        <Text style={[panel.text, activeWarsawGuideRoute === route.route && { color: '#E934C4' }]}>{route.text}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

export default Warsawpaneltracker;