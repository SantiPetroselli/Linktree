function abrirCv() {
    document.getElementById("cvModal").style.display = "flex";
}

function cerrarCv() {
    document.getElementById("cvModal").style.display = "none";
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById("cvModal");
    if (event.target === modal) {
        cerrarCv();
    }
});

function openNav() {
  document.getElementById("navResponsive").style.height = "100%";
}

function closeNav() {
  document.getElementById("navResponsive").style.height = "0%";
}

function abrirModal(title, description) {
    const modal = document.getElementById('proyectoModal');
    const titulo = document.getElementById('tituloModal');
    const descripcion = document.getElementById('descripcionModal');
    const listaTareasContainer = document.getElementById('listaTareasContainer');

    if (listaTareasContainer) listaTareasContainer.style.display = 'none';

    titulo.style.color = 'rgb(6, 135, 110)'

    if (title === 'Calculadora') {
        titulo.textContent = 'Calculadora';
        titulo.style.color = 'rgb(6, 135, 110)';
        descripcion.innerHTML = `<p>Esta <strong>calculadora web interactiva</strong> está diseñada para resolver operaciones matemáticas esenciales como suma, resta, multiplicación y división. Además, incorpora funciones útiles como el <strong>cálculo de porcentajes</strong> y la <strong>raíz cuadrada</strong>.</p>
        <div class="calculadora">
            <div class="visor">
            <span class="resultado"></span>
            <span class="input"></span>
            </div>
            <div class="botones">
            <button>+</button><button>-</button><button>*</button><button>/</button>
            <button>%</button><button>√</button>
            <button>7</button><button>8</button><button>9</button>
            <button>4</button><button>5</button><button>6</button>
            <button>1</button><button>2</button><button>3</button>
            <button>0</button><button>.</button>
            <button>AC</button><button>CE</button><button>=</button>
            </div>
        </div>
        `;
        agregarEstilosCalculadora();
        inicializarCalculadora();
    } 
    
    else if (title === 'Lista de Tareas') {
        titulo.textContent = 'Lista de Tareas';
        descripcion.innerHTML = '<p>Esta <strong>lista de tareas interactiva</strong> permite agregar, editar, completar y eliminar tareas de forma sencilla. Utiliza <strong>IndexedDB</strong> para guardar la información directamente en el navegador, asegurando que las tareas se conserven incluso al recargar la página.</p>';
        listaTareasContainer.style.display = 'block';
        agregarEstilosTareas();
        inicializarListaTareas();
    } 
    
    else if (title === 'Galería') {
        titulo.textContent = 'Galería';
        descripcion.innerHTML = `
        <p>Esta <strong>galería deslizante</strong> está diseñada para mostrar imágenes de manera visualmente atractiva mediante un <strong>slider automático</strong>. Se usó JavaScript para la lógica del carrusel y estilos responsivos para asegurar compatibilidad en distintas pantallas.</p>
        <div class="galeria-wrapper">
            <div class="hero-slider">                        
                <div class="slider-container">
                    <div class="slide" style="background-image: url('Imagenes/slide1.jpg');"></div>
                    <div class="slide" style="background-image: url('Imagenes/slide2.jpg');"></div>
                    <div class="slide" style="background-image: url('Imagenes/slide3.jpg');"></div>
                </div>
                <button class="nav-btn prev-btn">&#8249;</button>
                <button class="nav-btn next-btn">&#8250;</button>
                <div class="dots">
                    <span class="dot" data-index="0"></span>
                    <span class="dot" data-index="1"></span>
                    <span class="dot" data-index="2"></span>
                </div>
            </div>
        </div>
        `;
        setTimeout(() => {
            agregarEstilosGaleria();
            inicializarSlider();
        }, 0);
    }

    modal.style.display = 'flex';
}

function agregarEstilosCalculadora() {
    const style = document.createElement("style");
    style.innerHTML = `
        .calculadora {
        background: #f0f6eb;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        padding: 20px;
        margin-top: 20px;
        }

        .visor {
        background: #f7fbf2;
        color: #333;
        font-size: 2rem;
        padding: 15px;
        text-align: right;
        border-radius: 10px;
        margin-bottom: 20px;
        height: 60px;
        overflow: auto;
        }

        .botones {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        }

        .botones button {
        padding: 15px;
        font-size: 1.1rem;
        border: none;
        border-radius: 8px;
        background: #f7fbf2;
        cursor: pointer;
        transition: background 0.2s ease;
        color: #333;
        }

        .botones button:hover {
        background: #b2dfdb;
        }
    `;
    document.head.appendChild(style);
}

