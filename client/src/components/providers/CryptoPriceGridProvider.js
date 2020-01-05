import React from 'react'

const CryptoPriceGridContext = React.createContext(true)

export const CryptoPriceGridProvider = CryptoPriceGridContext.Provider
export const CryptoPriceGridConsumer = CryptoPriceGridContext.Consumer

export default CryptoPriceGridContext