
//Objeto elevador: Almacena la información necesaria para el funcionamiento del elevador
var elevador = {
	arrayPisos: [],
	pisoInicial: 4,
	sentido: 1,
	mapaPisos:{5:2, 29:10, 13:4, 10:1},
   pisoActual: 0,
   arrayPisosSubida: [],
   arrayPisosBajada: []
}

//Iterador de cada acción del elevador
var iterador = 1;



//Metodo que va a iniciar el recorrido del elevador
/**
 * Por medio de un aserie de validaciones dentro de un metodo Do-While
 * se va implementado cada uno de los metodos necesarios para la función 
 * óptima del elevador
 */
iniciarElevador = () => {
   elevador.pisoActual = elevador.pisoInicial;
   inicializacionPisos();
   mostrarAccionElevador(iterador, elevador.pisoActual, 5);
   do {
      var tamanoArrayPisos = elevador.arrayPisos.length;
      //console.log("Tamaño arrayPisos ====> " +tamanoArrayPisos);
      var pisoParadaSubiendo = elevador.arrayPisosSubida[0];
      var pisoParadaBajando = elevador.arrayPisosBajada[0];
      var pisoActual = elevador.pisoActual;
      var sentido = elevador.sentido;
      if(sentido == 1){
         if(pisoActual == pisoParadaSubiendo ){
            //console.log("Entra al if 1");
            iterador+= 1
            mostrarAccionElevador(iterador, 0, 2);
            gestionandoPisos(pisoActual);
            //elevador.pisoActual += 1;
            iterador+=1
            mostrarAccionElevador(iterador, 0, sentido);//
            elevador.arrayPisosSubida.splice(0, 1);
            cambiarDIreccionElevador();
         }
         if(pisoActual !== pisoParadaSubiendo) {
            //console.log("Entra al if 2");
            iterador+=1;
            mostrarAccionElevador(iterador, pisoActual+1, 5);
            elevador.pisoActual += 1;
            cambiarDIreccionElevador();
         }
         
      }if(sentido == -1){      
         if(pisoActual == pisoParadaBajando ){
            //console.log("Entra al if 3");
            iterador+= 1
            mostrarAccionElevador(iterador, 0, 2);
            gestionandoPisos(pisoActual);
            //elevador.pisoActual = elevador.pisoActual - 1;
            iterador += 1
            mostrarAccionElevador(iterador, 0, sentido);
            elevador.arrayPisosBajada.splice(0, 1);
            cambiarDIreccionElevador();
         }
         if(pisoActual !== pisoParadaBajando) {
            //console.log("Entra al if ");
            iterador+=1;
            mostrarAccionElevador(iterador, pisoActual, 5);
            elevador.pisoActual = elevador.pisoActual - 1;
            cambiarDIreccionElevador();
         }
      } 
    } while (tamanoArrayPisos > 0);
}


/**
 * Metodos que al ser llamado cambia el valor de la dirección del elevador
 */
cambiarDIreccionElevador = () => {
   //console.log("array subida tamaño  ============================> " + elevador.arrayPisosSubida.length);
   //console.log("array bajada tamaño  ============================> " + elevador.arrayPisosBajada.length);
   if(elevador.arrayPisosSubida.length == 0 || elevador.pisoActual > 29){
      //console.log("cambio de subida a bajada");
      elevador.sentido = -1;
   }else if (elevador.arrayPisosBajada.length == 0 || elevador.pisoActual <= 1){
      //console.log("cambio a bajada subida");
      elevador.sentido = 1;
   }else{
      return;
   }
}

/**
 * Método encargado de organizar los pisos de entrada inicales con el fin de optimizar el
 * recorrido del elevador
 */
inicializacionPisos = async () => {
   var pisosInicio = elevador.arrayPisos;
   var tamanoArrayPisosInicio = pisosInicio.length;
   var pisoActual = elevador.pisoActual;
   for(var i = 0; i < tamanoArrayPisosInicio; i++){
      if(pisoActual > pisosInicio[i]){
         organizarArrayPisosBajada(pisosInicio[i]);
      }else if(pisoActual < pisosInicio[i]){
         organizarArrayPisosSubida(pisosInicio[i]);
      }else{
         i = i;
      }
   }
}



//Metodo que recibe como argumento el número de piso y lo agrega al arreglo de pisos
insertarNuevoPiso = (piso) => {
   elevador.arrayPisos.push(piso); 
   iterador += 1;
   mostrarAccionElevador(iterador, piso, 4);
}

