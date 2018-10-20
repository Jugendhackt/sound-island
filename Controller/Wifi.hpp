// +++++++++++++++++++ Start of WiFi Library ++++++++++++++++++++++++


// Connect to router network and return 1 (success) or -1 (no success)
int WiFi_RouterNetworkConnect(const char* txtSSID, const char* txtPassword)
{
  int success = 1;
  
  // connect to WiFi network
  // see https://www.arduino.cc/en/Reference/WiFiBegin
  
  WiFi.begin(txtSSID, txtPassword);
  
  // we wait until connection is established
  // or 10 seconds are gone
  
  int WiFiConnectTimeOut = 0;
  while ((WiFi.status() != WL_CONNECTED) && (WiFiConnectTimeOut < 10))
  {
    delay(1000);
    WiFiConnectTimeOut++;
  }

  // not connected
  if (WiFi.status() != WL_CONNECTED)
  {
    success = -1;
  }

  // print out local address of ESP32 in Router network (LAN)
  Serial.println(WiFi.localIP());

  return success;
}



// Disconnect from router network and return 1 (success) or -1 (no success)
int WiFi_RouterNetworkDisconnect()
{
  int success = -1;
  
  WiFi.disconnect();
  

  int WiFiConnectTimeOut = 0;
  while ((WiFi.status() == WL_CONNECTED) && (WiFiConnectTimeOut < 10))
  {
    delay(1000);
    WiFiConnectTimeOut++;
  }

  // not connected
  if (WiFi.status() != WL_CONNECTED)
  {
    success = 1;
  }
  
  Serial.println("Disconnected.");

  return success;
}


// Initialize Soft Access Point with ESP32
// ESP32 establishes its own WiFi network, one can choose the SSID
int WiFi_AccessPointStart(char* AccessPointNetworkSSID)
{ 
  WiFi.softAP(AccessPointNetworkSSID);

  // printout the ESP32 IP-Address in own network, per default it is "192.168.4.1".
  Serial.println(WiFi.softAPIP());

  return 1;
}


// Put ESP32 in both modes in parallel: Soft Access Point and station in router network (LAN)
void WiFi_SetBothModesNetworkStationAndAccessPoint()
{
  WiFi.mode(WIFI_AP_STA);
}


// Get IP-Address of ESP32 in Router network (LAN), in String-format
String WiFi_GetOwnIPAddressInRouterNetwork()
{
  return WiFi.localIP().toString();
}



// +++++++++++++++++++ End of WiFi Library +++++++++++++++++++
