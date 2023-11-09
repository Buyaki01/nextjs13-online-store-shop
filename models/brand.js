const { Schema, model, models, default: mongoose } = require("mongoose")

const BrandSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  brandName: { type: String, required: true },
  parentCategory: { type: mongoose.Types.ObjectId, ref:'Category', default: null },
}, {
  timestamps: true,
}
)

export const Brand = models.Brand || model('Brand', BrandSchema)