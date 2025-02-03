import { SearchIcon } from "@/shared/assets/icons/SearchIcon.tsx";
import { SettingsIcon } from "@/shared/assets/icons/SettingsIcon.tsx";
import { Button } from "@components/ui/Button/Button.tsx";
import { Typography } from "@components/ui/Typography/Typography.tsx";
import { useHeader } from "@features/storage/stores/header.storage";
import { Link } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import styles from "./Header.module.css";

export const Header = () => {
	const { title, icon } = useHeader();
	return (
		<header className={styles.header}>
			<AnimatePresence mode="popLayout">
				<div className={styles.left}>
					{icon && icon}
					<Typography size="title" weight="title">
						{title}
					</Typography>
				</div>
			</AnimatePresence>
			<div className={styles.right}>
				<Button variant="ghost" asLink>
					<Link to="/discovery">
						<SearchIcon />
					</Link>
				</Button>
				<Button variant="ghost" asLink>
					<Link to="/settings">
						<SettingsIcon />
					</Link>
				</Button>
			</div>
		</header>
	);
};
