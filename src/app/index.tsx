import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

interface RegistroClic {
  id: string;
  numero: number;
  hora: string;
}

export default function App() {
  const [contador, setContador] = useState<number>(0);
  const [registros, setRegistros] = useState<RegistroClic[]>([]);

  const incrementarContador = () => {
    const nuevoNumero = contador + 1;
    const horaActual = new Date().toLocaleTimeString();

    setContador(nuevoNumero);
    setRegistros((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${nuevoNumero}`,
        numero: nuevoNumero,
        hora: horaActual,
      },
    ]);
  };

  return (
    <View style={estilos.body}>
      <Text style={estilos.counterBox}>{contador}</Text>

      {/* Botón disparador de eventos */}
      <TouchableOpacity
        style={estilos.btnClick}
        onPress={incrementarContador}
      >
        <Text style={estilos.btnText}>¡Haz Clic Aquí!</Text>
      </TouchableOpacity>

      {/* Tabla de registros */}
      <View style={estilos.tableContainer}>
        {/* Cabecera de la tabla */}
        <View style={estilos.tableHeader}>
          <Text style={[estilos.th, estilos.cellNumero]}>№ Clic</Text>
          <Text style={[estilos.th, estilos.cellHora]}>Hora</Text>
        </View>

        {/* Cuerpo de la tabla con scroll */}
        <ScrollView style={estilos.tableBody}>
          {registros.map((item, index) => (
            <View
              key={item.id}
              style={[
                estilos.tr,
                index % 2 === 0 ? estilos.trEven : null,
              ]}
            >
              <Text style={[estilos.td, estilos.cellNumero]}>{item.numero}</Text>
              <Text style={[estilos.td, estilos.cellHora]}>{item.hora}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    padding: 20,
    justifyContent: 'center',
  },
  counterBox: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  btnClick: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableBody: {
    maxHeight: 170,
  },
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  trEven: {
    backgroundColor: '#fafafa',
  },
  th: {
    color: '#7f8c8d',
    fontWeight: '600',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  td: {
    color: '#333',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  cellNumero: {
    flex: 1,
  },
  cellHora: {
    flex: 1.5,
  },
});
