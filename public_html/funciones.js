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
    document.getElementById("bEnviar").setAttribute("disabled", "true");
    dibujarCarton();
}
function dibujarCarton() {
    aleatoriosExistentes = []
    var carton = document.createElement("table");
    carton.setAttribute("id", "carton");
    var capa = document.getElementById("ladoDerecho");


    for (var i = 0, max = 3; i < max; i++) {
        var columna = document.createElement("tr");
        for (var j = 0, max2 = 9; j < max2; j++) {
            var celda = document.createElement("td");
            var texto = document.createTextNode(aleatorio(j));
            celda.appendChild(texto);
            celda.classList.add("numero");
            columna.appendChild(celda);
        }



        carton.appendChild(columna);
    }
    capa.appendChild(carton);
    document.getElementsByTagName("")
}
var aleatoriosExistentes;
function aleatorio(columna) {
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
        numero = Math.floor(Math.random() * (max - min + 1)) + min;
        if (aleatoriosExistentes.indexOf(numero) != -1) {
            existente = true;
        } else {
            aleatoriosExistentes.push(numero);
            existente = false;
        }
    } while (existente);
    return numero;
}
