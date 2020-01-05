const coinPageModel  = require('../models/coin');
const { newForCoinPage,
        getRankByVolume, 
        getChartData, 
        getRelatedCoins,
        getsocialStats,
        getOrderBookL1TopData,
        getAllExchangesForOrderbook } = require( '../handlers/cryptoAPIHandler');
var coinPageBean = {
    coinInfo:{
        website_url:""
    }
}

//API = ""
var realtedCoinSymbols = {
    symbol:[{
        name:"Bitcoin",
        symbol:"ETH",
        icon: "Let me know if this is needed"
    },{
        name:"NEO",
        symbol:"NEO",
        icon: "Let me know if this is needed"
    },{
        name:"Tezos",
        symbol:"XTZ",
        icon: "Let me know if this is needed"
    },{
        name:"Cosmos",
        symbol:"ATOM",
        icon: "Let me know if this is needed"
    }]
}
//Only 3 fields currently, 
//API = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
//This is the coinNewsAPIContract
var coinNews = {
    news:[{
        url:"Buy today",
        title: "Here is thelink",
        imageurl: "imagURL",
        categories:["BTC","Trading","Market"]
    }
    ]
}

//API = https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10


var prophetData = {
    data: [1567890740,1567804340,1567717940,1567631540,1567545140],
    trend: [43934, 52503, 57177, 69658, 97031]
}

var filtercoinurls = (relatedCoinurlsData) => {
    var urlsdata = {};
    for(let i  = 0; i< relatedCoinurlsData.length;i ++){
        let urlType = relatedCoinurlsData[i]['url_master']['urlType'];
        let value = relatedCoinurlsData[i]['value'];

        if(urlType === "website"){
            urlsdata.website_url = value
        } else if(urlType === 'source_code'){
            urlsdata.source_code_url = value
        } else if (urlType === 'technical_doc'){
            urlsdata.technical_doc_url = value
        }

    }
    return urlsdata;
}

var orderBookl1DataResponse = {


};

    
//Socail Stats

