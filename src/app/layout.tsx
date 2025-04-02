import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Initialize the Inter font
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Your App Name | Modern Web Application",
	description: "A powerful web application with authentication and modern UI",
	keywords: ["nextjs", "react", "web app", "supabase"],
	authors: [{ name: "Your Name" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`min-h-screen min-w-screen bg-background font-sans antialiased ${inter.variable}`}
			>
				<div className="relative flex min-h-screen flex-col">
					<Header />
					<main className="flex-1">
						<div className="">{children}</div>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
