const Pool = require('pg').Pool
const pool = new Pool({
  user: 'fatah',
  host: 'localhost',
  database: 'baru',
  password: 'qwerty',
  port: 5432,
})

pool.on('connect', () => {
    console.log('connected to the db');
  });


const getData = (request, response) => {
  pool.query('SELECT * FROM dbapi ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDataById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM dbapi WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createData = (request, response) => {
  const { nama, harga, tanggal_pembuatan, tanggal_kadaluarsa } = request.body

  pool.query('INSERT INTO dbapi (nama, harga, tanggal_pembuatan, tanggal_kadaluarsa) VALUES ($1, $2,$3, $4)', [nama, harga, tanggal_pembuatan, tanggal_kadaluarsa], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Data added with ID: ${results.insertId}`)
  })
}

const updateData = (request, response) => {
  const id = parseInt(request.params.id)
  const { nama, harga, tanggal_pembuatan, tanggal_kadaluarsa  } = request.body

  pool.query(
    'UPDATE dbapi SET nama = $1, harga = $2, tanggal_pembuatan = $3, tanggal_kadaluarsa = $4 WHERE id = $5',
    [nama, harga, tanggal_pembuatan, tanggal_kadaluarsa, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Data modified with ID: ${id}`)
    }
  )
}

const deleteData = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM dbapi WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getData,
  getDataById,
  createData,
  updateData,
  deleteData,
}