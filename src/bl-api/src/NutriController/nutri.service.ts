import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { NutriDto } from "./nutri.model";
import { Prisma } from "@prisma/client";


@Injectable()
export class nutriService {
    checkIfnutriExists(id: string) {
        throw new Error("Method not implemented.");
    }
    getnutri(id: string): import("./nutri.model").NutriDto | PromiseLike<import("./nutri.model").NutriDto> {
        throw new Error("Method not implemented.");
    }
    getAllnutri() {
        throw new Error("Method not implemented.");
    }

    constructor(private prisma: PrismaService) { }

    getAllNutri() {
        return this.prisma.nutri.findMany()
    }

    async getNutri(id: string) {
        const Nutri = await this.prisma.nutri.findFirst({ where: { id: String(id) } });
        if (Nutri) {
            return NutriDto.fromTable(Nutri);
        }
        return null
    }
    
    private async transformNutri(data: NutriDto): Promise<Prisma.NutriCreateInput> {
        const ethnicity = await this.prisma.ethnicity.findFirst({
            where: {
                ethnicity: data.ethnicity
            },
        });
        return {
            id: data.id,
            birthYear: data.birthYear,
            gender: data.gender,
            ethnicity: {
                create: !ethnicity ? {
                    ethnicity: data.ethnicity
                } : undefined,
                connectOrCreate: ethnicity ? {
                    create: {
                        ethnicity: data.ethnicity
                    },
                    where: {
                        id: ethnicity.id
                    }
                } : undefined
            }, name: data.name,
            count: data.count,
            rank: data.rank
        }
    }

    async checkIfNutriExists(id: string) {
        const nutri = await this.prisma.nutri.findFirst({
            where: {
                id,
            }
        });
        return Boolean(nutri)
    }

    async createNutri(id: string, data: NutriDto) {
        const nutri = await this.prisma.nutri.create({
            data: await this.transformNutri(data),
        })

        if (nutri) {
            return NutriDto.fromTable(nutri);
        }
        return null
    }
    async updateNutri(id: string, data: NutriDto) {
        const nutri = await this.prisma.nutri.update({
            where: { id: String(id) },
            //ADD INFORMATION TO THE DATA HERE DONT FORGET
            data: await this.transformNutri(data)
        })
        if (nutri) {
            return NutriDto.fromTable(nutri);
        }
        return null
    }

    async deleteNutri(id: string): Promise<void> {
        await this.prisma.babyNames.delete({
            where: { id: String(id) }
        })
    }

    async function createNutri(data: NutriCreateInput) {
        return await Prisma.nutri.create({
            data,
        });
    }
}