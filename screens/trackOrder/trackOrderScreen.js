import React from "react"
import { Image, View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import { Key } from "../../constants/key";
import MapView, { Marker } from "react-native-maps";
import MyStatusBar from "../../components/myStatusBar";

const TrackOrderScreen = ({ navigation }) => {

    const deliveryMarker = {
        latitude: 22.6293867,
        longitude: 88.4354486,
    };

    const deliveryBoyMarker = {
        latitude: 22.6292757,
        longitude: 88.444781,
    }

    return (
        <View style={{ flex: 1, }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {trackingInfo()}
                {header()}
                {deliveryManInfo()}
            </View>
        </View>
    )

    function deliveryManInfo() {
        return (
            <View style={styles.deliveryManInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ ...Fonts.grayColor13Medium }}>
                            Delivery man
                        </Text>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            George Anderson
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ ...Fonts.grayColor13Medium }}>
                            Arriving in
                        </Text>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            10 mins
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        ...styles.callNowAndMessageButtonStyle,
                        marginRight: Sizes.fixPadding,
                    }}>
                        <MaterialIcons
                            name="phone"
                            color={Colors.primaryColor}
                            size={22}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor15SemiBold }}>
                            Call Now
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('Message')}
                        style={{
                            ...styles.callNowAndMessageButtonStyle,
                            backgroundColor: Colors.primaryColor,
                            marginLeft: Sizes.fixPadding,
                        }}
                    >
                        <MaterialCommunityIcons
                            name="message"
                            color={Colors.whiteColor}
                            size={22}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor15SemiBold }}>
                            Message
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function trackingInfo() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <MapView
                    style={{ flex: 1, }}
                    initialRegion={{
                        latitude: 22.6292757,
                        longitude: 88.444781,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.03,
                    }}
                >
                    <MapViewDirections
                        origin={deliveryBoyMarker}
                        destination={deliveryMarker}
                        apikey={Key.apiKey}
                        lineDashPattern={[1]}
                        lineCap="square"
                        strokeColor={Colors.blackColor}
                        strokeWidth={Platform.OS == 'ios' ? 2 : 3}
                    />
                    <Marker coordinate={deliveryBoyMarker}>
                        <Image
                            source={require('../../assets/images/marker2.png')}
                            style={{ width: 30.0, height: 30.0 }}
                        />
                    </Marker>
                    <Marker coordinate={deliveryMarker}>
                        <Image
                            source={require('../../assets/images/marker1.png')}
                            style={{ width: 20.0, height: 20.0 }}
                        />
                    </Marker>
                </MapView>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        top: 30.0,
        left: 30.0,
    },
    callNowAndMessageButtonStyle: {
        flexDirection: 'row',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 3.0,
    },
    deliveryManInfoWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 20.0,
        right: 20.0,
        backgroundColor: Colors.bodyBackColor,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        elevation: 3,
        ...CommonStyles.shadow
    }
});

export default TrackOrderScreen;