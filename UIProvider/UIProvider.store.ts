// // @ts-nocheck
// import { useState, useEffect } from "react";
// import { useAtom } from "jotai";
// import { atomWithStorage } from "jotai/utils";
// import "./UIProvider.module.css";

// // Интерфейсы
// interface RGB {
// 	r: number;
// 	g: number;
// 	b: number;
// }

// interface HSL {
// 	h: number;
// 	s: number;
// 	l: number;
// }

// interface IMaterial3ColorScheme {
// 	primary: string;
// 	primary_container: string;
// 	on_primary: string;
// 	on_primary_container: string;
// 	secondary: string;
// 	secondary_container: string;
// 	on_secondary: string;
// 	on_secondary_container: string;
// 	tertiary: string;
// 	tertiary_container: string;
// 	on_tertiary: string;
// 	on_tertiary_container: string;
// 	surface: string;
// 	surface_dim: string;
// 	surface_bright: string;
// 	surface_container_lowest: string;
// 	surface_container_low: string;
// 	surface_container: string;
// 	surface_container_high: string;
// 	surface_container_highest: string;
// 	on_surface: string;
// 	on_surface_variant: string;
// 	surface_variant: string;
// 	outline: string;
// 	outline_variant: string;
// 	error: string;
// 	on_error: string;
// 	error_container: string;
// 	on_error_container: string;
// }

// interface IThemeStore {
// 	hex: string;
// }

// // Функции преобразования цветов
// const hexToRgb = (hex: string): RGB | null => {
// 	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
// 	return result
// 		? {
// 				r: parseInt(result[1], 16),
// 				g: parseInt(result[2], 16),
// 				b: parseInt(result[3], 16),
// 		  }
// 		: null;
// };

// const rgbToHsl = (r: number, g: number, b: number): HSL => {
// 	r /= 255;
// 	g /= 255;
// 	b /= 255;

// 	const max = Math.max(r, g, b);
// 	const min = Math.min(r, g, b);
// 	const l = (max + min) / 2;
// 	let h: number,
// 		s: number = (max + min) / 2;

// 	if (max === min) {
// 		h = s = 0;
// 	} else {
// 		const d = max - min;
// 		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

// 		switch (max) {
// 			case r:
// 				h = (g - b) / d + (g < b ? 6 : 0);
// 				break;
// 			case g:
// 				h = (b - r) / d + 2;
// 				break;
// 			case b:
// 				h = (r - g) / d + 4;
// 				break;
// 			default:
// 				h = 0;
// 		}
// 		h *= 60;
// 		h = h < 0 ? h + 360 : h;
// 	}

// 	return { h, s: s * 100, l: l * 100 };
// };

// const hslToHex = (h: number, s: number, l: number): string => {
// 	s /= 100;
// 	l /= 100;

// 	const c = (1 - Math.abs(2 * l - 1)) * s;
// 	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
// 	const m = l - c / 2;
// 	let r = 0,
// 		g = 0,
// 		b = 0;

// 	if (0 <= h && h < 60) {
// 		r = c;
// 		g = x;
// 		b = 0;
// 	} else if (60 <= h && h < 120) {
// 		r = x;
// 		g = c;
// 		b = 0;
// 	} else if (120 <= h && h < 180) {
// 		r = 0;
// 		g = c;
// 		b = x;
// 	} else if (180 <= h && h < 240) {
// 		r = 0;
// 		g = x;
// 		b = c;
// 	} else if (240 <= h && h < 300) {
// 		r = x;
// 		g = 0;
// 		b = c;
// 	} else if (300 <= h && h < 360) {
// 		r = c;
// 		g = 0;
// 		b = x;
// 	}

// 	const rNum = Math.round((r + m) * 255);
// 	const gNum = Math.round((g + m) * 255);
// 	const bNum = Math.round((b + m) * 255);

// 	const rHex = rNum.toString(16).padStart(2, "0");
// 	const gHex = gNum.toString(16).padStart(2, "0");
// 	const bHex = bNum.toString(16).padStart(2, "0");

// 	return `#${rHex}${gHex}${bHex}`;
// };

// // Основная функция генерации цветовой схемы
// const generateMaterial3Colors = (
// 	hexColor: string,
// ): { light: IMaterial3ColorScheme; dark: IMaterial3ColorScheme } | null => {
// 	if (!hexColor || !/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(hexColor)) {
// 		return null;
// 	}

// 	const rgb = hexToRgb(hexColor);
// 	if (!rgb) return null;

// 	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

// 	return {
// 		light: {
// 			primary: hslToHex(hsl.h, hsl.s * 0.65, 82), // Ближе к #FFB4A6
// 			on_primary: hslToHex(hsl.h, hsl.s, 10),
// 			primary_container: hslToHex(hsl.h, hsl.s * 0.5, 90),
// 			on_primary_container: hslToHex(hsl.h, hsl.s, 10),

// 			secondary: hslToHex((hsl.h + 60) % 360, hsl.s * 0.7, 70),
// 			on_secondary: hslToHex((hsl.h + 60) % 360, hsl.s, 10),
// 			secondary_container: hslToHex((hsl.h + 60) % 360, hsl.s * 0.4, 90),
// 			on_secondary_container: hslToHex((hsl.h + 60) % 360, hsl.s * 0.7, 10),

// 			tertiary: hslToHex((hsl.h + 120) % 360, hsl.s * 0.7, 70),
// 			on_tertiary: hslToHex((hsl.h + 120) % 360, hsl.s, 10),
// 			tertiary_container: hslToHex((hsl.h + 120) % 360, hsl.s * 0.5, 90),
// 			on_tertiary_container: hslToHex((hsl.h + 120) % 360, hsl.s, 10),

