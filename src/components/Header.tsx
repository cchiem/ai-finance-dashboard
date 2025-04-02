"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogOut, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/user.actions";
import { createClient } from "utils/supabase/client";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [user, setUser] = useState<unknown>(null);
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		async function getUser() {
			setIsLoading(true);
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setIsLoading(false);
		}

		getUser();
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "About", href: "/about" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<header className="sticky flex justify-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 min-w-5xl justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-xl font-bold">
							<PiggyBank />
						</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`text-sm font-medium transition-colors hover:text-primary ${
								pathname === item.href
									? "text-primary"
									: "text-muted-foreground"
							}`}
						>
							{item.name}
						</Link>
					))}
				</nav>

				{/* Auth Buttons - Desktop */}
				<div className="flex items-center gap-4">
					{isLoading ? (
						<div className="h-9 w-20 bg-muted animate-pulse rounded-md"></div>
					) : user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="gap-2"
								>
									<User size={16} />
									{user.email
										? user.email.split("@")[0]
										: "Account"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem asChild>
									<Link href="/profile">Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/settings">Settings</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<form action={logout} className="w-full">
										<button
											type="submit"
											className="flex w-full items-center"
										>
											<LogOut className="mr-2 h-4 w-4" />
											<span>Logout</span>
										</button>
									</form>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<>
							<Link href="/login">
								<Button variant="ghost" size="sm">
									Login
								</Button>
							</Link>
							<Link href="/login?tab=signup">
								<Button size="sm">Sign up</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
