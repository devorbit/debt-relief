package com.experian.debtrelief.controller

import com.experian.debtrelief.model.Subscriber
import javax.inject.Inject
import play.api.Logging
import play.api.mvc.{AbstractController, Action, ControllerComponents}
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.play.json.collection.JSONCollection
import play.api.libs.json._

import scala.concurrent.{ExecutionContext, Future}

//@Singleton
class SubscriberController @Inject()(components: ControllerComponents, val reactiveMongoApi: ReactiveMongoApi)(implicit exec: ExecutionContext)
  extends AbstractController(components) with MongoController with ReactiveMongoComponents with Logging{

  def subscriberCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("subscriber"))

  import com.experian.debtrelief.macros.JsonFormats._


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

}


