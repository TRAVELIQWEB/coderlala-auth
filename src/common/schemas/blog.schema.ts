import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BlogStatus } from '../enum/blogStatus.enum';
import { BlogPrimaryTech } from '../enum/blogPrimaryTech.enum';
import { BlogTechStack } from '../enum/blogTechStack.enum';
import { BlogTag } from '../enum/blogTag.enum';
import { BlogLevel } from '../enum/blogLevel.enum';
import { BlogAuthorRole } from '../enum/blogAuthorRole.enum';
import { BlogLanguage } from '../enum/blogLanguage.enum';

@Schema({ timestamps: true })
export class Blogs extends Document {

    @Prop({ required: true, trim: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, trim: true ,unique: true})
    slug: string;

    @Prop({ type: String, required: true, enum: BlogPrimaryTech })
    primaryTech: BlogPrimaryTech;

    @Prop({ type: [String], required: true, enum: BlogTechStack })
    techStacks: BlogTechStack[];

    @Prop({ type: [String], required: true, enum: BlogTag })
    tags: BlogTag[];

    @Prop({ type: String, required: true, enum: BlogLevel })
    level: BlogLevel;

    @Prop({ required: true, min: 1 })
    readingTime: number;

    @Prop({
        type: {
            name: { type: String, required: true, trim: true },
            role: { type: String, required: true, enum: BlogAuthorRole }
        },
        required: true
    })
    author: {
        name: string;
        role: BlogAuthorRole;
    };

    @Prop({ type: String, required: true, enum: BlogLanguage })
    language: BlogLanguage;

    @Prop({
        type: {
            title: { type: String, required: true, trim: true },
            description: { type: String, required: true, trim: true },
            canonicalUrl: { type: String }
        },
        required: true
    })
    seo: {
        title: string;
        description: string;
        canonicalUrl?: string;
    };

    @Prop({ required: true, trim: true })
    description: string;

    @Prop({ type: String, required: true, enum: BlogStatus })
    status: BlogStatus;

    @Prop({type: Types.ObjectId, required: true })
    userId: Types.ObjectId;
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs);


BlogsSchema.index({ slug: 1 });
BlogsSchema.index({ status: 1 });
BlogsSchema.index({ primaryTech: 1 });
BlogsSchema.index({ tags: 1 });
