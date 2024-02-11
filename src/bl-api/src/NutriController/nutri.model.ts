import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export interface PrismanutriType {
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
    static fromTable(base: PrismanutriType): NutriDto {
        const nutri = new NutriDto();

        nutri.yearstart = base.yearstart;
        // Copie outros campos conforme necessário
        return nutri;
    }

    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    yearstart: number;

    @ApiProperty()
    @IsInt()
    yearend: number;
    
    @ApiProperty()
    @IsString()
    locationabbr: string;

    @ApiProperty()
    @IsString()
    locationdesc: string;

    @ApiProperty()
    @IsString()
    datasource: string;

    @ApiProperty()
    @IsString()
    class: string;

    @ApiProperty()
    @IsString()
    topic: string;

    @ApiProperty()
    @IsString()
    question: string;

    @ApiProperty()
    @IsString()
    data_value_type: string;

    @ApiProperty()
    @IsInt()
    data_value: number;

    @ApiProperty()
    @IsInt()
    data_value_alt: number;

    @ApiProperty()
    @IsInt()
    low_confidence_limit: number;
    
    @ApiProperty()
    @IsInt()
    high_confidence_limit: number;
    
    @ApiProperty()
    @IsInt()
    sample_size: number;
    
    @ApiProperty()
    @IsString()
    race_ethnicity: string;
    
    @ApiProperty()
    @IsString()
    classid: string;
    
    @ApiProperty()
    @IsString()
    questionid: string;
    
    @ApiProperty()
    @IsString()
    datavaluetypeid: string;
    
    @ApiProperty()
    @IsInt()
    locationid: number;
    
    @ApiProperty()
    @IsString()
    stratificationcategory1: string;
    
    @ApiProperty()
    @IsString()
    stratification1: string;
    
    @ApiProperty()
    @IsString()
    stratificationcategoryid1: string;
    
    @ApiProperty()
    @IsString()
    stratificationid1: string;
}
