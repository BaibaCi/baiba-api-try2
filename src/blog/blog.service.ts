import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import {
    CreateBlogDto,
    EditBlogDto,
  } from './dto';
  
  @Injectable()
  export class BlogService {
    constructor(private prisma: PrismaService) {}
  
    getBlogs(userId: number) {
      return this.prisma.blog.findMany({
        where: {
          userId,
        },
      });
    }
  
    getBlogById(
      userId: number,
      blogId: number,
    ) {
      return this.prisma.blog.findFirst({
        where: {
          id: blogId,
          userId,
        },
      });
    }
  
    async createBlog(
      userId: number,
      dto: CreateBlogDto,
    ) {
      const blog =
        await this.prisma.blog.create({
          data: {
            userId,
            ...dto,
          },
        });
  
      return blog;
    }
  
    async editBlogById(
      userId: number,
      blogId: number,
      dto: EditBlogDto,
    ) {
      // get the blog by id
      const blog =
        await this.prisma.blog.findUnique({
          where: {
            id: blogId,
          },
        });
  
      // check if user owns the blog
      if (!blog || blog.userId !== userId)
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      return this.prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          ...dto,
        },
      });
    }
  
    async deleteBlogById(
      userId: number,
      blogId: number,
    ) {
      const blog =
        await this.prisma.blog.findUnique({
          where: {
            id: blogId,
          },
        });
  
      // check if user owns the blog
      if (!blog || blog.userId !== userId)
        throw new ForbiddenException(
          'Access to resources denied',
        );
  
      await this.prisma.blog.delete({
        where: {
          id: blogId,
        },
      });
    }
  }