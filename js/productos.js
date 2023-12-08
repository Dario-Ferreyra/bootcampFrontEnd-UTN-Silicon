let contenedor = document.getElementById('contenedorProductos');

var option = {
    animation : true,
    delay : 2000
};

fetch("../json/productos.json")
    .then(response => response.json())
    .then(data => {
        const carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

        data.forEach(element => {

            let divColumna = document.createElement('div');
            divColumna.classList.add('col');
            contenedor.appendChild(divColumna);

            let divCard = document.createElement('div');
            divCard.classList.add('card', 'h-100', 'border', 'border-0');
            divColumna.appendChild(divCard);

            let imagen = document.createElement('img');
            imagen.classList.add('card-img-top', 'tamanioImagen');
            imagen.src = element.imagen;
            imagen.height = '400';
            divCard.appendChild(imagen);

            let divCardBody = document.createElement('div');
            divCardBody.classList.add('card-body');
            divCard.appendChild(divCardBody);

            let titulo = document.createElement('h5');
            titulo.classList.add('card-title', 'text-center', 'precio');
            titulo.textContent = element.nombre;
            divCardBody.appendChild(titulo);

            let descripcion = document.createElement('p');
            descripcion.classList.add('card-text', 'text-start');
            descripcion.textContent = element.descripcion;
            divCardBody.appendChild(descripcion);

            let divCardFooter = document.createElement('div');
            divCardBody.classList.add('card-footer');
            divCard.appendChild(divCardFooter);

            let precio = document.createElement('h4');
            precio.classList.add('card-text', 'text-center', 'precio', 'mb-3', 'mt-1');
            precio.textContent = formatearComoMoneda(element.precio);
            divCardFooter.appendChild(precio);

            let divButtomGrid = document.createElement('div');
            divButtomGrid.classList.add('d-grid', 'gap-2', 'col-6', 'mx-auto', 'mb-3', 'mt-1');
            divCardFooter.appendChild(divButtomGrid);

            let btnComprar = document.createElement('button');
            btnComprar.classList.add('btn', 'btn-warning');
            btnComprar.textContent = "Comprar";
            divButtomGrid.appendChild(btnComprar);
            btnComprar.onclick = function () {
                var toastHTMLElement = document.getElementById( "miToast2" );
                var toastElement = new bootstrap.Toast( toastHTMLElement, option );
                toastElement.textContent = `${element.nombre} ha sido añadido al carrito`;
                toastElement.show();
                

                //alert(`${element.nombre} ha sido añadido al carrito`);
                carrito.push(element);
                localStorage.setItem('carrito', JSON.stringify(carrito))
            }
        });
        console.log(data)
    });

function formatearComoMoneda(numero) {
    const formatoMoneda = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });

    return formatoMoneda.format(numero);
}