function inicializarCalculadora() {
const botones = document.querySelectorAll('.botones button');
const inputSpan = document.querySelector('.input');
const resultado = document.querySelector('.resultado');

let inputActual = '';
let operador = null;
let a = null;
let b = null;

botones.forEach(boton => {
    boton.onclick = () => {
    const valor = boton.textContent;

    if (!isNaN(valor)) {
        inputActual += valor;
        inputSpan.textContent = inputActual;
    } else if (valor === '.') {
        if (!inputActual.includes('.')) {
        inputActual += inputActual === '' ? '0.' : '.';
        inputSpan.textContent = inputActual;
        }
    } else if (valor === 'AC') {
        inputActual = '';
        operador = null;
        a = null;
        b = null;
        inputSpan.textContent = '';
        resultado.textContent = '';
    } else if (valor === 'CE') {
        inputActual = '';
        inputSpan.textContent = '';
    } else if (valor === '=') {
        if (operador && a !== null && inputActual !== '') {
        b = parseFloat(inputActual);
        let res;
        switch (operador) {
            case '+': res = a + b; break;
            case '-': res = a - b; break;
            case '*': res = a * b; break;
            case '/': res = a / b; break;
            case '%': res = a / 100; break;
            case '√': res = Math.sqrt(a); break;
        }
        resultado.textContent = res;
        inputActual = res.toString();
        operador = null;
        a = null;
        b = null;
        inputSpan.textContent = '';
        }
    } else if (valor === '%' || valor === '√') {
        if (inputActual !== '') {
        a = parseFloat(inputActual);
        let res = valor === '%' ? a / 100 : Math.sqrt(a);
        resultado.textContent = res;
        inputActual = res.toString();
        operador = null;
        inputSpan.textContent = '';
        }
    } else {
        if (inputActual !== '') {
        a = parseFloat(inputActual);
        operador = valor;
        inputActual = '';
        inputSpan.textContent = operador + ' ';
        } else if (resultado.textContent !== '') {
        a = parseFloat(resultado.textContent);
        operador = valor;
        resultado.textContent = '';
        inputActual = '';
        inputSpan.textContent = a + ' ' + operador;
        }
    }
    }
});
}

function agregarEstilosTareas() {
    const style = document.createElement("style");
    style.innerHTML = `
        .input-container {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
        }
        .input-container input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        }
        .input-container button {
        padding: 10px 15px;
        background-color: rgb(6, 135, 110);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        }
        .lista-tareas {
        list-style-type: none;
        padding: 0;
        }
        .tarea {
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        }
        .tarea.completada {
        text-decoration: line-through;
        color: #aaa;
        background-color: #f5f5f5;
        }
        .acciones button {
        margin-left: 5px;
        padding: 5px 8px;
        font-size: 0.9rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
        }
        .editar { background-color: #3498db; }
        .eliminar { background-color: #e74c3c; }
        .guardar { background-color: #2ecc71; display: none; }
    `;
    document.head.appendChild(style);
}  

