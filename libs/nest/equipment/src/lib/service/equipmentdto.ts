import { IsString } from 'class-validator';
export class equipmentdto {
  @IsString()
  id!: string;

  @IsString()
  e_id!: string;

  @IsString()
  e_name!: string;

  @IsString()
  e_type!: string;

  @IsString()
  e_state!: string;

  @IsString()
  in_time!: null;

  @IsString()
  warranty_time!: string;

  @IsString()
  create_time!: null;

  @IsString()
  create_user!: string;

  @IsString()
  update_time!: null;

  @IsString()
  update_user!: string;
}
