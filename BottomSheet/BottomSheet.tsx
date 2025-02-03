import { Portal } from "@components/ui/Portal/Portal.tsx";
import { Typography } from "@components/ui/Typography/Typography.tsx";
import clsx from "clsx";
import { motion } from "motion/react";
import { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./BottomSheet.module.css";

interface IBottomSheetProps {
	children?: ReactNode;
	isShow: boolean;
	className?: string;
	title?: string;
	contentOrientation?: "vertical" | "horizontal";
	onOutsideClick?: () => void;
}

export const BottomSheet: FC<IBottomSheetProps> = ({
	children,
	className,
	isShow,
	title,
	contentOrientation = "vertical",
	onOutsideClick = () => {},
}) => {
	const bottomSheetRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const [originalHeight, setOriginalHeight] = useState(200);
	const onBottomSheetClick = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		// event.stopPropagation();

		if (bottomSheetRef.current && indicatorRef.current) {
			// console.log(bottomSheetRef);
			// const sheetHeight = bottomSheetRef.current.clientHeight;
			const newSheetHeight = document.documentElement.clientHeight - event.touches[0].clientY;
			// console.log(newSheetHeight);
			bottomSheetRef.current.style.transition = `height 70ms`;

			bottomSheetRef.current.style.height = `${newSheetHeight}px`;
			indicatorRef.current.style.width = `15%`;
			// console.log(event.touches[0].clientY);
		}
	};

	const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
		// event.stopPropagation();

		// TODO: Rewrite it for using touch cooridante instead of bottomSheet Height

		if (bottomSheetRef.current && indicatorRef.current) {
			bottomSheetRef.current.style.transition = `height 350ms`;
			indicatorRef.current.style.width = `10%`;

			// console.log(bottomSheetRef);

			// Close if the sheet is too small
			if (originalHeight < 400 && bottomSheetRef.current.clientHeight < originalHeight / 1.5) {
				console.log("small 1");
				bottomSheetRef.current.style.height = `0`;

				onOutsideClick();
			}

			if (originalHeight > 401 && event.changedTouches[0].clientY < originalHeight / 2) {
				console.log("small 2");
				bottomSheetRef.current.style.height = `0`;

				onOutsideClick();
				return;
			}

			// Maximize if the sheet is too big
			if (bottomSheetRef.current.clientHeight > document.documentElement.clientHeight / 1.5) {
				console.log("big");

				bottomSheetRef.current.style.height = `100%`;
				return;
			}
			console.log("nothing");

			bottomSheetRef.current.style.height = `${originalHeight + 2}px`;
		}
	};

	useEffect(() => {
		console.log("use eefct");

		if (isShow && bottomSheetRef.current) {
			console.log(bottomSheetRef.current.clientHeight);

			setOriginalHeight(bottomSheetRef.current.clientHeight);
		}
	}, [isShow, bottomSheetRef]);

	const _class = clsx(styles.bottom_sheet, className);

	return (
		<Portal isShow={isShow} onClose={() => onOutsideClick()}>
			<motion.div
				initial={{ y: 250 }}
				animate={{ y: 0 }}
				exit={{ y: 250 }}
				transition={{ duration: 0.3 }}
				className={_class}
				onClick={onBottomSheetClick}
				ref={bottomSheetRef}
			>
				<div
					className={styles.indicator_container}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				>
					{/* {originalHeight} */}
					<div className={styles.indicator} ref={indicatorRef}></div>
				</div>
				{title && (
					<Typography size="title" weight="title" className={styles.title}>
						{title}
					</Typography>
				)}
				<div className={styles.content} data-orientation={contentOrientation}>
					{children}
				</div>
			</motion.div>
		</Portal>
	);
};
