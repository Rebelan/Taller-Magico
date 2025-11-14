let objetoArrastrado = null;

const ingredientes = document.querySelectorAll('[draggable="true"]');
const estaciones = document.querySelectorAll('.Taller');


ingredientes.forEach(item => {

    item.addEventListener('dragstart', (e) => {
        objetoArrastrado = {
            id: item.id,
            tipo: item.dataset.tipo
        };

        e.dataTransfer.setData('text/plain', item.id);
        item.classList.add('arrastrando');
    });

    item.addEventListener('dragend', () => {
        objetoArrastrado = null;
        item.classList.remove('arrastrando');
    });
});


function IncrementoAlmacen(idAlmacen, cantidad = 1) {
    const contenedor = document.getElementById(idAlmacen);
    if (!contenedor) return;

    const divCantidad = contenedor.querySelector('.cantidad');
    if (!divCantidad) return;

    const actual = parseInt(divCantidad.textContent.trim(), 10) || 0;
    divCantidad.textContent = actual + cantidad;
}



estaciones.forEach(estacion => {

    estacion.addEventListener('dragover', (e) => {
        e.preventDefault();

        const tipoEnviado = objetoArrastrado?.tipo;

        if (tipoEnviado === estacion.dataset.accept) {
            estacion.classList.add('acepta');
            estacion.classList.remove('rechaza');
        } else {
            estacion.classList.add('rechaza');
            estacion.classList.remove('acepta');
        }
    });

    estacion.addEventListener('dragleave', () => {
        estacion.classList.remove('acepta', 'rechaza');
    });

    estacion.addEventListener('drop', (e) => {
        e.preventDefault();
        estacion.classList.remove('acepta','rechaza');

        if (!objetoArrastrado) return;

        const { id, tipo } = objetoArrastrado;

        if (tipo !== estacion.dataset.accept) return;

        const material = document.getElementById(id);
        if (material) material.remove();

        const mapaMateriales = {
            'metal':'LAcero',
            'madera':'Flechas',
            'alquimia':'Bombas'
        };

        IncrementoAlmacen(mapaMateriales[tipo], 1);

        objetoArrastrado = null;
    });
});
