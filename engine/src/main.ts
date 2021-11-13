import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://queue'],
      queue: 'my_queue',
      queueOptions: {
        durable: false
      },
    },
  });


  await app.startAllMicroservices();
  await app.listen(3030);
}
bootstrap();
