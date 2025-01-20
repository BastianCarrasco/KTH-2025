const pool = require('../db'); // Asegúrate de que la conexión a la base de datos esté configurada en este archivo

const Preg_Categorias = async (req, res) => {
    try {
        const categorias = await pool.query(`
        SELECT
          preguntas.id_pregunta,
          preguntas.texto,
          categorias.nombre
        FROM preguntas
        JOIN categorias ON preguntas.id_categoria = categorias.id_categoria
      `);
        res.json(categorias.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};


const getall = async (req, res, next) => {
    const script = `
        SELECT
            PR.TEXTO AS TEXTO_PREGUNTA,
            ALT.TEXTO AS TEXTO_ALTER,
            TIPO."nombre" AS CLAVE_CATEGORIA
        FROM
            PREGUNTAS AS PR
        JOIN PREGUNTA_ALTERNATIVA AS P_A ON PR."id_pregunta" = P_A."id_pregunta"
        JOIN ALTERNATIVAS AS ALT ON ALT."id_alternativa" = P_A."id_alternativa"
        JOIN CATEGORIAS AS TIPO ON TIPO."id_categoria" = PR."id_categoria";
    `;

    try {
        const result = await pool.query(script);
        res.json(result.rows);
    } catch (error) {
        next(error)
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};

module.exports = { Preg_Categorias, getall };
