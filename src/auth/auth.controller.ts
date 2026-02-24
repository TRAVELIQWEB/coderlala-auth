import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { initializeDto } from "./dto/initializeDto"
import type { Response } from 'express';
import { stat } from 'fs';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("initialize")
    initialize(@Body() dto: initializeDto) {
        return this.authService.initialize(
            dto.email,
            dto.password
        )
    }
    @Post("login")
    async login(@Body() dto: initializeDto, @Res({ passthrough: true }) res: Response) {

        const { access_token, role } = await this.authService.login(
            dto.email,
            dto.password
        )

        res.cookie("access_token", access_token, {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 days
            httpOnly: process.env.ENVIRONMENT === "production", // 🔴 only set httpOnly in production
            secure: process.env.ENVIRONMENT === "production", // 🔴 only set secure in production
            sameSite: process.env.ENVIRONMENT === "production" ? 'none' : 'lax', // 🔴 set sameSite to 'none' in production for cross-site cookies
            path: '/'
        });
        return { message: 'Login successful', role, access_token, status: 200 };
    }

    @Get('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', {
            expires: new Date(0),
            httpOnly: process.env.ENVIRONMENT === "production",
            sameSite: process.env.ENVIRONMENT === "production" ? 'none' : 'lax',
            secure: process.env.ENVIRONMENT === "production",
            path: '/',
        });

        return { message: 'Logout successful' ,status: "success"};
    }



}
