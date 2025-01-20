export function exportarJSONaTXT(nombreArchivo, datosJSON) {
    // Convierte el objeto JSON a una cadena de texto
    const datosTexto = JSON.stringify(datosJSON, null, 2);

    // Crea un Blob con los datos de texto y especifica el tipo MIME
    const blob = new Blob([datosTexto], { type: "text/plain" });

    // Crea un enlace temporal para la descarga
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${nombreArchivo}.txt`;

    // Agrega el enlace al DOM, simula un clic y luego lo elimina
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}
