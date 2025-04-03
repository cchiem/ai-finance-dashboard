import React from "react";

const Footer = () => {
	return (
		<footer className="border-t bg-background flex items-center justify-center w-full">
			<div className="max-w-5xl flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
				<div className="text-sm text-muted-foreground">
					© {new Date().getFullYear()}
				</div>
				<div className="flex items-center gap-4 text-sm text-muted-foreground">
					<a href="/terms" className="hover:underline">
						Terms
					</a>
					<a href="/privacy" className="hover:underline">
						Privacy
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
