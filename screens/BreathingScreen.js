import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const BreathingScreen = () => {
  const [phase, setPhase] = useState('Inhale'); // Inhale -> Hold -> Exhale
  const [time, setTime] = useState(4); // Countdown timer
  const [scale] = useState(new Animated.Value(1)); // Animation scale

  useEffect(() => {
    let timer;

    if (time > 0) {
      timer = setTimeout(() => setTime((prev) => prev - 1), 1000);
    } else {
      if (phase === 'Inhale') {
        setPhase('Hold');
        setTime(7);
      } else if (phase === 'Hold') {
        setPhase('Exhale');
        setTime(8);
      } else {
        setPhase('Inhale');
        setTime(4);
      }
    }

    return () => clearTimeout(timer);
  }, [time, phase]);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: phase === 'Inhale' ? 1.5 : 1,
      duration: phase === 'Inhale' ? 4000 : 8000,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />
      <Text style={styles.phase}>{phase}</Text>
      <Text style={styles.timer}>{time}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#42A5F5',
    opacity: 0.7,
  },
  phase: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#1E88E5',
  },
  timer: {
    fontSize: 24,
    color: '#1565C0',
    marginTop: 10,
  },
});

export default BreathingScreen;
