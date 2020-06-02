package com.experian.debtrelief.controller

import javax.inject._
import play.api.libs.ws._
import play.api.mvc._
import com.experian.debtrelief.views._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents, wsClient: WSClient) extends AbstractController(cc) {

  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action {
    val request: WSRequest =wsClient.url("https://od-api-demo.oxforddictionaries.com:443/api/v1/domains/{source_language}")

    Ok(views.html.index("Hello welocme to play"))
  }

}
