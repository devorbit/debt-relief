package com.experian.debtrelief.model

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, JsonValidationError, Reads}

case class Subscriber(subscriberId: String="", creditScoreFrom: Int=0,creditScoreTo:Int =0, debtReliefOption:String = "", debtReliefValue: Double = 0.0, loanType: String="")

object Subscriber {
  var validationErrorMsg=""
  implicit val updateSubscriber: Reads[Subscriber] = (
    (JsPath \ "subscriberId").read[String].filter(JsonValidationError("Subscriber Id should not be empty."))(_.length > 0) and
      (JsPath \ "creditScoreFrom").read[Int].filter(JsonValidationError("Credit Score From should greater than zero."))(_ > 0) and
      (JsPath \ "creditScoreTo").read[Int].filter(JsonValidationError("Credit Score To should be greater than zero."))(_ > 0) and
      (JsPath \ "debtReliefOption").read[String].filter(JsonValidationError("Debt Relief Option should not be empty."))(_.length > 0) and
      (JsPath \ "debtReliefValue").read[Double].filter(JsonValidationError("Debt Relief Value should be greater than 0."))(_ > 0.0) and
      (JsPath \ "loanType").read[String].filter(JsonValidationError("Loan Type should not be empty."))(_.length > 0)
    ) (Subscriber.apply _)

}