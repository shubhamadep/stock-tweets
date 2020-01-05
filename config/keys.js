// add this file to .gitignore


// add this file to .gitignore

module.exports = {
    google: {
        clientID: '1075983349745-ge85hbl7qshprq1gm5gcmobifgvtrgeq.apps.googleusercontent.com',
        clientSecret: 'FTYNnDzSHK0DvcWjP7TWf5az'
    },
    facebook:{
        appId:'609107356292516',
        appSecret:'81f536c4471907ffa61e57507259f4d9'
    },
    mongodb: {
        
        dbURI: 'mongodb+srv://kamlesh:babasonu123%21%40%23@cluster0-hrlhy.mongodb.net/test?retryWrites=true&w=majority'
    },
    session: {
        cookieKey: 'thisiswowwwwwwwwwww'
    },
    mysql:{
        dbURILocal: 'mysql://root@localhost:3306/coinProphet',
        dbURLHeroku:'mysql://b045c2eebcd183:73a45f1c@us-cdbr-iron-east-02.cleardb.net:3306/heroku_02861cacdf9656d'  
    },
    jwt:{
        secret:'thecoinprophet.com',
        issuer:'thecoinProphet.com'
    },
    cryptoCompare:{
        rootURL: 'https://min-api.cryptocompare.com/data',
        apiKey:'605bf63cbd40a90d8f353e4e4761f66bc2fd751dbcab3bc550a5530c3354ebd1'

    }
};
