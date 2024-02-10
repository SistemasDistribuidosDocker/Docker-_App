import { Module } from "@nestjs/common";
import { nutriController } from "./nutri.controller";
import { nutriService } from "./nutri.service";
import { PrismaService } from "../prisma.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [nutriController],
    providers: [nutriService, PrismaService],

})
export class nutriModule { }