const { Schema, model, models, default: mongoose } = require("mongoose")

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // customerId: { type: String }, //It's from Stripe and is different from the user Id
  paymentIntentId: { type: String },
  products: [{
    id: { type: String },
    productName: { type: String },
    description: { type: String },
    price: { type: String },
    images: [{ type: String }],
    selectedCategory: { type: mongoose.Types.ObjectId },
    properties: {type:Object},
    isFeatured: { type: Boolean },
    cartQuantity: { type: Number },
  }],
  //totalPrice: { type: Number, required: true},
  deliveryStatus: { type: String, default: "Pending" },
  paymentStatus: { type: String, default: "Pending" },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  streetAddress: { type: String, required: true },
  country: { type: String, required: true },
}, {
  timestamps: true,
}
)

export const Order = models.Order || model('Order', OrderSchema)