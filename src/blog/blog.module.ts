import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blogs, BlogsSchema } from 'src/common/schemas/blog.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Blogs.name, schema: BlogsSchema },
      ]),
    ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
