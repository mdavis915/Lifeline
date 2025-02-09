import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export const VitalsScreen = () => {
  const [heartRate, setHeartRate] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [oxygenError, setOxygenError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Clear the error message when all fields are filled
    if (heartRate && systolic && diastolic && oxygenLevel) {
      setErrorMessage("");
    }
  }, [heartRate, systolic, diastolic, oxygenLevel]);

  const validateHeartRate = (value) => {
    if (value < 60) {
      return "Low Heart Rate 🛑";
    } else if (value > 100) {
      return "High Heart Rate 🛑";
    }
    return "Normal Heart Rate ✅";
  };

  const validateBloodPressure = (systolic, diastolic) => {
    if (systolic < 90 || diastolic < 60) {
      return "Low Blood Pressure 🛑";
    } else if (systolic >= 140 || diastolic >= 90) {
      return "High Blood Pressure 🛑";
    } else if (systolic >= 130 || diastolic >= 80) {
      return "Elevated Blood Pressure ⚠️";
    }
    return "Normal Blood Pressure ✅";
  };

  const validateOxygenLevel = (value) => {
    if (value < 90) {
      return "Low Oxygen Level 🛑";
    }
    return "Normal Oxygen Level ✅";
  };

  const handleSubmit = () => {
    const trimmedHeartRate = heartRate.trim();
    const trimmedSystolic = systolic.trim();
    const trimmedDiastolic = diastolic.trim();
    const trimmedOxygenLevel = oxygenLevel.trim();
  
    if (!trimmedHeartRate || !trimmedSystolic || !trimmedDiastolic || !trimmedOxygenLevel) {
      setErrorMessage("Please fill all fields.");
      return;
    }
  
    if (isNaN(trimmedHeartRate) || isNaN(trimmedSystolic) || isNaN(trimmedDiastolic) || isNaN(trimmedOxygenLevel)) {
      setErrorMessage("Please enter valid numbers.");
      return;
    }
  
    setIsSubmitted(true); 
    setErrorMessage(""); 
  
    const heartRateStatus = validateHeartRate(parseInt(trimmedHeartRate));
    const bloodPressureStatus = validateBloodPressure(parseInt(trimmedSystolic), parseInt(trimmedDiastolic));
    const oxygenStatus = validateOxygenLevel(parseInt(trimmedOxygenLevel));
  
    Alert.alert("Vitals Status", `${heartRateStatus}\n${bloodPressureStatus}\n${oxygenStatus}`, [{ text: "OK" }]);
  };
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Enter Your Vitals</Text>

          <Text style={styles.label}>Heart Rate (BPM)</Text>
          <TextInput
            style={[styles.input, isSubmitted && (!heartRate || isNaN(heartRate)) ? styles.invalidInput : null]}
            placeholder="e.g. 75"
            keyboardType="numeric"
            value={heartRate}
            onChangeText={setHeartRate}
          />

          <Text style={styles.label}>Systolic Blood Pressure (mmHg)</Text>
          <TextInput
            style={[styles.input, isSubmitted && (!systolic || isNaN(systolic)) ? styles.invalidInput : null]}
            placeholder="e.g. 120"
            keyboardType="numeric"
            value={systolic}
            onChangeText={setSystolic}
          />

          <Text style={styles.label}>Diastolic Blood Pressure (mmHg)</Text>
          <TextInput
            style={[styles.input, isSubmitted && (!diastolic || isNaN(diastolic)) ? styles.invalidInput : null]}
            placeholder="e.g. 80"
            keyboardType="numeric"
            value={diastolic}
            onChangeText={setDiastolic}
          />

          <Text style={styles.label}>Oxygen Level (%)</Text>
          <TextInput
            style={[styles.input, isSubmitted && (oxygenError || oxygenLevel === "") ? styles.invalidInput : null]}
            placeholder="e.g. 98"
            keyboardType="numeric"
            value={oxygenLevel}
            onChangeText={setOxygenLevel}
          />

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  invalidInput: {
    borderColor: "red",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default VitalsScreen;
