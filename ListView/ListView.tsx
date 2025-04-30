import { ReactNode, FC } from "react";
import styles from "./ListView.module.css";
import clsx from "clsx";
interface IListViewProps {
	children?: ReactNode;
	className?: string;
	orientation?: "vertical" | "horizontal";
}
export const ListView: FC<IListViewProps> = ({ children, className, orientation = "vertical" }) => {
	const _class = clsx(styles.list_view, className);
	return (
		<div className={_class} data-orientation={orientation}>
			{children}
		</div>
	);
};
