/*********************************
Autor: Alamillo Arroyo, Sara
Fecha creación: 27/01/2015
Última modificación: 27/01/2015
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
