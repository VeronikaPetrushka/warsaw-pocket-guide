import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import warsawroutes from './Pocket/warsawimprtsguide/warsawroutes';

type RootStackParamList = {
      Warsawsights: undefined;
      Warsawdiscountinfo: undefined;
      Warsawdiscounts: undefined;
      Warsawfavouritesguide: undefined;
      Warsawlearn: undefined;
      Warsawloaderguide: undefined;
      Warsawnewplace: undefined;
      Warsawprofileguide: undefined;
      Warsawsightinfo: undefined;
      Warsawstudywords: undefined;
      Warsawtestswords: undefined;
};

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"Warsawloaderguide"}
            screenOptions={{
              headerShown: false
            }}
          >    
              <Stack.Screen 
                  name="Warsawsights" 
                  component={warsawroutes.WarsawsightsRoute} 
              />
              <Stack.Screen 
                  name="Warsawdiscountinfo" 
                  component={warsawroutes.WarsawdiscountinfoRoute} 
              />
              <Stack.Screen 
                  name="Warsawdiscounts" 
                  component={warsawroutes.WarsawdiscountsRoute} 
              />
              <Stack.Screen 
                  name="Warsawfavouritesguide" 
                  component={warsawroutes.WarsawfavouritesguideRoute} 
              />
              <Stack.Screen 
                  name="Warsawlearn" 
                  component={warsawroutes.WarsawlearnRoute} 
              />
              <Stack.Screen 
                  name="Warsawloaderguide" 
                  component={warsawroutes.WarsawloaderguideRoute} 
              />
              <Stack.Screen 
                  name="Warsawnewplace" 
                  component={warsawroutes.WarsawnewplaceRoute} 
              />
              <Stack.Screen 
                  name="Warsawprofileguide" 
                  component={warsawroutes.WarsawprofileguideRoute} 
              />
              <Stack.Screen 
                  name="Warsawsightinfo" 
                  component={warsawroutes.WarsawsightinfoRoute} 
              />
              <Stack.Screen 
                  name="Warsawstudywords" 
                  component={warsawroutes.WarsawstudywordsRoute} 
              />
              <Stack.Screen 
                  name="Warsawtestswords" 
                  component={warsawroutes.WarsawtestswordsRoute} 
              />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
