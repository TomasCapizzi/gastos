// Botones
const btnAdd = document.getElementById('btn-add'); // Boton añadir

// Inputs
const motivo = document.getElementById('motivo');
const fecha = document.getElementById('fecha');
const gasto = document.getElementById('dinero');

const tablaGasto = document.getElementById('tabla-body');
const ejemploTabla = document.getElementById('ejemplo');
const sumatoria = document.getElementById('suma-gastos');
const mensajeError = document.getElementById('error');

let index = 0; //Acumulador de Gastos
let arrayGastos = []; // Array de objetos


btnAdd.addEventListener('click', () => {

    ejemploTabla.classList.add('oculto'); // Oculto el placeholder
    // Genero un obj x cada gasto
    let entrada = {
        motivoObj: motivo.value,
        fechaObj: fecha.value,
        gastoObj: gasto.value,
    }

    let error = validarForm(entrada);

    if (error[0]) {
        mensajeError.innerText = error[1];
        //arrayGastos.splice(entrada, 1);
    } else {
        mensajeError.innerText = '';
        arrayGastos.push(entrada); // Coloco el objeto en el array
        agregarGasto(arrayGastos, index);
        clearInputs();
        motivo.style.border = '1px solid #BAC7BE'
    }
});

function validarForm(gasto) {
    let error = [];
    if (gasto.motivoObj.length < 3) {
        error[0] = true;
        error[1] = 'Este campo no puede contener menos de 3 caracteres';
        motivo.style.border = '1px solid red'
        return error;
    } else if (gasto.motivoObj.length > 50) {
        error[0] = true;
        error[1] = 'Este campo no puede contener mas de 50 caracteres';
        return error;
    } else if (gasto.fechaObj == '') {
        error[0] = true;
        error[1] = 'No has agregado una fecha';
        return error;
    } else if (gasto.gastoObj == 0 || gasto.gastoObj == '') {
        error[0] = true;
        error[1] = 'No has agregado un valor al gasto';
        return error;
    }
    return error[0] = false;
}



function agregarGasto(array, id) {
    console.log(id);
    // CREO EL HTML //
    const gastoHTML = document.createElement('tr');
    gastoHTML.innerHTML = `
        <td>${array[id].motivoObj}</td>
        <td>${array[id].fechaObj}</td>
        <td>${array[id].gastoObj}</td>
        <td><button class="btn-x"><i class="far fa-times-circle"></i></button></i></td>
    `;
    //console.log('Cuando agrega el valor, paso el monto ', array[id].gastoObj, ' y el id:', id);
    gastoHTML.classList.add('tabla-body'); // Le doy la clase
    gastoHTML.id = `${id}`; //  Aca le doy un ID
    tablaGasto.appendChild(gastoHTML); //Inserto HTML al Contenedor de la table -> tbody
    sumarGastos(array, id); // Hago la suma de los gastos
    // Boton Eliminar Gasto



    const btnX = gastoHTML.querySelector('.btn-x');
    btnX.addEventListener('click', () => {
        tablaGasto.innerHTML = ''
        removerGasto(array, id);


    });




    index++;
}



function sumarGastos(array, index) {
    let suma = 0;
    for (let i = 0; i <= index; i++) {
        suma = parseFloat(array[i].gastoObj) + suma;
    }
    sumatoria.innerText = suma;
}

function clearInputs() {
    motivo.value = '';
    fecha.value = '';
    gasto.value = '';
}

function removerGasto(array, id) {

    console.log('AL QUERER ELIMINAR UN GASTO');
    //console.log('valor que quito', array.splice(id, 1));
    //console.log('valor que quito', arrayGastos.splice(id, 1))
    console.log(array)
    console.log(arrayGastos)

    arrayGastos.splice(id, 1);
    //console.log(arrayGastos.splice(id, 1))
    //index = id - 1;
    console.log(index);
    for (let i = 0; i < array.length; i++) {
        index = i;
        agregarGasto(arrayGastos, index);

        console.log(arrayGastos[i]);
    }
    console.log(array, array.length);
    sumarGastos(array, (array.length - 1));
    console.log('////////////////////////');

}