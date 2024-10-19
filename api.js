const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const PORT = 3000;

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, img } = req.body;

  try {
    const query = `
      UPDATE posts
      SET titulo = $1, descripcion = $2, img = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [titulo, descripcion, img, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json(result.rows[0]); 
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM posts
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
