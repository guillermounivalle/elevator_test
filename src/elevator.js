
//Objeto elevador: Almacena la información necesaria para el funcionamiento del elevador
var elevador = {
	arrayPisos: [5,29,13,10],
	pisoInicial: 4,
	sentido: 1,
	mapaPisos:{5:2, 29:10, 13:1, 10:1},
   pisoActual: 0,
   arrayPisosSubida: [],
   arrayPisosBajada: []
}




//Metodo que va a iniciar el recorrido del elevador
iniciarElevador = () => {
      
}

//Metodo que recibe como argumento el número de piso y lo agrega al arreglo de pisos
insertarNuevoPiso = (piso) => {
   elevador.arrayPisos.push(piso); 
}


gestionandoPisos = (pisoDetenido) => {
   var pisoNuevo = elevador.mapaPisos[pisoDetenido];
   insertarNuevoPiso(pisoNuevo);
   delete elevador.mapaPisos[pisoDetenido];
   delete elevador.arrayPisos[0];
}


/**
 * Metodo recibe como argumento el piso nuevo para agregarlo al arreglo de
los pisos en bajada y luego ordenar el arreglo. Esto permite seguir un orden secuencial
en las paradas de bajada del elevador
 */
organizarArrayPisosBajada = (piso) => {
   elevador.arrayPisosBajada.push(piso);
   elevador.arrayPisosBajada.sort((a, b) => b - a );
}


/**
 * Metodo recibe como argumento el piso nuevo para agregarlo al arreglo de
los pisos en bajada y luego ordenar el arreglo. Esto permite seguir un orden secuencial
en las paradas de bajada del elevador
 */
organizarArrayPisosSubida = (piso) => {
   elevador.arrayPisosSubida.push(piso);
   elevador.arrayPisosSubida.sort((a, b) => a - b );
}


/**
 * Metodo que al ser llamado organiza de acuerdo a la dirección en la que se esté moviendo el levador
 * los arreglos necesarios para que el recorrido se optimice
 */
recorridoPisosPorDireccion = () => {
   var pisoActual = elevador.pisoActual;
   var pisos = elevador.arrayPisos;
   var direccion = elevador.direccion;
   var pisoNuevo = pisos[pisos.length - 1];
   switch (direccion) {
      case 1:
         if(pisoActual < pisoNuevo){
            organizarArrayPisosBajada(pisoNuevo);
         }else{
            organizarArrayPisosSubida(pisoNuevo);
         }
         break;
      case -1:
         if(pisoActual > pisoNuevo){
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
	elevador.arrayPisos = pisos.split(",");
	for(var i = 0; i < elevador.arrayPisos.length; i++){
		console.log("=============> piso " + elevador.arrayPisos[i]);
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
      case 1:
         console.log(i + ". Elevador se detiene");
         break;
      case 2:
         console.log(i + ". Elevador subiendo");
         break;
      case 3:
         console.log(i + ". Elevador bajando");
         break;
      case 4:
         console.log(i + ". Piso ingresado " + piso);
         break;
      case 5:
         console.log(i + ". Elevador en el piso " + piso);
         break;
      default:
         break;
   }
}

module.exports = {
   iniciarElevador,
   setArrayPisos
};