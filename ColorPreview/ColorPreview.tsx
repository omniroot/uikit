import { FC } from "react";
import styles from "./ColorPreview.module.css";
interface IColorPreviewProps {
	color: string;
}
export const ColorPreview: FC<IColorPreviewProps> = ({ color }) => {
	return <div className={styles.color_preview} style={{ backgroundColor: color }}></div>;
};
