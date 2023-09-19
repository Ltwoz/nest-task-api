import { IsOptional } from 'class-validator';

export class UpdateTaskDTO {
    @IsOptional()
    title?: string;

    @IsOptional()
    description?: string;
}
