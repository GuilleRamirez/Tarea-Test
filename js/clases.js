
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
	
		//Hasta aca el bloque de Manejo de operador



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

	soloOperador(){
 		let operadores=[];
 		for(let elemento of this.listaLlamadas){
 			operadores.push(elemento.operador)
 		}
 		return operadores;
}


	//Hasta aca el bloque de Manejo de llamadas
	
	


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
		promedio = parseInt(promedio / nroLlamada);
		return promedio;
	}

	motivosNoAtendio(){
		let datos = this.darTodosLlamadas();
		let elegido = document.getElementById("idCombo2").value;
		let motivo;
		let cumplen = [];
		let numeros = [1,2,3,4,5,6];
		

		for (let elemento of datos){
			if (elemento.operador == elegido){
				motivo = elemento.motivo;
				if(!cumplen.includes(elemento.motivo)){
					cumplen.push(motivo);
				}
				
			}
		};
		for(let i= 0; i<cumplen.length;i++){
			for(let j = 0;j<numeros.length;j++){
				if(cumplen[i] == numeros[j]){
					numeros.splice(j,1);
				}
			}
			/*if (numeros.includes(cumplen[i])){
			numeros.splice(numeros.indexOf(parseInt(cumplen[i])));
			alert('splice'+numeros.splice(cumplen[i],1));
			}*/
		}	
		return numeros;
	}



	llamadaMasLarga(){
		let datos = this.darTodosLlamadas();
			let elegido = document.getElementById("idCombo2").value;
			let maximo = 0;
			let numero = 0 ;
			for(let elemento of datos){
				if(elemento.operador === elegido){
					if(parseInt(elemento.duracion) > maximo){
					maximo = parseInt(elemento.duracion);
					numero = elemento.numeroLlamada;
					}
				}
			}
			let resultado =  "Numero " + numero + " Duracion " + maximo; 
			return resultado;
	}

	agregarListaDuracion(duraciones){
		let datos = this.ordenerPorNombreNumero();
		let maximo = 1;
		let cumplen = [];
		for(let elemento of datos){
			if(parseInt(elemento.duracion) == duraciones){
				cumplen.push(elemento.operador);
			}
		}
		let retorno = [];
		let anterior = cumplen[0];
		
		for(let i = 1 ; i <= cumplen.length ; i++){
			let cantidad = 1;
			if (cumplen[i] == anterior){
				cantidad ++ ;
			}
		
			if (cantidad > maximo){
				retorno = [anterior];
				maximo = cantidad;
				
			}
			else{
				if(cantidad == maximo){
					retorno.push(anterior);
					
				}
			}
			anterior = cumplen[i]
		}
		return retorno;

	}

	palabrasCoinciden(palabras){	 //devuelve lista de llamadas que cumplen
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