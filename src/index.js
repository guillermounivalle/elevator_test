//llamando la clase elevator que contiene la lógica del funcionamiento del elevador
const {iniciarElevador, setArrayPisos} = require ('./elevator');

const readline = require ('readline');


inicio = () => {
	let interfazCaptura = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	
	interfazCaptura.question('Ingrese los pisos que necesita (separados por comas) ', function(respuesta){
		setArrayPisos(respuesta);
		iniciarElevador();
		//console.log(`Los pisosseleccionados son ${respuesta}`);
		//pregunta2();
		interfazCaptura.close();
	});
	
}


inicio();



/**
 * pregunta2 = () => {
	interfazCaptura.question('Ingrese el piso inicial del ascensor ', function(piso){
		pisoInicial=piso;
		console.log("Piso inicial ========> "+ pisoInicial);
	
		interfazCaptura.close();

});
}
 */
 