//esto me deja hacer las migraciones lo que esta en el app me conecta a la base solamente
const { DataSource } = require('typeorm');
const { Producto } = require('./dist/entities/producto.entity').default;

module.exports = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'productos',
  entities: ['./dist/**/*.entity{.ts,.js}'],
  migrations: ['./dist/migrations/*{.ts,.js}'],
  synchronize: false,
});