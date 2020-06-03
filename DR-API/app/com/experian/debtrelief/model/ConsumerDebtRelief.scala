package com.experian.debtrelief.model

import play.api.libs.json._
import play.api.libs.json.JsonValidationError
import play.api.libs.functional.syntax._

case class ConsumerDebtRelief(pin: Long = 0,accountNB : Long = 0,subscriberId : String = "",acctTypeCD: String = "", debtReliefOption:String = "", debtReliefValue: Double = 0.0,debtReliefStatusCd: String= "",debtReliefAppliedDt: String ="")

object ConsumerDebtRelief {

  implicit val readConsumerDebtRelief: Reads[ConsumerDebtRelief] = (
      (JsPath \ "pin").read[Long].filter(JsonValidationError("Pin should not be empty."))(_ > 0) and
      (JsPath \ "accountNB").read[Long].filter(JsonValidationError("Account Number should not be empty."))(_ > 0) and
      (JsPath \ "subscriberId").read[String].filter(JsonValidationError("Subscriber Id should not be empty."))(_.length > 0) and
      (JsPath \ "acctTypeCD").read[String].filter(JsonValidationError("Account Type Code should not be empty."))(_.length > 0) and
      (JsPath \ "debtReliefOption").read[String].filter(JsonValidationError("Debt Relief Option should not be empty."))(_.length > 0) and
      (JsPath \ "debtReliefValue").read[Double] and
      (JsPath \ "debtReliefStatusCd").read[String].filter(JsonValidationError("Debt Relief Status Code should not be empty."))(_.length > 0) and
      (JsPath \ "debtReliefAppliedDt").read[String].filter(JsonValidationError("Debt Relief Applied Date should not be empty."))(_.length > 0)
    ) (ConsumerDebtRelief.apply _)
}