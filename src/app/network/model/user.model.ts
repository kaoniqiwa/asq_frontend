import { Exclude, Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';
export class User implements IModel {
  /**	String	唯一标识符	M	R */
  id!: string;
  /**	String	用户名	M	RW */
  name!: string;
  username!: string;
  create_time!: string;
  update_time!: string;
}
