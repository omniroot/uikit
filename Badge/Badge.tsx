import { ReactNode, FC } from "react";
import styles from "./Badge.module.css";
import clsx from "clsx";

interface IBadgeProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: ReactNode;
}

export const Badge: FC<IBadgeProps> = ({ children, className, ...rest }) => {
	const _class = clsx(styles.badge, className);
	return (
		<div className={_class} {...rest}>
			{children}
		</div>
	);
};
