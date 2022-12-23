import { NextAppDirEmotionCacheProvider } from "tss-react/next";

export default function RootLayout({ children }: { children: JSX.Element; }) {
	return (
		<html>
			<head>
			</head>
			<body>
				<NextAppDirEmotionCacheProvider options={{ "key": "css" }}>
					{children}
				</NextAppDirEmotionCacheProvider>
			</body>
		</html>
	);
}
