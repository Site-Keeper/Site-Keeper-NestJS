import { IsArray, IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateRoutineDto {

  @IsString()
  name: string

  @IsDate()
  @Type(() => Date)
  start_time : Date

  @IsDate()
  @Type(() => Date)
  end_time : Date

  @IsArray()
  @IsString({ each: true })
  days: string[]

  @IsNumber()
  assigned_to: number

  @IsNumber()
  created_by : number

  @IsBoolean()
  is_deleted : boolean
}
