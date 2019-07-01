window.addEventListener("load",inicio);

let telecentro = new TeleCentro(); //Crea a telecentro 
var numeroLlamada = 1;  //Para ir numerando las llamadas en la tabla

function inicio(){
	document.getElementById("BotonRegistro").addEventListener("click",AgregarOperador);
	document.getElementById("idNombreRadio").addEventListener("change",mostrarOperadores);  //Para que siempre escuche los radio botones
	document.getElementById("idEdadRadio").addEventListener("change",mostrarOperadores);
	document.getElementById("buttonRegistro").addEventListener("click",AgregarLlamadas);
	document.getElementById("idNumeroMuestra").addEventListener("change",cargarTabla);
	document.getElementById("idNombreMuestra").addEventListener("change",cargarTabla);
	document.getElementById("idConsultarHistoria").addEventListener("click",consultaPorHistoria);
	document.getElementById("idConsultarLlamadas").addEventListener("click",consultaPorLlamada);
	document.getElementById("idBotonPalabras").addEventListener("click", consultaPalabras);
	

} 

function AgregarOperador(){														//Crea una operador para despues de usar en distintos lugares (lista, tabla y combo)
	if(document.getElementById("formRegistroOperadores").reportValidity()){
		let nombre = document.getElementById("idNombreRegistro").value;			
		let edad = document.getElementById("idEdadRegistro").value;
		let mail = document.getElementById("idMailRegistro").value;
		let operador = new Operador(nombre,edad,mail);
		if(telecentro.ExisteUnaVez(nombre)){
			alert("El nombre esta repetido");
		}
		else{
			telecentro.agregar(operador);
		}
		Actualizar();
		document.getElementById("formRegistroOperadores").reset();
	}
}


function Actualizar(){
	mostrarOperadores();
	cargarCombo();
	cargarTabla();
}



function mostrarOperadores(){									//Crea la lista ya ordenada dependiendo que radio boton esta chequeado
	let lista = document.getElementById("ListaOperadores");
	lista.innerHTML = "";
	let datos;
	if(document.getElementById("idEdadRadio").checked){
		datos = telecentro.ordenarPorEdad();
	}
	else{
		datos = telecentro.ordenarPorNombre();
	}
	for (let elemento of datos){
		let node = document.createElement("LI");
		let nodeTexto = document.createTextNode(elemento);
		node.appendChild(nodeTexto);
		lista.appendChild(node);

	}
}


function cargarCombo(){												//Carga el Combo solo con el nombre del operador 
	let combo = document.getElementById("idCombo");
	let combo2 = document.getElementById("idCombo2");
	combo2.innerHTML = "";
	combo.innerHTML = "";
	let datos = telecentro.soloNombre();			
	for(let elemento of datos){
		let node = document.createElement("option");
		let nodeTexto = document.createTextNode(elemento);
		node.appendChild(nodeTexto);
		combo.appendChild(node);

	}															//Carga los dos combos a la vez
	for(let elemento of datos){
		let node = document.createElement("option");
		let nodeTexto = document.createTextNode(elemento);
		node.appendChild(nodeTexto);
		combo2.appendChild(node);
}

}
function AgregarLlamadas(){										//Con los datos ingresados guarda los datos en llamadas

	if(document.getElementById("idformRegistroLlamadas").reportValidity()){
		let operador = document.getElementById("idCombo").value;
		let descripcion = document.getElementById("idDescripciónRegistro").value;
		let motivo = document.getElementById("idMotivoRegistro").value;
		let duracion = document.getElementById("idDuracionRegistro").value;	
		let celular = document.getElementById("idCelularRegistro").value;
		let llamadas = new Llamadas(numeroLlamada, operador, descripcion, motivo, duracion, celular);
		numeroLlamada ++;
		telecentro.agregarTabla(llamadas);						//Para tener una lista de llamadas, usa la funcion en clases
		Actualizar();												//Actualiza y carga todos los datos 
		document.getElementById("idformRegistroLlamadas").reset();
	
	}
}





