import { createContext, useState, useContext } from 'react';

export const EstadoContexto = createContext();

export const ProvedorEstado = ({ children }) => {
  const [estadoGlobal, setEstadoGlobal] = useState(false);

  return (
    <EstadoContexto.Provider value={{ estadoGlobal, setEstadoGlobal }}>
      {children}
    </EstadoContexto.Provider>
  );
};

export const useEstadoGlobal = () => {
  const context = useContext(EstadoContexto);
  if (!context) {
    throw new Error(
      'useEstadoGlobal debe ser usado dentro de un EstadoProvider'
    );
  }
  return context;
};
