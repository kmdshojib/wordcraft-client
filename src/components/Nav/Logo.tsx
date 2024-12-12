import { motion } from "framer-motion";

const Logo = () => {
    return (
        <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <motion.h1
                className="text-xl bg-gradient-to-r from-rose-500 to-pink-500 text-transparent bg-clip-text font-bold"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
            >
                WordCraft
            </motion.h1>
        </motion.div>
    );
};

export default Logo;
