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
	document.getElementById("idDistribucion").addEventListener("click",PieChart);
	

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
		img.src = "img/Numero"+numero+".png"
			img.alt = "imagen motivo "+numero;
			img.width = 30;
			img.height = 30;
		celda4.appendChild(img); 	
		let celda5 = fila.insertCell();
		celda5.textContent = datos[i].duracion;
		let celda6 = fila.insertCell();
		celda6.textContent = datos[i].celular;
	}
}


function consultaPorHistoria(){
	if(telecentro.darTodosLlamadas().length == 0){
		alert("No hay llamadas");
	}
	else{
		document.getElementById("idPromedio").innerHTML = "Tiempo promedio de atencion:" +" " +telecentro.consultaPromedio();
		document.getElementById("idLlamadaMasLarga").innerHTML =  "Llamada mas larga:" + " " + telecentro.llamadaMasLarga();
		//document.getElementById("Motivo").innerHTML = "Motivo no atendió:" + " " +
	 	imagenesDeMotivos();
	}
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
		img.src = "img/Numero"+numero+".png"
			img.alt = "imagen motivo "+numero;
			img.width = 30;
			img.height = 30;
		celda4.appendChild(img); 
		let celda5 = fila.insertCell();
		celda5.textContent = llamadas[i].duracion;
		let celda6 = fila.insertCell();
		celda6.textContent = llamadas[i].celular;
	}
}


function imagenesDeMotivos (){
	let motivos = telecentro.motivosNoAtendio();
	let parrafo = document.getElementById("idMotivosNoAtendio");
	parrafo.innerHTML = "";
	let fotos = [];
	
	for (let i = 1 ; i <= 6; i++){

		if(motivos.includes(i)){
		let img = document.createElement("img");
		img.src = "img/Numero" + i +".png"
		img.alt = "imagen motivo "+ i;
		img.width = 30;
		img.height = 30;
		parrafo.appendChild(img);

		}
	}
	return "Motivo no atendió:" + " " +parrafo;
}



function PieChart(){
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


	function drawChart() {
		if(telecentro.darTodosLlamadas().length == 0){
			alert("No hay llamadas")
		}
		else{
			let datos = telecentro.soloOperador(); //array de todas las llamadas solo con los operadores
			let cantidad = 1;
			let arrDatos=[];
			for(let i=0;i < datos.length;i++){
				if(arrDatos.includes(datos[i])==false){ //para evitar que em agregue un operador varias veces en el array
					for (let j=1 ;j< datos.length; j++){
						if(datos[i] == datos[j]){ //si los operadores coinciden, contador++
							cantidad++
						}
					
					}
					arrDatos.push(datos[i]); 
					arrDatos.push(cantidad);//crea el array de forma [operador,numero]
					cantidad = 0;
				}	
			}
			let data =new google.visualization.DataTable();
			data.addColumn("string","operadores"); 
			data.addColumn("number","numero de llamadas"); //agrega ambas columnas la primera con type string y la segunda con type number
			data.addRows(arrDatos.length);
			for(let i= 0;i<arrDatos.length-1;i=i+2){
				data.setCell(i,0,arrDatos[i]);//
				data.setCell(i,1,arrDatos[i+1]);//parseInt(arrDatos[i+1])	
			}
			var options = {
				title: '% distribucion de llamadas',
				animation: {
					duration: 1000,
					easing: 'in',
					startup: true
				}
			};
			var chart = new google.visualization.PieChart(document.getElementById('idChart'));
			chart.draw(data, options);
		}
	}
}