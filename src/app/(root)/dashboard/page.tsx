import { redirect } from "next/navigation";
import DashboardView from "./dashboard-view";
import { createClient } from "@/lib/supabase/client";
import { getLoggedInUser } from "@/lib/actions/user.actions";

// Mock data for demonstration
const mockAccount = {
	balance: 12567.89,
	account_number: "****4321",
	account_type: "Checking",
};

const mockTransactions = [
	{
		id: "1",
		amount: 120.5,
		description: "Grocery Store",
		type: "withdrawal",
		created_at: new Date(
			Date.now() - 1 * 24 * 60 * 60 * 1000
		).toISOString(),
	},
	{
		id: "2",
		amount: 1500.0,
		description: "Salary Deposit",
		type: "deposit",
		created_at: new Date(
			Date.now() - 3 * 24 * 60 * 60 * 1000
		).toISOString(),
	},
	{
		id: "3",
		amount: 85.33,
		description: "Electric Bill",
		type: "withdrawal",
		created_at: new Date(
			Date.now() - 5 * 24 * 60 * 60 * 1000
		).toISOString(),
	},
	{
		id: "4",
		amount: 250.0,
		description: "Transfer to Savings",
		type: "transfer",
		created_at: new Date(
			Date.now() - 7 * 24 * 60 * 60 * 1000
		).toISOString(),
	},
	{
		id: "5",
		amount: 42.99,
		description: "Streaming Service",
		type: "withdrawal",
		created_at: new Date(
			Date.now() - 10 * 24 * 60 * 60 * 1000
		).toISOString(),
	},
];

export default async function Dashboard() {
	const user = await getLoggedInUser();
	// Using mock data instead of fetching from database
	return (
		<DashboardView
			user={user}
			account={mockAccount}
			transactions={mockTransactions}
		/>
	);
}
