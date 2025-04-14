// import { FC, ReactNode, useEffect } from "react";
// import "./UIProvider.module.css";
// import { applyTheme, argbFromHex, themeFromSourceColor } from "@material/material-color-utilities";
// import { atomWithStorage } from "jotai/utils";
// import { useAtom } from "jotai";

// interface IProps {
// 	children: ReactNode;
// }
// export const UIProvider: FC<IProps> = ({ children }) => {
// 	const [theme, setTheme] = useAtom(themeStore);

// 	const applyNewTheme = (hex: string, type: "dark" | "light" = "dark") => {
// 		const theme = themeFromSourceColor(argbFromHex(hex));
// 		applyTheme(theme, { target: document.body, dark: type === "dark" });
// 	};

// 	useEffect(() => {
// 		applyNewTheme(theme.hex);
// 	}, [theme]);

// 	return <>{children}</>;
