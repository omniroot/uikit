import { useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FC, useEffect, useState } from "react";

interface IPageTransitionProps {
	children: React.ReactNode;
}
export const PageTransition: FC<IPageTransitionProps> = ({ children }) => {
	const [isDone, setIsDone] = useState(false);
	const path = useLocation().pathname;

	useEffect(() => {
		setIsDone(false);
	}, []);
	console.log({ isDone });

	useEffect(() => {
		setIsDone(false);
		setTimeout(() => {
			setIsDone(true);
		}, 200);
	}, [path]);

	const variants = {
		// initial: { opacity: 0.5, scale: 50 },
		in: { scale: 1 },
		out: { scale: 1.02 },
	};

	// if (isDone) return children;

	return (
		<motion.div
			// initial="initial"
			animate={isDone ? "in" : "out"}
			exit="out"
			variants={variants}
			transition={{ duration: 0.5, type: "spring" }}
		>
			{String(isDone)}
			{children}
		</motion.div>
	);
};
