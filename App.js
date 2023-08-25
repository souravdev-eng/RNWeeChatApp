import { Amplify, Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigation';
import awsconfig from './src/aws-exports';
import { useEffect } from 'react';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  // const getCurrentUser = async () => {
  //   const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  // };

  // useEffect(() => {
  //   getCurrentUser();
  // }, []);

  return (
    <View style={styles.container}>
      <Navigator />

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
