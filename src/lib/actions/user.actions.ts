"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Helper function to validate email and password
function validateCredentials(email: unknown, password: unknown) {
	if (!email || typeof email !== "string" || !email.includes("@")) {
		return "Please provide a valid email address";
	}

	if (!password || typeof password !== "string" || password.length < 6) {
		return "Password must be at least 6 characters";
	}

	return null;
}

export async function login(formData: FormData) {
	const supabase = await createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const validationError = validateCredentials(email, password);
	if (validationError) {
		// You might want to handle this differently, perhaps by returning the error
		// instead of redirecting, so you can display it in the UI
		console.error(validationError);
		redirect("/error");
	}

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.log(error);
		if (error.code === "invalid_credentials")
			return { success: false, message: "Invalid login credentials" };
	}

	return { success: true, message: "Sucessfully Logged In" };
}

export async function signup(formData: FormData) {
	const supabase = await createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const validationError = validateCredentials(email, password);
	if (validationError) {
		console.error(validationError);
		return { success: false, message: validationError };
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		console.log(error);
		if (error.code === "user_already_exists") {
			return {
				success: false,
				message: "This email is already registered. Please log in.",
			};
		}
		console.error(error);
		return { success: false, message: "Failed to Sign Up" };
	}

	return { success: true, message: "Successfully Signed Up" };
}

export async function signInWithGoogle() {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
		},
	});

	if (error) {
		console.log(error);
		return { success: false, message: error.code };
	}

	return { success: true, message: "Sucessfully Signed In with Google" };
}

export async function logout() {
	const supabase = await createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error(error.message);
		return { success: false, message: "Failed to sign out" };
	}

	return { success: true, message: "Sucessfully Signed Out" };
}

export async function getLoggedInUser() {
	const supabase = await createClient();

	// Wait for the user to be fetched
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	// Fetch the profile using the user id
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id) // Use the user.id from supabase.auth.user()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
}
