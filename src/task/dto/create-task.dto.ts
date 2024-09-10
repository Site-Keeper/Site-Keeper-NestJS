import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { Status } from "src/enums/status.enum"

export class CreateTaskDto {
    
    @IsInt()
    routine_id: number

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
    topic_id: number

    @IsInt()
    created_by: number

    @IsInt()
    assigned_to: number
}
