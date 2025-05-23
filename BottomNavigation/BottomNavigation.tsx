import { HomeIcon } from "@/shared/assets/icons/HomeIcon.tsx";
import { SettingsIcon } from "@/shared/assets/icons/SettingsIcon.tsx";
import { Link } from "@tanstack/react-router";
import styles from "./BottomNavigation.module.css";

export const BottomNavigation = () => {
  return (
    <div className={styles.bottom_navigation}>
      <Link
        to="/"
        className={styles.bottom_navigation_item}
        activeProps={{ className: styles.active, id: "active_bn" }}
      >
        <HomeIcon width={20} height={20} />
      </Link>
      <Link
        to="/settings"
        className={styles.bottom_navigation_item}
        activeProps={{ className: styles.active, id: "active_bn" }}
      >
        {/* <DiscoveryIcon width={20} height={20} /> */}
        <SettingsIcon width={20} />
      </Link>
    </div>
  );
};
