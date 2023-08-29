import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigation';
import awsconfig from './src/aws-exports';
import { useEffect } from 'react';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  const getCurrentUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });

    const user = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub }));
    const newUser = {
      id: authUser?.attributes?.sub,
      name: authUser?.attributes?.email.split('@')[0],
      status: 'Hey I am using WeeChat',
    };

    console.log(newUser);
    if (!user.data.getUser) {
      const newUserData = await API.graphql(graphqlOperation(createUser, { input: newUser }));
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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
