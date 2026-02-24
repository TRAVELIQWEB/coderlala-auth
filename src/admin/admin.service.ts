import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../common/schemas/user.schema';

import { Model, Types } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) { }


        async getAdminData() {
              return "hello admin"
       }

    
}
