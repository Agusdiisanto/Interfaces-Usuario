import { motion } from "framer-motion";
import "./Stats.css";

const Stats = ({ clase, icon, stat, action, animation = true}) => {
  return (
    <div className={`stats ${ animation ? clase : ''} ${animation ? '' : 'no-pointer'}`}>
      <motion.i
        className={icon}
        whileTap={animation ? { scale: 2 } : {}}
        onClick={action}
      ></motion.i>
      <p>{stat}</p>
    </div>
  );
};

export default Stats;

