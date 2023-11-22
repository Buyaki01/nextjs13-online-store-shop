import mongoose, { Schema, model, models } from "mongoose"

const CategorySchema = new Schema({
  name: { type: String, required: true },
  properties: [{ type: Object }]
})

const Category = models.Category || model("Category", CategorySchema)

export default Category