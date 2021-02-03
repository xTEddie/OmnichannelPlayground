import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

// Functional-based component
const FunctionalComponent = () => {
  return (
    <>
      <View styles={styles.container}>
        <Text> Functional </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default FunctionalComponent;