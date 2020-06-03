name := "DR-API"
 
version := "1.0" 
      
lazy val `DR-API` = (project in file(".")).enablePlugins(PlayScala)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"
      
scalaVersion := "2.12.2"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice )
unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

// only for Play 2.8.x (Scala 2.12)
libraryDependencies ++= Seq(
  "org.reactivemongo" %% "play2-reactivemongo" % "0.20.10-play28"
)
