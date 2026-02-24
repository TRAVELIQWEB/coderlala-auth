import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blogs, BlogsSchema } from 'src/common/schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blogs.name, schema: BlogsSchema },
    ]),
  ],
  controllers: [ BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
