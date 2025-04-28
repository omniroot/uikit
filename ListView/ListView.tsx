import { ReactNode, FC } from "react";
import styles from "./ListView.module.css";
interface IListViewProps {
	children?: ReactNode;
}
export const ListView: FC<IListViewProps> = ({ children }) => {
	return <div className={styles.list_view}>{children}</div>;
};
