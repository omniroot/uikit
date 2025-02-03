import { FC, ReactNode, useState } from "react";
import styles from "./Switch.module.css";
import { Typography } from "@components/ui/Typography/Typography.tsx";
import { motion } from "motion/react";

interface ISwitchProps {
	title: string;
	state: boolean;
	onChange?: (state: boolean) => void;
	disabled?: boolean;
	rightSlot?: ReactNode;
}

export const Switch: FC<ISwitchProps> = ({ title, state, onChange, disabled, rightSlot }) => {
	const [enabled, setEnabled] = useState(state);

	const toggleEnabled = () => {
		if (disabled) return;
		const nextState = !enabled;
		setEnabled(nextState);
		onChange?.(nextState);
	};

	return (
		<div className={styles.switch}>
			<Typography size="medium">{title}</Typography>
			<div className={styles.right}>
				{rightSlot}
				<motion.div
					className={styles.checkbox}
					style={{ justifyContent: enabled ? "flex-end" : "flex-start" }}
					onClick={toggleEnabled}
					data-disabled={disabled}
				>
					<motion.div
						className={styles.state}
						data-enabled={enabled}
						layout
						initial={{ scale: 0.5 }}
						animate={{ scale: enabled ? 1 : 0.9 }}
						exit={{ scale: 0.5 }}
						transition={{ duration: 0.2 }}
						data-disabled={disabled}
					></motion.div>
				</motion.div>
			</div>
		</div>
	);
};
