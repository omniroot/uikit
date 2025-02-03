import { Button } from "@ui/Button/Button.tsx";
import clsx from "clsx";
import { FC, type ReactNode } from "react";
import styles from "./ButtonGroup.module.css";

export interface IButtonGroupElement {
	id: string;
	title?: string;
	icon?: ReactNode;
}

interface IButtonGroupProps {
	elements: IButtonGroupElement[];
	className?: string;
	activeElement: IButtonGroupElement;
	setActiveElement: (nextElement: IButtonGroupElement) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({
	elements,
	activeElement,
	setActiveElement,
	className,
}) => {
	const onGroupItemClick = (id: string, element: IButtonGroupElement) => {
		setActiveElement(element);
		const ell = document.getElementById(id);
		console.log(ell);

		if (ell) {
			ell.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	};

	const _class = clsx(styles.button_group, className);

	return (
		<div className={_class}>
			{elements?.map((element) => {
				const isActive = activeElement.id === element.id;
				return (
					<Button
						className={clsx(styles.button, {
							[styles.active]: isActive,
						})}
						data-active={isActive}
						variant={isActive ? "primary" : "outline"}
						key={element.id}
						onClick={() => onGroupItemClick(`button-group-${element.id}`, element)}
						id={`button-group-${element.id}`}
					>
						{element.icon && element.icon}
						{element.title && <span>{element.title}</span>}
					</Button>
				);
			})}
		</div>
	);
};
