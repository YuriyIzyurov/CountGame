import Link from "next/link";
import styles from '../styles/A.module.css'
import {useRef} from "react";

export default function ({text, href}) {
    const select = useRef<HTMLAudioElement|undefined>(typeof Audio !== "undefined"
        ? new Audio('Canvas2DGame/sound/switch-menu.mp3')
        : undefined)
    return (
        <Link
            className={styles.link}
            href={href}
            data-text={text}
            onMouseEnter={() => select.current.play()}
            >
            {text}
        </Link>
    )
}