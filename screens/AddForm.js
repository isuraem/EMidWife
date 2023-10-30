import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import axios from 'axios'; // Import Axios
const AddForm = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    // Create state variables for input values
    const [age, setAge] = useState('');
    const [systolicBP, setSystolicBP] = useState('');
    const [diastolicBP, setDiastolicBP] = useState('');
    const [bloodGlucose, setBloodGlucose] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [bodyTemperature, setBodyTemperature] = useState('');
    const [prediction, setPrediction] = useState(null);

    // Create change handler functions for input fields
    const handleAgeChange = (text) => {
        setAge(text);
    };

    const handleSystolicBPChange = (text) => {
        setSystolicBP(text);
    };

    const handleDiastolicBPChange = (text) => {
        setDiastolicBP(text);
    };

    const handleBloodGlucoseChange = (text) => {
        setBloodGlucose(text);
    };

    const handleHeartRateChange = (text) => {
        setHeartRate(text);
    };

    const handleBodyTemperatureChange = (text) => {
        setBodyTemperature(text);
    };
    const submitData = () => {
        // Create an object with the user's input data
        const userData = {
            Age: parseFloat(age),
            SystolicBP: parseFloat(systolicBP),
            DiastolicBP: parseFloat(diastolicBP),
            BS: parseFloat(bloodGlucose),
            HeartRate: parseFloat(heartRate),
            BodyTemp: parseFloat(bodyTemperature),
        };

        // Make a POST request to your Flask server
        axios
            .post(`http://127.0.0.1:5000/predict`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                // Handle the response from the server, which may contain the prediction
                console.log(response.data);
                const predictedRisk = response.data.prediction;
                setPrediction(predictedRisk);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Workout Plan
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Connect with your body!</Text>
                </View>
                {prediction !== null && (
                    <Text>Predicted Health Risk: {prediction}</Text>
                )}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Age</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Age'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "100%"
                            }}
                            value={age}
                            onChangeText={handleAgeChange}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Systolic Blood Pressure (mmHg)</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Systolic Blood Pressure'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            value={systolicBP}
                            onChangeText={handleSystolicBPChange}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Diastolic Blood Pressure (mmHg)</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Diastolic Blood Pressure'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            value={diastolicBP}
                            onChangeText={handleDiastolicBPChange}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Blood Glucose (mmol/L)</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Blood Glucose'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            value={bloodGlucose}
                            onChangeText={handleBloodGlucoseChange}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Resting Heart Rate (bpm)</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Resting Heart Rate'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            value={heartRate}
                            onChangeText={handleHeartRateChange}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Body Temperature (°F)</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Body Temperature (°F)'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            value={bodyTemperature}
                            onChangeText={handleBodyTemperatureChange}
                        />
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={submitData}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddForm