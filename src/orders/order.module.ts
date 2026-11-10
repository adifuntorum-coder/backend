import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { CategoryModule } from '../category/category.module';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';


@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, CategoryModule],
controllers: [OrderController],
providers: [OrderService],

})
export class OrderModule {}