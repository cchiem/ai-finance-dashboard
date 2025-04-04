"use client";

import {
	CreditCard,
	DollarSign,
	Download,
	Plus,
	Send,
	UserIcon,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Transaction {
	id: string;
	amount: number;
	description: string;
	type: string;
	created_at: string;
}

interface Account {
	balance: number;
	account_number: string;
	account_type: string;
}

interface UserType {
	email: string | null | undefined;
}

interface DashboardViewProps {
	user: UserType;
	account: Account;
	transactions: Transaction[];
}

export default function DashboardView({
	user,
	account,
	transactions,
}: DashboardViewProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const getTransactionIcon = (type: string) => {
		switch (type) {
			case "deposit":
				return <DollarSign className="h-4 w-4 text-green-500" />;
			case "withdrawal":
				return <Download className="h-4 w-4 text-red-500" />;
			case "transfer":
				return <Send className="h-4 w-4 text-blue-500" />;
			default:
				return <CreditCard className="h-4 w-4" />;
		}
	};

	return (
		<div className="flex min-h-screen w-full justify-center">
			<div className="flex-1 max-w-7xl">
				<header className="border-b bg-background px-6 py-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<h1 className="text-xl font-semibold">Dashboard</h1>
						</div>
						<div className="flex items-center gap-4">
							<Button variant="outline" size="sm">
								<Plus className="mr-2 h-4 w-4" />
								New Transaction
							</Button>
							<Avatar>
								<AvatarFallback>
									{user.email?.charAt(0).toUpperCase() || "U"}
								</AvatarFallback>
								<AvatarImage
									src="/placeholder.svg"
									alt={user.email || "User"}
								/>
							</Avatar>
						</div>
					</div>
				</header>

				<main className="p-6">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-muted-foreground">
									Total Balance
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{formatCurrency(account.balance)}
								</div>
								<p className="text-xs text-muted-foreground">
									{account.account_type} -{" "}
									{account.account_number}
								</p>
								<div className="mt-4">
									<Progress value={65} className="h-2" />
									<p className="mt-1 text-xs text-muted-foreground">
										65% of monthly spending limit
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-muted-foreground">
									Quick Actions
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-2">
									<Button
										variant="outline"
										className="h-20 flex-col"
									>
										<Send className="mb-2 h-5 w-5" />
										Transfer
									</Button>
									<Button
										variant="outline"
										className="h-20 flex-col"
									>
										<Download className="mb-2 h-5 w-5" />
										Deposit
									</Button>
									<Button
										variant="outline"
										className="h-20 flex-col"
									>
										<CreditCard className="mb-2 h-5 w-5" />
										Pay Bills
									</Button>
									<Button
										variant="outline"
										className="h-20 flex-col"
									>
										<UserIcon className="mb-2 h-5 w-5" />
										Profile
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card className="md:col-span-2 lg:col-span-1">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-muted-foreground">
									Spending Analytics
								</CardTitle>
							</CardHeader>
							<CardContent className="pb-2">
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div className="h-3 w-3 rounded-full bg-primary"></div>
											<span className="text-xs">
												Groceries
											</span>
										</div>
										<span className="text-xs font-medium">
											32%
										</span>
									</div>
									<Progress value={32} className="h-2" />

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div className="h-3 w-3 rounded-full bg-blue-500"></div>
											<span className="text-xs">
												Utilities
											</span>
										</div>
										<span className="text-xs font-medium">
											25%
										</span>
									</div>
									<Progress
										value={25}
										className="h-2 bg-blue-100 dark:bg-blue-950"
									>
										<div
											className="h-full bg-blue-500"
											style={{ width: "25%" }}
										></div>
									</Progress>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div className="h-3 w-3 rounded-full bg-green-500"></div>
											<span className="text-xs">
												Entertainment
											</span>
										</div>
										<span className="text-xs font-medium">
											18%
										</span>
									</div>
									<Progress
										value={18}
										className="h-2 bg-green-100 dark:bg-green-950"
									>
										<div
											className="h-full bg-green-500"
											style={{ width: "18%" }}
										></div>
									</Progress>
								</div>
							</CardContent>
						</Card>
						<Card className="md:col-span-2 lg:col-span-3">
							<CardHeader>
								<CardTitle>About Akahu</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<p>
										Akahu provides a simple way to connect
										your financial accounts to services like
										Horizon Finance.
									</p>
									<p>
										Akahu is built in New Zealand, backed by
										Westpac, and used by a broad range of
										Government, corporate, and fintech
										services.
									</p>

									<div>
										<h3 className="font-semibold mb-2">
											How it works
										</h3>
										<p>
											Through Akahu, you can provide
											Horizon Finance with access to your
											selected financial accounts.
										</p>
										<p className="mt-1">
											The access available to Horizon
											Finance will be limited to the
											specific permissions that you
											approve.
										</p>
									</div>

									<div>
										<h3 className="font-semibold mb-2">
											Privacy and security
										</h3>
										<p>
											Your data is shared with Horizon
											Finance. We do not sell your data to
											other parties. If you grant ongoing
											access, you can revoke that access
											at any time.
										</p>
										<p className="mt-1">
											We treat your data with the same
											care as our own. Our systems are
											secured using modern cloud services,
											strong AES-256 encryption, and our
											ISO 27001 certified security
											program.
										</p>
									</div>
								</div>
							</CardContent>
							<CardFooter className="border-t pt-4">
								<Button className="w-full">
									Connect Your Accounts with Akahu
								</Button>
							</CardFooter>
						</Card>
					</div>

					<h2 className="mt-8 mb-4 text-xl font-semibold">
						Recent Transactions
					</h2>
					<Card>
						<CardContent className="p-0">
							<div className="divide-y">
								{transactions.length > 0 ? (
									transactions.map((transaction) => (
										<div
											key={transaction.id}
											className="flex items-center justify-between p-4"
										>
											<div className="flex items-center gap-4">
												<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
													{getTransactionIcon(
														transaction.type
													)}
												</div>
												<div>
													<p className="font-medium">
														{
															transaction.description
														}
													</p>
													<p className="text-xs text-muted-foreground">
														{formatDate(
															transaction.created_at
														)}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<span
													className={`font-medium ${
														transaction.type ===
														"deposit"
															? "text-green-600"
															: "text-red-600"
													}`}
												>
													{transaction.type ===
													"deposit"
														? "+"
														: "-"}
													{formatCurrency(
														transaction.amount
													)}
												</span>
												<Badge
													variant={
														transaction.type ===
														"deposit"
															? "outline"
															: "secondary"
													}
												>
													{transaction.type}
												</Badge>
											</div>
										</div>
									))
								) : (
									<div className="p-4 text-center text-muted-foreground">
										No recent transactions
									</div>
								)}
							</div>
						</CardContent>
						<CardFooter className="border-t p-4">
							<Button variant="outline" className="w-full">
								View All Transactions
							</Button>
						</CardFooter>
					</Card>
				</main>
			</div>
		</div>
	);
}
