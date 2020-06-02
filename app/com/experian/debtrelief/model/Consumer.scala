package com.experian.debtrelief.model
import play.api.libs.json._
import play.api.data.validation._
import play.api.libs.json.JsonValidationError
import play.api.libs.functional.syntax._
import play.api.data.validation.Constraint


case class Consumer(firstName: String="", lastName: String="", email: String="", password: String="", DOB: String="", SSN: String="")

object Consumer {
  var validationErrorMsg=""
  implicit val readDirectUser: Reads[Consumer] = (
    (JsPath \ "firstName").read[String].filter(JsonValidationError("your.error.message"))(_.length > 0) and
      (JsPath \ "lastName").read[String].filter(JsonValidationError("your.error.message"))(_.length > 0) and
      (JsPath \ "email").read[String].filter(JsonValidationError("your.error.message"))(_.length > 0) and
      (JsPath \ "password").read[String].filter(JsonValidationError("your.error.message"))(_.length > 0).
        filterNot(JsonValidationError("Password is all numbers"))(_.forall(_.isDigit)).
        filterNot(JsonValidationError("Password is all letters"))(_.forall(_.isLetter)) and
      (JsPath \ "DOB").read[String].filter(JsonValidationError("your.error.message"))(_.length > 0) and
      (JsPath \ "SSN").read[String].filter(JsonValidationError("your.error.message"))(_.length > 0)
      ) (Consumer.apply _)
}