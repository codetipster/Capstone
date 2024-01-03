// import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ReactHtmlParser from "react-html-parser";
// import CoinInfo from "../components/CoinInfo";
// import { SingleCoin } from "../config/api";
// import { numberWithCommas } from "../components/PublishersTable";
// import { CryptoState } from "../CryptoContext";
// import image from '../assets/aaa.jpeg';

// const CoinPage = () => {
//   const { id } = useParams();
//   const [data, setData] = useState();
//   console.log('id from coinpage', id);
  
//   useEffect(() => {
//     const token = localStorage.getItem('authToken'); 
//     fetch(`https://reports.asadcdn.com:5200/getViewabilityReport?publisher_id=${id}&date_range=last7days`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(`Server response was not ok. Status: ${response.status} ${response.statusText}`);
//       }
//     })
//     .then(data => {
//       setData(data);
//     })
//     .catch(error => console.error('Error:', error));
//   }, [id]);



//   const useStyles = makeStyles((theme) => ({
//     container: {
//       display: "flex",
//       [theme.breakpoints.down("md")]: {
//         flexDirection: "column",
//         alignItems: "center",
//       },
//     },
//     sidebar: {
//       width: "30%",
//       [theme.breakpoints.down("md")]: {
//         width: "100%",
//       },
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       marginTop: 25,
//       borderRight: "2px solid grey",
//     },
//     heading: {
//       fontWeight: "bold",
//       marginBottom: 20,
//       fontFamily: "Montserrat",
//     },
//     description: {
//       width: "100%",
//       fontFamily: "Montserrat",
//       padding: 25,
//       paddingBottom: 15,
//       paddingTop: 0,
//       textAlign: "justify",
//     },
//     marketData: {
//       alignSelf: "start",
//       padding: 25,
//       paddingTop: 10,
//       width: "100%",
//       [theme.breakpoints.down("md")]: {
//         display: "flex",
//         justifyContent: "space-around",
//       },
//       [theme.breakpoints.down("sm")]: {
//         flexDirection: "column",
//         alignItems: "center",
//       },
//       [theme.breakpoints.down("xs")]: {
//         alignItems: "start",
//       },
//     },
//   }));

//   const classes = useStyles();

//   console.log('data from Coinpage', data);

//   if (!data) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  
  
  
//   return (
//     <div className={classes.container}>
//       <div className={classes.sidebar}>
//         <img
//           src={image}
//           alt="publisher logo"
//           height="200"
//           style={{ marginBottom: 20 }}
//         />
//         <Typography variant="h3" className={classes.heading}>
//           {/* {coin?.name} */}
//           name of publisher
//         </Typography>
//         {/* <Typography variant="subtitle1" className={classes.description}>
//           {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
//         </Typography> */}
//         <div className={classes.marketData}>
//           <span style={{ display: "flex" }}>
//             <Typography variant="h5" className={classes.heading}>
//               Rank:
//             </Typography>
//             &nbsp; &nbsp;
//             <Typography
//               variant="h5"
//               style={{
//                 fontFamily: "Montserrat",
//               }}
//             >
//               {/* {numberWithCommas(coin?.market_cap_rank)} */}
//             </Typography>
//           </span>

//           <span style={{ display: "flex" }}>
//             <Typography variant="h5" className={classes.heading}>
//               Current Price:
//             </Typography>
//             &nbsp; &nbsp;
//             <Typography
//               variant="h5"
//               style={{
//                 fontFamily: "Montserrat",
//               }}
//             >
//               {/* {symbol}{" "}
//               {numberWithCommas(
//                 coin?.market_data.current_price[currency.toLowerCase()]
//               )} */}
//             </Typography>
//           </span>
//           <span style={{ display: "flex" }}>
//             <Typography variant="h5" className={classes.heading}>
//               Market Cap:
//             </Typography>
//             &nbsp; &nbsp;
//             <Typography
//               variant="h5"
//               style={{
//                 fontFamily: "Montserrat",
//               }}
//             >
//               {/* {symbol}{" "}
//               {numberWithCommas(
//                 coin?.market_data.market_cap[currency.toLowerCase()]
//                   .toString()
//                   .slice(0, -6)
//               )} */}
//               M
//             </Typography>
//           </span>
//         </div>
//       </div>
//       {/* <CoinInfo  /> */}
//     </div>
//   );
// };

// export default CoinPage;

import React from 'react'
//import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublisherInfo from '../components/PublisherInfo';
import image from '../assets/aaa.jpeg';

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
      
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));


const Publisherpage = () => {
    const { id } = useParams();
    const [publisherData, setPublisherData] = useState();
    
        useEffect(() => {
        const token = localStorage.getItem('authToken'); 
        fetch(`https://reports.asadcdn.com:5200/getViewabilityReport?publisher_id=${id}&date_range=last7days`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Server response was not ok. Status: ${response.status} ${response.statusText}`);
        }
        })
        .then(data => {
        setPublisherData(data);
        })
        .catch(error => console.error('Error:', error));
        }, [id]);
    

      console.log('publisherData from publisherpage', publisherData);
    //  console.log('name from publisherpage', publisherData?.report[0]?.publisher_name);
      const classes = useStyles();

      if (!publisherData) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
        <div className={classes.sidebar}>
            <img
            src={image}
            alt={publisherData?.report[0]?.publisher_name}
            height="200"
            style={{ marginBottom: 20 }}
            />
            <Typography variant="h3" className={classes.heading}>
              {publisherData?.report[0]?.publisher_name}
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
              An Axel Springer Company publisher brand that provides news and information.
           </Typography>

           <div className={classes.marketData}>
                <span style={{ display: "flex" }}>
                    <Typography variant="h6" className={classes.heading}>
                    Rank:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography
                    variant="h6"
                    style={{
                        fontFamily: "Montserrat",
                    }}
                    >
                    3rd
                    </Typography>
                </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              Average View Rate:
              Average Custom View Rate:
            </Typography>
          </span>

                <span style={{ display: "flex" }}>
                    <Typography variant="h6" className={classes.heading}>
                    Market Cap:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography
                    variant="h6"
                    style={{
                        fontFamily: "Montserrat",
                    }}
                    >
                    
                    M
                    </Typography>
                </span>
        </div>
        </div>
        <PublisherInfo publisherData={publisherData}/>
    </div>
  )
}

export default Publisherpage