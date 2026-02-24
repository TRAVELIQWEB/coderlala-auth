import { Body, Controller, Get, Param, Post, Put,Req, Query, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UserRole } from 'src/common/enum/user.role.enum';


@Controller('admin/blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) { }

     @Get()
     @Roles(UserRole.USER, UserRole.ADMIN)
     @UseGuards(JwtAuthGuard, RolesGuard)

    async getAllBlogs(@Query() query: any) {

        const { page = 1, searchQuery, status } = query
        return this.blogsService.getAllBlogs(Number(page), searchQuery, status);
    }

    @Get(':id')
     @Roles(UserRole.USER, UserRole.ADMIN)
     @UseGuards(JwtAuthGuard, RolesGuard)
    async getBlogById(@Param('id') id: string) {
        return this.blogsService.getBlogById(id);
    }


    @Post('create')
     @Roles(UserRole.USER, UserRole.ADMIN )
     @UseGuards(JwtAuthGuard, RolesGuard)
    async createBlog(@Body() dto: CreateBlogDto,@Req()req) {
        return this.blogsService.createBlog(dto,req.user.userId);
    }



    @Put(':id')
     @Roles(UserRole.USER, UserRole.ADMIN)
     @UseGuards(JwtAuthGuard, RolesGuard)
    async updateBlog(@Param('id') id: string, @Body() dto: CreateBlogDto,) {
        return this.blogsService.updateBlog(id, dto);
    }

}
