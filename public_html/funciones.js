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
    carton.setAttribute("border", "1");
   var capa = document.getElementById("ladoDerecho");
  
    for (var i = 0, max = 3; i < max; i++) {
        var columna = document.createElement("tr");
        for (var j = 0, max = 9; j < max; j++) {
            var celda = document.createElement("td");
            columna.appendChild(celda);
        }        
        carton.appendChild(columna);
    }
    capa.appendChild(carton);
    document.getElementsByTagName("")
}
