package com.experian.debtrelief.controller

import com.experian.debtrelief.model.Criteria
import javax.inject.Inject
import play.api.Logging
import play.api.mvc.{AbstractController, Action, ControllerComponents}
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.play.json.collection.JSONCollection
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import com.experian.debtrelief.macros.JsonFormats._
import reactivemongo.api.{ Cursor, ReadPreference }
import reactivemongo.play.json._, collection._

//@Singleton
class CriteriaController @Inject()(components: ControllerComponents, val reactiveMongoApi: ReactiveMongoApi)(implicit exec: ExecutionContext)
  extends AbstractController(components) with MongoController with ReactiveMongoComponents with Logging{

  def criteriaCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("criteria"))

  def updateCriteria(): Action[JsValue] = Action.async(parse.json) { request =>
    /*
     * request.body is a JsValue.
     * There is an implicit Writes that turns this JsValue as a JsObject,
     * so you can call insert.one() with this JsValue.
     * (insert.one() takes a JsObject as parameter, or anything that can be
     * turned into a JsObject using a Writes.)
     */


    request.body.validate[Criteria](Criteria.readCrietria) match {
      case JsSuccess(criteria, _) => {
        val _: Criteria = criteria

        criteriaCollection.flatMap(_.insert.one(criteria)).map { lastError =>
          logger.debug(s"Successfully inserted with LastError: $lastError")
          Created("Criteria has been successfully updated.")
        }
      }
      case e: JsError => {
        e.fold(error => { Future.successful(BadRequest((JsError.toJson(error)) ))}, a => { a })
      }

    }

  }

  def getCriteria(pin: Long) = Action.async {
    val cursor: Future[Cursor[JsObject]] = criteriaCollection.map {
      _.find(Json.obj("pin" -> pin)).
        // perform the query and get a cursor of JsObject
        cursor[JsObject](ReadPreference.primary)
    }

    // gather all the JsObjects in a list
    val futurePersonsList: Future[List[JsObject]] =
      cursor.flatMap(_.collect[List](-1, Cursor.FailOnError[List[JsObject]]()))

    val futurePersonsJsonArray: Future[JsArray] =
      futurePersonsList.map { consumer => Json.arr(consumer) }

    // everything's ok! Let's reply with the array
    futurePersonsJsonArray.map { consumer =>
      Ok(consumer)
    }
  }

}


