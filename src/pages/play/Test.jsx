import { motion, useMotionValue } from 'framer-motion';

function Test() {
    // Khởi tạo MotionValue cho tọa độ x
    const x = useMotionValue(0);
    const y = useMotionValue(0);


    // Khi x thay đổi, in giá trị ra console
    x.onChange(latest => {
        console.log('x is now', latest);
    });
    setTimeout(() => {
        x.stop();
        y.stop()
        x.set(0)

        y.set(0)

    }, 5000)
    return (
        <motion.div
            drag
            style={{ x, y, width: 100, height: 100, background: 'red' }}
        />
    );
}
export default Test