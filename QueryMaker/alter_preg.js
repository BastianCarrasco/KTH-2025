const fs = require('fs');
const path = require('path');

// Ruta al archivo TXT (puede ser relativa o absoluta)
const filename = './WORKtxt.txt';
const outputFilename = './queriesAlterPregre.sql';  // Nombre del archivo de salida para las queries

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
            // Validar y limpiar los datos
            const IdPreg_Altern = element[3] ? element[3].trim() : null;
            const IdAlternativa = element[4] ? element[4].trim() : null;

            if (IdPreg_Altern && IdAlternativa) {
                // Generar la consulta con interpolación de variables
                const query = `INSERT INTO pregunta_alternativa (id_pregunta, id_alternativa) VALUES (${IdPreg_Altern}, ${IdAlternativa});\n`;
                queries += query; // Añadir la consulta al string de queries
            }
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