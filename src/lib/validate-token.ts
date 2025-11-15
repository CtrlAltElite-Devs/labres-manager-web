export async function ValidateToken(accessToken: string | undefined): Promise<boolean> {
	// const cookieStore = await cookies();

	// const cookieName = ZustandCookieParser.extractFromCookies(cookieStore.getAll(), "auth-user", "token").name;

	// const accessToken = cookieStore.get(cookieName)?.value;

	if (!accessToken) return false;

	const res = await fetch(`${process.env.API_BASE_URI}/api/v1/auth/me`);

	if (!res.ok) return false;

	return true;
}