//
module.exports = {

    getAllExchangesForOrderBookData: async(res,resp,next) =>{
        let allexchanges =  await getAllExchangesForOrderbook();
        return resp.json(allexchanges);  
    },
    getAllPairMappingsFromExchangeForSymbol:async(res,resp,next) =>{
        var symbol = res.params.symbol;
        var exchange = res.params.exchange;

        
        let latestMappingFromExchange = await getLatestMappingFromExchange(exchange);
        console.log(latestMappingFromExchange);

       var filteredObj =  latestMappingFromExchange['Data'].filter((eachObj) => {
            return (eachObj['fsym'] == symbol ||  eachObj['tsym'] == symbol )

        })
        return resp.json(filteredObj);

    },
    getOrderbookl1forCoin:async(res,resp,next) =>{
        var symbol = res.params.symbol;
        var currencyForFetch = res.params.currency;
        var exchange = res.params.exchange;

        let currency = 'USD';
        if (!(typeof currencyForFetch === "undefined")) {
            currency = currencyForFetch;
        }

       let orderBookl1Data =  await getOrderBookL1TopData(symbol,currency,exchange);
       
       var rawDataObject =  orderBookl1Data['Data']['RAW'];
       let bidaskObj = rawDataObject[symbol.toUpperCase()][currency.toUpperCase()];
       let responseData = {
            "BID":bidaskObj['BID'],
            "ASK":bidaskObj['ASK'],
            "H_DIFFERENCE":bidaskObj['BID'] - bidaskObj['ASK']
       }

        let currenyData = {};
        currenyData.currency = responseData
        orderBookl1DataResponse.symbol = currenyData;

        return resp.json(orderBookl1DataResponse);  
    },
    getCoinPageDetails:async(res,resp,next) =>{

        console.log(res.params);
        var symbol = res.params.symbol;
        var currencyForFetch = res.params.currency;
        let currency = 'USD';
        if (!(typeof currencyForFetch === "undefined")) {
            currency = currencyForFetch;
        }
        var foundCoin =  await coinPageModel.coinMasterModel.findOne({where: {symbol}});
        if(!foundCoin){
            return resp.status(404).json({error: 'Coin Does not exits'});
        }

        //coinMasterId is the field name of the foregin key in URLDataLink.
       var urlsWhereClause = {
        coinMasterId:foundCoin.id
       };

       var urlsAttributeToSelect= ['id','value','url_master.id'];

        var urlRelationData = await coinPageModel.urlDataRelationModel.findAll({ 
            attributes:urlsAttributeToSelect,
            where:urlsWhereClause,
            include:coinPageModel.urlMasterModel});

        var urlsFormattedData = filtercoinurls(urlRelationData);


        foundCoin =  JSON.parse(JSON.stringify(foundCoin));
        

        //Gets the News Data for Coin Page
        let cryptoCompareCoinId = foundCoin.cryptoCompareCoinId;
       

     
        let newsData = await  newForCoinPage();
        let coinRank = await getRankByVolume(symbol,currency);
        let chartData = await getChartData(symbol,currency);
        let relatedCoins = await getRelatedCoins(cryptoCompareCoinId);

        coinPageBean.coinInfo = foundCoin;
        coinPageBean.coinInfo.rank = coinRank;
        coinPageBean.coinInfo.website_url = urlsFormattedData.website_url;
        coinPageBean.coinInfo.technical_doc_url = urlsFormattedData.technical_doc_url;
        coinPageBean.coinInfo.source_code_url = urlsFormattedData.source_code_url;


        coinPageBean.realtedCoinSymbols = relatedCoins;
        coinPageBean.coinNews = newsData;
        coinPageBean.prophetData = prophetData;

        return resp.json(coinPageBean);
    },
    getSocialStats:async(res,resp,next) =>{
        var symbol = res.params.symbol;

        var foundCoin =  await coinPageModel.coinMasterModel.findOne({where: {symbol}});
        if(!foundCoin){
            return resp.status(404).json({error: 'Coin Does not exits'});
        }

        let cryptoCompareCoinId = foundCoin.cryptoCompareCoinId;
        let socailStatsData = await  getsocialStats(cryptoCompareCoinId);


        var socialStats = {
            'Twitter':socailStatsData['Twitter'],
            'Facebook':socailStatsData['Facebook'],
            'Reddit':socailStatsData['Reddit']
        }
        resp.json(socialStats);
    },


    insertCoinIntoDB:async(res,resp,next) =>{
        console.log('Into Insert Coins');
        var request = require("request");
        var coinID = res.params.id;
        console.log('ID from req: ' + res.params.id);
        var options = { method: 'GET',
          url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
          qs: { id: coinID },
          headers: 
           { 'Postman-Token': 'dba4bb84-4915-44b0-b84a-ac181dcb24e9',
             'cache-control': 'no-cache',
             'X-CMC_PRO_API_KEY': 'c79d006a-27ef-4ee9-8b61-05114dd591f1',
             Accepts: 'application/json' } };
        

             console.log('Into Firing Coins');
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          let json = JSON.parse(body);
          console.log('After Fetch: ' + json);
          for(let i = coinID;i<coinID+1;i++){
            let json_logo = json.data[i].logo;
            let json_name =json.data[i].name;
            let json_symbol =json.data[i].symbol;
            let json_description =json.data[i].description;
            let json_slug = json.data[i].slug;
            let json_category = json.data[i].category;
            
            var newCoinMaser = new coinPageModel.coinMasterModel();
            newCoinMaser.logo = json_logo;
            newCoinMaser.name = json_name;
            newCoinMaser.symbol = json_symbol;
            newCoinMaser.description = json_description;
            newCoinMaser.slug = json_slug;
            newCoinMaser.category = json_category;
            
            var saveFn = async (testSave) =>{
                await testSave.save();
                console.log('coin saved');
            }
           
               saveFn(newCoinMaser);
        
           // saveFn(newCoinMaser);
           

            var newCoinID = parseInt(coinID)+1;
            console.log("new CoinID: " + newCoinID);

            let websiteArray = json.data[i].urls.website;
            for(let j = 0;j< websiteArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = websiteArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 1;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                 saveFn(urlDataRel);
            
            }

            let technical_docArray = json.data[i].urls.technical_doc;
            for(let j = 0;j< technical_docArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = technical_docArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 2;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                saveFn(urlDataRel);
            }


            let twitterArray = json.data[i].urls.twitter;
            for(let j = 0;j< twitterArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = twitterArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 9;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                saveFn(urlDataRel);
            
            }


            let redditArray = json.data[i].urls.reddit;
            for(let j = 0;j< redditArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = redditArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 3;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                saveFn(urlDataRel);
            
            }


            let message_boardArray = json.data[i].urls.message_board;
            for(let j = 0;j< message_boardArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = message_boardArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 4;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                saveFn(urlDataRel);
            
            }


            let announcementArray = json.data[i].urls.announcement;
            for(let j = 0;j< announcementArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = announcementArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 5;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                saveFn(urlDataRel);
            
            }


            let chatArray = json.data[i].urls.chat;
            for(let j = 0;j< chatArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = chatArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 6;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                saveFn(urlDataRel);
            
            }

            let explorerArray = json.data[i].urls.explorer;
            for(let j = 0;j< explorerArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = explorerArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 7;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                saveFn(urlDataRel);
            
            }


            let source_codeArray = json.data[i].urls.source_code;
            for(let j = 0;j< source_codeArray.length;j++){
                var urlDataRel = new coinPageModel.urlDataRelationModel();
                urlDataRel.value = source_codeArray[j];
                //urlMasterId foregin Key is "urlMasterId"
                urlDataRel.urlMasterId = 8;//website is 1;
                urlDataRel.coinMasterId= newCoinID;
                saveFn(urlDataRel);
            
            }
            break;
        }
        resp.json(newCoinMaser);

        });
        
    }


}
