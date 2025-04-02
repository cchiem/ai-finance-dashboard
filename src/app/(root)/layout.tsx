import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Toaster } from "sonner";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const loggedIn = await getLoggedInUser();

	return (
		<main className="min-h-screen min-w-screen bg-background">
			<div className="relative flex min-h-screen flex-col">
				<Header user={loggedIn} />
				<main className="flex-1">
					<Toaster richColors />
					<div className="">{children}</div>
				</main>
				<Footer />
			</div>
		</main>
	);
}
