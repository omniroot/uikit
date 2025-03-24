import { FC } from "react";
import styles from "./Loader.module.css";
import { AnimatePresence, motion } from "motion/react";

interface ILoaderProps {
	isShow?: boolean;
	fullscreen?: boolean;
	width?: number;
	height?: number;
}
export const Loader: FC<ILoaderProps> = ({ isShow = true, fullscreen, width, height }) => {
	if (fullscreen)
		return (
			<div className={styles.fullscreen_loader}>
				<div className={styles.loader} />
			</div>
		);

	return (
		<AnimatePresence mode="wait">
			{isShow && (
				<motion.div
					layout
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={styles.loader}
					style={{ width, height }}
				/>
			)}
		</AnimatePresence>
	);
};
