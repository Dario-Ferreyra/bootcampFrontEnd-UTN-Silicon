window.onload = function () {
    cargarCarrito();
}

let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

let sumaTotal = 0;
let totalCarrito = document.getElementById('total');

const cargarCarrito = () => {

    let miTabla = document.getElementById('miTabla');

    for (let i = 0; i < carrito.length; i++) {

        let fila = document.createElement('tr');

        //IMAGEN
        let celdaImagen = document.createElement('td');
        //celdaImagen.style.textAlign = 'center';
        let linkImagen = document.createElement('img');
        linkImagen.src = carrito[i].imagen;
        //linkImagen.width = '250';
        linkImagen.height = '100';
        celdaImagen.appendChild(linkImagen)

        //NOMBRE
        let celdaNombre = document.createElement('td');
        celdaNombre.textContent = carrito[i].nombre;

        //ACCION
        let celdaAccion = document.createElement('td');
        let btnQuitarElemento = document.createElement('button');
        btnQuitarElemento.classList.add('btn', 'btn-danger');

        btnQuitarElemento.textContent = 'X';
        celdaAccion.appendChild(btnQuitarElemento);
        btnQuitarElemento.onclick = function () {
            let filaAEliminar = this.closest('tr');

            let indiceAEliminar = Array.from(filaAEliminar.parentNode.children).indexOf(filaAEliminar);

            carrito.splice(indiceAEliminar, 1);

            localStorage.setItem('carrito', JSON.stringify(carrito));

            filaAEliminar.remove();

            sumaTotal = sumaTotal - carrito[indiceAEliminar].precio;
            totalCarrito.textContent = formatearComoMoneda(sumaTotal);
        }

        //PRECIO UNITARIO
        let celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = formatearComoMoneda(carrito[i].precio);

        fila.appendChild(celdaImagen);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaAccion);
        fila.appendChild(celdaPrecio);

        miTabla.appendChild(fila);

        sumaTotal = sumaTotal + carrito[i].precio;
    }
    totalCarrito.textContent = formatearComoMoneda(sumaTotal);
}

let borrarCarrito = document.getElementById('vaciarCarrito');

borrarCarrito.addEventListener('click', (e) => {

    alert('¿Está seguro de que quiere vaciar el Carrito?')

    let miTabla = document.getElementById('miTabla');
    miTabla.innerHTML = '';

    localStorage.removeItem('carrito');

    sumaTotal = 0;

    totalCarrito.textContent = formatearComoMoneda(sumaTotal);
})

let finalizarCompra = document.getElementById('btnFinalizarCompra');

finalizarCompra.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.querySelector('.needs-validation');

    if (form.checkValidity()) {
        localStorage.removeItem('carrito');

        var nombreCompleto = document.getElementById("nombreCompleto").value;
        var formaDePago = document.getElementById("formaDePago").value;

        alert(`¡Compra realizada con éxito!\nGracias por confiar en nosotros ${nombreCompleto}\nSe le enviará un email con los datos de la compra.\nMonto total: ${totalCarrito.textContent}\nForma de pago: ${formaDePago}`)
        window.location.href = "../index.html";
    } else {
        form.classList.add('was-validated');
    }
})

function formatearComoMoneda(numero) {
    const formatoMoneda = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });

    return formatoMoneda.format(numero);
}