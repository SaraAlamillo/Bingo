/*********************************
 Autor: Alamillo Arroyo, Sara
 Fecha creación: 27/01/2015
 Última modificación: 27/01/2015
 Versión: 1.00
 *********************************/

var numJugadores;
var valCarton;

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
    numJugadores = document.getElementById("numJugadores").value;
    valCarton = document.getElementById("valCarton").value;
    dibujarCarton();
    alert("ok");
}
function dibujarCarton() {
    var carton = document.createElement("table");
   var ventana = document.getElementsByName("frameCarton")[0].body;
   alert(ventana.getElementById("prueba").innerHTML);
    for (var i = 0, max = 3; i < max; i++) {
        var columna = document.createElement("tr");
        for (var i = 0, max = 9; i < max; i++) {
            var celda = document.createElement("td");
            columna.appendChild(celda);
        }        
        carton.appendChild(columna);
    }
    ventana.appendChild(carton);
}
