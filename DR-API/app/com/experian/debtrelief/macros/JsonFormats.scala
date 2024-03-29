package com.experian.debtrelief.macros

import com.experian.debtrelief.model._
import play.api.libs.json.JsObject

object JsonFormats {

    import play.api.libs.json.Json
    // Generates Writes and Reads for Feed and User thanks to Json Macros
    implicit val consumerDetailsFormat = Json.format[Consumer]

    implicit val subscriberDetailsFormat = Json.format[Subscriber]

    implicit val crieteriaFormat = Json.format[Criteria]

    implicit val pinFormat = Json.format[PinData]

    implicit val tradeAccountFormat = Json.format[TradeAccountData]

    implicit val scoreFormat = Json.format[CreditScore]

    implicit val subscriberInfoFormat = Json.format[SubscriberInfo]

    implicit val consumerDebtReliefFormat = Json.format[ConsumerDebtRelief]
}
