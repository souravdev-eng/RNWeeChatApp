import { Auth } from 'aws-amplify';
import { Button } from 'react-native';
import { View, StyleSheet } from 'react-native';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Button title='Sign out' onPress={() => Auth.signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'gray',
  },
  image: {
    width: '80%',
    aspectRatio: 2 / 1,
  },
});

export default SettingScreen;
