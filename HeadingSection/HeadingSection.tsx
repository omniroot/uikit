import type { FC } from "react";
import styles from "./HeadingSection.module.css";
import clsx from "clsx";
import { Typography } from "@/shared/ui/Typography/Typography.tsx";

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
        <Typography variant="headline">{title}</Typography>
        <div className={styles.actions}>{actionsSlot}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
