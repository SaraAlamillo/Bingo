/*********************************
 Autor: Alamillo Arroyo, Sara
 Fecha creación: 27/01/2015
 Última modificación: 13/02/2015
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
    var valor = document.getElementById("numJugadores").value;
    if (valor < 5 || valor > 20) {
        document.getElementById("numJugadores").value = "";
    }
}
/**
 * Comprueba si el valor del campo valCarton está comprendido entre 1 y 5
 */
function validarValor() {
    var valor = document.getElementById("valCarton").value;
    if (valor < 1 || valor > 5) {
        document.getElementById("valCarton").value = "";
    }
}
/**
 * Muestra por pantalla el bombo, el cartón y comienza el juego
 */
function iniciarBingo() {
    if (document.getElementById("valCarton").value == "" || document.getElementById("numJugadores").value == "") {
        alert("Debe establecer un valor para el cartón y un número de jugadores.");
    } else {
        document.getElementById("numJugadores").setAttribute("readonly", "true");
        document.getElementById("valCarton").setAttribute("readonly", "true");
        document.getElementById("bEnviar").setAttribute("disabled", "true");
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
    intervalo = setInterval(getNumeroBombo, 5000);
}
/**
 * Obtiene del servidor el número aleatorio para el bombo
 */
function getNumeroBombo() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var bombo = document.getElementById("bombo");
            if (numerosSalidosBombo.indexOf(xmlhttp.responseText) == -1) {
                bombo.childNodes[0].nodeValue = xmlhttp.responseText;
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
    var capa = document.getElementById("ladoDerecho");
    capa.appendChild(document.createElement("br"));
    var bombo = document.createElement("div");
    bombo.appendChild(document.createTextNode(""));
    bombo.setAttribute("id", "bombo");
    capa.appendChild(bombo);
    capa.appendChild(document.createElement("br"));

}
/**
 * Crea el cartón, asignando los eventos a las casillas correspondientes, y muestra un botón debajo del cartón
 */
function dibujarCarton() {
    aleatoriosExistentes = []
    var carton = document.createElement("table");
    carton.setAttribute("id", "carton");
    var capa = document.getElementById("ladoDerecho");

    for (var i = 0, max = 3; i < max; i++) {
        var fila = document.createElement("tr");
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
            fila.appendChild(celda);
        }
        carton.appendChild(fila);
    }
    capa.appendChild(carton);
    capa.appendChild(document.createElement("br"));
    var capaBoton = document.createElement("div");
    capaBoton.setAttribute("id", "boton");
    var boton = document.createElement("button");
    var textoBoton = document.createTextNode("¡Bingo!");
    boton.appendChild(textoBoton);
    crearEvento(boton, "click", cantarBingo);
    capaBoton.appendChild(boton);
    capa.appendChild(capaBoton);
}
/**
 * Comprueba si el bingo se ha cantado correctamente o no
 */
function cantarBingo() {
    clearInterval(intervalo);
    var numerosUsuario = [];
    var carton = document.getElementById("carton");
    var casillas = carton.getElementsByTagName("td");
    for (var i = 0, max = casillas.length; i < max; i++) {
        if (casillas[i].classList.contains("marcado")) {
            numerosUsuario.push(casillas[i].childNodes[0].nodeValue);
        }
    }

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