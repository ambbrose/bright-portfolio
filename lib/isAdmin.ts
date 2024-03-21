export const isAdmin = (userId?: string | null, userEmail?: string | null) => {
    return userId === process.env.NEXT_PUBLIC_ADMIN_ID && userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}