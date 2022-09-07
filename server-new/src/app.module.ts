import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(`${process.env.MONGO_DB_URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),

    UsersModule
  ]
})
export class AppModule {}
