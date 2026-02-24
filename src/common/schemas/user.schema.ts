// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';


// @Schema({ timestamps: true })
// export class Admin extends Document {

//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({type: String,required: true, })
//   role: "Admin";
// }

// export const AdminSchema = SchemaFactory.createForClass(Admin);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../common/enum/user.role.enum';

@Schema({ timestamps: true })
export class User extends Document {


  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({type: String, enum: UserRole,required: true, })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
