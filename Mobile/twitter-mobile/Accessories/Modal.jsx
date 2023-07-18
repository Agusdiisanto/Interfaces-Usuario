import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Modal as RNModal } from 'react-native';

const Modal = ({ visible, mensaje, errorMensaje, onClose }) => {

  return (
    <RNModal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modal}>
        <Text style={styles.mensaje}>{mensaje}</Text>
        <Text style={styles.errorMensaje}>{errorMensaje}</Text>
        <View style={styles.botonesModal}>
          <TouchableOpacity onPress={onClose} style={styles.volver}>
            <Text style = {styles.volverText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
  },
  volver: {
    color: '#46a2fd',
    backgroundColor: '#fff',
    marginTop: 50,
    marginLeft: 20,
    padding: 10,
    width: '45%',
    borderWidth: 3,
    borderColor: '#46a2fd',
    borderRadius: 5,
  },
  volverText:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 5,
    textTransform: 'uppercase',
  },
  mensaje: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  errorMensaje: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  botonesModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default  Modal;

