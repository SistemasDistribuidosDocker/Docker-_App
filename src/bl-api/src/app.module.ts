import { Module } from '@nestjs/common';
import { nutriModule } from './NutriController/nutri.module';


@Module({
  imports: [nutriModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
