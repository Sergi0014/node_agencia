import { conexion } from "../db.js";

export const getAgencias = async (req, res) => {
    const [results] = await conexion.query('SELECT * FROM agencia_node');
    res.json(results);
}

export const getAgenciaById = async (req, res) => {
    const { id } = req.params;
    const [results] = await conexion.query('SELECT * FROM agencia_node WHERE id = ?', [id]);
    if (results.length === 0) {
        return res.status(404).json({ message: 'Agencia no encontrada' });
    }
    res.json(results);
}

export const postAgencia = async (req, res) => {
    const { nombre, direccion, telefono } = req.body;

    // Validación simple de campos obligatorios
    if (!nombre || !direccion || !telefono) {
        return res.status(400).json({ message: 'Faltan campos requeridos: nombre, direccion y telefono' });
    }

    try {
        const [results] = await conexion.query(
            'INSERT INTO agencia_node (nombre, direccion, telefono) VALUES (?, ?, ?)',
            [nombre, direccion, telefono]
        );

        const nuevaAgencia = {
            id: results.insertId,
            nombre,
            direccion,
            telefono,
            create_at: new Date()
        };
        res.json(nuevaAgencia);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Ya existe una agencia con ese nombre' });
        }
        return res.status(500).json({ message: 'Error al insertar la agencia', error: error.message });
    }
}

export const putAgencia = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const [result] = await conexion.query(
            'UPDATE agencia_node SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?',
            [data.nombre, data.direccion, data.telefono, id]
        );
        res.json({
            update: data,
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la agencia', error: error.message });
    }
}

export const deleteAgencia = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await conexion.query('DELETE FROM agencia_node WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Agencia no encontrada' });
        }
        res.json({ message: 'Agencia eliminada', affectedRows: result.affectedRows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la agencia', error: error.message });
    }
}