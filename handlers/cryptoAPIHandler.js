var axios  = require('axios');
var { cryptoCompare: cryptoCompareKeys }  = require('../config/keys');

//Currently the language is kept to english
// Use Axios deafults

var allNewsEndpoint = '/v2/news/?lang=EN';
var rankbyVolumeurl = '/top/totalvolfull';
var historicOHLCV   = '/v2/histoday';

module.exports =  {
    newForCoinPage : async() =>{
        cryptoCompareKeys.apiKey;
        let finalUrl = cryptoCompareKeys.rootURL + allNewsEndpoint;
        let responseData = await createHTTPRequest('get',finalUrl)
     
    
        return   prepareCoinPageNewsBean(responseData.Data);;
    },
    getRankByVolume : async(coinsymbol,currency) =>{
        let finalUrl = cryptoCompareKeys.rootURL + rankbyVolumeurl;
        let getParams = {
            limit:100,
            tsym:currency,
            ascending:true 
        }
        let responseData = await createHTTPRequest('get',finalUrl,getParams)

        return  rankResponseHandler(responseData,coinsymbol);
    },

    getChartData: async(coinsymbol,currency) =>{
        let finalUrl = cryptoCompareKeys.rootURL + historicOHLCV;
        let getParams = {
            tsym:currency,
            limit:2000,
            fsym:coinsymbol
        }
        let responseData = await createHTTPRequest('get',finalUrl,getParams)

        return  historicOHLCVHandler(responseData,coinsymbol);
    },

    getRelatedCoins: async(cryptoCompareId) => {
        let coinSymbolUrl ='/social/coin/latest';
        let finalUrl = cryptoCompareKeys.rootURL + coinSymbolUrl;
        let getParams = {
            coinId:cryptoCompareId,
            api_key:cryptoCompareKeys.apiKey
        }
        let responseData = await createHTTPRequest('get',finalUrl,getParams);


        // Final Data will be in ['Data']['CryptoCompare']['SimilarItems'] as Array of JSONObjects
        return relatedCoinsHanlder(responseData);
    },


    //For Main Page

    getGridData: async(amountofData,multiplier,currency) => {
        let coinSymbolUrl ='/top/totalvolfull';
        let finalUrl = cryptoCompareKeys.rootURL + coinSymbolUrl;
       
        var getParams = {
            limit:amountofData,
            tsym:currency,
            ascending:true
        }
        console.log("Multi: " + multiplier);

        if(multiplier > 1){
             getParams.page = multiplier;
    
        }
        
        let responseData = await createHTTPRequest('get',finalUrl,getParams);
        console.log("Response Message: " + responseData.Message);

        var aggreegdateData =  responseData['Data'].slice(0,amountofData)
        var resultJson= {
            Data:''
        }
        resultJson['Data'] = aggreegdateData;
     
        for(var counter = 0; counter < resultJson['Data'].length;counter ++  ){
            var eachObj = resultJson['Data'][counter];
            eachObj['CoinInfo'].Rank = ((multiplier - 1) * amountofData) + counter+1;
        }
        return resultJson;
    },
    getsocialStats: async(cryptoCompareId) => {
        let socialSatsDataUrl ='/social/coin/latest';
        let finalUrl = cryptoCompareKeys.rootURL + socialSatsDataUrl;
       
        var getParams = {
            coinId:cryptoCompareId
        }
        let responseData = await createHTTPRequest('get',finalUrl,getParams);

        return responseData['Data'];
    },
    getOrderBookL1TopData:  async(coinsymbol,currency,exchange) => {
        let coinSymbolUrl ='/ob/l1/top';
        let finalUrl = cryptoCompareKeys.rootURL + coinSymbolUrl;
        let getParams = {
            fsyms:coinsymbol,
            tsyms:currency,
            e:exchange,
            api_key:cryptoCompareKeys.apiKey
        }
        let responseData = await createHTTPRequest('get',finalUrl,getParams);

        var l1orderbokdata = {
            Data: responseData['Data']
        }
        // Final Data will be in ['Data']['CryptoCompare']['SimilarItems'] as Array of JSONObjects
        return l1orderbokdata;
    },
    getAllExchangesForOrderbook:async(coinsymbol,currency,exchange) => {
        let coinSymbolUrl ='/ob/l2/exchanges';
        let finalUrl = cryptoCompareKeys.rootURL + coinSymbolUrl;
        let getParams = {
            api_key:cryptoCompareKeys.apiKey
        }
        let responseData = await createHTTPRequest('get',finalUrl,getParams);

        var orderbookExchangeData = {
            Data: responseData['Data']
        }
        // Final Data will be in ['Data']['CryptoCompare']['SimilarItems'] as Array of JSONObjects
        return orderbookExchangeData;

    },

    multipleSymbolFullData: async(allCoinSymbols,currencyArray) =>{
        let coinSymbolUrl ='/pricemultifull';
        let finalUrl = cryptoCompareKeys.rootURL + coinSymbolUrl;
        
        let commaSeperatedCoinSymbols = convertToCommnaFromModelArray(allCoinSymbols,'coin_master.symbol');

        let getParams = {
            fsyms:commaSeperatedCoinSymbols,
            tsyms:currencyArray,
            api_key:cryptoCompareKeys.apiKey
        }

        let responseData = await createHTTPRequest('get',finalUrl,getParams);

       
        // Final Data will be in ['Data']['CryptoCompare']['SimilarItems'] as Array of JSONObjects
        return responseData;

    }
    
}
/**
 * Extracts a value as per key specified apnd converts to the a comma separated String;
 * 
 */
