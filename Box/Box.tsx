import clsx from "clsx";
import { FC } from "react";
import styles from "./Box.module.css";
import { IUIColor } from "@components/ui/UIProvider/UIProvider.types.ts";
import { useMaterialTheme } from "@/shared/MaterialTheme/MaterialTheme.tsx";

interface IProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	color?: IUIColor;
	backgroundColor?: IUIColor;
	gap?: string;
	radius?: "small" | "medium" | "large";
	orientation?: "vertical" | "horizontal";
	justifyContent?:
		| "unset"
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
	alignItems?:
		| "unset"
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
}
export const Box: FC<IProps> = ({
	children,
	className,
	color,
	gap,
	radius = "medium",
	backgroundColor,
	orientation = "horizontal",
	justifyContent = "flex-start",
	alignItems = "flex-start",
	...rest
}) => {
	const { getVar } = useMaterialTheme();

	const _class = clsx(styles.box, className);
	return (
		<div
			className={_class}
			style={{
				justifyContent,
				alignItems,
				gap,
				color: getVar(color),
				backgroundColor: getVar(backgroundColor, "background"),
			}}
			{...rest}
			data-orientation={orientation}
			data-radius={radius}
		>
			{children}
		</div>
	);
};
