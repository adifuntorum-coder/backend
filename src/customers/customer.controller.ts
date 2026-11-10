import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('category')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // Get all category (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.customerService.getAll();
  }

  // Get single category by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.customerService.findById(+id);
  }

  // Create category (open - for demo)
  @Post()
  async create(@Body() body: { category_code: string; category_name: string, id: string }) {
    return this.customerService.createCategory(body.category_code, body.category_name, body.id);
  }

  // Update category (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.customerService.updateCategory(+id, body);
  }

  // Delete category (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.customerService.deleteCategory(+id);
  }
}