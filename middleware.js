export { default } from "next-auth/middleware"

export const config = { matcher: ["/my-orders"]} //Will not be accessible when we are logged out