"use server";

import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";

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
		console.error(error.message);
		return { success: false, message: "Failed to Log In" };
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
		redirect("/error");
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		return { success: false, message: "Failed to Sign In" };
	}

	return { success: true, message: "Sucessfully Signed Up" };
}

export async function signInWithGoogle() {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	});

	if (error) {
		console.error(error.message);
		return { success: false, message: "Failed to Sign In with Google" };
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
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;
	return user;
}
