package com.experian.debtrelief.controller

import javax.inject.Inject
import play.api.Logging
import play.api.mvc.{AbstractController, Action, ControllerComponents}
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.play.json.collection.JSONCollection
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import reactivemongo.api.{ Cursor, ReadPreference }
import reactivemongo.play.json._, collection._

//@Singleton
class PinDetailsController @Inject()(components: ControllerComponents, val reactiveMongoApi: ReactiveMongoApi)(implicit exec: ExecutionContext)
  extends AbstractController(components) with MongoController with ReactiveMongoComponents with Logging{

  def pinCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("pin_details"))

  def tradeCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("trade_account_records"))

  def scoreCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("credit_score"))

  def getPinDetails(dob : String, ssn: String) = Action.async {
    val cursor: Future[Cursor[JsObject]] = pinCollection.map {
      _.find(Json.obj("SSN" -> ssn,"DOB" -> dob)).
        // perform the query and get a cursor of JsObject
        cursor[JsObject](ReadPreference.primary)
    }

    // gather all the JsObjects in a list
    val futurePersonsList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futurePersonsJsonArray: Future[JsArray] =
      futurePersonsList.map { pin => Json.arr(pin) }

    // everything's ok! Let's reply with the array
    futurePersonsJsonArray.map { pin =>
      Ok(pin)
    }
  }

  def getTradeDetails(pin : Long) = Action.async {
    val cursor: Future[Cursor[JsObject]] = tradeCollection.map {
      _.find(Json.obj("pin" -> pin,"acctSTATUSCD"-> Json.obj("$ne" -> "13"))).
        // perform the query and get a cursor of JsObject
        cursor[JsObject](ReadPreference.primary)
    }

    // gather all the JsObjects in a list
    val futurePersonsList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futurePersonsJsonArray: Future[JsArray] =
      futurePersonsList.map { trade => Json.arr(trade) }

    // everything's ok! Let's reply with the array
    futurePersonsJsonArray.map { trade =>
      Ok(trade)
    }
  }


  def getScoreDetails(pin : Long) = Action.async {
    val cursor: Future[Cursor[JsObject]] = scoreCollection.map {
      _.find(Json.obj("pin" -> pin)).
        // perform the query and get a cursor of JsObject
        cursor[JsObject](ReadPreference.primary)
    }

    // gather all the JsObjects in a list
    val futurePersonsList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futurePersonsJsonArray: Future[JsArray] =
      futurePersonsList.map { score => Json.arr(score) }

    // everything's ok! Let's reply with the array
    futurePersonsJsonArray.map { score =>
      Ok(score)
    }
  }

}


