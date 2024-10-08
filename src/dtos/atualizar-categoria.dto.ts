import { IsString, IsOptional, IsArray, ArrayMinSize } from 'class-validator';

export class AtualizarCategoriaDto {
  @IsString()
  @IsOptional()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<any>;
}
