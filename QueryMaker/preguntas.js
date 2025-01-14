const fs = require('fs');
const path = require('path');

// Ruta al archivo TXT (puede ser relativa o absoluta)
const filename = './WORKtxt.txt';
const outputFilename = './queries.txt';  // Nombre del archivo de salida para las queries

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
        let id, texto, categoria, clase;  // Inicializar las variables
        const clases = [
            "CRL",
            "TEAM",
            "BRL",
            "IPRL",
            "FRL",
            "TRL"
        ];

        let queries = ''; // Para almacenar las consultas

        lines.forEach(element => {
            if (element[0] !== '') {
                id = element[0];  // Asignar valor a id si element[0] no está vacío
                texto = element[1]; // Asignar valor a texto
                categoria = element[2]; // Asignar valor a categoria

                // Buscar el índice de categoria en el arreglo clases
                const indexclase = clases.findIndex(clase => clase === categoria);

                if (indexclase !== -1) {
                    // Si la categoría está en el arreglo clases, genera la consulta
                    const query = `INSERT INTO preguntas(id_pregunta, texto, id_categoria) VALUES (${id}, '${texto}', ${indexclase + 1});\n`;
                    queries += query; // Añadir la consulta al string de queries
                } else {
                    // Si la categoría no está en el arreglo clases
                    console.log('Categoria no válida:', categoria);
                }
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
