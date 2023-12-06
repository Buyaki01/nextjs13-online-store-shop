import { Schema, model, models } from "mongoose"

const CategorySchema = new Schema({
  name: { type: String, required: true },
  properties: [{ type: Object }],
  categoryImage: [{ type: String }]
})

const Category = models?.Category || model("Category", CategorySchema)

export default Category