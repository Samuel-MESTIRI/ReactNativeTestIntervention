import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal, Button } from 'react-native';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <View style={styles.container}>
        <Text>C'est la HOME ici</Text>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={console.log("modal closed")}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              <Button title="Close Modal" onPress={() => setIsModalOpen(false)} />
            </View>
          </View>
        </Modal>

        <Button title="Open Modal" onPress={() => setIsModalOpen(true)} />
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
