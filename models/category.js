import mongoose, { Schema, model, models } from "mongoose"

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: { type: mongoose.Types.ObjectId, ref:'Category', default: null },
  properties: [{ type: Object }]
})

export default models.Category || model("Category", CategorySchema)
