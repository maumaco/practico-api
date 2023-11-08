# Aplicación web de clima y transporte

_Aplicación para obtener datos del clima y transporte. Desarrollada con React._


## Tabla de contenidos

* [Requisitos](#requisitos)
* [Instruciones de uso](#instrucciones)
* [Dependencias](#dependencias)
* [API](#api)
* [Mejoras](#mejoras)
* [Recursos](#recursos)
* [Agradecimientos](#agradecimientos)


<a id="requisitos"></a>
## Requisitos

* Navegador web


<a id="instrucciones"></a>
## Instruciones de uso

* Accedé a https://maumaco.github.io/practico-api/
* Si querés actualizar los datos, recargá la página


<a id="dependencias"></a>
## Dependencias

* [React](https://react.dev/)
* [React Leaflet](https://react-leaflet.js.org/)


<a id="api"></a>
## API

* [Weather Forecast API](https://open-meteo.com/en/docs)
* [Air Quality API](https://open-meteo.com/en/docs/air-quality-api)
* [API Transporte](https://buenosaires.gob.ar/desarrollourbano/transporte/apitransporte)


<a id="mejoras"></a>
## Mejoras a desarrollar


### Generales

* ~~Corregir advertencias sobre las dependencias del hook personalizado `useFetch(url)`~~
* Especificar el lugar del cual se muestran los datos (clima y transporte)
* Agregar la posibilidad de recargar los componentes de manera aislada (sin recargar la página completa)
* Agregar posibles acciones a los mensajes de error y advertencias (recargar la página, recargar el componente, probar más tarde, etc.)
* Agregar estilos para dar soporte a la visualización vertical (`orientation: portrait`)
* Disminuir el tamaño de la fuente, rellenos y márgenes a medida que el tamaño de la interfaz sea menor (`@media`)
* Mejorar el estilo general (aprovechar mejor el espacio, incorporar nuevas fuentes, ampliar la paleta de colores, incorporar imágenes)


### El clima

* Desarrollar funcionalidad para poder elegir y mostrar la información del clima de otros lugares (localidades, provincias y países)
* Sincronizar el valor del componente "Fecha y hora" con el día y hora del dispositivo de acceso
* Mejorar la visualización del gráfico de barras del componente "La temperatura hoy"
* Mejorar la visualización del dial de los componentes "Radiación ultravioleta" y "Calidad del aire"
* Crear función para convertir metros (m) a kilómetros (km) (componente "Visibilidad")
* ~~Agregar `fetch` para obtener los datos del componente "Calidad del aire" desde Air Quality API~~
* ~~Realizar los `fetch` a Weather Forecast API y Air Quality API usando el hook personalizado `useFetchState`~~


### El transporte

* ~~Obtener la lista de colectivos para seleccionar con un `fetch` a API Transporte~~
* Mejorar el ordenamiento de los colectivos en el menú desplegable
* Centrar el mapa y definir el zoom del componente BusMap en función de las coordenadas de los colectivos a mostrar
* En caso de que el `status` de la respuesta de un `fetch` sea un código HTTP 500 ("Server error"), volver a reintentar el `fetch` automáticamente
* Reemplazar el ícono que marca la ubicación por un algún ícono específico de transporte
* Crear función para convertir metros por segundo (m/s) a kilómetros por hora (km/h) (popups del componente BusMap)


<a id="recursos"></a>
## Recursos

* [Aprende React](https://es.react.dev/learn)
* [Referencia de la API de React](https://es.react.dev/reference/react)
* [React Lealeft: Getting started](https://react-leaflet.js.org/docs/start-introduction/)
* [React Lealeft: Public API](https://react-leaflet.js.org/docs/api-map/)
* [Weather Forecast API Documentation](https://open-meteo.com/en/docs)
* [Air Quality API Documentation](https://open-meteo.com/en/docs/air-quality-api)
* [API Transporte](https://datosabiertos-apis.buenosaires.gob.ar/BA_Root/Documentacion?schema_name=Transporte_3)


<a id="agradecimientos"></a>
## Agradecimientos

A todas las personas que hacen posible y desarrollan el curso "Programación web front-end", a la [Facultad de Matemática, Astronomía, Física y Computación](https://www.famaf.unc.edu.ar/) y a [Argentina Programa](https://www.argentina.gob.ar/economia/conocimiento/argentina-programa).