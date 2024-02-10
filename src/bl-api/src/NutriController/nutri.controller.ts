import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { nutriService } from "./nutri.service";
import { Request, Response } from "express";
import { NutriDto } from "./nutri.model";
import { ApiResponse } from "@nestjs/swagger";
import { AuthGuard, Role, RolesEnum } from "../AuthGuard";
import { HttpService } from "@nestjs/axios";

@Controller('api')
export class nutriController {
    constructor(
        private readonly nutriService: nutriService,
        private readonly httpService: HttpService
    ) { }

    @UseGuards(AuthGuard)
    @Role(RolesEnum.ADMIN)
    @Get('nutri')
    async getAllNutri(@Req() request: Request): Promise<any> {
        const result = await this.nutriService.getAllnutri()
        return result
    }

    @UseGuards(AuthGuard)
    @Role(RolesEnum.VIEWER)
    @Get('nutri/:id')
    async getNutri(@Param('id') id: string): Promise<NutriDto | null> {
        return this.nutriService.getnutri(id)
    }

    @UseGuards(AuthGuard)
    @Role(RolesEnum.EDIT)
    @Post('nutri/:id')
    @ApiResponse({ status: 200, description: 'Baby Name created with success' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Id from babyname already exists.' })
    async postNutri(@Param('id') id: string, @Body() postData: NutriDto): Promise<NutriDto> {
        if (await this.nutriService.checkIfNutriExists(id)) {
            throw new HttpException('Id from nutri already exists', HttpStatus.CONFLICT);
        }

        return this.nutriService.createNutri(id, postData)
    }

    @UseGuards(AuthGuard)
    @Role(RolesEnum.EDIT)
    @Put('nutri/:id')
    @ApiResponse({ status: 200, description: 'nutri updated with success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Id from babyname doens\'t exist' })
    async updateNutri(@Param('id') id: string, @Body() postData: NutriDto): Promise<NutriDto> {
        if (!(await this.nutriService.checkIfNutriExists(id))) {
            throw new HttpException('Id from nutri doens\'t exist', HttpStatus.BAD_REQUEST);
        }
        return this.nutriService.updateNutri(id, postData)
    }

    @UseGuards(AuthGuard)
    @Role(RolesEnum.EDIT)
    @Delete('nutri/:id')
    @ApiResponse({ status: 200, description: 'Baby Name deleted with success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Id from nutri doens\'t exist' })
    async deletenutri(@Param('id') id: string): Promise<void> {
        if (!(await this.nutriService.checkIfNutriExists(id))) {
            throw new HttpException('Id from nutri doens\'t exist', HttpStatus.BAD_REQUEST);
        }
        await this.nutriService.deleteNutri(id)
    }
}