import { IsNotEmpty, IsOptional } from "class-validator";
import { Transform } from 'class-transformer';

export class GetBlogDto {
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  fromDate?: Date;

  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  toDate?: Date;

  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  tags?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  techStacks?: string[];

  @IsOptional()
  searchQuery?: string;
}