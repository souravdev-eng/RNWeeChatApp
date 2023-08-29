import { Text, StyleSheet, Pressable, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { createChatRoom, createUserChatRoom } from './../../graphql/mutations';

dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    // Check if we already have a chat room with a user

    // Create a new ChatRoom
    const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: {} }));
    if (!newChatRoomData?.data?.createChatRoom) {
      console.log('ERROR While creating ChatRoom...');
    }

    const newChatRoom = newChatRoomData?.data?.createChatRoom;

    // Add clicked user to the ChatRoom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom?.id, userId: user.id },
      })
    );

    // Add the auth user to the chatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom?.id, userId: authUser.attributes.sub },
      })
    );

    navigation.navigate('Chat', { id: newChatRoom?.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: user?.image || 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user?.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user?.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: 'center',
  },
  content: {
    width: '80%',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  subTitle: {
    color: 'gray',
  },
});

export default ContactListItem;
