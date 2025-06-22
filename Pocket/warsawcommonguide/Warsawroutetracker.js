import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from 'react';

const useWarsawPocketGuideNavigationTracker = () => {
    const navigation = useNavigation();
    const [activeWarsawGuideRoute, setActiveWarsawGuideRoute] = useState('Warsawsights');

    const handleWarsawGuideRouteChange = useCallback((destinationRouteName) => {
        navigation.navigate(destinationRouteName);
    }, [navigation]);

    useEffect(() => {
        const trackActiveWarsawGuideRoute = () => {
            const navigationState = navigation.getState();
            if (navigationState?.routes?.length) {
                const focusedRoute = navigationState.routes[navigationState.index];
                if (focusedRoute?.name) {
                    setActiveWarsawGuideRoute(focusedRoute.name);
                }
            }
        };

        trackActiveWarsawGuideRoute();

        const unsubscribeFromNavigationState = navigation.addListener('state', trackActiveWarsawGuideRoute);

        return unsubscribeFromNavigationState;
    }, [navigation]);

    return {
        activeWarsawGuideRoute,
        handleWarsawGuideRouteChange
    };
};

export default useWarsawPocketGuideNavigationTracker;
