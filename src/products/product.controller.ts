import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Get all products
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  // Get single product by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  // Create product
  @Post()
  async create(
    @Body() body: { name: string; price: number; description?: string },
  ) {
    return this.productService.createProduct(
      body.name,
      body.price,
      body.description,
    );
  }

  // Update product
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; price?: number; description?: string },
  ) {
    return this.productService.updateProduct(+id, body);
  }

  // Delete product
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}