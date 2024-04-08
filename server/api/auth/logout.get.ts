export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();
    deleteCookie(event, runtimeConfig.public.authCookieName, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });
});
