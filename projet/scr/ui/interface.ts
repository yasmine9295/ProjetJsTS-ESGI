export interface Price{
    price: number
    date: string

}

export interface Stock {
  symbol: string
  name: string
  prices: Price[]
}
