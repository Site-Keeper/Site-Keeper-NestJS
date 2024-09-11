import { IsArray, IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateRoutineDto {

  @IsString()
  name: string

  @IsDate()
  start_time : Date

  @IsDate()
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