function inicializarListaTareas() {
    let db;
    const DB_NAME = 'TareasDB';
    const STORE_NAME = 'tareas';
    const DB_VERSION = 1;

    const inputTarea = document.getElementById('nuevaTarea');
    const btnAgregar = document.getElementById('agregar');
    const listaTareas = document.getElementById('listaTareas');

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = function () {
        listaTareas.innerHTML = '<li>Error al cargar las tareas</li>';
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        cargarTareas();
    };

    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('texto', 'texto', { unique: false });
        store.createIndex('completada', 'completada', { unique: false });
    };

    btnAgregar.onclick = agregarTarea;
    inputTarea.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') agregarTarea();
    });

    function agregarTarea() {
        const texto = inputTarea.value.trim();
        if (texto === '') return;
        const tx = db.transaction([STORE_NAME], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const tarea = { texto, completada: false, fecha: new Date() };
        store.add(tarea).onsuccess = () => {
        inputTarea.value = '';
        cargarTareas();
        };
    }

    function cargarTareas() {
        const tx = db.transaction([STORE_NAME], 'readonly');
        const store = tx.objectStore(STORE_NAME);
        store.getAll().onsuccess = function (e) {
        renderizarTareas(e.target.result);
        };
    }

    function renderizarTareas(tareas) {
        listaTareas.innerHTML = '';
        if (!tareas.length) {
        listaTareas.innerHTML = '<li>No hay tareas aún</li>';
        return;
        }
        tareas.sort((a, b) => b.fecha - a.fecha);
        tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `tarea ${tarea.completada ? 'completada' : ''}`;
        li.dataset.id = tarea.id;

        const span = document.createElement('span');
        span.textContent = tarea.texto;

        const acciones = document.createElement('div');
        acciones.className = 'acciones';

        const btnComp = document.createElement('button');
        btnComp.textContent = tarea.completada ? '❌' : '✓';
        btnComp.onclick = () => toggleCompletada(tarea);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = '✏️';
        btnEditar.className = 'editar';
        btnEditar.onclick = () => editarTarea(tarea);

        const btnGuardar = document.createElement('button');
        btnGuardar.textContent = '💾';
        btnGuardar.className = 'guardar';
        btnGuardar.onclick = () => guardarEdicion(tarea.id);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '🗑️';
        btnEliminar.className = 'eliminar';
        btnEliminar.onclick = () => eliminarTarea(tarea.id);

        acciones.append(btnComp, btnEditar, btnGuardar, btnEliminar);
        li.append(span, acciones);
        listaTareas.appendChild(li);
        });
    }

    function toggleCompletada(tarea) {
        tarea.completada = !tarea.completada;
        const tx = db.transaction([STORE_NAME], 'readwrite');
        tx.objectStore(STORE_NAME).put(tarea).onsuccess = cargarTareas;
    }

    function editarTarea(tarea) {
        const li = document.querySelector(`li[data-id="${tarea.id}"]`);
        const span = li.querySelector('span');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = tarea.texto;
        input.className = 'edit-input';
        li.replaceChild(input, span);
        li.querySelector('.editar').style.display = 'none';
        li.querySelector('.guardar').style.display = 'inline-block';
        input.onkeypress = e => { if (e.key === 'Enter') guardarEdicion(tarea.id); };
    }

    function guardarEdicion(id) {
        const li = document.querySelector(`li[data-id="${id}"]`);
        const input = li.querySelector('.edit-input');
        const nuevoTexto = input.value.trim();
        if (nuevoTexto === '') {
        eliminarTarea(id);
        return;
        }
        const tx = db.transaction([STORE_NAME], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.get(id).onsuccess = function (e) {
        const tarea = e.target.result;
        tarea.texto = nuevoTexto;
        tarea.fecha = new Date();
        store.put(tarea).onsuccess = cargarTareas;
        };
    }

    function eliminarTarea(id) {
        const tx = db.transaction([STORE_NAME], 'readwrite');
        tx.objectStore(STORE_NAME).delete(id).onsuccess = cargarTareas;
    }
}

function agregarEstilosGaleria() {
    const style = document.createElement("style");
    style.innerHTML = `
    .galeria-wrapper {
        position: relative;
        margin-top: 20px;
    }

    .hero-slider {
        position: relative;
        width: 100%;
        height: 300px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .slider-container {
        display: flex;
        height: 100%;
        transition: transform 0.5s ease-in-out;
    }

    .slide {
        min-width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }

    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        color: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        z-index: 2;
        padding: 0 10px;
        user-select: none;
    }

    .prev-btn {
        left: 10px;
    }

    .next-btn {
        right: 10px;
    }

    .dots {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 2;
    }

    .dot {
        width: 10px;
        height: 10px;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        cursor: pointer;
    }

    .dot.active {
        background-color: white;
    }
    `;
    document.head.appendChild(style);
}

function inicializarSlider() {
    const sliderElement = document.querySelector('.hero-slider');
    const container = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev-btn');
    const next = document.querySelector('.next-btn');

    let currentIndex = 0;

    function showSlide(index) {
        container.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            showSlide(currentIndex);
        });
    });

    showSlide(currentIndex);
}

(function () {
    emailjs.init("-JxsJJYEtul1XKhfu");
})();

function mandarEmail(event) {
    event.preventDefault();
    emailjs.sendForm('service_tss0vy7', 'template_qda96ze', event.target)
        .then(() => alert("Correo enviado exitosamente"))
        .catch(error => alert("Error al enviar correo: " + error));
}


function cerrarModal() {
document.getElementById('proyectoModal').style.display = 'none';
}

window.onclick = function(event) {
if (event.target === document.getElementById('proyectoModal')) {
    cerrarModal();
}
};