"use client";

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
import { AkahuLoginButton } from "./AkahuButton";

type HeaderProps = {
	user: UserType | null;
};

export default function Header({ user }: HeaderProps) {
	const pathname = usePathname();

	const handleLogout = async () => {
		await logout();
	};

	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "About", href: "/about" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<header className="sticky flex justify-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 min-w-5xl justify-between ">
				<div className="flex items-center gap-2 w-40">
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
					{user ? (
						<>
							{user.email && user.akahuToken ? (
								<div>Bank Account Connected</div>
							) : (
								<AkahuLoginButton userEmail={user.email} />
							)}

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
										<form
											action={handleLogout}
											className="w-full"
										>
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
						</>
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
