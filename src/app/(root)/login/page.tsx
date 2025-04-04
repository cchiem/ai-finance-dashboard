"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { login, signInWithGoogle, signup } from "@/lib/actions/user.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";

export default function LoginPage() {
	const router = useRouter();

	const handleLogin = async (formdata: FormData) => {
		try {
			const { success, message } = await login(formdata);
			if (!success) throw new Error(message);
			toast.success(message);
			router.push("/dashboard");
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(`Error: ${err.message}`);
			} else {
				toast.error("An unknown error occurred.");
			}
		}
	};

	const handleSignUp = async (formdata: FormData) => {
		try {
			const { success, message } = await signup(formdata);
			if (!success) throw new Error(message);
			toast.success(message);
			router.push("/dashboard");
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(`Error: ${err.message}`);
			} else {
				toast.error("An unknown error occurred.");
			}
		}
	};

	const handleSignUpGoogle = async () => {
		try {
			const { success, message } = await signInWithGoogle();
			if (!success) throw new Error(message);
			toast.success(message);
			router.push("/dashboard");
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(`Error: ${err.message}`);
			} else {
				toast.error("An unknown error occurred.");
			}
		}
	};

	return (
		<div className="flex-1 items-center justify-center py-35 bg-gray-50">
			<Card className="w-full h-full max-w-md mx-auto">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">
						Welcome back
					</CardTitle>
					<CardDescription>
						Sign in to your account or create a new one
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="login" className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger value="login">Login</TabsTrigger>
							<TabsTrigger value="signup">Sign up</TabsTrigger>
						</TabsList>

						<TabsContent value="login">
							<form className="space-y-4" action={handleLogin}>
								<div className="space-y-2">
									<Label htmlFor="email-login">Email</Label>
									<Input
										id="email-login"
										name="email"
										type="email"
										placeholder="name@example.com"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password-login">
										Password
									</Label>
									<Input
										id="password-login"
										name="password"
										type="password"
										required
									/>
								</div>
								<SubmitButton text="Login" />
							</form>
						</TabsContent>

						<TabsContent value="signup">
							<form className="space-y-4" action={handleSignUp}>
								<div className="space-y-2">
									<Label htmlFor="email-signup">Email</Label>
									<Input
										id="email-signup"
										name="email"
										type="email"
										placeholder="name@example.com"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password-signup">
										Password
									</Label>
									<Input
										id="password-signup"
										name="password"
										type="password"
										required
									/>
								</div>
								<SubmitButton text="Create account" />
							</form>
						</TabsContent>
					</Tabs>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						<form className="mt-6">
							<Button
								type="submit"
								variant="outline"
								className="w-full"
								onClick={handleSignUpGoogle}
							>
								<svg
									className="mr-2 h-4 w-4"
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="google"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 488 512"
								>
									<path
										fill="currentColor"
										d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
									></path>
								</svg>
								Sign in with Google
							</Button>
						</form>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
