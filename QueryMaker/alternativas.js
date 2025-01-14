const fs = require('fs');
const path = require('path');

// Ruta al archivo TXT (puede ser relativa o absoluta)
const filename = './WORKtxt.txt';
const outputFilename = './queriesAlternativas.sql';  // Nombre del archivo de salida para las queries

function leer() {
    return new Promise((resolve, reject) => {
        try {
            // Verifica la ruta absoluta para depuración
            const absolutePath = path.resolve(filename);
            console.log(`Ruta absoluta: ${absolutePath}`);

            // Leer el contenido del archivo
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log("El archivo no se encuentra en la ruta especificada.");
                        reject("El archivo no se encuentra en la ruta especificada.");
                    } else {
                        reject(err);
                    }
                } else {
                    // Dividir el contenido en líneas y luego por comas
                    const lines = data.split('\n').map(line => line.split(','));
                    resolve(lines);
                }
            });
        } catch (error) {
            reject(`Se ha producido un error: ${error.message}`);
        }
    });
}

async function main() {
    try {
        const lines = await leer();
        let queries = ''; // Para almacenar las consultas

        lines.forEach(element => {

            const IdAlternativa = element[4]  // Asignar y limpiar el valor de IdAlternativa
            const Alternativa = element[5]    // Asignar y limpiar el valor de Alternativa

            // Generar la consulta con interpolación de variables
            const query = `INSERT INTO public.alternativas (id_alternativa, texto) VALUES (${IdAlternativa}, '${Alternativa}');\n`;
            queries += query; // Añadir la consulta al string de queries

        });

        // Escribir las consultas SQL en el archivo de salida
        fs.writeFile(outputFilename, queries, (err) => {
            if (err) {
                console.error('Error al escribir el archivo:', err);
            } else {
                console.log(`Archivo de consultas guardado como ${outputFilename}`);
            }
        });

    } catch (error) {
        console.error(error);
    }
}

main();
