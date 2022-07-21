# Formulario-Javascript
Formulario sencillo desarrollado con HTML5, CSS3 y JS. Se realizan validaciones de los datos introducidos desde JavaScript y no desde el HTML5.

Este formulario consta de un index.html desarrollado en HTML5, una hoja de estilos style.css y una hoja donde se encuentran los scripts de JS. En la hoja de JS, se aplican validaciones con los eventos "onclick", "focusout" y "onchange". También consta de una cookie que guarda el número de veces que se ha intentado enviar el formulario. Para poder ver el resultado de la cookie correctamente, se recomienda abrir el index.html desde un navegador Firefox. 

<h2>Validaciones aplicadas</h2>
- Introducir la primera letra del nombre y apellido en mayúsculas cuando se pierde el foco. Se permiten nombres compuestos.</br></br>
- <b>Nombre</b>: Se comprueba que el campo no esté vacío, que tenga caracteres de texto y que tenga menos de 20 caracteres.</br>
- <b>Apellidos</b>: Se comprueba que el campo no esté vacío, que tenga caracteres de texto y que tenga menos de 35 caracteres.</br>
- <b>Edad</b>: Se comprueba que el campo no esté vacío, que sea un número entero y esté comprendido entre 18 y 105.</br>
- <b>NIF</b>: Se comprueba que el campo no esté vacío y que el patrón sea válido a través de una expresión regular.</br>
- <b>E-mail</b>: Se comprueba que el campo no esté vacío y que el patrón sea válido a través de una expresión regular.</br>
- <b>Provincia</b>: Se comprueba que se ha seleccionado una de las provincias.</br>
- <b>Isla</b>: Cuando el valor de provincia cambia, se activa un evento que activa el selector de isla y presenta las islas correspondientes a la provincia seleccionada. Se compueba también que se ha seleccionado una isla.</br>
- <b>Fecha de Nacimiento</b>: Se valida el formato a través de una expresión regular que permita DD/MM/YYYY o DD-MM-YYYY. Se calcula la edad a través de la fecha de nacimiento y se comprueba que coincide con el campo Edad.</br>
- <b>Teléfono</b>: Se comprueba que el campo no esté vacío, que contenga 8 dígitos y empiece por 6 o por 9. Esta validación utiliza otra expresión regular.
