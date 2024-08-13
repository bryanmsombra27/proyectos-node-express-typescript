import { Optional } from "sequelize";
import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  availability: boolean;
}
type ProductCreationAttributes = Optional<ProductAttributes, "id">;

@Table({
  tableName: "Products",
  timestamps: true,
})
class Product extends Model<ProductCreationAttributes> {
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @Column({
    type: DataType.FLOAT(6, 2),
  })
  price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  availability: boolean;
}

export default Product;
