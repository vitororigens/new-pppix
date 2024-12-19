import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Input } from '../Input';
import { Button } from '../Button';

interface EditFieldModalProps {
  visible: boolean;
  onClose: () => void;
  field: string;
  onSubmit: (value: string) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}


export function EditFieldModal({
  visible,
  onClose,
  field,
  onSubmit,
  setValue,
  value,
}: EditFieldModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Input
            value={value}
            onChangeText={setValue}
            placeholder={`Insira o ${field}`}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button title="Salvar" onPress={() => onSubmit(value)} />
            <Button title="Cancelar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
});
