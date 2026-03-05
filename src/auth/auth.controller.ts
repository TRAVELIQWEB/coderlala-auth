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
        );

        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.ENVIRONMENT === "production",
            sameSite: "lax",
            domain: ".coderlala.com",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie("role", role, {
            httpOnly: false,   // must be readable by proxy
            secure: process.env.ENVIRONMENT === "production",
            sameSite: "lax",
            domain: ".coderlala.com",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        });

        return { message: "Login successful", status: 200 };
    }

    @Get('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie("access_token", {
            domain: ".coderlala.com",
            path: "/"
        });

        res.clearCookie("role", {
            domain: ".coderlala.com",
            path: "/"
        });


        return { message: 'Logout successful', status: "success" };
    }



}
