import mongoose, { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  uploadedImagePaths: [{ type: String }],
  selectedCategory: { type:mongoose.Schema.Types.ObjectId, required:true, ref: 'Category' },
  properties: {type:Object},
  isFeatured: { type: Boolean, default: false },
  //quantityInStock: { type: Number, required: true },
  //brand: { type: mongoose.Types.ObjectId, ref: 'Brand' },
}, {
  timestamps: true,
}
)

export default models.Product || model('Product', ProductSchema)

