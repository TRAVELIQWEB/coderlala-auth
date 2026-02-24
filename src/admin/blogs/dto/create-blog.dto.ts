import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BlogAuthorRole } from 'src/common/enum/blogAuthorRole.enum';
import { BlogPrimaryTech } from 'src/common/enum/blogPrimaryTech.enum';
import { BlogTechStack } from 'src/common/enum/blogTechStack.enum';
import { BlogTag } from 'src/common/enum/blogTag.enum';
import { BlogLevel } from 'src/common/enum/blogLevel.enum';
import { BlogLanguage } from 'src/common/enum/blogLanguage.enum';
import { BlogStatus } from 'src/common/enum/blogStatus.enum';


// ================= AUTHOR DTO =================
class AuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(BlogAuthorRole)
  role: BlogAuthorRole;
}


// ================= SEO DTO =================
class SeoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  canonicalUrl?: string;
}


// ================= MAIN BLOG DTO =================
export class CreateBlogDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsEnum(BlogPrimaryTech)
  primaryTech: BlogPrimaryTech;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(BlogTechStack, { each: true })
  techStacks: BlogTechStack[];

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(BlogTag, { each: true })
  tags: BlogTag[];

  @IsEnum(BlogLevel)
  level: BlogLevel;

  @IsNumber()
  @Min(1)
  readingTime: number;

  @ValidateNested()
  @Type(() => AuthorDto)
  author: AuthorDto;

  @IsEnum(BlogLanguage)
  language: BlogLanguage;

  @ValidateNested()
  @Type(() => SeoDto)
  seo: SeoDto;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(BlogStatus)
  status: BlogStatus;

@IsString()
@IsOptional()
  userId: string;


}
