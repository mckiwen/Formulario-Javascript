window.onload = iniciar;

function iniciar() {
    document.getElementById("isla").disabled=true;
    document.getElementById("enviar").addEventListener('click', enviar, false);
    document.getElementById("nombre").addEventListener("focusout", mayusNombre, false);
    document.getElementById("apellidos").addEventListener("focusout", mayusApellido, false);
    document.getElementById("provincia").addEventListener("change", provSelected, false);
}



/******************************** COOKIE *****************************************/
// Creamos la cookie "intentos", si no existe se asigna valor 1. Si existe, se le suma 
// una unidad al contador.
function intentos() {
    if(document.cookie == ""){
        ConfigCookie("intentos","1");
    } else {
        var contador = ObtieneCookie("intentos")[1];
        parseInt(contador);
        contador++;
        contador +="";
        ConfigCookie("intentos",contador);
    }
    document.getElementById("intentos").innerHTML="Intento de Envíos del formulario: "+ObtieneCookie("intentos")[1];
}

// Crea o modifica una cookie.
function ConfigCookie (nombre, valor) {   
    document.cookie = nombre + "=" + valor + ";";
}

// Obtiene una cookie que coincida con el valor de nombre.
function ObtieneCookie (nombre) {
    var array = document.cookie.replace(" ","");
    var dividido = array.split(";");
    for (var i = 0; i < dividido.length; i++) {
        var c = dividido[i].split("=");
        if (c[0] == nombre) {  
            return c; 
        }
    }
    return ""; 
}

/************************************************ EVENTOS ****************************************************/
// Transforma el Nombre con mayúscula y minúsculas cuando pierde el foco.
function mayusNombre(){
    document.getElementById("nombre").value=mayusMinus(document.getElementById("nombre").value);
}

// Transforma el Apellido con mayúscula y minúsculas cuando pierde el foco.
function mayusApellido(){
    document.getElementById("apellidos").value=mayusMinus(document.getElementById("apellidos").value);
}

// Función que transforma la primera letra en mayúscula y las siguientes en minúsculas. Aplicable a palabras compuestas.
function mayusMinus(palabras){
    var array = palabras.split(" ");
    var palabraFinal = "";
    for(var i=0; i<array.length;i++){
        array[i] = array[i].substring(0,1).toUpperCase() + array[i].substring(1,array[i].length).toLowerCase();
        if(i<array.length-1){
            palabraFinal += array[i]+" ";
        } else{
            palabraFinal += array[i];
        }
    }
    return palabraFinal;
}

/************************************************ VALIDACION *****************************************************/
// Función que procede a enviar los datos, realiza validación de cada campo individualmente.
function enviar(e){
    intentos();
    borrarError();
    if (validarNombre() && validarApellidos() && validarEdad() && validarNIF() && 
    validarEmail() && validarProvincia() && validarIsla() && validarFecha() &&
    validarTel() && confirm ("Pulsa Aceptar para confirmar el envío del formulario.")) {
        ConfigCookie("intentos","0");        
        return true;
    } else {        
        e.preventDefault();
        return false;
    }    
}


// Validacion del nombre. Se verifica que no sea un campo vacío, que siga un patrón dado que contenga letras mayúsculas
// minúsculas y espacios y también se verifica que no contenga más de 20 caracteres.
function validarNombre(){
    var nombre = document.getElementById("nombre");
    if(nombre.value.replaceAll(" ","") ==""){
        error(nombre, "El campo Nombre está vacío");
        return false;
    }else if(!/^[a-zA-Z\s]+$/.test(nombre.value)){
        error(nombre, "El nombre introducido no es válido.");
        return false;
    }else if(nombre.value.length>20){
        error(nombre, "El nombre contiene más de 20 caracteres");
        return false;
    }else{
        return true;
    }
}

// Validacion de los apellidos. Se verifica que no sea un campo vacío, que siga un patrón dado que contenga letras mayúsculas
// minúsculas y espacios y también se verifica que no contenga más de 35 caracteres.
function validarApellidos(){
    var apellidos = document.getElementById("apellidos");
    if(apellidos.value.replaceAll(" ","") ==""){
        error(apellidos, "El campo Apellidos es obligatorio.");
        return false;
    }else if(!/^[a-zA-Z\s]+$/.test(apellidos.value)){
        error(apellidos, "Los apellidos introducidos no son válidos.");
        return false;
    }else if(apellidos.value.length>35){
        error(apellidos, "El campo de Apellidos no puede contener más de 35 caracteres");
        return false;
    }else{
        return true;
    }
}

// Validacion de la edad. Se verifica que el campo no esté vacío, que el dato introducido sea numérico y que esté comprendido
// entre 18 y 105.
function validarEdad(){
    var edad = document.getElementById("edad");
    if(edad.value.replaceAll(" ","") ==""){
        error(edad, "Debes especificar la Edad.");
        return false;
    }else if(isNaN(edad.value)){
        error(edad, "Debes introducir un número en el campo Edad.");
        return false;
    }else if(edad.value<18 || edad.value>105){
        error(edad, "La edad debe estar comprendida entre 18 y 105.");
        return false;
    }else{
        return true;
    }
}

