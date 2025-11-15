import { StateStorage } from "zustand/middleware";

export const customCookieStorage: StateStorage = {
	getItem: (name): string | null => {
		return (
			document.cookie
				.split("; ")
				.find((row) => row.startsWith(name + "="))
				?.split("=")[1] ?? null
		);
	},

	setItem: (name, value) => {
		document.cookie = `${name}=${value}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
	},

	removeItem: (name) => {
		document.cookie = `${name}=; Path=/; Max-Age=0`;
	},
};