function cargarTabla(){											//Primero los ordena dependiendo cual boton este apretado
	let tabla = document.getElementById("idTablaLlamadas");
	tabla.innerHTML = "";
	let datos;
	if(document.getElementById("idNumeroMuestra").checked){
		datos = telecentro.ordenarPorNumero();
	}
	else{
		datos = telecentro.ordenerPorNombreNumero();		//Crea la tabla ya ordenada
	}
	for(let i  = 0 ; i< datos.length; i++){
		let fila = tabla.insertRow();
		let celda1 = fila.insertCell();
		celda1.textContent = datos[i].numeroLlamada;
		let celda2 = fila.insertCell();
		celda2.textContent = datos[i].operador;
		let celda3 = fila.insertCell();
		celda3.textContent = datos[i].descripcion;
		let celda4 = fila.insertCell();
		let img = document.createElement("img");
		let numero = parseInt(datos[i].motivo);
		//telecentro.darImagenes(numero);
		switch(numero){
			case 1:
				img.src = "img/Numero1.png"
				img.alt = "imagen motivo 1"
			break
			case 2:
				img.src = "img/Numero2.png"
				img.alt = "imagen motivo 2"
			break
			case 3:
				img.src = "img/Numero3.png"
				img.alt = "imagen motivo 3"
			break
			case 4:
				img.src = "img/Numero4.png"
				img.alt = "imagen motivo 4"
			break
			case 5:
				img.src = "img/Numero5.png"
				img.alt = "imagen motivo 5"
			break
			case 6:
				img.src = "img/Numero6.png"
				img.alt = "imagen motivo 6"
			break

		}
		celda4.appendChild(img); 	
		let celda5 = fila.insertCell();
		celda5.textContent = datos[i].duracion;
		let celda6 = fila.insertCell();
		celda6.textContent = datos[i].celular;
	}
}


function consultaPorHistoria(){
	document.getElementById("idPromedio").innerHTML += " " +telecentro.consultaPromedio();
	document.getElementById("idLlamadaMasLarga").innerHTML += " " + telecentro.llamadaMasLarga();
}


function consultaPorLlamada(){
	let duracion = document.getElementById("idDuracionLlamadas").value;
	let lista = document.getElementById("idconsultaPorDuracion");
	lista.innerHTML = "";
	let datos = telecentro.agregarListaDuracion(duracion);
	for (let elemento of datos){
		let node = document.createElement("LI");
		let nodeTexto = document.createTextNode(elemento);
		node.appendChild(nodeTexto);
		lista.appendChild(node);

	}
}


function consultaPalabras(){
	let palabras = document.getElementById("idPalabrasConsultas").value;
	let llamadas = telecentro.palabrasCoinciden(palabras);
	let tabla = document.getElementById("idtablaPalabras");
	tabla.innerHTML = "";
	for(i = 0; i< llamadas.length;i++){
		let fila = tabla.insertRow();
		let celda1 = fila.insertCell();
		celda1.textContent = llamadas[i].numeroLlamada;
		let celda2 = fila.insertCell();
		celda2.textContent = llamadas[i].operador;
		let celda3 = fila.insertCell();
		celda3.textContent = llamadas[i].descripcion;
		let celda4 = fila.insertCell();
		let img = document.createElement("img");
		let numero = parseInt(llamadas[i].motivo);
		switch(numero){
			case 1:
				img.src = "img/Numero1.png"
				img.alt = "imagen motivo 1"
			break
			case 2:
				img.src = "img/Numero2.png"
				img.alt = "imagen motivo 2"
			break
			case 3:
				img.src = "img/Numero3.png"
				img.alt = "imagen motivo 3"
			break
			case 4:
				img.src = "img/Numero4.png"
				img.alt = "imagen motivo 4"
			break
			case 5:
				img.src = "img/Numero5.png"
				img.alt = "imagen motivo 5"
			break
			case 6:
				img.src = "img/Numero6.png"
				img.alt = "imagen motivo 6"
			break
		}
		celda4.appendChild(img); 
		let celda5 = fila.insertCell();
		celda5.textContent = llamadas[i].duracion;
		let celda6 = fila.insertCell();
		celda6.textContent = llamadas[i].celular;
	}
}





