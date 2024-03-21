import { MotionStyle, motion } from "framer-motion";

import { ObjectAny } from "@/application/types";
import { rcss } from "@/application/ui/rcss";

interface ViewProps {
    [key: string]: any;
    children: React.ReactNode;
    css?: ObjectAny | Array<ObjectAny>;
    innerRef?: React.RefObject<HTMLDivElement>;
}

export const View = ({ children, innerRef, ...props }: ViewProps) => {
    return (
        <motion.div {...props} style={rcss.ViewElement as MotionStyle} ref={innerRef}>
            {children}
        </motion.div>
    );
}