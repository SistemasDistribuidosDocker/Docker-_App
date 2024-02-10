import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { min } from "class-validator";
import { IsInt, IsString, Min } from "class-validator";

export type PrismanutriType = {
    id: number;
    yearstart: number;
    yearend: number;
    locationabbr: string;
    locationdesc: string;
    datasource: string;
    class: string;
    topic: string;
    question: string;
    data_value_type: string;
    data_value: number;
    data_value_alt: number;
    low_confidence_limit: number;
    high_confidence_limit: number;
    sample_size: number;
    race_ethnicity: string;
    classid: string;
    questionid: string;
    datavaluetypeid: string;
    locationid: number;
    stratificationcategory1: string;
    stratification1: string;
    stratificationcategoryid1: string;
    stratificationid1: string;
}

export class NutriDto {
    static fromTable(base: PrismanutriType) {
        const nutri = new NutriDto();

        nutri.yearstart = base.yearstart

        return nutri;
    }

    @ApiProperty()
    @IsString()
    id: number;

    @ApiProperty({
        description: 'Birthday year',
        minimum: 1970
    })
    @IsInt()
    @Min(0)
    yearstart: number;

    @IsInt()
    @Min(0)
    yearend: number;
    
    @ApiProperty()
    @IsString()
    locationabbr: string;

    @ApiProperty()
    @IsString()
    ethnicity: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    count: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    rank: number;
}