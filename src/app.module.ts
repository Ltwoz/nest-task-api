import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.stage.${process.env.STAGE}`],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (ConfigService: ConfigService) => {
                return {
                    type: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                    host: ConfigService.get('DB_HOST'),
                    port: ConfigService.get('DB_PORT'),
                    username: ConfigService.get('DB_USERNAME'),
                    password: ConfigService.get('DB_PASSWORD'),
                    database: ConfigService.get('DB_DATABASE'),
                };
            },
        }),
        TaskModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