// 			surface: hslToHex(hsl.h, hsl.s * 0.05, 98),
// 			surface_dim: hslToHex(hsl.h, hsl.s * 0.05, 87),
// 			surface_bright: hslToHex(hsl.h, hsl.s * 0.05, 98),
// 			surface_container_lowest: hslToHex(hsl.h, hsl.s * 0.05, 100),
// 			surface_container_low: hslToHex(hsl.h, hsl.s * 0.05, 96),
// 			surface_container: hslToHex(hsl.h, hsl.s * 0.05, 94),
// 			surface_container_high: hslToHex(hsl.h, hsl.s * 0.05, 92),
// 			surface_container_highest: hslToHex(hsl.h, hsl.s * 0.05, 90),

// 			on_surface: hslToHex(hsl.h, hsl.s * 0.3, 10),
// 			on_surface_variant: hslToHex(hsl.h, hsl.s * 0.2, 30),
// 			surface_variant: hslToHex(hsl.h, hsl.s * 0.2, 90),
// 			outline: hslToHex(hsl.h, hsl.s * 0.2, 50),
// 			outline_variant: hslToHex(hsl.h, hsl.s * 0.2, 80),

// 			error: "#B3261E",
// 			on_error: "#FFFFFF",
// 			error_container: "#F9DEDC",
// 			on_error_container: "#410E0B",
// 		},
// 		dark: {
// 			primary: hslToHex(hsl.h, hsl.s, 80),
// 			on_primary: hslToHex(hsl.h, hsl.s, 20),
// 			primary_container: hslToHex(hsl.h, hsl.s * 0.5, 30),
// 			on_primary_container: hslToHex(hsl.h, hsl.s, 90),

// 			secondary: hslToHex((hsl.h + 60) % 360, hsl.s * 0.7, 80),
// 			on_secondary: hslToHex((hsl.h + 60) % 360, hsl.s * 0.7, 20),
// 			secondary_container: hslToHex((hsl.h + 60) % 360, hsl.s * 0.5, 30),
// 			on_secondary_container: hslToHex((hsl.h + 60) % 360, hsl.s * 0.7, 90),

// 			tertiary: hslToHex((hsl.h + 120) % 360, hsl.s * 0.7, 80),
// 			on_tertiary: hslToHex((hsl.h + 120) % 360, hsl.s, 20),
// 			tertiary_container: hslToHex((hsl.h + 120) % 360, hsl.s * 0.5, 30),
// 			on_tertiary_container: hslToHex((hsl.h + 120) % 360, hsl.s, 90),

// 			// Точные значения для surface и контейнеров
// 			surface: hslToHex(hsl.h, Math.min(hsl.s * 0.25, 20), 8), // #1A1110
// 			surface_dim: hslToHex(hsl.h, Math.min(hsl.s * 0.25, 20), 6),
// 			surface_bright: hslToHex(hsl.h, Math.min(hsl.s * 0.25, 20), 14),
// 			surface_container_lowest: hslToHex(hsl.h, Math.min(hsl.s * 0.25, 20), 4),
// 			surface_container_low: hslToHex(hsl.h, Math.min(hsl.s * 0.25, 20), 10),
// 			surface_container: hslToHex(hsl.h, Math.min(hsl.s * 0.25, 20), 13), // #271D1C
// 			surface_container_high: hslToHex(hsl.h + 5, Math.min(hsl.s * 0.25, 20), 17), // #322826
// 			surface_container_highest: hslToHex(hsl.h + 5, Math.min(hsl.s * 0.25, 20), 20),

// 			on_surface: hslToHex(hsl.h, hsl.s * 0.3, 90),
// 			on_surface_variant: hslToHex(hsl.h, hsl.s * 0.2, 80),
// 			surface_variant: hslToHex(hsl.h, hsl.s * 0.2, 30),
// 			outline: hslToHex(hsl.h, hsl.s * 0.2, 60),
// 			outline_variant: hslToHex(hsl.h, hsl.s * 0.2, 30),

// 			error: "#F2B8B5",
// 			on_error: "#601410",
// 			error_container: "#8C1D18",
// 			on_error_container: "#F9DEDC",
// 		},
// 	};
// };

// // Atom для хранения темы
// const themeStore = atomWithStorage<IThemeStore>("theme", { hex: "#ee715a" });

// // Хук useUI
// export const useUI = () => {
// 	const [theme, setTheme] = useAtom(themeStore);
// 	const [newTheme, setNewTheme] = useState<{
// 		light: IMaterial3ColorScheme;
// 		dark: IMaterial3ColorScheme;
// 	} | null>(null);

// 	// Генерация новой темы при изменении hex
// 	useEffect(() => {
// 		const generatedTheme = generateMaterial3Colors(theme.hex);
// 		console.log({ generatedTheme });

// 		if (generatedTheme) {
// 			setNewTheme(generatedTheme);
// 			applyToElement(generatedTheme.dark); // Применяем светлую тему по умолчанию
// 		}
// 	}, [theme.hex]);

// 	console.log({ newTheme });

// 	const applyToElement = (scheme: IMaterial3ColorScheme, element: HTMLElement = document.body) => {
// 		Object.entries(scheme).map(([key]) => {
// 			let key2 = key.replaceAll("_", "-");
// 			key2 = "--md-sys-color-" + key2;

// 			element.style.setProperty(key2, scheme[key]);
// 		});
// 	};

// 	return { theme, newTheme, setTheme };
// };
