import type { FC } from "react";
import styles from "./HeadingSection.module.css";
import { Typography } from "@components/ui/Typography/Typography.tsx";
import clsx from "clsx";

interface IHeadingSectionProps {
	children?: React.ReactNode;
	actionsSlot?: React.ReactNode;
	title?: string;
	className?: string;
}

export const HeadingSection: FC<IHeadingSectionProps> = ({
	className,
	children,
	actionsSlot,
	title,
}) => {
	const _class = clsx(styles.heading_section, className);
	return (
		<div className={_class}>
			<div className={styles.header}>
				<Typography size="title" weight="title">
					{title}
				</Typography>
				<div className={styles.actions}>{actionsSlot}</div>
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};
