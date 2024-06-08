import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  Platform,
} from "react-native";
import { Colors, Fonts, Sizes,CommonStyles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import Dialog from "react-native-dialog";

const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation, changeIndex }) => {

  const [showLogoutDialog, setshowLogoutDialog] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
        >
          {profileInfo()}
          {profileOptions()}
          {logoutOption()}
        </ScrollView>
        {logoutDialog()}
      </View>
    </View>
  );

  function logoutDialog() {
    return (
      <Dialog.Container
        visible={showLogoutDialog}
        contentStyle={styles.dialogContainerStyle}
        headerStyle={{ margin: 0.0, padding: 0 }}
        onRequestClose={() => setshowLogoutDialog(false)}
      >
        <View style={styles.dialogContentStyle}>
          <Text style={{ textAlign: "center", ...Fonts.blackColor16SemiBold }}>
            Are you sure want to logout?
          </Text>
          <View
            style={{
              marginTop: Sizes.fixPadding * 2.5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setshowLogoutDialog(false)}
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.primaryColor15SemiBold }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setshowLogoutDialog(false);
                navigation.push("Splash");
              }}
              style={styles.logoutButtonStyle}
            >
              <Text style={{ ...Fonts.whiteColor15SemiBold }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function logoutOption() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setshowLogoutDialog(true)}
        style={{ ...styles.profileOptionsWrapStyle }}
      >
        <View style={styles.profileOptionWrapStyle}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/icons/logout.png")}
              style={{
                width: 20.0,
                height: 20.0,
                resizeMode: "contain",
                tintColor: Colors.primaryColor,
              }}
            />
            <Text
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding + 5.0,
                ...Fonts.primaryColor16SemiBold,
              }}
            >
              Logout
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            color={Colors.grayColor}
            size={14}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function profileOptions() {
    return (
      <View>
        <View
          style={{
            ...styles.profileOptionsWrapStyle,
            marginTop: Sizes.fixPadding * 3.0,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push("PaymentMethods")}
          >
            {profileOptionSort({
              optionIcon: require("../../assets/images/icons/payment_method.png"),
              option: "Payment Methods",
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push("Address")}
          >
            {profileOptionSort({
              optionIcon: require("../../assets/images/icons/location.png"),
              option: "Address",
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push("ShareAndEarn")}
          >
            {profileOptionSort({
              optionIcon: require("../../assets/images/icons/share.png"),
              option: "Share and Earn",
            })}
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.profileOptionsWrapStyle,
            marginVertical: Sizes.fixPadding * 2.0,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push("Notifications")}
          >
            {profileOptionSort({
              optionIcon: require("../../assets/images/icons/notification.png"),
              option: "Notifications",
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push("Favorites")}
          >
            {profileOptionSort({
              optionIcon: require("../../assets/images/icons/favorite.png"),
              option: "Favorites",
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => changeIndex({ index: 3 })}
          >
            {profileOptionSort({
              optionIcon: require("../../assets/images/icons/my_order.png"),
              option: "My Orders",
            })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push("Settings")}
          >
            {profileOptionSort({
              optionIcon: require("../../assets/images/icons/settings.png"),
              option: "Settings",
            })}
          </TouchableOpacity>
          {profileOptionSort({
            optionIcon: require("../../assets/images/icons/support.png"),
            option: "Support",
          })}
        </View>
      </View>
    );
  }

  function profileOptionSort({ optionIcon, option }) {
    return (
      <View style={styles.profileOptionWrapStyle}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={optionIcon}
            style={{ width: 20.0, height: 20.0, resizeMode: "contain" }}
          />
          <Text
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor16SemiBold,
            }}
          >
            {option}
          </Text>
        </View>
        <MaterialIcons
          name="arrow-forward-ios"
          color={Colors.grayColor}
          size={14}
        />
      </View>
    );
  }

  function profileInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.push("EditProfile", { id: "photo" })}
        style={styles.profileInfoWrapStyle}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/users/user3.png")}
            style={{
              width: 60.0,
              height: 60.0,
              borderRadius: Sizes.fixPadding - 5.0,
            }}
          />
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor16SemiBold }}>Samantha John</Text>
            <Text style={{ ...Fonts.grayColor12Medium }}>(+91) 1234567890</Text>
          </View>
        </View>
        <MaterialIcons
          name="arrow-forward-ios"
          color={Colors.grayColor}
          size={16}
        />
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <Text
        style={{
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.blackColor18SemiBold,
        }}
      >
        Profile
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  profileInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  profileOptionsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
    ...CommonStyles.shadow
  },
  profileOptionWrapStyle: {
    marginBottom: Sizes.fixPadding + 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoutButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    marginLeft: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    flex: 1,
  },
  cancelButtonStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 100,
    backgroundColor: Colors.whiteColor,
  },
  dialogContentStyle: {
    paddingVertical:
      Platform.OS == "ios" ? Sizes.fixPadding * 2.0 : Sizes.fixPadding - 5.0,
    paddingHorizontal:
      Platform.OS == "ios" ? Sizes.fixPadding * 2.0 : Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
  },
});

export default ProfileScreen;
