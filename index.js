/**
 * @format
 */

import MapboxGL from '@rnmapbox/maps';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

MapboxGL.setAccessToken('pk.eyJ1IjoidnBldHJ1c2hrYSIsImEiOiJjbWJ1Z25ncmkwOXUyMmxxdWpqendsdTlsIn0.HkqHV66FJEjhodXqvQqb-g');

AppRegistry.registerComponent(appName, () => App);
