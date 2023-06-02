import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: Number,
  price_def: Number,
  timestamp: Date,
  ratio:Number,
  lower_bound:Number,
  upper_bound:Number,
  tigger_alert:Number | undefined
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]):Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;
    return  {
      price_abc : priceABC,
      price_def : priceDEF,
      ratio,
      timestamp : serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp:serverResponds[1].timestamp,
      upper_bound : upper_bound,
      lower_bound : lower_bound,
      tigger_alert: (ratio > upper_bound || ratio < lower_bound)? ratio:undefined
      
    }
  }
}