/**
 * Método que recibe como argumento el número del piso donde se detiene el ascensor,
 * Verifica en el mapa de piso ingresados, toma le valor de la clave y lo inserta en el 
 * array de pisos que debe visitar el elevador, a su vez elimina del mapa de pisos
 * y el array de pisos el piso donde ya se detuvo el elevador
 */
gestionandoPisos = (pisoDetenido) => {
   var pisoNuevo = elevador.mapaPisos[pisoDetenido];
   if(pisoNuevo !== undefined){
      insertarNuevoPiso(pisoNuevo);
      recorridoPisosPorDireccion(pisoDetenido);
      delete elevador.mapaPisos[pisoDetenido];
      var index = elevador.arrayPisos.indexOf(pisoDetenido);
      elevador.arrayPisos.splice(index,1);
   }else{
      var index = elevador.arrayPisos.indexOf(pisoDetenido)
      elevador.arrayPisos.splice(index,1);
   }   
}


/**
 * Metodo recibe como argumento el piso nuevo para agregarlo al arreglo de
los pisos en bajada y luego ordenar el arreglo. Esto permite seguir un orden secuencial
en las paradas de bajada del elevador
 */
organizarArrayPisosBajada = (piso) => {
   elevador.arrayPisosBajada.push(piso);
   elevador.arrayPisosBajada.sort((a, b) => b - a );
   for(var i = 0; i < elevador.arrayPisosBajada.length; i++){
      //console.log("bajada ===> "+ elevador.arrayPisosBajada);
   }
}


/**
 * Metodo recibe como argumento el piso nuevo para agregarlo al arreglo de
los pisos en bajada y luego ordenar el arreglo. Esto permite seguir un orden secuencial
en las paradas de bajada del elevador
 */
organizarArrayPisosSubida = (piso) => {
   elevador.arrayPisosSubida.push(piso);
   elevador.arrayPisosSubida.sort((a, b) => a - b );
   for(var i = 0; i < elevador.arrayPisosSubida.length; i++){
     // console.log("subida ===> "+ elevador.arrayPisosSubida);
   }
}


/**
 * Metodo que al ser llamado organiza de acuerdo a la dirección en la que se esté moviendo el levador
 * los arreglos necesarios para que el recorrido se optimice
 */
recorridoPisosPorDireccion = (pisoActual) => {
   var pisos = elevador.arrayPisos;
   var sentido = elevador.sentido;
   var pisoNuevo = pisos[pisos.length - 1];
   //console.log("Piso nuevo ======> " + pisoNuevo);
   switch (sentido) {
      case 1:
         if(pisoActual > pisoNuevo){
            organizarArrayPisosBajada(pisoNuevo);
         }else{
            organizarArrayPisosSubida(pisoNuevo);
         }
         break;
      case -1:
         if(pisoActual < pisoNuevo){
            organizarArrayPisosSubida(pisoNuevo);
         }else{
            organizarArrayPisosBajada(pisoNuevo);
         }
         break;
      default:
         break;
   };
};


/**
 * Método que recibe los pisos a detenerse el elevador y los ingresa en el array de pisos del
 * elevador 
 */
setArrayPisos = (pisos) => {
	var arrayPisos = pisos.split(",");
	for(var i = 0; i < arrayPisos.length; i++){
      elevador.arrayPisos[i] = parseInt(arrayPisos[i]);
	}
}

/**
 * Este método recibe como argumento la iteracción de la acción del elevador, el piso
 * que se detiene, que sigue o que se ingresa y un validador que permite según su valor
 * que mensaje se va a mostrar en la terminal. El validor tiene 5 casos que se explican a continuación:
 * 
 * Caso 1: Elevador se detiene
 * Caso 2: Elevador subiendo
 * Caso 3: elevador bajando
 * Caso 4: Piso ingresado
 * Caso 5: elevador en piso
 */

mostrarAccionElevador = (i, piso, validador) => {
   switch (validador) {
      case 2:
         console.log(i + ". Elevador se detiene");
         break;
      case 1:
         console.log(i + ". Elevador subiendo " );
         break;
      case -1:
         console.log(i + ". Elevador bajando " );
         break;
      case 4:
         console.log(i + ". Piso ingresado " + piso);
         break;
      case 5:
         console.log(i + ". Elevador en piso " + piso);
         break;
      default:
         break;
   }
}

module.exports = {
   iniciarElevador,
   setArrayPisos
};