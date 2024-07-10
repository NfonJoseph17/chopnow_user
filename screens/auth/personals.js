import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "../../App";
import { AuthContext } from "../../contexts/AuthContexts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Personals = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [healthConditions, setHealthConditions] = useState([]);
  const [nutritionalGoals, setNutritionalGoals] = useState([]);
  const [customDietaryRestriction, setCustomDietaryRestriction] = useState("");
  const [customAllergy, setCustomAllergy] = useState("");
  const [customHealthCondition, setCustomHealthCondition] = useState("");
  const [customNutritionalGoal, setCustomNutritionalGoal] = useState("");

  const user = useContext(AuthContext)?.user;
  const handleCheckBoxChange = (value, setter, currentState) => {
    if (currentState.includes(value)) {
      setter(currentState.filter(item => item !== value));
    } else {
      setter([...currentState, value]);
    }
  };

  const handleSubmit = async () => {
    const userInfo = {
      age:Number(age),
      gender,
      dietaryRestrictions: [...dietaryRestrictions, customDietaryRestriction],
      allergies: [...allergies, customAllergy],
      healthConditions: [...healthConditions, customHealthCondition],
      nutritionalGoals: [...nutritionalGoals, customNutritionalGoal],
    };
    try {
      const addProfile = httpsCallable(functions, 'addProfile');
      const {profile} = await (await addProfile(userInfo)).data;
      await AsyncStorage.setItem('personalsVisible', 'false');
      navigation.push("BottomTabBar"); // Navigate to the home screen after submission
    } catch (error) {
      console.log('An error occured when submitting the profile: ', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <ScrollView contentContainerStyle={{ padding: Sizes.fixPadding * 2.0 }}>
        {renderInputField("Age", age, setAge, "numeric")}
        {renderPicker("Gender", gender, setGender, ["male", "female", "unspecified"])}
        {renderCheckBoxGroup("Dietary Restrictions", dietaryRestrictions, setDietaryRestrictions, [
          "Vegetarian",
          "Vegan",
          "Gluten-Free",
          "Dairy-Free",
          "Lactose-Free",
          "Enter yours"
        ], customDietaryRestriction, setCustomDietaryRestriction)}
        {renderCheckBoxGroup("Allergies", allergies, setAllergies, [
          "Peanuts",
          "Tree Nuts",
          "Dairy",
          "Eggs",
          "Fish",
          "Enter yours"
        ], customAllergy, setCustomAllergy)}
        {renderCheckBoxGroup("Health Conditions", healthConditions, setHealthConditions, [
          "Diabetes",
          "Hypertension",
          "Hyperlipidemia",
          "Heart Disease",
          "Lactose Intolerance",
          "Enter condition"
        ], customHealthCondition, setCustomHealthCondition)}
        {renderCheckBoxGroup("Nutritional Goals", nutritionalGoals, setNutritionalGoals, [
          "Weight Loss",
          "Muscle Gain",
          "Weight Maintenance",
          "Increased Energy",
          "Improved Athletic Performance",
          "Balanced Nutrition",
          "Increased Protein Intake",
          "Type goals"
        ], customNutritionalGoal, setCustomNutritionalGoal)}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  function renderInputField(label, value, setter, keyboardType = "default") {
    return (
      <View style={styles.inputFieldContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={setter}
          style={styles.input}
          keyboardType={keyboardType}
        />
      </View>
    );
  }

  function renderPicker(label, selectedValue, onValueChange, options) {
    return (
      <View style={styles.inputFieldContainer}>
        <Text style={styles.label}>{label}</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={onValueChange}
        >
          {options.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    );
  }

  function renderCheckBoxGroup(label, state, setter, options, customValue, setCustomValue) {
    return (
      <View style={styles.inputFieldContainer}>
        <Text style={styles.label}>{label}</Text>
        {options.map(option => (
          <CheckBox
            key={option}
            title={option}
            checked={state.includes(option)}
            onPress={() => handleCheckBoxChange(option, setter, state)}
            containerStyle={styles.checkBoxContainer}
          />
        ))}
        {state.includes("Enter yours") && (
          <TextInput
            value={customValue}
            onChangeText={setCustomValue}
            style={styles.input}
            placeholder="Enter yours"
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  inputFieldContainer: {
    marginVertical: Sizes.fixPadding,
  },
  label: {
    ...Fonts.blackColor15Medium,
    marginBottom: Sizes.fixPadding - 5.0,
  },
  input: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    ...Fonts.blackColor15Medium,
  },
  picker: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  checkBoxContainer: {
    backgroundColor: Colors.bodyBackColor,
    borderWidth: 0,
    padding: 0,
  },
  submitButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    marginTop: Sizes.fixPadding * 2.0,
  },
  submitButtonText: {
    ...Fonts.whiteColor18Bold,
  },
});

export default Personals;