import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
			<p className="text-lg text-gray-700 mb-8">Page Not Found</p>
			<Link href="/" className="text-blue-600 underline">Go to Dashboard</Link>
		</div>
	);
}
