/*********************************
 Autor: Alamillo Arroyo, Sara
 Fecha creación: 27/01/2015
 Última modificación: 06/02/2015
 Versión: 1.00
 *********************************/
var numerosCarton;
// Asigna eventos a los diferentes objetos
var crearEvento = function () {
    function crearEvento(objeto, evento, funcion) {
	objeto.addEventListener(evento, funcion, false);
    }

    if (typeof window.addEventListener !== 'undefined') {
	return crearEvento;
    }

}();

function validarJugadores() {
    var valor = document.getElementById("numJugadores").value;
    if (valor < 5 || valor > 20) {
	document.getElementById("numJugadores").value = "";
    }
}

function validarValor() {
    var valor = document.getElementById("valCarton").value;
    if (valor < 1 || valor > 5) {
	document.getElementById("valCarton").value = "";
    }
}

function iniciarBingo() {
    document.getElementById("numJugadores").setAttribute("readonly", "true");
    document.getElementById("valCarton").setAttribute("readonly", "true");
    document.getElementById("bEnviar").setAttribute("disabled", "true");
    dibujarBombo();
    dibujarCarton();
    comenzarJuego();
}
function comenzarJuego() {
    numerosCarton = [];
    setInterval(function () {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var bombo = document.getElementById("bombo");
		if (bombo.childElementCount != 0) {
		    bombo.removeChild(bombo.childNodes[0]);		    
		}
		var p = document.createElement("p");
		var texto = document.createTextNode(xmlhttp.responseText);
		numerosCarton.push(xmlhttp.responseText);
		p.appendChild(texto);
		bombo.appendChild(p);
	    }
	}

	xmlhttp.open("POST", "bombo.php", true);
	xmlhttp.send();
    }, 1000);
}function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

function conectarConElBombo() {
    alert("ok");
    /*var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function () {
     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     var bombo = document.getElementById("bombo");
     var texto = document.createTextNode(xmlhttp.responseText);
     bombo.appendChild(texto);
     }
     }
     
     xmlhttp.open("POST", "bombo.php", true);
     xmlhttp.send();*/
}
function dibujarBombo() {
    var bombo = document.createElement("div");
    bombo.setAttribute("id", "bombo");
    var capa = document.getElementById("ladoDerecho");
    capa.appendChild(bombo);

}
function dibujarCarton() {
    aleatoriosExistentes = []
    var carton = document.createElement("table");
    carton.setAttribute("id", "carton");
    var capa = document.getElementById("ladoDerecho");

    for (var i = 0, max = 3; i < max; i++) {
	var columna = document.createElement("tr");
	var huecos = huecosVacios();
	for (var j = 0, max2 = 9; j < max2; j++) {
	    var celda = document.createElement("td");
	    if (huecos.indexOf(j) != -1) {
		celda.classList.add("numOculto");
	    } else {
		var texto = document.createTextNode(getNumeroAleatorio(j));
		celda.appendChild(texto);
		celda.classList.add("numero");
		crearEvento(celda, "click", marcarCelda);
	    }
	    columna.appendChild(celda);
	}
	carton.appendChild(columna);
    }
    capa.appendChild(carton);
    document.getElementsByTagName("")
}
function marcarCelda() {
    if (this.classList.contains("marcado")) {
	this.classList.remove("marcado");
	this.classList.add("numero");
    } else {
	this.classList.remove("numero");
	this.classList.add("marcado");
    }
}

var aleatoriosExistentes;
function getNumeroAleatorio(columna) {
    var existente = false;
    var max;
    var min;
    if (columna == 0) {
	min = 1;
    } else {
	min = columna * 10
    }
    if (columna == 8) {
	max = min + 10;
    } else {
	max = min + 9;
    }
    var numero;
    do {
	numero = aleatorio(min, max);
	if (aleatoriosExistentes.indexOf(numero) != -1) {
	    existente = true;
	} else {
	    aleatoriosExistentes.push(numero);
	    existente = false;
	}
    } while (existente);
    return numero;
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function huecosVacios() {

    var numeros = [];
    for (var i = 0, max = 4; i < max; i++) {
	var existente = true;
	do {
	    var numero = aleatorio(0, 8);
	    if (numeros.indexOf(numero) == -1) {
		numeros.push(numero);
		existente = false;
	    }
	} while (existente);
    }
    return numeros;
}