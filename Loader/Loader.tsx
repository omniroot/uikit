import { FC } from "react";
import styles from "./Loader.module.css";

interface ILoaderProps {
	fullscreen?: boolean;
	width?: number;
	height?: number;
}
export const Loader: FC<ILoaderProps> = ({ fullscreen, width, height }) => {
	if (fullscreen)
		return (
			<div className={styles.fullscreen_loader}>
				<div className={styles.loader} />
			</div>
		);

	return <div className={styles.loader} style={{ width, height }} />;
};
