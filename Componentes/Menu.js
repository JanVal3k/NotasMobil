import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';

const Menu = ({ onClick }) => {
  const [open, setOpen] = useState(true);

  const onStateChange = ({ open: newOpen }) => {
    setOpen(newOpen);
  };

  const btnBorrartodo = () => {
    GuardarYMostrarNotas.deleteAllNotes();
  };

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'menu'}
        backdropColor="transparent"
        actions={[
          {
            icon: 'note',
            label: 'Notas',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'plus',
            label: 'Nota nueva',
            onPress: () => onClick('NotaNueva'),
          },
          {
            icon: 'calendar',
            label: 'Calendario',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'cog',
            label: 'Configuracion',
            onPress: () => btnBorrartodo(),
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

export default Menu;
