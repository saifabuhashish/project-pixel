
import { createUseStyles } from 'react-jss';

export default createUseStyles({
  grid: {
    display: 'grid',
    gridTemplateRows: 'repeat(50, 1fr)',
    gridTemplateColumns: 'repeat(50, 1fr)',
    width: '75vmin',
    height: '75vmin',
    border: '0.05px solid black',
  },
  cell: {
    cursor: 'pointer',
    border: '0.05px solid black',
    background: 'white',
    transition: 'all 200ms linear',
    '&:hover': {
      transform: 'scale(1.5)',
    },
  },
});