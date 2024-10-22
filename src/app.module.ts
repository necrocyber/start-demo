import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos (puede ser mysql, sqlite, etc.)
      host: 'localhost', // Dirección de la base de datos
      port: 5432, // Puerto de PostgreSQL
      username: 'postgres', // Usuario de la base de datos
      password: 'postgres', // Contraseña de la base de datos
      database: 'bank', // Nombre de la base de datos
      entities: [UserEntity], // Directorio de las entidades
      synchronize: true, // Sincronizar entidades con la base de datos (solo en desarrollo)
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
