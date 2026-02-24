import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/common/enum/user.role.enum';
import { User } from 'src/common/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }


    async initialize(email: string, password: string) {
        const adminExists = await this.userModel.countDocuments()
        if (adminExists) {
              throw new BadRequestException('Admin user already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            email,
            password: hashedPassword,
            role: UserRole.ADMIN
        })
        return {
            message: 'Admin user created successfully',
            status: "success",
            data: user,
        }

    }
    
    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
           throw new BadRequestException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials ');
        }

        const payload = { 
            email: user.email,
            sub: user._id.toString(), 
            role: user.role 
        };

        const access_token = await this.jwtService.signAsync(payload);
        
        return { access_token, role: user.role };
    }
}