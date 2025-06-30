/*Este archivo crea un clienteproxy que se comunica con el MS de usuarios */

import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const usuariosClient = () => {
  return ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: process.env.MS_USER_HOST,
      port: 3001,
    }, 
  });
};