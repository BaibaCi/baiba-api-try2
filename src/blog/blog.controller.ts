import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { GetUser } from '../auth/decorator';
  import { JwtGuard } from '../auth/guard';
  import { BlogService } from './blog.service';
  import {
    CreateBlogDto,
    EditBlogDto,
  } from './dto';
  
  @UseGuards(JwtGuard)
  @Controller('blogs')
  export class BlogController {
    constructor(
      private blogService: BlogService,
    ) {}
  
    @Get()
    getBlogs(@GetUser('id') userId: number) {
      return this.blogService.getBlogs(
        userId,
      );
    }
  
    @Get(':id')
    getBlogById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) blogId: number,
    ) {
      return this.blogService.getBlogById(
        userId,
        blogId,
      );
    }
  
    @Post()
    createBlog(
      @GetUser('id') userId: number,
      @Body() dto: CreateBlogDto,
    ) {
      return this.blogService.createBlog(
        userId,
        dto,
      );
    }
  
    @Patch(':id')
    editBlogById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) blogId: number,
      @Body() dto: EditBlogDto,
    ) {
      return this.blogService.editBlogById(
        userId,
        blogId,
        dto,
      );
    }
  
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBlogById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) blogId: number,
    ) {
      return this.blogService.deleteBlogById(
        userId,
        blogId,
      );
    }
  }