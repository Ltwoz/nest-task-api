import { IsOptional } from 'class-validator';

export class SearchTasksDTO {
    @IsOptional()
    search?: string;
}
