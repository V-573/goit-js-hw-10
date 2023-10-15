// cat-api.js

import axios from 'axios';

// Función que realiza la petición HTTP para obtener la lista de razas
export async function fetchBreeds() {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds';

  try {
    const response = await axios.get(apiUrl);

    if (!response.data || response.data.length === 0) {
      console.error('Lista de razas no encontrada o estructura incorrecta.');
      throw new Error('Lista de razas no encontrada o estructura incorrecta.');
    }

    console.log('Lista de razas:', response.data);

    return response.data;
  } catch (error) {
    console.error(`Error al obtener la lista de razas: ${error.message}`);
    throw new Error(`Error al obtener la lista de razas: ${error.message}`);
  }
}

// Función que realiza la petición HTTP para obtener información sobre un gato por identificador de raza
export async function fetchCatByBreed(breedId) {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  try {
    const response = await axios.get(apiUrl);

    if (!response.data || response.data.length === 0) {
      console.error('Datos del gato no encontrados o estructura incorrecta.');
      throw new Error('Datos del gato no encontrados o estructura incorrecta.');
    }

    console.log('Datos completos del gato:', response.data);

    // Devolver el primer elemento del array
    return response.data[0];
  } catch (error) {
    console.error(`Error al obtener información del gato: ${error.message}`);
    throw new Error(`Error al obtener información del gato: ${error.message}`);
  }
}
