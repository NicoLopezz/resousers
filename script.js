document.addEventListener('DOMContentLoaded', function() {
    const blocks = document.querySelectorAll('.block');
    const textContainer = document.getElementById('text-content');

    let activeBlock = null;

    // Inicializa los bloques en posiciones verticales visibles
    function initializeBlocks() {
        // Define posiciones iniciales para que todos sean visibles
        const initialPositions = {
            1: '10%', // Bloque1 en la parte superior
            2: '25%',
            3: '40%', // Cerca del centro, con espacio para texto
            4: '55%',
            5: '70%'
        };

        blocks.forEach((block, index) => {
            block.classList.add('stack');
            block.classList.add(`stack${index + 1}`);
            block.style.top = initialPositions[index + 1];
            block.style.transform = 'translateY(-50%)'; // Centra verticalmente
            block.style.zIndex = block.dataset.index; // Set z-index based on data-index
        });

        // Ocultar el texto central inicialmente
        hideText();
    }

    initializeBlocks();

    // Función para mostrar texto en el contenedor central
    function showText(index) {
        textContainer.innerHTML = `
            <h1>Bloque ${index}</h1>
            <p>Este es el contenido para el bloque ${index}.</p>
        `;
        textContainer.style.display = 'block';
    }

    // Función para ocultar el texto central
    function hideText() {
        textContainer.style.display = 'none';
    }

    // Función para reorganizar los bloques después de un clic
    function reorderBlocks(clickedBlock) {
        if (activeBlock === clickedBlock) {
            // Si el bloque clicado ya está activo, resetear
            resetBlocks();
            return;
        }

        // Mover el bloque activo actual a su posición de pila
        if (activeBlock) {
            activeBlock.classList.remove('active');
            activeBlock.classList.add('stack');
            activeBlock.style.top = getStackPosition(activeBlock);
            activeBlock.style.transform = 'translateY(-50%)'; // Reaplica la traslación
            activeBlock.style.zIndex = activeBlock.dataset.index; // Reset z-index
        }

        // Activar el nuevo bloque
        clickedBlock.classList.remove('stack');
        clickedBlock.classList.remove(`stack${clickedBlock.getAttribute('data-index')}`);
        clickedBlock.classList.add('active');
        clickedBlock.style.top = '10%';
        clickedBlock.style.transform = 'translateY(0)'; // Quita la traslación
        clickedBlock.style.zIndex = '10'; // Override z-index para que esté arriba
        activeBlock = clickedBlock;

        // Reorganizar los bloques apilados
        blocks.forEach(block => {
            if (block !== activeBlock) {
                block.style.top = getStackPosition(block);
                block.style.transform = 'translateY(-50%)'; // Mantiene la traslación
                block.style.zIndex = block.dataset.index; // Mantiene z-index fijo según data-index
            }
        });

        // Mostrar el texto asociado
        showText(clickedBlock.getAttribute('data-index'));
    }

    // Función para obtener la posición de apilamiento basada en data-index
    function getStackPosition(block) {
        const index = parseInt(block.getAttribute('data-index'));
        const positions = {
            1: '60%', // Bloque1 en la pila
            2: '65%', // Bloque2 en la pila
            3: '70%', // Bloque3 en la pila
            4: '75%', // Bloque4 en la pila
            5: '80%'  // Bloque5 en la pila
        };
        return positions[index];
    }

    // Función para resetear todos los bloques a la posición inicial
    function resetBlocks() {
        blocks.forEach((block, index) => {
            block.classList.remove('active');
            block.classList.add('stack');
            block.classList.add(`stack${index + 1}`);
            // Define posiciones iniciales para que todos sean visibles
            const initialPositions = {
                1: '10%', // Bloque1 en la parte superior
                2: '25%',
                3: '40%', // Cerca del centro, con espacio para texto
                4: '55%',
                5: '70%'
            };
            block.style.top = initialPositions[index + 1];
            block.style.transform = 'translateY(-50%)';
            block.style.zIndex = block.dataset.index;
        });

        // Ocultar el texto central
        hideText();

        activeBlock = null;
    }

    // Asignar eventos de clic a cada bloque
    blocks.forEach(block => {
        block.addEventListener('click', function() {
            reorderBlocks(this);
        });

        // Añadir soporte para teclado (Enter y Space)
        block.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Asignar evento de clic al contenedor de texto para resetear
    textContainer.addEventListener('click', function() {
        resetBlocks();
    });
});
