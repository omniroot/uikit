import clsx from "clsx";
import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useRef } from "react";
import styles from "./Input.module.css";
interface IInputProps {
	children?: ReactNode;
	classNames?: {
		form?: string;
		input?: string;
	};
	value?: string;
	onChange?: (value: string) => void;
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
	focused?: boolean;
	defaultValue?: string;
	placeholder?: string;
	rightSlot?: ReactNode;
}
export const Input: FC<IInputProps> = ({
	classNames,
	value,
	defaultValue,
	placeholder = "Placeholder",
	onChange = () => {},
	onSubmit = () => {},
	focused = false,
	rightSlot = null,
}) => {
	// const debouncedSearchAnimesQuery = useDebounce(searchAnimesQuery, 700);
	const inputRef = useRef<HTMLInputElement>(null);

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	useEffect(() => {
		if (focused) {
			inputRef.current?.focus();
		}
	}, [focused]);

	// useEffect(() => {
	// 	inputRef.current?.focus();
	// }, [searchAnimesIsLoading]);

	const onInputSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		onSubmit(event);
	};
	const _classForm = clsx(styles.form, classNames?.form);
	const _classInput = clsx(styles.input, classNames?.input);
	return (
		<form className={_classForm} onSubmit={onInputSubmit}>
			<input
				className={_classInput}
				value={value}
				placeholder={placeholder}
				onChange={onInputChange}
				defaultValue={defaultValue}
				// disabled={searchAnimesIsLoading}
				ref={inputRef}
			/>
			<div className={styles.actions}>
				{rightSlot}
				{/* <Button className={styles.search_button} onClick={() => onSearchSubmit(null)}>
					<SearchIcon />
				</Button> */}
			</div>
		</form>
	);
};
