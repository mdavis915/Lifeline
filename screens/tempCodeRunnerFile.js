import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Linking, TextInput, Alert, Modal, ScrollView, Platform } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import DateTimePicker from '@react-native-community/datetimepicker'; // Install this package for time picker

export const HomeScreen = ({ navigation }) => {
  const [medication, setMedication] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const goToTransportation = () => {
    navigation.navigate("Transportation");
  };

  const callEmergencyPhone = () => {
    const phoneNumber = "tel://911" || "tel:911";
    Linking.openURL(phoneNumber).catch((err) =>
      Alert.alert("Error", "Could not open dialer")
    );
  };

  const handleMedicationReminder = () => {
    if (!medication || !selectedDays.length || !reminderTime) {
      Alert.alert("Error", "Please complete all fields");
      return;
    }
  
    // Convert reminderTime to ISO string
    const reminderTimeString = reminderTime.toISOString();
  
    // Pass reminderTimeString as part of navigation params
    navigation.navigate("MedicationReminder", { medication, reminderTime: reminderTimeString, selectedDays });
  
    setMedication('');
    setReminderTime(new Date());
    setSelectedDays([]);
    setShowForm(false);
  };
  

  const toggleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || reminderTime;
    setShowTimePicker(Platform.OS === "ios" ? true : false);
    setReminderTime(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/welcome-image.png')} style={styles.headerImage} />
        <Text style={styles.headerText}>Carely Dashboard</Text>
      </View>

      <View style={styles.dashboardContainer}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={goToTransportation}
          activeOpacity={0.8}
        >
          <Text style={styles.cardText}>Find Hospitals Nearby</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.emergencyCard]} 
          onPress={callEmergencyPhone} 
          activeOpacity={0.8}
        >
          <Text style={[styles.cardText, styles.emergencyText]}>Emergency Call</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.logoutCard]} 
          onPress={handleLogout} 
          activeOpacity={0.8}
        >
          <Text style={[styles.cardText, styles.logoutText]}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, styles.addReminderButton]} 
          onPress={() => setShowForm(true)} 
          activeOpacity={0.8}
        >
          <Text style={styles.cardText}>Add Medication Reminder</Text>
        </TouchableOpacity>
      </View>

      {/* Medication Reminder Modal */}
      <Modal
        visible={showForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowForm(false)} 
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Enter Medication Name"
              value={medication}
              onChangeText={setMedication}
            />

            <Text style={styles.label}>Select Days for Reminder:</Text>
            <View style={styles.daysContainer}>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayButton, selectedDays.includes(day) && styles.selectedDay]}
                  onPress={() => toggleDaySelection(day)}
                >
                  <Text style={styles.dayText}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Select Reminder Time:</Text>
            <TouchableOpacity 
              style={styles.input}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timeText}>{reminderTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={reminderTime}
                mode="time"
                display="spinner"
                onChange={onChangeTime}
              />
            )}

            <TouchableOpacity 
              style={[styles.button, styles.reminderButton]} 
              onPress={handleMedicationReminder}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, styles.reminderButtonText]}>Set Medication Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFAF3",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#5A5A5A",
    marginTop: 20,
    textAlign: "center",
  },
  headerImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  dashboardContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FF7F50",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  cardText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.2,
  },
  emergencyCard: {
    backgroundColor: "#FF6347",
  },
  emergencyText: {
    color: "#fff",
  },
  logoutCard: {
    backgroundColor: "#6A5ACD",
  },
  logoutText: {
    color: "#fff",
  },
  addReminderButton: {
    backgroundColor: "#32CD32",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 40,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    color: "#FF6347",
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  dayButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  selectedDay: {
    backgroundColor: "#32CD32",
  },
  dayText: {
    color: "#333",
    fontSize: 16,
  },
  timeText: {
    fontSize: 18,
    color: "#333",
  },
  reminderButton: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  reminderButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default HomeScreen;
