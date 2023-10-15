import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

// Establecer la llave en la cabecera común para todas las solicitudes de axios
axios.defaults.headers.common['x-api-key'] = 'live_0tBTVABZQ2uyltbXjjM23VNPLgBsBxdLjvcGlIaoHFH8b8nRyyGXzmJ5XUVdJRlx';


new SlimSelect({
    select: '#single',
});
   

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('select.breed-select');
  const catInfoDiv = document.querySelector('div.cat-info');
  const loader = document.querySelector('p.loader');
    const errorElement = document.querySelector('p.error');
    
   
    
    
  // Función para mostrar el cargador y ocultar otros elementos
  function showLoader() {
      loader.style.display = ' inline-block';
    breedSelect.style.display = 'none';
    catInfoDiv.style.display = 'none';
    errorElement.style.display = 'none'; // Ocultar el elemento de error
  }

  // Función para ocultar el cargador y mostrar otros elementos
  function hideLoader() {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
      catInfoDiv.style.display = 'flex';
    
  }

  // Función para mostrar el elemento de error
  function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  // Función para ocultar el elemento de error
  function hideError() {
    errorElement.style.display = 'none';
  }

  // Cargar la lista de razas al cargar la página
  try {
    showLoader(); // Mostrar el cargador antes de la petición
    const breeds = await fetchBreeds();
    
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
        option.textContent = breed.name;
        
      breedSelect.appendChild(option);
    });

    hideLoader(); // Ocultar el cargador después de la petición
  } catch (error) {
    console.error(`Error al cargar la lista de razas: ${error.message}`);
    showError(`Error al cargar la lista de razas: ${error.message}`);
    hideLoader(); // Asegurar que el cargador se oculte incluso en caso de error
  }

  // Manejar el cambio en el select
  breedSelect.addEventListener('change', async () => {
    const selectedBreedId = breedSelect.value;

    try {
      showLoader(); // Mostrar el cargador antes de la petición
      hideError(); // Ocultar el elemento de error antes de la petición
      const catData = await fetchCatByBreed(selectedBreedId);

      // Limpiar el contenido anterior del div.cat-info
      catInfoDiv.innerHTML = '';

  
      // Mostrar información adicional del primer gato
      if (catData.breeds.length > 0) {
          catInfoDiv.innerHTML += `
       
          <img src="${catData.url}" alt="${catData.id}" width="300px"  style="margin:10px 20px 0px 0px">
          <div>
          <p><strong>Nombre de la raza:</strong> ${catData.breeds[0].name}</p>
          <p><strong>Descripción:</strong> ${catData.breeds[0].description}</p>
          <p><strong>Temperamento:</strong> ${catData.breeds[0].temperament}</p>
          </div>`;
      }

      hideLoader(); // Ocultar el cargador después de la petición
    } catch (error) {
      console.error(`Error al obtener información del gato: ${error.message}`);
      showError(`Error al obtener información del gato: ${error.message}`);
      hideLoader(); // Asegurar que el cargador se oculte incluso en caso de error
    }
  });
});
