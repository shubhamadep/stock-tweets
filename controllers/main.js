const { getGridData } = require( '../handlers/cryptoAPIHandler');


module.exports = {
    
    getGridData: async(res,resp,next) =>{
        let amountofdata = res.params.amountcoins;
        let multiplier = res.params.multiplier;
        let currency = res.params.currency;

        if ((typeof amountofdata === "undefined")) {
            amountofdata = 100;
        }

        if ((typeof multiplier === "undefined")) {
            multiplier = 1;
        }

        if ((typeof currency === "undefined")) {
            currency = 'USD';
        }
        //multiplier = 1;
        let gridData = await getGridData(amountofdata,multiplier,currency)

        return resp.json(gridData);

    }
};