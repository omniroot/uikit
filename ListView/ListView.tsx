import { ReactNode, FC } from "react";
import styles from "./ListView.module.css";
interface IListViewProps {
	children?: ReactNode;
	orientation?: "vertical" | "horizontal";
}
export const ListView: FC<IListViewProps> = ({ children, orientation = "vertical" }) => {
	return (
		<div className={styles.list_view} data-orientation={orientation}>
			{children}
		</div>
	);
};
