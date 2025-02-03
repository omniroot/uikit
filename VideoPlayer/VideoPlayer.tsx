import { PauseIcon } from "@/shared/assets/icons/PauseIcon.tsx";
import { PlayIcon } from "@/shared/assets/icons/PlayIcon.tsx";
import { Button } from "@components/ui/Button/Button.tsx";
import { AnimatePresence, motion } from "motion/react";
import React, { FC, useRef, useState } from "react";
import styles from "./VideoPlayer.module.css";
import { MaximizeIcon } from "@/shared/assets/icons/MaximizeIcon.tsx";
import { NextIcon } from "@/shared/assets/icons/NextIcon.tsx";
import { PreviousIcon } from "@/shared/assets/icons/PreviousIcon.tsx";

const formatTime = (seconds: number) => {
	const totalSeconds = Math.floor(seconds);
	const minutes = Math.floor(totalSeconds / 60);
	const hours = Math.floor(minutes / 60);
	const displayMinutes = minutes % 60;
	const displaySeconds = totalSeconds % 60;

	if (hours > 0) {
		return `${hours}:${displayMinutes < 10 ? "0" : ""}${displayMinutes}:${
			displaySeconds < 10 ? "0" : ""
		}${displaySeconds}`;
	} else {
		return `${displayMinutes}:${displaySeconds < 10 ? "0" : ""}${displaySeconds}`;
	}
};

interface IVideoPlayerProps
	extends React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {}

export const VideoPlayer: FC<IVideoPlayerProps> = ({ ...rest }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);
	const [isDrag, setIsDrag] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [newTime, setNewTime] = useState<number>(0);

	const playerRef = useRef<HTMLVideoElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);
	const positionRef = useRef<HTMLDivElement>(null);

	const _onVideoLoaded = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
		setDuration(event.currentTarget.duration);
	};

	// ==== Click events ====
	const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();

		setIsOverlayOpen((prev) => !prev);
	};

	const onVideoClick = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
		event.stopPropagation();
		setIsOverlayOpen((prev) => !prev);
	};

	const onPlayButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setIsPlaying((prev) => !prev);

		if (playerRef.current) {
			if (playerRef.current.paused) {
				playerRef.current.play();
			} else {
				playerRef.current.pause();
			}
		}
	};

	const onTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const rect = event.currentTarget.getBoundingClientRect();
		const offsetX = event.clientX - rect.left; // Позиция клика относительно таймлайна
		const newTime = (offsetX / rect.width) * duration; // Вычисляем новое время
		if (playerRef.current) {
			playerRef.current.currentTime = newTime;
		}
		setCurrentTime(newTime);
	};

	// ==== Click events ====

	// ==== Drag events ====

	const onDragStart = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>,
	) => {
		event.preventDefault();
		setIsDrag(true);
		if ("clientX" in event) {
			// setPreviewCoordinate({ x: event.clientX - 40, y: -70 });
		}
		// document.addEventListener("mousemove", (e) => onDrag(e));
		console.log("drag start");

		document.addEventListener("mouseup", onDragEnd);
		// document.addEventListener("touchmove", onDrag, { passive: false });
		// document.addEventListener("touchend", onDragEnd);
	};

	const onDrag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (timelineRef.current && positionRef.current && isDrag) {
			const rect = timelineRef.current.getBoundingClientRect();
			const offsetX = event.clientX - rect.left;
			//  else if ("touches" in event) {
			// 	offsetX = event.touches[0].clientX - rect.left
			// }
			console.log("ondrag");

			const newTime = Math.max(0, Math.min((offsetX / rect.width) * duration, duration));

			positionRef.current.style.width = `${(newTime / duration) * 100}%`;
			// previewContainerRef.current.style.left = e.clientX;
			// previewVideoRef.current.currentTime = newTime;
			// setPreviewCoordinate({ x: e.clientX - 40, y: -70 });
			setNewTime(newTime);
		}
	};

	const onDragEnd = () => {
		console.log("drag end");

		setIsDrag(false);
		// document.removeEventListener("mousemove", onDrag);
		document.removeEventListener("mouseup", onDragEnd);
		// document.removeEventListener("touchmove", onDrag);
		// document.removeEventListener("touchend", onDragEnd);
		if (playerRef.current) {
			playerRef.current.currentTime = newTime;
		}
		setCurrentTime(newTime);
	};
	// ==== Drag events ====

	return (
		<div className={styles.container}>
			<video
				className={styles.video_player}
				ref={playerRef}
				onLoadedMetadata={_onVideoLoaded}
				onClick={onVideoClick}
				{...rest}
			/>
			<AnimatePresence>
				{isOverlayOpen && (
					<motion.div
						className={styles.overlay}
						onClick={onOverlayClick}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<div className={styles.top}>{"title"}</div>
						<div className={styles.center}>
							<Button circle>
								<PreviousIcon />
							</Button>

							<Button circle onClick={onPlayButtonClick}>
								{isPlaying ? <PauseIcon /> : <PlayIcon />}
							</Button>
							<Button circle>
								<NextIcon />
							</Button>
							{/* <span>{isMouseHide ? "true" : "false"}</span> */}
						</div>
						<div className={styles.bottom}>
							{/* {isDrag && (
								<div
									ref={previewContainerRef}
									className={styles.preview_container}
									style={{ left: previewCoordinate.x, top: previewCoordinate.y }}
								>
									<video ref={previewVideoRef} src={src} className={styles.preview_video} />
								</div>
							)} */}
							<div className={styles.timeline_container}>
								<div
									className={styles.timeline}
									onClick={onTimelineClick}
									onMouseDown={onDragStart}
									onMouseMove={onDrag}
									onMouseUp={onDragEnd}
									ref={timelineRef}
								>
									<div
										className={styles.position}
										// onMouseDown={onDragStart}

										// onTouchStart={onDragStart}
										ref={positionRef}
										// onClick={onTimelineClick}
										style={{ width: `${(currentTime / duration) * 100}%` }}
									/>
								</div>
							</div>
							<div className={styles.controls}>
								{formatTime(currentTime)} / {formatTime(duration)}
								<Button
									circle
									// onClick={onFullscreenButtonClick}
									className={styles.fullscreen_button}
								>
									<MaximizeIcon />
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
