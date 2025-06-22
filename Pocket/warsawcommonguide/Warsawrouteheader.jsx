import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { warsaw, header } from '../warsawconstguide/styles';
import { goback as arrow } from '../warsawimprtsguide/warsawicns';

const Warsawrouteheader = ({ title, additional, goback }) => {
    const navigation = useNavigation();

    return (
        <View style={[header.container, (goback || !additional) && {paddingBottom: 20}]}>

            <View style={[warsaw.row, {width: 'content'}]}>
                {
                    goback && (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={arrow} style={header.gobackIcon} />
                        </TouchableOpacity>
                    )
                }

                <Text style={[header.title, goback && {fontSize: 16, fontWeight: '700'}]}>{title}</Text>
            </View>

            {
                additional && (
                    <View style={{width: '100%'}}>
                        {additional}
                    </View>
                )
            }
            
        </View>
    )
};

export default Warsawrouteheader;