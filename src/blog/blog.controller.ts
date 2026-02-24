import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { GetBlogDto } from './dto/get-blog.dto';

@Controller('blog')
export class BlogController {
 constructor(private readonly blogService: BlogService) {}

  @Get()
   getAllBlogs(@Query() query:GetBlogDto) {
    console.log('Received query:', query);
     return this.blogService.getAllBlogs(query);
   }




      
   @Get(':slug')
   async getBlogBySlug(@Param('slug') slug: string) {
     return this.blogService.getBlogBySlug(slug);
   }

}