// Validacion del NIF. Comprueba que no está vacío y chequea el patrón. 
// El patrón debe ser 8 números seguidos de un guión y una letra. No se especifica si es mayúscula o minúscula, por lo que se incluyen ambas opciones.
// No es necesario verificar que la letra sea correcta para un numero de DNI dado.
// "[0-9]{8}-[A-Za-z]{1}" Requiere 8 dígitos [0-9] seguido de un guión y una única letra ya sea minúscula o mayúscula.
// ^ se utiliza para el inicio de la expresión y $ para el final.
function validarNIF(){
    var nif = document.getElementById("nif");
    if(nif.value.replaceAll(" ","") ==""){
        error(nif, "Debes especificar el NIF.");
        return false;
    }else if(!/^[0-9]{8}-[A-Za-z]{1}$/.test(nif.value)){
        error(nif, "El NIF introducido no es válido.");
        return false;
    }else{
        return true;
    }
}

// Validación del Email. Comprueba que no está vacío y que cumple el siguiente patrón:
// [A-Za-z0-9_]+@[A-za-z]+[.][a-z]+ pueden repetirse cualquier valor alfanumérico incluido el guión bajo (_)
// seguido del símbolo @, otra cadena de letras seguido de un punto y otra cadena de letras.
function validarEmail(){
    var email = document.getElementById("email");
    if(email.value.replaceAll(" ","") ==""){
        error(email, "Debes introducir un E-mail.");
        return false;
    }else if(!/^[A-Za-z0-9_]+@[A-za-z]+[.][a-z]+$/.test(email.value)){
        error(email, "El E-mail introducido no es válido.");
        return false;
    }else{
        return true;
    }
}

// Validación de la provincia. Debe ser un campo no vacío, para ello se valida que no esté seleccionado el primer elemento.
function validarProvincia(){
    var provincia = document.getElementById("provincia");
    if (provincia.selectedIndex == 0) {
        error(provincia, "Debe seleccionar una provincia.");
        return false;
    }else{
        return true;
    }
}

// Función que selecciona en el desplegable de "isla" las islas correspondientes a la provincia seleccionada.
// Escoge los "hijos" del elemento "isla" y evalúa cuales se deben ver con display = "initial" y cuales
// se deben esconder sin dejar hueco con display "none".
function provSelected(){
    var elemento = document.getElementById("isla");
    var islas = elemento.children;
    switch(document.getElementById("provincia").selectedIndex){
        case 1:
            document.getElementById("isla").disabled=false;
            for (var i = 1; i<islas.length; i++){
                if(islas[i].value == "LP" || islas[i].value == "LG" || islas[i].value == "EH" || islas[i].value == "TF"){
                    islas[i].style.display = "initial";
                }else{
                    islas[i].style.display = "none";
                }
            }
            break;
        case 2:
            document.getElementById("isla").disabled=false;
            for (var i = 1; i<islas.length; i++){
                if(islas[i].value == "GC" || islas[i].value == "FV" || islas[i].value == "LZ"){
                    islas[i].style.display = "initial";
                }else{
                    islas[i].style.display = "none";
                }
            }        
            break;
        default:
            document.getElementById("isla").disabled=true;
    }
}

// Validación de la isla. Debe ser un campo no vacío, para ello se valida que no esté seleccionado el primer elemento.
function validarIsla(){
    var isla = document.getElementById("isla");
    if (isla.selectedIndex == 0) {
        error(isla, "Debe seleccionar una isla.");
        return false;
    }else{
        return true;
    }
}


// Validación de la fecha. Se comprueba que el campo Fecha de Nacimiento no esté vacío.
// También se establece un patrón DD-MM-YYYY y DD/MM/YYYY.
function validarFecha(){
    // Se obtiene el día actual.
    const hoy = new Date();
 
    // Calculo de la coincidencia de la fecha introducida con la edad.
    var fecha = document.getElementById("fecha");
    var edad = document.getElementById("edad").value;
    var fechaSplit = fecha.value.replaceAll("/","-").split("-");
    const fechaNac = new Date(fechaSplit[2]+"-"+fechaSplit[1]+"-"+fechaSplit[0]);
    const age = new Date(hoy.getTime() - fechaNac.getTime());
    var edadCalculada = Math.floor(age.getTime()/(3600*24*365.254*1000)); // variable edad calculada por la fecha introducida.

    if(fecha.value.replaceAll(" ","") ==""){
        error(fecha, "Debes introducir la edad de Nacimiento.");
        return false;
    }else if(!/^[0-9]{2}(\-|\/)[0-9]{2}(\-|\/)[0-9]{4}$/.test(fecha.value)){
        error(fecha, "La fecha introducida no es válida (DD/MM/YYYY o DD-MM-YYYY)");
        return false;
    }else if(edad != edadCalculada){
        error(fecha, "La fecha de nacimiento no corresponde con su edad.");
        return false;
    }else{
        return true;
    }
}


// Validación del telefono. Debe ser un campo no vacío y comenzar por 6 o 9.
function validarTel(){
    var telefono = document.getElementById("telefono");
    if(telefono.value.replaceAll(" ","") ==""){
        error(telefono, "Debes introducir el número de teléfono.");
        return false;
    }else if(!/^(6|9)[0-9]{8}$/.test(telefono.value)){
        error(telefono, "El teléfono introducido no es válido.");
        return false;
    }else{
        return true;
    }
}



/************************************************** ERRORES ***********************************/
// Funcion que escribe el mensaje de error para un dato dado.
function error(dato, mensaje) {   
    document.getElementById("errores").innerHTML = mensaje;
    dato.className = "error";
    dato.focus();
}

// Función que borra el mensaje de error.
function borrarError() { 
    document.getElementById("errores").innerHTML = ""; 
}
