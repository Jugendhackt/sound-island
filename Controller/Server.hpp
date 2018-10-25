// +++++++++++++++++++ Start of Webserver Library +++++++++++++++++++

// as ESP32 Arduino Version

WiFiClient myclient;
WiFiServer server(80);


void Webserver_Start()
{
  server.begin();     // Start TCP/IP-Server on ESP32
}



String WebRequestHostAddress;     // global variable used to store Server IP-Address of HTTP-Request


//  Call this function regularly to look for client requests
//  template see https://github.com/espressif/arduino-esp32/blob/master/libraries/WiFi/examples/SimpleWiFiServer/SimpleWiFiServer.ino
//  returns empty string if no request from any client
//  returns GET Parameter: everything after the "/?" if ADDRESS/?xxxx was entered by the user in the webbrowser
//  returns "-" if ADDRESS but no GET Parameter was entered by the user in the webbrowser
//  remark: client connection stays open after return
String Webserver_GetRequestGETParameter()
{
  String GETParameter = "";
  
  myclient = server.available();   // listen for incoming clients

  //Serial.print(".");
  
  if (myclient) {                            // if you get a client,
    Serial.println("New Client.");           // print a message out the serial port
    String currentLine = "";                 // make a String to hold incoming data from the client
    
    while (myclient.connected()) {           // loop while the client's connected
      
      if (myclient.available()) {            // if there's bytes to read from the client,
        
        char c = myclient.read();            // read a byte, then
        Serial.write(c);                     // print it out the serial monitor

        if (c == '\n') {                     // if the byte is a newline character

          // if the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request
          if (currentLine.length() == 0) {
            
            if (GETParameter == "") {GETParameter = "-";};    // if no "GET /?" was found so far in the request bytes, return "-"
            
            // break out of the while loop:
            break;
        
          } else {    // if you got a newline, then clear currentLine:
            currentLine = "";
          }
          
        } else if (c != '\r') {  // if you got anything else but a carriage return character,
          currentLine += c;      // add it to the end of the currentLine
        }
        if  (c=='\r' && currentLine.startsWith("OPTIONS")){
          Serial.println("OPTIONS");
        }
        
        if  (c=='\r' && currentLine.startsWith("GET /?")) 
        // we see a "GET /?" in the HTTP data of the client request
        // user entered ADDRESS/?xxxx in webbrowser, xxxx = GET Parameter
        {
          Serial.println("GET");
          GETParameter = currentLine.substring(currentLine.indexOf('?') + 1, currentLine.indexOf(' ', 6));    // extract everything behind the ? and before a space
                    
        }


        if (c=='\r' && currentLine.startsWith("Host:")) 
        // we see a "Host:" in the HTTP data of the client request
        // user entered ADDRESS or ADDRESS/... in webbrowser, ADDRESS = Server IP-Address of HTTP-Request
        {
          int IndexOfBlank = currentLine.indexOf(' ');
          WebRequestHostAddress = currentLine.substring(IndexOfBlank + 1, currentLine.length());    // extract everything behind the space character and store Server IP-Address of HTTP-Request
          
        }
        
      }
      
    }
    
  }

  return GETParameter;
}



// Send HTML page to client, as HTTP response
// client connection must be open (call Webserver_GetRequestGETParameter() first)
void Webserver_SendJson(String HTMLPage)
{
   String httpResponse = "";

   // begin with HTTP response header
   httpResponse += "HTTP/1.1 200 OK\r\n";
   httpResponse += "Content-type:application/json\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: POST, GET, OPTIONS\r\nAccess-Control-Max-Age: 86400\r\n\r\n";

   // then the HTML page
   httpResponse += HTMLPage;

   // The HTTP response ends with a blank line:
   httpResponse += "\r\n";
    
   // send it out to TCP/IP client = webbrowser 
   myclient.println(httpResponse);

   // close the connection
   myclient.stop();
    
   Serial.println("Client Disconnected.");
   
};



// +++++++++++++++++++ End of Webserver library +++++++++++++++++++++
