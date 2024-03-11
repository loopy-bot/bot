import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '123.60.1.214',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'wx_bot',
      synchronize: true,
      logging: true,
      poolSize: 10,
      connectorPackage: 'mysql2',
      entities: [__dirname + '/**/entities/*.entity{.js,.ts}'],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
