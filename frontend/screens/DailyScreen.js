import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function DailyScreen() {
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [salary, setSalary] = useState(null);

  const calculateSalary = () => {
    const h = parseFloat(hours);
    const r = parseFloat(rate);

    if (!h || !r || h <= 0 || r <= 0) {
      Alert.alert('Invalid Input', 'Please enter positive numbers only.');
      return;
    }

    const daily = h * r;
    setSalary({ amount: daily, hours: h, rate: r });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕒 Daily Salary Calculator</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="💼 Enter Hours Worked Today"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <TextInput
          style={styles.input}
          placeholder="💰 Enter Hourly Rate"
          keyboardType="numeric"
          value={rate}
          onChangeText={setRate}
        />
        <TouchableOpacity style={styles.button} onPress={calculateSalary}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        {salary && (
          <View style={styles.result}>
            <Text style={styles.salaryText}>Your Today Salary is:</Text>
            <Text style={styles.amount}>₹{salary.amount.toFixed(2)}</Text>
            <Text style={styles.breakdown}>
              ({salary.hours} hrs × ₹{salary.rate}/hr)
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    elevation: 3,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4facfe',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 10,
    alignItems: 'center',
  },
  salaryText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  amount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  breakdown: {
    fontSize: 14,
    color: '#666',
  },
});
