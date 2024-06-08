import React, { useState } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import Dialog from "react-native-dialog";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("screen");

const EditProfileScreen = ({ navigation }) => {

  const [fullNameDialog, setFullnameDialog] = useState(false);
  const [fullName, setFullName] = useState("Samantha John");
  const [changeText, setChangeText] = useState(fullName);

  const [passwordDialog, setPasswordDialog] = useState(false);
  const [password, setPassword] = useState("123456");
  const [changePassword, setChangePassword] = useState(password);

  const [phoneDialog, setPhoneDialog] = useState(false);
  const [phone, setPhone] = useState("(+19) 1234567890");
  const [changePhone, setChangePhone] = useState(phone);

  const [emialDialog, setEmailDialog] = useState(false);
  const [email, setEmail] = useState("samantha@gmail.com");
  const [changeEmail, setChangeEmail] = useState(email);

  const [isBottomSheet, setIsBottomSheet] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
        >
          {profilePhoto()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setFullnameDialog(true);
              setChangeText(fullName);
            }}
          >
            {formData({ title: "Full Name", value: fullName })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setPasswordDialog(true);
              setChangePassword(password);
            }}
          >
            {formData({ title: "Password", value: "******" })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setChangePhone(phone);
              setPhoneDialog(true);
            }}
          >
            {formData({ title: "Phone", value: phone })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setChangeEmail(email);
              setEmailDialog(true);
            }}
          >
            {formData({ title: "Email", value: email })}
          </TouchableOpacity>
        </ScrollView>
        {saveButton()}
      </View>
      {editFullNameDialog()}
      {editPasswordDialog()}
      {editPhoneDialog()}
      {editEmailDialog()}
      {showBottomSheet()}
    </View>
  );

  function editFullNameDialog() {
    return (
      <Dialog.Container
        visible={fullNameDialog}
        contentStyle={styles.dialogContainerStyle}
        onRequestClose={() => setFullnameDialog(false)}
        headerStyle={{ padding: 0.0, margin: 0.0 }}
      >
        <Text
          style={{
            textAlign: "center",
            ...Fonts.blackColor14SemiBold,
            paddingBottom: Sizes.fixPadding + 3.0,
          }}
        >
          Change full name
        </Text>
        <TextInput
          value={changeText}
          onChangeText={(value) => setChangeText(value)}
          selectionColor={Colors.primaryColor}
          style={styles.textFieldStyle}
        />
        <View style={styles.cancelAndSaveButtonWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setFullnameDialog(false)}
            style={styles.cancelButtonStyle}
          >
            <Text style={{ ...Fonts.primaryColor15SemiBold }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setFullnameDialog(false);
              setFullName(changeText);
            }}
            style={styles.dialogSaveButtonStyle}
          >
            <Text style={{ ...Fonts.whiteColor15SemiBold }}>Save</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    );
  }

  function editPasswordDialog() {
    return (
      <Dialog.Container
        visible={passwordDialog}
        contentStyle={styles.dialogContainerStyle}
        headerStyle={{ padding: 0.0, margin: 0.0 }}
        onRequestClose={() => setPasswordDialog(false)}
      >
        <Text
          style={{
            textAlign: "center",
            ...Fonts.blackColor14SemiBold,
            paddingBottom: Sizes.fixPadding + 3.0,
          }}
        >
          Change Password
        </Text>
        <TextInput
          style={styles.textFieldStyle}
          placeholder="Old Password"
          secureTextEntry={true}
          selectionColor={Colors.primaryColor}
        />
        <TextInput
          onChangeText={(value) => setChangePassword(value)}
          style={{
            marginVertical: Sizes.fixPadding,
            ...styles.textFieldStyle
          }}
          placeholder="New Password"
          secureTextEntry={true}
          selectionColor={Colors.primaryColor}
        />
        <TextInput
          style={styles.textFieldStyle}
          placeholder="Confirm New Password"
          secureTextEntry={true}
          selectionColor={Colors.primaryColor}
        />
        <View style={styles.cancelAndSaveButtonWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setPasswordDialog(false)}
            style={styles.cancelButtonStyle}
          >
            <Text style={{ ...Fonts.primaryColor15SemiBold }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setPasswordDialog(false);
              setPassword(changePassword);
            }}
            style={styles.dialogSaveButtonStyle}
          >
            <Text style={{ ...Fonts.whiteColor15SemiBold }}>Save</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    );
  }

  function editPhoneDialog() {
    return (
      <Dialog.Container
        visible={phoneDialog}
        contentStyle={styles.dialogContainerStyle}
        headerStyle={{ padding: 0.0, margin: 0.0 }}
        onRequestClose={() => setPhoneDialog(false)}
      >
        <Text
          style={{
            textAlign: "center",
            ...Fonts.blackColor14SemiBold,
            paddingBottom: Sizes.fixPadding + 3.0,
          }}
        >
          Change Phone Number
        </Text>
        <TextInput
          selectionColor={Colors.primaryColor}
          value={changePhone}
          onChangeText={(value) => setChangePhone(value)}
          style={styles.textFieldStyle}
          keyboardType="numeric"
        />
        <View style={styles.cancelAndSaveButtonWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setPhoneDialog(false)}
            style={styles.cancelButtonStyle}
          >
            <Text style={{ ...Fonts.primaryColor15SemiBold }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setPhoneDialog(false);
              setPhone(changePhone);
            }}
            style={styles.dialogSaveButtonStyle}
          >
            <Text style={{ ...Fonts.whiteColor15SemiBold }}>Save</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    );
  }

  function editEmailDialog() {
    return (
      <Dialog.Container
        visible={emialDialog}
        contentStyle={styles.dialogContainerStyle}
        headerStyle={{ padding: 0.0, margin: 0.0 }}
        onRequestClose={() => setEmailDialog(false)}
      >
        <Text
          style={{
            textAlign: "center",
            ...Fonts.blackColor14SemiBold,
            paddingBottom: Sizes.fixPadding + 3.0,
          }}
        >
          Change Email
        </Text>
        <TextInput
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
          value={changeEmail}
          onChangeText={(value) => setChangeEmail(value)}
          style={styles.textFieldStyle}
        />
        <View style={styles.cancelAndSaveButtonWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setEmailDialog(false)}
            style={styles.cancelButtonStyle}
          >
            <Text style={{ ...Fonts.primaryColor15SemiBold }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setEmailDialog(false);
              setEmail(changeEmail);
            }}
            style={styles.dialogSaveButtonStyle}
          >
            <Text style={{ ...Fonts.whiteColor15SemiBold }}>Save</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    );
  }

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.pop()}
        style={styles.saveButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Save</Text>
      </TouchableOpacity>
    );
  }

  function showBottomSheet() {
    return (
      <BottomSheet
        isVisible={isBottomSheet}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.50, 0, 0.50)" }}
        onBackdropPress={() => setIsBottomSheet(false)}
        scrollViewProps={{ scrollEnabled: false }}
      >
        <View style={styles.bottomSheetStyle}>
          <Text
            style={{
              ...Fonts.blackColor14SemiBold,
              textAlign: "center",
              marginBottom: Sizes.fixPadding * 2.0,
            }}
          >
            Choose Option
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsBottomSheet(false)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialIcons
              name="camera-alt"
              size={18}
              color={Colors.blackColor}
            />
            <Text
              style={{
                ...Fonts.blackColor13SemiBold,
                marginLeft: Sizes.fixPadding,
              }}
            >
              Camera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsBottomSheet(false)}
            style={{ flexDirection: "row", marginTop: Sizes.fixPadding * 2.0 }}
          >
            <MaterialIcons
              name="photo-album"
              size={18}
              color={Colors.blackColor}
            />
            <Text
              style={{
                ...Fonts.blackColor13SemiBold,
                marginLeft: Sizes.fixPadding,
              }}
            >
              Select Photo From Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  }

  function formData({ title, value }) {
    return (
      <View style={styles.formDataWrapStyle}>
        <View style={{ width: width / 3.0 }}>
          <Text style={{ ...Fonts.grayColor14SemiBold }}>{title}</Text>
        </View>
        <View style={styles.formValueAndForwardButtonWrapStyle}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.blackColor14SemiBold }}
          >
            {value}
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={14}
            color={Colors.grayColor}
          />
        </View>
      </View>
    );
  }

  function profilePhoto() {
    return (
      <View style={styles.profilePhotoWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsBottomSheet(true)}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../../assets/images/users/user3.png")}
            style={styles.profilePhotoStyle}
            resizeMode="cover"
          />
          <View style={styles.addPhotoWrapStyle}>
            <MaterialIcons name="add" size={18} color={Colors.whiteColor} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
          style={{ alignSelf: 'flex-start' }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    margin: Sizes.fixPadding * 2.0,
  },
  addPhotoWrapStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    height: 20.0,
    width: 20.0,
    borderRadius: 10.0,
    position: "absolute",
    bottom: 5.0,
    right: 0.0,
  },
  profilePhotoWrapStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizes.fixPadding * 2.0,
  },
  formDataWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 3.0,
    borderColor: "#F4F5F8",
    elevation: 2,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    marginTop: Sizes.fixPadding + 10.0,
    borderWidth: 1.0,
  },
  formValueAndForwardButtonWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width / 1.9,
    flex: 1,
    alignItems: "center",
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 100,
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding * 2.0,
  },
  cancelButtonStyle: {
    flex: 1,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    marginRight: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
  },
  dialogSaveButtonStyle: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    marginLeft: Sizes.fixPadding,
  },
  bottomSheetStyle: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding + 5.0,
  },
  profilePhotoStyle: {
    height: 100.0,
    width: 100.0,
    borderRadius: 50.0,
  },
  saveButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 2.0,
    margin: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(255, 66, 0, 0.3)",
    borderWidth: 1.0,
    elevation: 1.0,
    shadowColor: Colors.primaryColor,
  },
  cancelAndSaveButtonWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 3.0,
  },
  textFieldStyle: {
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 0.5,
    ...Fonts.blackColor15Medium,
    paddingBottom: Platform.OS == 'ios' ? Sizes.fixPadding - 5.0 : Sizes.fixPadding - 8.0,
  }
});

export default EditProfileScreen;