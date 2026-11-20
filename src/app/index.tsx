
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface RegistroClic {
  id: string;
  numero: number;
  hora: string;
}

export default function App() {
  const [contador, setContador] = useState<number>(0);
  const [registros, setRegistros] = useState<RegistroClic[]>([]);

  // Incrementar contador y registrar el clic
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

  // Restar likes sin permitir números negativos
  const restarContador = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  // Reiniciar contador y registros
  const reiniciarContador = () => {
    setContador(0);
    setRegistros([]);
  };

  return (
    <View style={estilos.body}>
      <Text style={estilos.titulo}>Contador de Likes</Text>

      <View
        style={[
          estilos.counterBox,
          contador > 10 ? estilos.counterBoxActivo : null,
        ]}
      >
        <Text style={estilos.counterText}>{contador}</Text>
        <Text style={estilos.counterLabel}>Likes</Text>
      </View>

      {contador > 10 && (
        <Text style={estilos.mensaje}>
          ¡Excelente! Has superado los 10 likes.
        </Text>
      )}

      {/* Botón para incrementar */}
      <TouchableOpacity
        style={estilos.btnClick}
        onPress={incrementarContador}
      >
        <Text style={estilos.btnText}>¡Haz clic aquí!</Text>
      </TouchableOpacity>

      {/* Botones para restar y reiniciar */}
      <View style={estilos.buttonsContainer}>
        <TouchableOpacity
          style={estilos.btnRestar}
          onPress={restarContador}
        >
          <Text style={estilos.btnText}>Restar Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.btnReiniciar}
          onPress={reiniciarContador}
        >
          <Text style={estilos.btnText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>

      {/* Tabla de registros */}
      <View style={estilos.tableContainer}>
        <Text style={estilos.tableTitle}>Historial de clics</Text>

        <View style={estilos.tableHeader}>
          <Text style={[estilos.th, estilos.cellNumero]}>N.º Clic</Text>
          <Text style={[estilos.th, estilos.cellHora]}>Hora</Text>
        </View>

        <ScrollView style={estilos.tableBody}>
          {registros.length === 0 ? (
            <Text style={estilos.emptyText}>
              Todavía no hay clics registrados.
            </Text>
          ) : (
            registros.map((item, index) => (
              <View
                key={item.id}
                style={[
                  estilos.tr,
                  index % 2 === 0 ? estilos.trEven : null,
                ]}
              >
                <Text style={[estilos.td, estilos.cellNumero]}>
                  {item.numero}
                </Text>
                <Text style={[estilos.td, estilos.cellHora]}>
                  {item.hora}
                </Text>
              </View>
            ))
          )}
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
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 25,
  },
  counterBox: {
    backgroundColor: '#dceef9',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  counterBoxActivo: {
    backgroundColor: '#f1c40f',
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  counterLabel: {
    fontSize: 16,
    color: '#34495e',
  },
  mensaje: {
    textAlign: 'center',
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  btnClick: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  btnRestar: {
    backgroundColor: '#e67e22',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  btnReiniciar: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
    color: '#2c3e50',
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
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
  },
  cellNumero: {
    flex: 1,
  },
  cellHora: {
    flex: 1.5,
  },
});
