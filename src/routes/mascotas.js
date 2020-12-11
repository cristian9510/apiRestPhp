const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET cargar categorias
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM categoria', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});
//consultar mascotas
router.get('/mascotas', (req, res) => {
    mysqlConnection.query('SELECT id, identificacion, nombre, urlFoto, estado FROM mascotas', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });
// buscar
  router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT id, identificacion, nombre, urlFoto, estado FROM mascotas WHERE identificacion = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });

  // INSERT mascotas
router.post('/insertar', (req, res) => {
    const {idCategoria,identificacion,nombre,urlFoto,estado} = req.body;
    mysqlConnection.query("INSERT INTO `mascotas`(`idCategoria`, `identificacion`, `nombre`, `urlFoto`, `estado`) VALUES (?,?,?,?,?)", [idCategoria,identificacion,nombre,urlFoto,estado], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Guardo exitoso'});
      } else {
        console.log(err);
      }
    });
  
  });

// DELETE An mascota
router.delete('/:id', (req, res) => {
    const { estado, } = req.params;
    const { id } = req.params;
    mysqlConnection.query('UPDATE `mascotas` SET `estado`=? WHERE `id`=?', [estado, id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'mascotas Deleted'});
      } else {
        console.log(err);
      }
    });
  })
//editar
  router.put('/:id', (req, res) => {
    const { nombre, urlFoto, estado } = req.body;
    const { id } = req.params;
    mysqlConnection.query('UPDATE `mascotas` SET `nombre`=?,`urlFoto`=?,`estado`=? WHERE id=?', [ nombre, urlFoto, estado,id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'mascotas Updated'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;