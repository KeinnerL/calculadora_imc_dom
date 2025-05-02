const personas = [];
let imcMenor = 999;
let nombreMenor = '';
let cantidadDeHombres = 0;
let cantidadDeMujeres = 0;
let cantidadMenores = 0;
let cantidadSobrepeso = 0;
let edadTotal = 0;

function calcularImc(peso, estatura) {
    let alturaM = (estatura / 100) ** 2;
    return peso / alturaM;
}

function idUnico() {
    return Math.random().toString(36).substring(2, 10);
}

function compararImc(imc, nombre) {
    if (imc < imcMenor) {
        imcMenor = imc;
        nombreMenor = nombre;
    }
}

document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const genero = document.getElementById('genero').value;
    const edad = parseInt(document.getElementById('edad').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const estatura = parseFloat(document.getElementById('estatura').value);

    const imc = calcularImc(peso, estatura);
    compararImc(imc, nombre);

    if (genero === 'femenino') cantidadDeMujeres++;
    if (genero === 'masculino') cantidadDeHombres++;
    if (edad < 18) cantidadMenores++;
    if (imc > 30) cantidadSobrepeso++;

    edadTotal += edad;

    const persona = {
        id: idUnico(),
        nombre,
        genero,
        edad,
        imc: imc.toFixed(2)
    };

    personas.push(persona);

    let mensaje = `Hola ${nombre}, tu IMC es ${imc.toFixed(2)}.\n`;

    if (imc < 18.5) mensaje += 'Tienes un IMC inferior al normal.';
    else if (imc < 25) mensaje += 'Tu IMC es normal.';
    else if (imc < 30) mensaje += 'Tienes un IMC superior al normal.';
    else mensaje += 'Estás en sobrepeso, considera mejorar tus hábitos.';
    let imagen = '';

    if (imc < 18.5) {
        imagen = '<img src="public/flaco.jpg" alt="Bajo peso" width="150">';
    } else if (imc < 25) {
        imagen = '<img src="public/mediano.jpg" alt="Peso normal" width="150">';
    } else if (imc < 30) {
        imagen = '<img src="imagenes/gordo.jpg" alt="Sobrepeso leve" width="150">';
    } else {
        imagen = '<img src="imagenes/gordo.jpg" alt="Sobrepeso" width="150">';
    }

    document.getElementById('resultado').innerHTML = mensaje + '<br>' + imagen;


    this.reset();
});


document.getElementById('ver-estadisticas').addEventListener('click', () => {
    const edadPromedio = personas.length ? (edadTotal / personas.length).toFixed(1) : 0;

    const estadisticas = `
        Total de personas: ${personas.length},
        Hombres: ${cantidadDeHombres},
        Mujeres: ${cantidadDeMujeres},
        Menores de edad: ${cantidadMenores},
        Personas con sobrepeso: ${cantidadSobrepeso},
        Edad promedio: ${edadPromedio},
        IMC más bajo: ${imcMenor.toFixed(2)} (${nombreMenor}).
    `;

    document.getElementById('estadisticas').textContent = estadisticas;
});