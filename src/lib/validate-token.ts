import { jwtVerify } from 'jose';

export async function ValidateToken(accessToken: string | null): Promise<boolean> {
	if(!accessToken) return false;

	try{
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		jwtVerify(accessToken, secret);
		console.log("validated");
		return true;
	}catch{
		return false;
	}
}
