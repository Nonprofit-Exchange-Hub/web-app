import * as React from 'react';
import Typography from '@mui/material/Typography';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  topBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 0 1rem 0',
  },
  bannerLeft: {
    display: 'flex',
  },
  carouselContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  carouselWrapper: {
    margin: 'auto',
    width: '80%',
  },
  questions: {
    margin: '0.75rem 0 0 3rem',
    color: 'gray',
  },
}));

type ResponsiveCarouselProps = {
  label: string;
  fetchMethod: Function;
  renderCard: Function;
  cardWidth: number;
  showControls: boolean;
};

function ResponsiveCarousel(props: ResponsiveCarouselProps) {
  const classes = useStyles();
  const noPadding = { padding: 0, margin: 0, minWidth: '32px' };
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [itemsPerRow, setItemsPerRow] = React.useState<number>(0);
  const [cardsData, setCardsData] = React.useState<Array<any>>([]);
  const [hasReachedEnd, setHasReachedEnd] = React.useState<boolean>(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const cardMargin = 10;
  const MaxItems = 5;
  const { label, cardWidth } = props;

  const updateItemsPerRow = () => {
    let itemsThatFit = itemsPerRow;
    if (wrapperRef && wrapperRef.current) {
      itemsThatFit = Math.floor(wrapperRef.current.offsetWidth / (cardWidth + cardMargin));
      setItemsPerRow(Math.min(itemsThatFit, MaxItems));
    }
    return itemsThatFit;
  };

  React.useEffect(() => {
    const newItemsPerRow = updateItemsPerRow();
    fetchIfNeccesary(newItemsPerRow);
    window.addEventListener('resize', updateItemsPerRow);

    // remove eventListener to cleanup
    return () => window.removeEventListener('resize', updateItemsPerRow);
  });

  const fetchIfNeccesary = (itemsPerRow: number) => {
    // fetch the current row, plus the next one.
    // if the next one does not load, set hasReachedEnd to true
    const fetchLimit = itemsPerRow * 2;

    const cardsRequested = currentIndex + fetchLimit - cardsData.length;
    if (cardsRequested > 0 && !hasReachedEnd) {
      const onSuccess = (data: Array<any>) => {
        if (data.length < cardsRequested) {
          setHasReachedEnd(true);
        }
        setCardsData([...cardsData, ...data]);
      };
      const onError = handleBack;
      props.fetchMethod(cardsRequested, cardsData.length, onSuccess, onError);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerRow);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex - itemsPerRow;
      return newIndex < 0 ? 0 : newIndex;
    });
  };
  const isOnLastPage = hasReachedEnd && cardsData.length <= currentIndex + itemsPerRow;
  const ForwardAndBack = (
    <div style={{ display: 'inline-block', marginLeft: '2em' }}>
      <Button sx={noPadding} size="small" onClick={handleBack} disabled={currentIndex === 0}>
        <ExpandCircleDownOutlinedIcon
          sx={{
            color: currentIndex === 0 ? '#a2a1a1' : '#323232',
            fontSize: '3rem',
            transform: 'rotate(90deg)',
          }}
        />
      </Button>
      <Button sx={noPadding} size="small" onClick={handleNext} disabled={isOnLastPage}>
        <ExpandCircleDownOutlinedIcon
          sx={{
            color: isOnLastPage ? '#a2a1a1' : '#323232',
            fontSize: '3rem',
            transform: 'rotate(270deg)',
          }}
        />
      </Button>
    </div>
  );

  return (
    <div className={classes.carouselWrapper} ref={wrapperRef}>
      <div className={classes.topBanner}>
        <div className={classes.bannerLeft}>
          <Paper square elevation={0}>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '2rem' }}>{label}</Typography>
          </Paper>
        </div>
        <div>
          <Button
            href="#"
            sx={{
              padding: '0.4rem 1rem 0.4rem 1rem',
              border: '1px solid #323232',
              borderRadius: '8px',
              color: '#323232',
              fontWeight: '900',
              fontSize: '1rem',
            }}
          >
            View More
          </Button>
          {props.showControls ? ForwardAndBack : null}
        </div>
      </div>
      <div className={classes.carouselContent}>
        {cardsData
          .slice(currentIndex, currentIndex + itemsPerRow)
          .map((data) => props.renderCard(data))}
      </div>
    </div>
  );
}

export default ResponsiveCarousel;
