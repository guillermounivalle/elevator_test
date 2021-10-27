//llamando la clase elevator que contiene la lógica del funcionamiento del elevador
const {iniciarElevador, setArrayPisos} = require ('./elevator');

const readline = require ('readline');


inicio = () => {
		iniciarElevador();	
}

inicio();

