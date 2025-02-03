import React, { useState, useEffect, useRef } from "react";
import styles from "./Select.module.css";
import { RightArrowIcon } from "@/shared/assets/icons/RightArrowIcon.tsx";

export interface ISelectOption {
	value: string;
	label: string;
}

export interface ISelectProps {
	options: ISelectOption[];
	placeholder?: string;
	onChange?: (selectedOption: ISelectOption | null) => void;
	defaultValue?: ISelectOption | null;
}

export const Select: React.FC<ISelectProps> = ({
	options,
	placeholder = "Select",
	onChange,
	defaultValue,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<ISelectOption | null>(defaultValue || null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const optionsContainerRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (defaultValue) {
			console.log("def value set", defaultValue);
			setSelectedValue(defaultValue);
		}
	}, [defaultValue]);

	useEffect(() => {
		if (isOpen && selectedValue && optionsContainerRef.current) {
			const activeElement = optionsContainerRef.current.querySelector(
				`li[data-value="${selectedValue.value}"]`,
			);

			if (activeElement) {
				setTimeout(() => {
					activeElement.scrollIntoView({
						behavior: "auto",
						block: "nearest",
						// inline: "nearest",
					});
				}, 0);
			}
		}
	}, [isOpen, selectedValue]);

	const handleSelectClick = () => {
		setIsOpen((prev) => !prev);
	};

	const handleOptionClick = (option: ISelectOption) => {
		setSelectedValue(option);
		onChange?.(option);
		setIsOpen(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			setIsOpen((prev) => !prev);
		}
	};

	const handleOptionKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, option: ISelectOption) => {
		if (e.key === "Enter") {
			handleOptionClick(option);
		}
	};

	return (
		<div className={styles.container} ref={wrapperRef}>
			<div
				className={styles.selectInput}
				onClick={handleSelectClick}
				onKeyDown={handleKeyDown}
				role="button"
				tabIndex={0}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span className={selectedValue ? "" : styles.placeholder}>
					{selectedValue?.label || placeholder}
				</span>
				<RightArrowIcon
					width={18}
					className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
				/>
			</div>

			{isOpen && (
				<ul className={styles.optionsContainer} role="listbox" ref={optionsContainerRef}>
					{options.map((option) => (
						<li
							key={option.value}
							className={`${styles.optionItem} ${
								selectedValue?.value === option.value ? styles.active : ""
							}`}
							onClick={() => handleOptionClick(option)}
							onKeyDown={(e) => handleOptionKeyDown(e, option)}
							role="option"
							aria-selected={selectedValue?.value === option.value}
							tabIndex={0}
							data-value={option.value}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
