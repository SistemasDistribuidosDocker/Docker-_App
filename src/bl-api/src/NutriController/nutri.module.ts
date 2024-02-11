import { Module } from "@nestjs/common";
import { nutriController } from "./nutri.controller";
import { NutriService } from "./nutri.service";
import { PrismaService } from "../prisma.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [nutriController],
    providers: [NutriService, PrismaService],

})
export class nutriModule { }