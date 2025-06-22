import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

export const warsaw = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },

    row: {
        width: '100%',
        flexDirection: 'row'
    },

    nothingImage: {
        width: 136,
        height: 136,
        marginBottom: 16,
        resizeMode: 'contain'
    },

    nothingText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
        width: '90%'
    },

    button: {
        width: '90%',
        padding: 16.5,
        borderRadius: 16,
        backgroundColor: '#E934C4',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        alignSelf: 'center'
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    }

});

export const loader = StyleSheet.create({

    text: {
        fontSize: 36,
        fontWeight: '800',
        color: '#fff',
        width: '85%',
        textAlign: 'center',
        zIndex: 10,
        position: 'absolute',
        alignSelf: 'center',
        top: height * 0.2
    },

    line: {
        width: width,
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',
        alignSelf: 'center'
    }

});

export const back = StyleSheet.create({

    header: {
        position: 'absolute',
        top: 0,
        width: width,
        zIndex: 10
    },

    component: {
        width: '100%',
        height: '100%'
    },

    panel: {
        position: 'absolute',
        bottom: 35,
        width: width,
        zIndex: 10
    }

})


export const header = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: '#151515',
        paddingTop: height * 0.08,
        paddingBottom: 8,
        paddingHorizontal: 16,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },

    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff'
    },

    gobackIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 16
    }

});


export const panel = StyleSheet.create({

    container: {
        width: '90%',
        paddingVertical: 8,
        paddingHorizontal: 26,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        backgroundColor: '#151515',
        alignSelf: 'center'
    },

    box: {
        width: '22%',
        alignItems: 'center'
    },

    image: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
        marginBottom: 6
    },

    text: {
        fontSize: 10,
        fontWeight: '400',
        color: '#999999'
    }

})


export const topButtons = StyleSheet.create({

    toggleBtnsConatiner: {
        width: '100%',
        padding: 2,
        backgroundColor: '#2A2A2A',
        borderRadius: 12,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24
    },

    toggleBtn: {
        width: '50%',
        padding: 9,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    toggleBtnText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '600',
        color: '#fff'
    },

    categoryBtnsConatiner: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    categoryBtn: {
        width: '50%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    categoryLine: {
        width: 100,
        backgroundColor: 'transparent',
        borderRadius: 12,
        height: 6,
        position: 'absolute',
        top: 0,
        alignSelf: 'center'
    },

    categoryBtnText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        color: '#fff'
    },

});


export const card = StyleSheet.create({

    container: {
        width: '90%',
        backgroundColor: '#151515',
        borderRadius: 20,
        padding: 12,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 120,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
    },

    favButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 12
    },

    favButtonIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },

    dotsButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 12
    },

    dotsIcon: {
        width: 36,
        height: 24,
        resizeMode: 'contain'
    },

    image: {
        width: '100%',
        height: 177,
        borderRadius: 20,
        resizeMode: 'cover',
        marginBottom: 8
    },

    heading: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '500',
        color: '#fff'
    },

});


export const modal = StyleSheet.create({

    back: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        width: '80%',
        borderRadius: 20,
        backgroundColor: '#151515',
        borderColor: '#E934C4',
        borderWidth: 1
    },

    button: {
        padding: 13,
        width: '100%',
        borderBottomColor: '#E934C4',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#E934C4'
    }

});


export const form = StyleSheet.create({

    label: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 15
    },

    input: {
        width: '100%',
        paddingVertical: 16.5,
        paddingHorizontal: 20,
        paddingRight: 50,
        borderRadius: 16,
        backgroundColor: '#151515',
        marginBottom: 24,
        fontSize: 16,
        fontWeight: '400',
        color: '#fff'
    },

    imageButton: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        height: 191
    },

    plusIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20
    },

    resetImageButton: {
        position: 'absolute',
        top: -10,
        right: -10,
        zIndex: 10
    },

    resetImageIcon: {
        width: 34,
        height: 34,
        resizeMode: 'contain',
        padding: 5,
    },

    resetInputButton: {
        position: 'absolute',
        top: 9,
        right: 15,
        zIndex: 10
    },

});


export const info = StyleSheet.create({

    title: {
        marginBottom: 24,
        fontSize: 24,
        fontWeight: '700',
        color: '#fff'
    },

    address: {
        marginBottom: 24,
        fontSize: 16,
        fontWeight: '400',
        color: '#E934C4'
    },

    text: {
        marginBottom: 16,
        fontSize: 16,
        fontWeight: '400',
        color: '#fff'
    }

});


export const learn = StyleSheet.create({

    button: {
        width: '100%',
        paddingVertical: 35,
        paddingHorizontal: 21,
        borderRadius: 12,
        backgroundColor: '#151515',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    level: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff'
    },

    awardBox: {
        backgroundColor: '#2A2A2A',
        borderRadius: 100,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },

    awardText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#fff'
    },

    awardIcon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
        marginLeft: 4
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 32
    },

});


export const settings = StyleSheet.create({

    button: {
        width: '100%',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#151515',
        borderColor: 'rgba(112, 112, 112, 0.15)',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
    },

    buttonIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
        marginRight: 12
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff'
    },

    arrow: {
        width: 12,
        height: 24,
        resizeMode: 'contain'
    },

    imageBox: {
        width: 100,
        height: 100,
        borderRadius: 300,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#E934C4',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#151515',
        marginBottom: 24
    },

    userimage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    imageIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    },

    username: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
        alignSelf: 'center'
    },

    about: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 32, 
    },

    editButton: {
        position: 'absolute',
        top: height * 0.09,
        right: 20,
        zIndex: 12
    }

})