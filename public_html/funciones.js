/*********************************
 Autor: Alamillo Arroyo, Sara
 Fecha creación: 27/01/2015
 Última modificación: 14/02/2015
 Versión: 1.00
 *********************************/
/**
 * Almacena los números que ya han salido en el bombo
 * @type Array
 */
var numerosSalidosBombo;
/**
 * Asigna a un objeto una función cuando se produzca un evento
 * @type Function
 */
var crearEvento = function () {
    function crearEvento(objeto, evento, funcion) {
	objeto.addEventListener(evento, funcion, false);
    }
    if (typeof window.addEventListener !== 'undefined') {
	return crearEvento;
    }
}();
/**
 * Comprueba si el valor del campo numJugadores está comprendido entre 5 y 20
 */
function validarJugadores() {
    if ($("#numJugadores").val() < 5 || $("#numJugadores").val() > 20) {
	$("#numJugadores").val("");
    }
}
/**
 * Comprueba si el valor del campo valCarton está comprendido entre 1 y 5
 */
function validarValor() {
    if ($("#valCarton").val() < 1 || $("#valCarton").val() > 5) {
	$("#valCarton").val("");
    }
}
/**
 * Muestra por pantalla el bombo, el cartón y comienza el juego
 */
function iniciarBingo() {
    if ($("#numJugadores").val() == "" || $("#valCarton").val() == "") {
	alert("Debe establecer un valor para el cartón y un número de jugadores.");
    } else {
	$("#numJugadores").attr("readonly", "true");
	$("#valCarton").attr("readonly", "true");
	$("#bEnviar").attr("disabled", "true");
	dibujarBombo();
	dibujarCarton();
	numerosSalidosBombo = [];
	comenzarJuego();
    }
}

/**
 * Contiene el identificador del intervalo 
 * @type Number
 */
var intervalo;
/**
 * Comienza el intervalo para que se muestren los números del bombo al usuario
 */
function comenzarJuego() {
    intervalo = setInterval(getNumeroBombo, 1500);
}
/**
 * Obtiene del servidor el número aleatorio para el bombo
 */
function getNumeroBombo() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    if (numerosSalidosBombo.indexOf(xmlhttp.responseText) == -1) {
		$("#bombo").text(xmlhttp.responseText);
		numerosSalidosBombo.push(xmlhttp.responseText);
	    } else {
		return getNumeroBombo();
	    }
	}
    }
    xmlhttp.open("POST", "bombo.php", true);
    xmlhttp.send()
}
/**
 * Crea la capa para mostrar los números aleatorios del bombo
 */
function dibujarBombo() {
    $("#ladoDerecho").append("<br />");
    $("#ladoDerecho").append("<div id='bombo'> </div>");
    $("#ladoDerecho").append("<br />");
    
}
/**
 * Crea el cartón, asignando los eventos a las casillas correspondientes, y muestra un botón debajo del cartón
 */
function dibujarCarton() {
    aleatoriosExistentes = []
    $("#ladoDerecho").append(function () {
	var html = "<table id='carton'>";
	for (var i = 0, max = 3; i < max; i++) {
	    html += "<tr>";
	    var huecos = huecosVacios();
	    for (var j = 0, max2 = 9; j < max2; j++) {
		html += "<td";
		if (huecos.indexOf(j) != -1) {
		    html += " class='numOculto'>";
		} else {
		    html += " class='numero'>";
		    html += getNumeroAleatorio(j);
		}
		html += "</td>";
	    }
	    html += "</tr>";
	}
	html += "</table>";
	return html;
    }
    );
    
    $("#carton td").each(function () {
	if ($(this).hasClass("numero")) {
	    $(this).click(marcarCelda);
	}
    });
    
    $("#ladoDerecho").append("<br />");
    $("#ladoDerecho").append("<div id='boton'><button>¡Bingo!</button></div>");
    $("#boton button").click(cantarBingo);
}
/**
 * Comprueba si el bingo se ha cantado correctamente o no
 */
function cantarBingo() {
    clearInterval(intervalo);
    var numerosUsuario = [];
    $("#carton td").each(function () {
	if ($(this).hasClass("marcado")) {
	    numerosUsuario.push($(this).text());
	}
    });
    
    if (comprobarCarton(numerosUsuario)) {
	var ventana = window.open("bingoCorrecto.html", "_blank", "width=700,height=400");
	ventana.onload = function () {
	    ventana.document.getElementById('premio').innerHTML = calcularPremio();
	};
    } else {
	window.open("bingoIncorrecto.html", "_blank", "width=550,height=250");
    }
}
/**
 * Calcula el valor del premio
 * @returns Number Valor del premio
 */
function calcularPremio() {
    return (document.getElementById("numJugadores").value * document.getElementById("valCarton").value) * 0.8;
}
/**
 * Comprueba si los números que ha marcado el usuario han salido el bombo previamente
 * @param Array numerosUsuario Contiene los números que ha marcado el usuario
 * @returns Boolean Devuelve TRUE si los números del usuario han salido en el bombo y FALSE en caso contrario
 */
function comprobarCarton(numerosUsuario) {
    var filas = 3;
    var columnas = 9;
    var huecos = 4;
    var casillasSeleccionadas = eval(columnas * filas - huecos * filas);
    
    if (numerosUsuario.length != casillasSeleccionadas) {
	return false;
    } else {
	for (var i = 0, max = numerosUsuario.length; i < max; i++) {
	    if (numerosSalidosBombo.indexOf(numerosUsuario[i]) == -1) {
		return false;
	    }
	}
	return true;
    }
}
/**
 * Si una celda está marcada, la desmarca y viceversa
 */
function marcarCelda() {
    if (this.classList.contains("marcado")) {
	this.classList.remove("marcado");
	this.classList.add("numero");
    } else {
	this.classList.remove("numero");
	this.classList.add("marcado");
    }
}
/**
 * Contiene los números que se han generados para las casillas del cartón
 * @type Array
 */
var aleatoriosExistentes;
/**
 * Devuelve un número aleatorio según la columna del cartón
 * @param Number columna Número de la columna del cartón
 * @returns Number Número aleatorio
 */
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
	if (columna == 0) {
	    max--;
	}
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
/**
 * Devuelve un número aleatorio dentro de un intervalo
 * @param Number min Mínimo en el intervalo
 * @param Number max Máximo en el intervalo
 * @returns Number Número aleatorio
 */
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Generada cuatro posiciones numéricas
 * @returns Array Posiciones para los huecos
 */
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