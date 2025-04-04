"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // built-in spinner icon from lucide

export function SubmitButton({ text }: { text: string }) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="w-full" disabled={pending}>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					{text}...
				</>
			) : (
				text
			)}
		</Button>
	);
}
