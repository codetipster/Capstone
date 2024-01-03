import { makeStyles } from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../PublisherContext";
import { numberWithCommas } from "../PublishersTable";
import image from '../../assets/aaa.jpeg';


const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

const Carousel = ({combinedData}) => {
  
  const classes = useStyles();

  //const publishersOnTrending = availablePublishers.map(publisher => publisher.name);
  const items = combinedData.map((publisher) => {
    let customViewGain = publisher?.difference?.differenceCustomViewRate >= 0;
    let viewRateGain = publisher?.difference?.differenceViewRate >= 0;

    return (
      <Link className={classes.carouselItem} to={`/publishers/${publisher.id}`}>
        <img
          src={image} 
          alt={publisher.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>{publisher.name}</span>
         <span>
            &nbsp;
           <span
             style={{
              color: customViewGain > 0 ? "rgb(14, 203, 129)" : "red",
               fontWeight: 500,
             }}
           >
           <span
            style={{
              color: "#A9A9A9", // This is an ash color
              textTransform: "lowercase" // This will make the text lowercase
            }}>
             Custom View Rate: <span></span>
           </span>
            {customViewGain && "+"}
            {Number(parseFloat(publisher?.difference?.differenceCustomViewRate) * 100).toFixed(2)}%
           </span>
         </span>
         <span>
            &nbsp;
           <span
             style={{
              color: viewRateGain > 0 ? "rgb(14, 203, 129)" : "red",
               fontWeight: 500,
             }}
           >
           <span
            style={{
              color: "#A9A9A9", // This is an ash color
              textTransform: "lowercase" // This will make the text lowercase
            }}>
              View Rate: <span></span>
           </span>
            {viewRateGain && "+"}
            {Number(parseFloat(publisher?.difference?.differenceViewRate) * 100).toFixed(2)}%
           </span>
         </span>
         {/* <span style={{ fontSize: 22, fontWeight: 500 }}>
           {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
         </span> */}
      </Link>
    );
  });

  // const items = trending.map((coin) => {
  //   let profit = coin?.price_change_percentage_24h >= 0;
  //   return (
  //     <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
  //       <img
  //         src={image}
  //         alt={coin.name}
  //         height="80"
  //         style={{ marginBottom: 10 }}
  //       />
  //       
  //     </Link>
  //   );
  // });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;