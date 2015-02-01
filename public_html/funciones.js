/*********************************
 Autor: Alamillo Arroyo, Sara
 Fecha creación: 27/01/2015
 Última modificación: 01/02/2015
 Versión: 1.00
 *********************************/

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
    dibujarCarton();
}
function dibujarCarton() {
    var carton = document.createElement("table");
    carton.setAttribute("id", "carton");
   var capa = document.getElementById("ladoDerecho");
   
  
    for (var i = 0, max = 3; i < max; i++) {
        var columna = document.createElement("tr");
        for (var j = 0, max2 = 9; j < max2; j++) {
	    var numAleatorio;
	    switch(j) {
		case 0:
		    numAleatorio = Math.floor((Math.random() * 9) + 1); 
		    break;
		case 1:
		    numAleatorio = Math.floor((Math.random() * 19) + 10); 
		    break;
		case 2:
		    numAleatorio = Math.floor((Math.random() * 29) + 20); 
		    break;
		case 3:
		    numAleatorio = Math.floor((Math.random() * 39) + 30); 
		    break;
		case 4:
		    numAleatorio = Math.floor((Math.random() * 49) + 40); 
		    break;
		case 5:
		    numAleatorio = Math.floor((Math.random() * 59) + 50); 
		    break;
		case 6:
		    numAleatorio = Math.floor((Math.random() * 69) + 60); 
		    break;
		case 7:
		    numAleatorio = Math.floor((Math.random() * 79) + 70); 
		    break;
		case 8:
		    numAleatorio = Math.floor((Math.random() * 90) + 80); 
		    break;
	    }
            var celda = document.createElement("td");
	    var texto = document.createTextNode(numAleatorio);
	    celda.appendChild(texto);
	    celda.classList.add("numero");
            columna.appendChild(celda);
        }        
        carton.appendChild(columna);
    }
    capa.appendChild(carton);
    document.getElementsByTagName("")
}
