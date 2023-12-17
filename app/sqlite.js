import { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, Button } from 'react-native';
import DatabaseManager from '../DatabaseManager';

export default function App() {
  const [interventions, setInterventions] = useState([])
  const [newIntervention, setNewIntervention] = useState('')

  useEffect(() => {
    DatabaseManager.initializeDatabase()

    updateInterventions()
  }, [])

  const updateInterventions = () => {
    DatabaseManager.getAllIntervention().then(response => {
      setInterventions(response)
    })
  }

  const addIntervention = () => {
    DatabaseManager.createIntervention(newIntervention)
    setNewIntervention('')
    updateInterventions()
  }

  return (
    <View style={styles.container}>
      <Text>Liste des interventions de la table SQLITE 'interventions'</Text>
      <TextInput style={styles.input} value={newIntervention} onChangeText={setNewIntervention} />
      <Button title='Ajouter !' onPress={addIntervention} />
      <ScrollView>
        {interventions.map((inter) => (
          <Text key={inter.id}>ID: {inter.id} --- Nom: {inter.nom}</Text>
        ))}
      </ScrollView>
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
  input: {
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 2,
    width: 200
  }
});