var convertToCommnaFromModelArray = (allCoinSymbols, key) => {
    let commastr = '';
    let keySplitted = key.split('.');

    for(let i = 0; i< allCoinSymbols.length; i++){
        let currentCoin = allCoinSymbols[i];
        let newCurr = currentCoin;
        
        for(let v = 0; v < keySplitted.length ; v++){
                newCurr = newCurr[keySplitted[v]];
        }
        commastr += newCurr;
        if(!( i == allCoinSymbols.length - 1)){
          commastr += ',';
        }
    }
     console.log('Comma Str' + commastr);
     return commastr;

}
var relatedCoinsHanlder = async(responseDataArray)=> {
    let relatedCoinsArray = [];
    var fetchedRelatedCoins = responseDataArray['Data']['CryptoCompare']['SimilarItems'];
    for(var counter = 0; counter < fetchedRelatedCoins.length;counter ++  ){
        let eachRelatedObj = {};
        let fetchedRelatedObj = fetchedRelatedCoins[counter];
        eachRelatedObj.symbol = fetchedRelatedObj['Name'];
        eachRelatedObj.FullName = fetchedRelatedObj['FullName'];
        eachRelatedObj.ImageUrl = fetchedRelatedObj['ImageUrl'];
        relatedCoinsArray.push(eachRelatedObj);

        if(counter == 4){
            break;
        }
    }
    return relatedCoinsArray;

}
var historicOHLCVHandler = async(responseDataArray) =>{
    var dataArray = [];
    for(var counter = 0; counter < responseDataArray['Data']['Data'].length;counter ++  ){
        let eachObj =responseDataArray['Data']['Data'][counter];
        let eachArrayObj = [];

        eachArrayObj.push(eachObj.time);
        eachArrayObj.push(eachObj.high);
        eachArrayObj.push(eachObj.low);
        eachArrayObj.push(eachObj.open);
        eachArrayObj.push(eachObj.close);
        eachArrayObj.push(eachObj.volumeto);

        dataArray.push(eachArrayObj);
        
    }
    return dataArray;
}

var rankResponseHandler = async(responseDataArray,coinsymbol) =>{
    var counter = 0;
    
    var fetchedRank = -1
    for(var counter = 0; counter < responseDataArray['Data'].length;counter ++  ){
        var element = responseDataArray['Data'][counter];
    
        if( element.CoinInfo.Internal  === coinsymbol){
            fetchedRank = counter;
            break;
         }
    }
 

    if(fetchedRank === -1){
        return 'NA';
    }

    return fetchedRank + 1;

}




//News API Contract Converstion

var prepareCoinPageNewsBean = (responseData) =>{
    var coinPageNewsBean = {
        news:[]
    }
    var responseDataSliced = responseData.slice(0,5);

    responseDataSliced.forEach((item) =>{
        var eachNewsObj =  {
            url:item['url'],
            title:item['title'],
            imagerUrl:item['imageurl'],
            categories:item['categories'].split('|')
        }
        coinPageNewsBean.news.push(eachNewsObj);
    })

    return coinPageNewsBean;
}

//generic Method to call for HTTP Requests
var  createHTTPRequest = async (method, url, getParams, payload_data) => {
    const config = {
        method: method,
        url: url,
        headers: { 'X-CMC_PRO_API_KEY': cryptoCompareKeys.apiKey,
                    'Authorization': 'Apikey ' + cryptoCompareKeys.apiKey
        },
        params: getParams,
        data: payload_data
    }
        let response = await axios(config);
        
        console.log(response.status + " Fetch");
        return response.data;

    
}
