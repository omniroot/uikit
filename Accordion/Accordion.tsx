import { FC, useState } from "react";
import styles from "./Accordion.module.css";
import clsx from "clsx";
import { Typography } from "@components/ui/Typography/Typography.tsx";
import { AnimatePresence, motion } from "motion/react";
import { RightArrowIcon } from "@/shared/assets/icons/RightArrowIcon.tsx";
import { Button } from "@components/ui/Button/Button.tsx";

interface IProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string;
	defaultOpen?: boolean;
}

export const Accordion: FC<IProps> = ({ children, title, defaultOpen = false }) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const toggleIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const _class = clsx(styles.accordion);
	return (
		<motion.div className={_class}>
			<div className={styles.header} onClick={toggleIsOpen}>
				<Typography variant="title" size="large">
					{title}
				</Typography>
				<Button variant="ghost">
					<RightArrowIcon
						style={{
							transition: "transform 150ms",
							transform: isOpen ? "rotateZ(90deg)" : "rotateZ(0deg)",
						}}
					/>
				</Button>
			</div>
			<AnimatePresence mode="sync">
				{isOpen && (
					<motion.div
						className={styles.content}
						initial={{ height: 0, visibility: "hidden" }}
						animate={
							isOpen
								? { height: "auto", visibility: "visible" }
								: { height: 0, visibility: "hidden" }
						}
						exit={{ visibility: "hidden", height: 0 }}
						transition={{ duration: 0.25 }}
					>
						{children}
						<Button variant="primary" style={{ width: "100%" }} onClick={toggleIsOpen}>
							<Typography color="primary">Collapse</Typography>
							<RightArrowIcon
								style={{
									transition: "transform 150ms",
									transform: isOpen ? "rotateZ(90deg)" : "rotateZ(0deg)",
								}}
							/>
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
			{/* {isOpen && (
				
			)} */}
		</motion.div>
	);
};
