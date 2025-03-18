import { de } from 'date-fns/locale';
import { MdOutlineFullscreen } from 'react-icons/md';

import styles from './scale.module.scss';
type PropsType = {
  className?: string;
  onClick: () => void;
};

const Scale: React.FC<PropsType> = ({ className, onClick }) => {
  return (
    <div className={`${styles.cover} ${className}`} onClick={onClick}>
      <MdOutlineFullscreen style={{ color: 'white', width: '23px', height: '23px' }} />
    </div>
  );
};

export default Scale;
