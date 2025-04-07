import { FC, ReactNode } from "react";
import "./UIProvider.module.css";

interface IProps {
	children: ReactNode;
}
export const UIProvider: FC<IProps> = ({ children }) => {
	return <>{children}</>;
};
