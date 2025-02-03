import { motion } from "motion/react";
import { FC } from "react";

interface IPageTransitionProps {
	children: React.ReactNode;
}
export const PageTransition: FC<IPageTransitionProps> = ({ children }) => {
	const variants = {
		initial: { opacity: 0.5 },
		in: { opacity: 1 },
		out: { opacity: 0 },
	};

	return (
		<motion.div
			initial="initial"
			animate="in"
			exit="out"
			variants={variants}
			transition={{ duration: 0.2 }}
		>
			{children}
		</motion.div>
	);
};
