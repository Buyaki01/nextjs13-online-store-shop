export { default } from "next-auth/middleware"

//I want when user tries to checkout and they are not logged in, they get redirected to the login page and the come back to the checkout-page NOT the login page
export const config = { matcher: ["/orders", "/checkout-address", "/checkout-success"]} //Will not be accessible when we are logged out