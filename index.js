
var elevador = {
	arrayPisos: [],
	pisoInicial: 0,
	sentido: 0,
	pisosIngresados:{}
}

const readline = require ('readline');

setArrayPisos = (pisos) => {
	elevador.arrayPisos = pisos.split(",");
	for(var i = 0; i < elevador.arrayPisos.length; i++){
		console.log("=============> piso " + elevador.arrayPisos[i]);
	}
}

let interfazCaptura = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

interfazCaptura.question('Ingrese los pisos que necesita (separados por comas) ', function(respuesta){
	setArrayPisos(respuesta);
	//console.log(`Los pisosseleccionados son ${respuesta}`);
	pregunta2();
	interfazCaptura.close();
});

/**
 * pregunta2 = () => {
	interfazCaptura.question('Ingrese el piso inicial del ascensor ', function(piso){
		pisoInicial=piso;
		console.log("Piso inicial ========> "+ pisoInicial);
	
		interfazCaptura.close();

});
}
 */
 