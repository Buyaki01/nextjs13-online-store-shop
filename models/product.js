import mongoose, { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productName: { type: String, required: true },
  description: String,
  regularPrice: { type: Number, required: true },
  productPrice: { type: Number, required: true },
  uploadedImagePaths: [{ type: String }],
  selectedCategory: { type:mongoose.Schema.Types.ObjectId, required:true, ref: 'Category' },
  properties: {type:Object},
  isFeatured: { type: Boolean, default: false },
  quantityInStock: { type: Number, required: true },
  brand: { type: mongoose.Types.ObjectId, required:true, ref: 'Brand' },
}, {
  timestamps: true,
}
)

const Product = models.Product || model('Product', ProductSchema)

export default Product