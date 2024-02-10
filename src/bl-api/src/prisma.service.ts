import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app:INestApplication){
        const exit ='beforeExit'
        this.$on(exit as never,async()=>{
            await app.close()
        })
    }
}   