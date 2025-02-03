import clsx from "clsx";
import { useEffect, useRef, useState, type FC } from "react";

import styles from "./ImageView.module.css";
import { Portal } from "@components/ui/Portal/Portal.tsx";

interface IImageViewProps {
	className?: string;
	src: string;
	full?: string;
	allowFullscreen?: boolean;
	loading?: "lazy" | "eager";
	alt?: string;
}
export const ImageView: FC<IImageViewProps> = ({
	className,
	alt = "alt text",
	loading = "lazy",
	src,
	allowFullscreen = false,
	full,
}) => {
	const imageRef = useRef<HTMLImageElement>(null);
	const [imageSrc, setImageSrc] = useState(src);
	const [isModal, setIsModal] = useState(false);

	const onImageClick = () => {
		if (allowFullscreen) {
			setIsModal((prev) => !prev);
		}
	};

	useEffect(() => {
		setImageSrc(src);
	}, [src]);

	useEffect(() => {
		if (loading === "lazy") return;
		const timer = setTimeout(() => {
			if (!imageRef.current?.complete) {
				console.log("Attempt to refresh image");

				setImageSrc(`${src}?t=${new Date().getTime()}`);
				return;
			}
		}, 8000);

		return () => clearTimeout(timer);
	}, [src]);

	const _class = clsx(styles.image_view, className, {
		[styles.clickable]: allowFullscreen,
	});

	return (
		<>
			<img
				src={imageSrc}
				alt={alt}
				className={_class}
				onClick={onImageClick}
				loading={loading}
				ref={imageRef}
			/>
			<Portal
				isShow={allowFullscreen === true && isModal === true}
				onClose={() => setIsModal(false)}
			>
				<div className={styles.image_view_modal_container} key={alt} onClick={onImageClick}>
					<img
						src={full ? full : src}
						alt={alt}
						className={clsx(_class, styles.image_view_modal)}
						loading="eager"
					/>
				</div>
			</Portal>
		</>
	);
};
