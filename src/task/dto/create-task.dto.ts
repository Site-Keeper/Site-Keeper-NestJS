import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { Status } from "src/enums/status.enum"

export class CreateTaskDto {
    
    @IsString()
    title: string

    @IsString()
    description: string

    @IsEnum(Status)
    state: Status

    @IsInt()
    space_id: number

    @IsOptional()
    @IsInt()
    object_id?: number

    @IsBoolean()
    is_deleted: boolean
    
    @IsInt()
    routine_id: number

    @IsInt()
    topic_id: number
}
