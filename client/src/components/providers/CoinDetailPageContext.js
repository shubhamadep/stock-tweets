import React from 'react'

const CoinDetailPageContext = React.createContext(true)

export const CoinDetailPageProvider = CoinDetailPageContext.Provider
export const CoinDetailPageConsumer = CoinDetailPageContext.Consumer

export default CoinDetailPageContext