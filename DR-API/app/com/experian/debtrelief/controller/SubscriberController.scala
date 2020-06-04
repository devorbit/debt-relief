package com.experian.debtrelief.controller

import com.experian.debtrelief.model.Subscriber
import javax.inject.Inject
import play.api.Logging
import play.api.mvc.{AbstractController, Action, ControllerComponents}
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.play.json.collection.JSONCollection
import play.api.libs.json._
import reactivemongo.api.{ Cursor, ReadPreference }
import reactivemongo.play.json._, collection._
import com.experian.debtrelief.macros.JsonFormats._
import scala.concurrent.{ExecutionContext, Future}

//@Singleton
class SubscriberController @Inject()(components: ControllerComponents, val reactiveMongoApi: ReactiveMongoApi)(implicit exec: ExecutionContext)
  extends AbstractController(components) with MongoController with ReactiveMongoComponents with Logging{

  def subscriberCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("subscriber"))

  def subscriberInfoCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("subscriber_details"))


  def updateSubscriber(): Action[JsValue] = Action.async(parse.json) { request =>
    /*
     * request.body is a JsValue.
     * There is an implicit Writes that turns this JsValue as a JsObject,
     * so you can call insert.one() with this JsValue.
     * (insert.one() takes a JsObject as parameter, or anything that can be
     * turned into a JsObject using a Writes.)
     */


    request.body.validate[Subscriber](Subscriber.updateSubscriber) match {
      case JsSuccess(subscriber, _) => {
        val _: Subscriber = subscriber

        subscriberCollection.flatMap(_.insert.one(subscriber)).map { lastError =>
          logger.debug(s"Successfully inserted with LastError: $lastError")
          Created("Subscriber details are successfully updated.")
        }
      }
      case e: JsError => {
        e.fold(error => { Future.successful(BadRequest((JsError.toJson(error)) ))}, a => { a })
      }

    }

  }

  def getSubscriberCriteria(subscriberId : String, acctTypeCD: String, creditScore: String) = Action.async {
    val cursor: Future[Cursor[JsObject]] = subscriberCollection.map {
      _.find(Json.obj("subscriberId" -> subscriberId,"loanType" -> acctTypeCD,"creditScoreFrom" -> Json.obj("$lte" -> creditScore.toInt), "creditScoreTo" -> Json.obj("$gte" -> creditScore.toInt))).
        // perform the query and get a cursor of JsObject
        cursor[JsObject](ReadPreference.primary)
    }

    // gather all the JsObjects in a list
    val futurePersonsList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futurePersonsJsonArray: Future[JsArray] =
      futurePersonsList.map { subscriber => Json.arr(subscriber) }

    // everything's ok! Let's reply with the array
    futurePersonsJsonArray.map { subscriber =>
      Ok(subscriber)
    }
  }

  def getSubscriberInfo() = Action.async {
    val cursor: Future[Cursor[JsObject]] = subscriberInfoCollection.map {
      _.find(Json.obj()).
        // perform the query and get a cursor of JsObject
        cursor[JsObject](ReadPreference.primary)
    }

    // gather all the JsObjects in a list
    val futurePersonsList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    //val futurePersonsJsonArray: Future[JsArray] =
      futurePersonsList.map { subscriber => Ok(Json.toJson(subscriber)) }


  }

  def checkSubscriberCriteria(subscriberId : String, acctTypeCD: String, creditScoreFrom: Int, creditScoreTo: Int, debtReliefOption: String) = Action.async {
    val cursor: Future[Cursor[JsObject]] = subscriberCollection.map {
      _.find(Json.obj("subscriberId" -> subscriberId,"loanType" -> acctTypeCD, "debtReliefOption" -> debtReliefOption,"creditScoreFrom" -> Json.obj("$lte" -> creditScoreFrom),
                "creditScoreTo" -> Json.obj("$gte" -> creditScoreFrom),"creditScoreFrom" -> Json.obj("$lte" -> creditScoreTo), "creditScoreTo" -> Json.obj("$gte" -> creditScoreTo))).
        // perform the query and get a cursor of JsObject
        cursor[JsObject](ReadPreference.primary)
    }

    // gather all the JsObjects in a list
    val futurePersonsList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futurePersonsJsonArray: Future[JsArray] =
      futurePersonsList.map { subscriber => Json.arr(subscriber) }

    // everything's ok! Let's reply with the array
    futurePersonsJsonArray.map { subscriber =>
      Ok(subscriber)
    }
  }

}


