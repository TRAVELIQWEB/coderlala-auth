import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blogs } from 'src/common/schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UserRole } from 'src/common/enum/user.role.enum';

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel(Blogs.name)
        private blogsModel: Model<Blogs>,
    ) { }

    // async getAllBlogs() {
    //     return await this.blogsModel.find().exec();
    // }

    async getAllBlogs(page: number, searchQuery: string, status: string) {
        const limit = 20;
        const skip = (page - 1) * limit;

        let filter: any = {}

        if (status) {
            filter.status = status
        }

        if (searchQuery) {
            filter.title = searchQuery
        }


        const blogs = await this.blogsModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.blogsModel.countDocuments(filter)

        return {
            status: "success",
            data: {
                blogs,
                total,
                totalpage: Math.ceil(total / limit)

            }
        }
    }


    async getBlogById(id: string) {
        return await this.blogsModel.findById(id)
    }

    async createBlog(data: CreateBlogDto, userId: string) {

        
        let slug = data.slug
            ? data.slug.trim().toLowerCase()
            : data.title
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-');

        try {
            return await this.blogsModel.create({
                title: data.title,
                content: data.content,
                slug,
                primaryTech: data.primaryTech,
                techStacks: data.techStacks,
                tags: data.tags,
                level: data.level,
                readingTime: data.readingTime,
                author: data.author,
                language: data.language,
                seo: data.seo,
                description: data.description,
                status: data.status,
                userId,
            });

        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('This slug already exists.');
            }
            throw error;
        }
    }




    async updateBlog(id: string, dto: CreateBlogDto) {
        return this.blogsModel.findByIdAndUpdate(
            id,
            dto,
            { new: true }
        );
    }


}
