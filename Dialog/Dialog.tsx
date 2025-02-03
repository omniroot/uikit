import { FC } from "react";
import styles from "./Dialog.module.css";
import { Typography } from "@components/ui/Typography/Typography.tsx";
import { Button } from "@components/ui/Button/Button.tsx";
import { Portal } from "@components/ui/Portal/Portal.tsx";
interface IDialogProps {
	title: string;
	description?: string;
	submitText?: string;
	isShow: boolean;
	onSubmit?: () => void;
	onCancel?: () => void;
}
export const Dialog: FC<IDialogProps> = ({
	isShow,
	title,
	description,
	submitText = "Submit",
	onSubmit,
	onCancel,
}) => {
	return (
		<Portal isShow={isShow} onClose={() => onCancel?.()} layoutPosition="center">
			<div className={styles.content}>
				<div className={styles.dialog}>
					<Typography weight="title" size="title">
						{title}
					</Typography>
					<Typography className={styles.description}>{description}</Typography>
					<div className={styles.actions}>
						<Button onClick={onCancel} variant="ghost">
							Cancel
						</Button>
						<Button onClick={onSubmit}>{submitText}</Button>
					</div>
				</div>
			</div>
		</Portal>
	);
};
