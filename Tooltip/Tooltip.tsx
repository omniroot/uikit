import clsx from "clsx";
import { motion } from "motion/react";
import { FC, useState } from "react";
import styles from "./Tooltip.module.css";

interface ITooltipProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string;
	position?: "top" | "bottom";
}
export const Tooltip: FC<ITooltipProps> = ({
	className,
	children,
	title,
	position = "top",
	...rest
}) => {
	const [isHover, setIsHover] = useState(false);

	const onTooltipMouseEnter = () => {
		setIsHover(true);
	};
	const onTooltipMouseLeave = () => {
		setIsHover(false);
	};

	const _class = clsx(styles.tooltip_container, className);

	return (
		<div
			className={_class}
			onMouseEnter={onTooltipMouseEnter}
			onMouseLeave={onTooltipMouseLeave}
			{...rest}
		>
			<motion.div
				className={clsx(styles.tooltip)}
				data-position={position}
				initial={{ opacity: 0, scale: 0.8, visibility: "hidden" }}
				animate={
					isHover
						? { opacity: 1, scale: 1, visibility: "visible" }
						: { opacity: 0, scale: 0.8, visibility: "hidden" }
				}
				transition={{ duration: 0.15, delay: 0.1 }}
			>
				{title}
			</motion.div>
			<div>{children}</div>
		</div>
	);
};
