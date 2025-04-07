import { ReactNode, FC } from "react";
import styles from "./FABLayout.module.css";

interface IProps {
	children?: ReactNode;
}
export const FABLayout: FC<IProps> = ({ children }) => {
	return <div className={styles.fab_layout}>{children}</div>;
};
