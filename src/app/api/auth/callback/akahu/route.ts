import { getLoggedInUser } from "@/lib/actions/user.actions";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");

	if (!code) {
		return NextResponse.json(
			{ error: "No code provided" },
			{ status: 400 }
		);
	}

	const supabase = await createClient();
	const url = "https://api.akahu.io/v1/token";

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify({
				grant_type: "authorization_code",
				code: code,
				redirect_uri: "http://localhost:3000/api/auth/callback/akahu",
				client_id: process.env.AKAHU_APP_TOKEN,
				client_secret: process.env.AKAHU_APP_SECRET,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			console.error("❌ Token exchange failed:", data);
			throw new Error(data.error || "Failed to exchange token");
		}

		console.log("✅ Token exchange successful:", data);
		const accessToken = data.access_token;

		// Fetch the user profile using the correct column (`id`)
		const user = await getLoggedInUser();
		const CurrentUserId = user?.id;

		const { data: existingUser, error: fetchError } = await supabase
			.from("profiles")
			.select("id")
			.eq("id", CurrentUserId)
			.single();

		// const { data: users, error } = await supabase
		// 	.from("profiles")
		// 	.select("*"); // This fetches all the rows in the "profiles" table
		// console.log(users);

		if (fetchError) {
			console.error("❌ Failed to fetch user from database:", fetchError);
			throw new Error("Database fetch failed");
		}

		if (existingUser) {
			const { error: updateError } = await supabase
				.from("profiles")
				.update({ akahu_token: accessToken })
				.eq("id", CurrentUserId);

			if (updateError) {
				console.error("❌ Failed to update Akahu token:", updateError);
				throw new Error("Database update failed");
			}

			console.log("✅ Akahu token updated successfully");
		}

		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
		);
	} catch (error) {
		console.error("❌ Failed to exchange auth code:", error);
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=TokenExchangeFailed`
		);
	}
}
