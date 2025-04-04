"use client";

import { Button } from "@/components/ui/button";
import { AkahuClient } from "akahu";
import { useState } from "react";

if (!process.env.NEXT_PUBLIC_AKAHU_APP_TOKEN) {
	throw new Error("NEXT_PUBLIC_AKAHU_APP_TOKEN is not defined");
}

const akahu = new AkahuClient({
	appToken: process.env.NEXT_PUBLIC_AKAHU_APP_TOKEN,
});

export function AkahuLoginButton({ userEmail }: { userEmail: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const handleLogin = async () => {
		setIsLoading(true);
		try {
			const authUrl = akahu.auth.buildAuthorizationUrl({
				redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/akahu`,
				email: userEmail, // You can prefill this if you have the user's email
			});
			window.location.href = authUrl;
		} catch (error) {
			console.error("Failed to generate Akahu auth URL", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button onClick={handleLogin} disabled={isLoading}>
			{isLoading ? "Loading..." : "Connect Bank"}
		</Button>
	);
}
