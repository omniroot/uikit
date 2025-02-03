import { FC } from "react";
import styles from "./Divider.module.css";

interface IDividerProps {
	orientation?: "vertical" | "horizontal";
	spacing?: boolean;
}
export const Divider: FC<IDividerProps> = ({ orientation = "horizontal", spacing = false }) => {
	if (orientation === "vertical") {
		return (
			<div
				style={{ minWidth: "3px", minHeight: "100%", margin: spacing ? "0 1rem" : "0" }}
				className={styles.divider}
			/>
		);
	}
	if (orientation === "horizontal") {
		return (
			<div
				style={{ minWidth: "100%", minHeight: "3px", margin: spacing ? "1rem 0" : "0" }}
				className={styles.divider}
			/>
		);
	}
};
