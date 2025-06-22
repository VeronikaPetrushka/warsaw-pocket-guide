import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Warsawpaneltracker from './Warsawpaneltracker';
import { back } from '../warsawconstguide/styles';

interface WarsawcomppocketProps {
    children: ReactNode;
    showPanel?: boolean;
}

const Warsawcomppocket: React.FC<WarsawcomppocketProps> = ({ children, showPanel }) => {
    return (
        <View style={{ flex: 1 }}>

            <View style={back.component}>{children}</View>

            {showPanel && (
                <View style={back.panel}>
                    <Warsawpaneltracker />
                </View>
            )}  
        </View>
      
    );
};

export default Warsawcomppocket;
