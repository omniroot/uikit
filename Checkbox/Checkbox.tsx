import { FC } from "react";
import styles from "./Checkbox.module.css";
import { CheckIcon } from "@/shared/assets/icons/CheckIcon.tsx";
import { motion } from "motion/react";

interface ICheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export const Checkbox: FC<ICheckboxProps> = ({ checked, onChange }) => {
	return (
		<div className={styles.checkbox} onClick={() => onChange(!checked)}>
			<input
				type="checkbox"
				checked={checked}
				onChange={() => onChange(!checked)}
				className={styles.input}
			/>
			<motion.div
				className={styles.indicator}
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
			>
				{checked && <CheckIcon width={20} />}
			</motion.div>
		</div>
	);
};
