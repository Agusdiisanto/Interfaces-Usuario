import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { useRouter } from "expo-router";


const Mantenimiento = () => {

  const router = useRouter();

  const goBack = () =>{
    router.replace("/Verification")
  }

  return (
    <View style={styles.container}>
      <View style={styles.commingSoonContainer}>
        <Text style={styles.heading}>Servidor En Mantenimiento 👷</Text>
        <TouchableOpacity onPress={goBack} style={styles.goBack}>
        <Text style={styles.goBackText}>Vuelva Mas Tarde</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    color: 'red',
    marginBottom: 10,
  },
  goBack: {
    marginTop: 50,
    marginLeft: 20,
    padding: 10,
    width: '60%',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 9,
  },
  goBackText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 5,
    textTransform: 'uppercase',
  },
});

export default Mantenimiento;