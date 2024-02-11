import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    private _nutri: any;
    public get nutri(): any {
        return this._nutri;
    }
    public set nutri(value: any) {
        this._nutri = value;
    }
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