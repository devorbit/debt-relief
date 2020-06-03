package com.experian.debtrelief.macros

import com.experian.debtrelief.model.{Consumer,Subscriber}

object JsonFormats {

    import play.api.libs.json.Json
    // Generates Writes and Reads for Feed and User thanks to Json Macros
    implicit val consumerDetailsFormat = Json.format[Consumer]

    implicit val subscriberDetailsFormat = Json.format[Subscriber]
}
