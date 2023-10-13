const { Schema, model, models, default: mongoose } = require("mongoose")

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  uploadedImagePaths: [{ type: String }],
  selectedCategory: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: {type:Object},
})

export const Product = models.Product || model('Product', ProductSchema)