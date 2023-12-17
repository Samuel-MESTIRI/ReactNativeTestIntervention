import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nouvelle Intervention urgente ! 👋",
      body: 'Il faut ramener des croissants la prochaine fois',
      data: { data: 'goes here' },
    },
    trigger: null,
  });
}

export default function App() {
  useEffect(() => {

    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access notif was denied');
        return;
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
        <Text>Notification</Text>

        <Button title="Envoyer une notif" onPress={schedulePushNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
