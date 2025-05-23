import { useHeader } from "@/shared/ui/Header/Header.storage.tsx";
import { Typography } from "@/shared/ui/Typography/Typography.tsx";
import { AnimatePresence } from "motion/react";
import styles from "./Header.module.css";

export const Header = () => {
  const { title, icon } = useHeader();

  return (
    <header className={styles.header}>
      <AnimatePresence mode="popLayout">
        <div className={styles.left}>
          {icon && icon}
          <Typography variant="headline">{title}</Typography>
        </div>
      </AnimatePresence>
      <div className={styles.right}>
        {/* <Button variant="ghost" asLink>
          <Link to="/discovery">
            <SearchIcon />
          </Link>
        </Button>
        <Button variant="ghost" asLink>
          <Link to="/settings">
            <SettingsIcon />
          </Link>
        </Button> */}
      </div>
    </header>
  );
};
