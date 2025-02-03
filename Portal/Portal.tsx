import { ReactNode, FC, useEffect } from "react";
import styles from "./Portal.module.css";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

interface IPortalProps {
	children?: ReactNode;
	isShow: boolean;
	onClose: () => void;
	zIndex?: number;
	layoutPosition?: "top" | "center" | "bottom";
}

export const Portal: FC<IPortalProps> = ({
	children,
	isShow,
	onClose,
	zIndex = 1000,
	layoutPosition = "bottom",
}) => {
	useEffect(() => {
		if (isShow) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isShow]);

	const element = (
		<AnimatePresence>
			{isShow && (
				<motion.div
					initial={{ opacity: 0, backdropFilter: "blur(0px)", zIndex }}
					animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
					exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
					transition={{ duration: 0.2 }}
					onClick={onClose}
					className={styles.container}
					data-layout-position={layoutPosition}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);

	return <>{createPortal(element, document.body)}</>;
};
