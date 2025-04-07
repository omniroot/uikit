import { AnimatePresence, motion } from "motion/react";
import { FC, ReactNode, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Portal.module.css";

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
	useLayoutEffect(() => {
		console.log({ isShow });

		if (isShow) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isShow]);

	const onOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.preventDefault();
		event.stopPropagation();
		onClose();
	};

	const element = (
		<AnimatePresence>
			{isShow && (
				<motion.div
					initial={{ opacity: 0, backdropFilter: "blur(0px)", zIndex }}
					animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
					exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
					transition={{ duration: 0.2 }}
					onClick={onOutsideClick}
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
