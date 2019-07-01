
class Operador{

	constructor(nombre,edad,mail){
		this.nombre=nombre;
		this.edad=edad;
		this.mail=mail;
	}
	toString(){
		return this.nombre +" "+"(" + this.edad +")"+" "+ this.mail;
		}

	compararEdad (Otro){
		return this.edad - Otro.edad;
 	}

	compararNombre  (Otro){
		return this.nombre.localeCompare(Otro.nombre);
	}

} //

class Llamadas {
	constructor (numeroLlamada, operador, descripcion, motivo, duracion, celular){
		this.numeroLlamada = numeroLlamada;
		this.operador = operador;
		this.descripcion = descripcion;
		this.motivo = motivo;
		this.duracion = duracion;
		this.celular = celular;
	}

	compararNumero(Otro){
		return this.numeroLlamada - Otro.numeroLlamada;
	}

	compararNombreNumero(Otro){
		let dif = this.operador.localeCompare(Otro.operador);
		if (dif == 0){
			dif = this.numeroLlamada - Otro.numeroLlamada;
		}
		return dif;
	}

}



class TeleCentro {
	constructor(){
		this.lista = [];
		this.listaLlamadas = [];
		this.listaConsulta = [];
	}
	agregar(Elemento){
		this.lista.push(Elemento);

	}

	darTodos(){	
		return this.lista;

	}

	ExisteUnaVez(operador){
		let seRepite = false;
		let nombres = [];
 		for (let elemento of this.lista){
 			nombres.push(elemento.nombre);
 		}
 			if (nombres.includes(operador)){
 				seRepite = true;
 				
 			}
 	return seRepite;

	}
	
 	soloNombre(){
 		let nombres = [];
 		for (let elemento of this.lista){
 			nombres.push(elemento.nombre);
 		}
 		return nombres;

 	}
		
	ordenarPorEdad(){
		return	this.lista.sort(function(a,b){
				return a.compararEdad(b);
			});
	}

	ordenarPorNombre(){
		return	this.lista.sort (function(a,b){
				return a.compararNombre(b);
			});
		}	
	


	agregarTabla(Elemento){
		this.listaLlamadas.push(Elemento);
	}


	darTodosLlamadas(){
		return this.listaLlamadas;
	}



	ordenarPorNumero(){
		return this.listaLlamadas.sort(function(primero,segundo){
			return primero.compararNumero(segundo);
		});
	}

	ordenerPorNombreNumero(){
		return this.listaLlamadas.sort(function(primero,segundo){
			return primero.compararNombreNumero(segundo);
		});
	}



	consultaPromedio (){
		let datos = this.darTodosLlamadas();
		let elegido = document.getElementById("idCombo2").value;
		let promedio = 0;
		let nroLlamada = 0 ;
		for(let elemento of datos){
			if(elemento.operador === elegido){
				promedio = promedio + parseInt(elemento.duracion);
				nroLlamada ++;
			}
		}
		promedio = promedio / nroLlamada;
		return promedio;
	}


	llamadaMasLarga(){
		let datos = this.darTodosLlamadas();
		let elegido = document.getElementById("idCombo2").value;
		let maximo = 0;
		let numero =0
		for(let elemento of datos){
			if(elemento.operador === elegido){
				if(elemento.duracion > maximo){
				maximo = elemento.duracion;
				numero = elemento.numeroLlamada;
				}
			}
		}
		let resultado =  "Numero " + numero + " Duracion " + maximo; 
		return resultado;
	}

	agregarListaDuracion(duraciones){
		let datos = this.darTodosLlamadas();
		let cumplen = [];
		for(let elemento of datos){
			if(parseInt(elemento.duracion) == duraciones){
				cumplen.push(elemento.operador);
			}

		}
		return cumplen;
	}

	palabrasCoinciden(palabras){	//devuelve lista de llamadas que cumplen
		let datos = this.darTodosLlamadas();
		let cumplen = [];
		let frase = this.pasarArray(palabras);
		let llamadasCumplen = [];

		for (let elemento of datos ){
			let arr = this.pasarArray(elemento.descripcion);
			for(let i=0; i<arr.length ;i++){
				for (let j= 0 ; j<frase.length ; j++){
					if(arr[i] === frase[j]){
					cumplen.push(arr[i]);
					}
				}
			}
			if(cumplen.length >= Math.trunc((arr.length/2)+1)){
				llamadasCumplen.push(elemento);
			}
			cumplen=[];
		}
	return llamadasCumplen;
	}




	pasarArray(palabras){ 		//pasa de string a array
		let aux = "";
		let arrayPalabras = [];
		for(let i = 0 ; i<= palabras.length ; i++){
			if(palabras[i]== " "|| i === palabras.length){
				arrayPalabras.push(aux);
				aux = "";
			}
			else if(palabras[i] != " "){
				aux = aux + palabras[i].toLowerCase();
			}
		}
		return arrayPalabras;
	}
}