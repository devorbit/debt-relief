package com.experian.debtrelief.controller

import com.experian.debtrelief.model.Consumer
import javax.inject.Inject
import play.api.Logging
import play.api.mvc.{AbstractController, Action, ControllerComponents}
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.play.json.collection.JSONCollection
import play.api.libs.json._

import scala.concurrent.{ExecutionContext, Future}

//@Singleton
class ConsumerController @Inject()(components: ControllerComponents, val reactiveMongoApi: ReactiveMongoApi)(implicit exec: ExecutionContext)
extends AbstractController(components) with MongoController with ReactiveMongoComponents with Logging{

  def consumerCollection: Future[JSONCollection] =
    database.map(_.collection[JSONCollection]("consumer"))

  import com.experian.debtrelief.macros.JsonFormats._


  def registerConsumer(): Action[JsValue] = Action.async(parse.json) { request =>
    /*
     * request.body is a JsValue.
     * There is an implicit Writes that turns this JsValue as a JsObject,
     * so you can call insert.one() with this JsValue.
     * (insert.one() takes a JsObject as parameter, or anything that can be
     * turned into a JsObject using a Writes.)
     */


    request.body.validate[Consumer](Consumer.readDirectUser) match {
      case JsSuccess(consumer, _) => {
        val _: Consumer = consumer

        consumerCollection.flatMap(_.insert.one(consumer)).map { lastError =>
        logger.debug(s"Successfully inserted with LastError: $lastError")
        Created("User has been successfully registered.")
        }
      }
        case e: JsError => {
          e.fold(error => { Future.successful(BadRequest((JsError.toJson(error)) ))}, a => { a })
        }

    }

  }

}


