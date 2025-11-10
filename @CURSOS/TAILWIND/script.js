// Este script maneja la lógica de interactividad

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const message = document.getElementById('message');
    const container = document.getElementById('container');

    button.addEventListener('click', () => {
        // Muestra un mensaje en el HTML
        message.classList.remove('hidden');

        // Muestra un mensaje en la consola
        console.log('¡El botón ha sido clickeado! La lógica de JS está funcionando.');
        
        // Simulación: oculta el mensaje después de 2 segundos
        setTimeout(() => {
            message.classList.add('hidden');
        }, 2000);
    });
});