const { Schema, model, models, default: mongoose } = require("mongoose")

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  uploadedImagePaths: [{ type: String }],
  selectedCategory: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: {type:Object},
  isFeatured: { type: Boolean, default: false },
  //quantityInStock: { type: Number, required: true },
  //brand: { type: mongoose.Types.ObjectId, ref: 'Brand' },
}, {
  timestamps: true,
}
)

export const Product = models.Product || model('Product', ProductSchema)