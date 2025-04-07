import clsx from "clsx";
import { FC } from "react";
import styles from "./FAB.module.css";
import { Button } from "@components/ui/Button/Button.tsx";

interface IProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant?: "primary" | "secondary" | "tertiary" | "surface";
	size?: "small" | "normal" | "large";
}

export const FAB: FC<IProps> = ({
	className,
	children,
	variant = "primary",
	size = "normal",
	...rest
}) => {
	const onClick = () => {};

	const _class = clsx(styles.fab, className);
	return (
		<Button
			className={_class}
			data-variant={variant}
			shadow
			data-size={size}
			onClick={onClick}
			{...rest}
		>
			{children}
		</Button>
	);
};
