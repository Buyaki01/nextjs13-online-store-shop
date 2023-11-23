export { default } from "next-auth/middleware"

export const config = { matcher: ["/orders", "/checkout-address", "/checkout-success"]} //Will not be accessible when we are logged out