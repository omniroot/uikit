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
		<motion.div layout className={_class} onClick={toggleIsOpen}>
			<div className={styles.header}>
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
			<AnimatePresence mode="popLayout">
				{isOpen && (
					<motion.div
						className={styles.content}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};
