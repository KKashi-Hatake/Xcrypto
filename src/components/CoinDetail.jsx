import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import Chart  from './Chart';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';

const CoinDetail = () => {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [value, setValue] = useState([]);
  const [currency, setcurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);
  const params = useParams();
  const btns=["24h","7d","14d","30d","60d","200d","360d","max"]

  const switchChartStats=(key)=>{
    switch (key) {
      case "24h":
        setDays("24h")
        setLoader(true)
        break;
      case "7d":
        setDays("7d")
        setLoader(true)
        break;
      case "14d":
        setDays("14d")
        setLoader(true)
        break;
      case "30d":
        setDays("30d")
        setLoader(true)
        break;
      case "60d":
        setDays("60d")
        setLoader(true)
        break;
      case "200d":
        setDays("200d")
        setLoader(true)
        break;
      case "360d":
        setDays("360d")
        setLoader(true)
        break;
      case "max":
        setDays("max")
        setLoader(true)
        break;
    
      default:
        setDays("24h")
        setLoader(true)
        break;
    }

  }




  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}`
        );

        const {data:chartData}=await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setValue(data);
        setChartArray(chartData.prices)
        setLoader(false);
      } catch (e) {
        setLoader(false);
        setError(true);
      }
    };

    getdata();
  }, [params.id,currency,days]);

  if (error) {
    return <ErrorComponent message={"Error While Fetching Coin's Details"} />;
  }

  return (
    <Container maxW={'container.xl'}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Box w={'full'} borderWidth={'1'}>
           <Chart arr={chartArray} days={days } currency={currencySymbol }   />
          </Box>
          <HStack p={"4"} overflowX={"auto"} >
            {
              btns.map((i)=>(
                <Button key={i} onClick={()=>switchChartStats(i)}>
                  {i}
                </Button>
              ))
            }
          </HStack>
          <RadioGroup value={currency} onChange={setcurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <VStack p={'16'} spacing={'4'} alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
              Last updated on{' '}
              {Date(value.market_data.last_update).split('G')[0]}
            </Text>
            <Image
              src={value.image.large}
              w={'16'}
              h={'16'}
              objectFit={'conatin'}
            />
            <Stat>
              <StatLabel>{value.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {value.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    value.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {value.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'white'}>
              {`#${value.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${value.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${value.market_data.low_24h[currency]}`}
            />
            <Box w={'full'} p={'4'}>
              <Item title={'Max Supply'} value={value.market_data.max_supply} />
              <Item title={'Circulating Supply'} value={value.market_data.circulating_supply} />
              <Item title={'Market Cap'} value={`${currencySymbol}${value.market_data.market_cap[currency]}`} />
              <Item title={'All Time Low'} value={`${currencySymbol}${value.market_data.atl[currency]}`} />
              <Item title={'All Time High'} value={`${currencySymbol}${value.market_data.ath[currency]}`} />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}  >
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress value={'50'} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
);

export default CoinDetail;
