import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ClientsModule.register([
      {
        name: 'MY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://queue'],
          queue: 'my_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ]
})
export class AppModule {}
