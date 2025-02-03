import { ReactNode, FC } from "react";
import styles from "./Badge.module.css";
import clsx from "clsx";
interface IBadgeProps {
	children?: ReactNode;
	className?: string;
}
export const Badge: FC<IBadgeProps> = ({ children, className }) => {
	const _class = clsx(styles.badge, className);
	return <div className={_class}>{children}</div>;
};
