import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { Blogs } from 'src/common/schemas/blog.schema';
import { GetBlogDto } from './dto/get-blog.dto';

@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blogs.name)
        private blogsModel: Model<Blogs>,
    ) { }


    async getAllBlogs(query:GetBlogDto) {
        const {fromDate, toDate, tags, techStacks, searchQuery} = query;
        let filter = {};
        if(fromDate && toDate) {
            filter['createdAt'] = {
                $gte: fromDate,
                $lte: toDate
            }
        }
        if(tags && tags.length > 0) {
            filter['tags'] = {$in: tags}
        }
        if(techStacks && techStacks.length > 0) {
            filter['techStacks'] = {$in: techStacks}
        }
        if(searchQuery) {
            filter['$or'] = [
                {title: {$regex: searchQuery, $options: 'i'}},
                {description: {$regex: searchQuery, $options: 'i'}},
                {content: {$regex: searchQuery, $options: 'i'}}
            ]
        }
        return await this.blogsModel.find(filter).exec();
    }
    

    async getBlogBySlug(slug: string) {
        const blog = await this.blogsModel.findOne({slug}).exec();

        const primaryTech = blog?.primaryTech;
        const tags = blog?.tags;

        let filter = {
            $or: [
                {
                    primaryTech,

                },
                {
                    tags: tags
                }
            ]
        }

        const relatedBlogs = await this.blogsModel.find(filter).sort({ updatedAt: -1 }).limit(10);

        return {
            status: "success",
            data: {
                blog,
                relatedBlogs
            }
        }

    }
}

