package com.experian.debtrelief.macros

import com.experian.debtrelief.model.{Consumer, Subscriber}
import play.api.libs.json.OFormat

object JsonFormats {

    import play.api.libs.json.Json
    // Generates Writes and Reads for Feed and User thanks to Json Macros
    implicit val consumerDetailsFormat: OFormat[Consumer] = Json.format[Consumer]

    implicit val subscriberDetailsFormat: OFormat[Subscriber] = Json.format[Subscriber]
}
