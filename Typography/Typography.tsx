import clsx from "clsx";
import { FC } from "react";

interface ITypographyProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	size?: "small" | "base" | "medium" | "large" | "xl" | "2xl" | "body" | "title";
	color?: "body" | "title";
	weight?: "body" | "title";
}
export const Typography: FC<ITypographyProps> = ({
	children,
	className,
	size = "body",
	color = "body",
	weight = "body",
	...props
}) => {
	const _class = clsx(className);
	return (
		<span
			className={_class}
			style={{
				fontSize: `var(--text-size-${size})`,
				color: `var(--color-text-${color})`,
				fontWeight: `var(--text-weight-${weight})`,
			}}
			{...props}
		>
			{children}
		</span>
	);
};
