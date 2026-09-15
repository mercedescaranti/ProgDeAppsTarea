import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  ImageResizeMode,
} from 'react-native';


type Producto = {
  id: string;
  titulo: string;
  precio: number;
  descripcion: string;
  imagen: any; 
};


const PRODUCTOS: Producto[] = [
  {
    id: '1',
    titulo: 'Zapatillas Running',
    precio: 25000,
    descripcion: 'Zapatillas livianas ideales para correr largas distancias.',
    imagen: require('./asests/zapatillas.png'), 
  },
  {
    id: '2',
    titulo: 'Mochila Urbana',
    precio: 18000,
    descripcion: 'Mochila resistente al agua, con compartimento para notebook.',
    imagen: { uri: 'data:image/jpeg;base64,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' }, // <-- imagen por URI
  },
  {
    id: '3',
    titulo: 'Reloj Deportivo',
    precio: 32000,
    descripcion: 'Reloj con GPS, monitor de ritmo cardíaco y resistencia al agua.',
    imagen: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2i8TgBlZNojsdz0BNZC5VhhLYw_WgBMksHw5iIx9gkPOeqNC4grkrygo&s=10' },
  },
  {
    id: '4',
    titulo: 'Auriculares Bluetooth',
    precio: 15000,
    descripcion: 'Auriculares inalámbricos con cancelación de ruido.',
    imagen: { uri: 'data:image/jpeg;base64,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' },
  },
];

export default function Galeria() {
  const [filtro, setFiltro] = useState<string>('');
  const [favoritos, setFavoritos] = useState<string[]>([]); 
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [resizeMode, setResizeMode] = useState<ImageResizeMode>('cover');

  
  const productosFiltrados = PRODUCTOS.filter((p) =>
    p.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const abrirDetalle = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setResizeMode('cover'); 
    setModalVisible(true);
  };

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: Producto }) => {
    const esFavorito = favoritos.includes(item.id);
    return (
      <Pressable
        onPress={() => abrirDetalle(item)}
        onLongPress={() => toggleFavorito(item.id)}
        style={({ pressed }) => [
          styles.card,
          esFavorito && styles.cardFavorito,
          pressed && styles.cardPresionada,
        ]}
      >
        <Image source={item.imagen} style={styles.thumbnail} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.titulo}>
            {esFavorito ? '⭐ ' : ''}
            {item.titulo}
          </Text>
          <Text style={styles.precio}>${item.precio}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Galería de Productos</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por título..."
        value={filtro}
        onChangeText={setFiltro}
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vacio}>No se encontraron productos.</Text>
        }
      />

      {}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            {productoSeleccionado && (
              <>
                <Image
                  source={productoSeleccionado.imagen}
                  style={styles.imagenGrande}
                  resizeMode={resizeMode}
                />
                <Text style={styles.modalTitulo}>{productoSeleccionado.titulo}</Text>
                <Text style={styles.modalDescripcion}>
                  {productoSeleccionado.descripcion}
                </Text>

                {/* Botones para cambiar el resizeMode */}
                <View style={styles.botonesResize}>
                  {(['cover', 'contain', 'stretch'] as ImageResizeMode[]).map((modo) => (
                    <Pressable
                      key={modo}
                      onPress={() => setResizeMode(modo)}
                      style={[
                        styles.botonResize,
                        resizeMode === modo && styles.botonResizeActivo,
                      ]}
                    >
                      <Text
                        style={[
                          styles.textoBotonResize,
                          resizeMode === modo && styles.textoBotonResizeActivo,
                        ]}
                      >
                        {modo}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable
                  style={styles.botonCerrar}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textoBotonCerrar}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cardFavorito: {
    borderWidth: 2,
    borderColor: '#f5a623',
  },
  cardPresionada: {
    opacity: 0.7,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
  },
  precio: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  vacio: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContenido: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  imagenGrande: {
    width: 220,
    height: 220,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalDescripcion: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  botonesResize: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  botonResize: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginHorizontal: 4,
  },
  botonResizeActivo: {
    backgroundColor: '#333',
  },
  textoBotonResize: {
    color: '#333',
  },
  textoBotonResizeActivo: {
    color: '#fff',
  },
  botonCerrar: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotonCerrar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
