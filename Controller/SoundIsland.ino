#include <dummy.h>

/*
  IOT Actor Board Webserver Demo with configuration webpage
  for ESP32 DevKitC
  Elektor / Jens Nickel
  My Journey in the IoT
*/

#define UP_IN_PIN 13
#define LEFT_IN_PIN 12
#define DOWN_IN_PIN 14
#define RIGHT_IN_PIN 27
#define A_IN_PIN 26
#define B_IN_PIN 25

#define LEFT_OUT_PIN 33
#define RIGHT_OUT_PIN 32

#include <limits.h>
#include <WiFi.h>
#include <driver/gpio.h>
#include <soc/gpio_struct.h>
#include <Preferences.h>   // this library is used to get access to Non-volatile storage (NVS) of ESP32
// see https://github.com/espressif/arduino-esp32/blob/master/libraries/Preferences/examples/StartCounter/StartCounter.ino

#include "Server.hpp"
#include "Wifi.hpp"

Preferences preferences;   // we must generate this object of the preference library

// Decodes a GET parameter (expression after ? in URI (URI = expression entered in address field of webbrowser)), like "Country=Germany&City=Aachen"
// and set the ConfigValues
void decode_url_param(String param) {
  Serial.println(param);
  if(param.startsWith("l=")) {
    param = param.substring(2);
    if(param[0] == '1'){
      Serial.println("left HIGH");
      digitalWrite(LEFT_OUT_PIN,HIGH);
    }
    if(param[0] == '0'){
      Serial.println("left LOW");
      digitalWrite(LEFT_OUT_PIN,LOW);
    }
    param = param.substring(1);
    if(param.startsWith("&r=")) {
      param = param.substring(3);
      if(param[0] == '1'){
        Serial.println("right HIGH");
        digitalWrite(RIGHT_OUT_PIN,HIGH);
      }
      if(param[0] == '0'){
        Serial.println("right LOW");
        digitalWrite(RIGHT_OUT_PIN,LOW);
      }
    }
  }
}

String create_response() {
   String json = "{\"up\": ";
   json += (digitalRead(UP_IN_PIN) == LOW)?("false"):("true");
   json += ",\"left\": ";
   json += (digitalRead(LEFT_IN_PIN) == LOW)?("false"):("true");
   json += ",\"down\": ";
   json += (digitalRead(DOWN_IN_PIN) == LOW)?("false"):("true");
   json += ",\"right\": ";
   json += (digitalRead(RIGHT_IN_PIN) == LOW)?("false"):("true");
   json += ",\"a\": ";
   json += (digitalRead(A_IN_PIN) == LOW)?("false"):("true");
   json += ",\"b\": ";
   json += (digitalRead(B_IN_PIN) == LOW)?("false"):("true");
   json += "}";
   return json;
}

void setup()
{
  preferences.begin("Sound", false);   // see https://github.com/espressif/arduino-esp32/blob/master/libraries/Preferences/examples/StartCounter/StartCounter.ino
  WiFi_SetBothModesNetworkStationAndAccessPoint();

  // Open serial communications and wait for port to open:
  Serial.begin(19200);
  Serial.println("Hello ESP32!");

  // takeout 2 Strings out of the Non-volatile storage
  String strSSID = preferences.getString("SSID", "");
  String strPassword = preferences.getString("Password", "");

  // convert it to char*
  char* txtSSID = const_cast<char*>(strSSID.c_str());
  char* txtPassword = const_cast<char*>(strPassword.c_str());   // https://coderwall.com/p/zfmwsg/arduino-string-to-char

  //try to connect to the LAN
  int success = WiFi_RouterNetworkConnect(txtSSID, txtPassword);
  if (success == 1) {
    Serial.println("LAN connected!");
  }
  else {
    Serial.println("could not connect to LAN!");
  }

  // Start access point
  int success2 = WiFi_AccessPointStart("LED-Matrix");

  // start the webserver to listen for request of clients (in LAN or own ESP32 network)
  Webserver_Start();
  pinMode(2, OUTPUT);
  digitalWrite(2, LOW);
  
  pinMode(UP_IN_PIN,INPUT);
  pinMode(LEFT_IN_PIN,INPUT);
  pinMode(DOWN_IN_PIN,INPUT);
  pinMode(RIGHT_IN_PIN,INPUT);
  pinMode(A_IN_PIN,INPUT);
  pinMode(B_IN_PIN,INPUT);
  pinMode(LEFT_OUT_PIN,OUTPUT);
  pinMode(RIGHT_OUT_PIN,OUTPUT);
}

void loop() {
  String GETParameter = Webserver_GetRequestGETParameter();   // look for client request

  if (GETParameter.length() > 0)        // we got a request, client connection stays open
  {
    //TODO: config via serial

    String json;
    json = create_response();
    decode_url_param(GETParameter);
    Webserver_SendJson(json);    // send out the webpage to client = webbrowser and close client connection
  }

  if (Serial.available()) {
    digitalWrite(2, HIGH);
    String command = Serial.readString();
    Serial.println(command);
    if (command == "help") {
      Serial.println("wl <SSID>|<Passwd>: WLAN-Login; Eingabe Login Daten");
    }
    if (command.startsWith("wl ")) {
      command = command.substring(3);
      Serial.println("SSID:");
      String SSID_in = command.substring(0, command.indexOf('|'));
      Serial.println(SSID_in);
      preferences.putString("SSID", SSID_in);
      command = command.substring(command.indexOf('|'));
      String Passwd_in = command.substring(1);
      Serial.println("Passwort");
      Serial.println(Passwd_in);
      preferences.putString("Password", Passwd_in);
      int successConnect = WiFi_RouterNetworkConnect(SSID_in.c_str(), Passwd_in.c_str());   // then try to connect once new with new login-data
      if (successConnect == 1) {
        Serial.println(":)");
      } else {
        Serial.println(":(");
      }
    }
  }
}
