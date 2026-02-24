import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserRole } from 'src/common/enum/user.role.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('admin')
export class AdminController {
 constructor(private adminService:AdminService){}

    @Get("me")
    @Roles(UserRole.USER, UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)

    getAdminData(){
        return this.adminService.getAdminData();
    }  
}
