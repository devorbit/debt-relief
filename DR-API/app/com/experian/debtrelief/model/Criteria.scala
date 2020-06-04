package com.experian.debtrelief.model

import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, JsonValidationError, Reads}

case class Criteria(pin: Long = 0, reasonCd: String="", needDetails: String ="")

object Criteria {

  implicit val readCrietria: Reads[Criteria] = (
    (JsPath \ "pin").read[Long].filter(JsonValidationError("Pin should not be empty."))(_ > 0) and
      (JsPath \ "reasonCd").read[String].filter(JsonValidationError("Reason code should not be empty."))(_.length > 0) and
      (JsPath \ "needDetails").read[String].filter(JsonValidationError("Need Details should not be empty."))(_.length > 0)
    ) (Criteria.apply _)
}