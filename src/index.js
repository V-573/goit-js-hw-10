// index.js

import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Establecer la llave en la cabecera común para todas las solicitudes de axios
axios.defaults.headers.common['x-api-key'] = 'live_0tBTVABZQ2uyltbXjjM23VNPLgBsBxdLjvcGlIaoHFH8b8nRyyGXzmJ5XUVdJRlx';


document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('select.breed-select');
  const catInfoDiv = document.querySelector('div.cat-info');

  // Cargar la lista de razas al cargar la página
  try {
    const breeds = await fetchBreeds();

    // Rellenar el select con las opciones de las razas
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error(`Error al cargar la lista de razas: ${error.message}`);
  }

  // Manejar el cambio en el select
  breedSelect.addEventListener('change', async () => {
    const selectedBreedId = breedSelect.value;

    try {
      // Realizar la petición para obtener información sobre el gato
        const catData = await fetchCatByBreed(selectedBreedId);

        console.log('Respuesta de fetchCatByBreed:', catData);// me doy cuenta del tipo de dato. pensaba inicialmente que era un array y cuando hice esto vi que era un objeto

      // Limpiar el contenido anterior del div.cat-info
      catInfoDiv.innerHTML = '';

      // Iterar sobre la lista de datos de gatos y mostrar información
     

      // Mostrar información adicional del primer gato (puedes ajustar según necesites)
        catInfoDiv.innerHTML += `
         <p><strong>Nombre de la raza:</strong> ${catData.breeds[0].name}</p>
         <img src="${catData.url}" alt="${catData.id}">
         <p><strong>Descripción:</strong> ${catData.breeds[0].description}</p>
         <p><strong>Temperamento:</strong> ${catData.breeds[0].temperament}</p>
      `;
       
    } catch (error) {
      console.error(`Error al obtener información del gato: ${error.message}`);
    }
  });
});
