import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { NutriDto } from "./nutri.model";

@Injectable()
export class NutriService {
    constructor(private prisma: PrismaService) {}

    async getAllNutri(): Promise<NutriDto[]> {
        const nutris = await this.prisma.nutri.findMany();
        return nutris.map(NutriDto.fromTable);
    }

    async getNutri(id: string): Promise<NutriDto | null> {
        const nutri = await this.prisma.nutri.findFirst({ where: { id } });
        return nutri ? NutriDto.fromTable(nutri) : null;
    }

    async checkIfNutriExists(id: string): Promise<boolean> {
        const nutri = await this.prisma.nutri.findFirst({ where: { id } });
        return Boolean(nutri);
    }

    async createNutri(data: NutriDto): Promise<NutriDto> {
        const createdNutri = await this.prisma.nutri.create({ data });
        return NutriDto.fromTable(createdNutri);
    }

    async updateNutri(id: string, data: NutriDto): Promise<NutriDto | null> {
        const existingNutri = await this.prisma.nutri.findFirst({ where: { id } });
        if (!existingNutri) {
            throw new NotFoundException(`Nutri with ID ${id} not found.`);
        }
        const updatedNutri = await this.prisma.nutri.update({
            where: { id },
            data
        });
        return NutriDto.fromTable(updatedNutri);
    }

    async deleteNutri(id: string): Promise<void> {
        await this.prisma.nutri.delete({ where: { id } });
    }
}
