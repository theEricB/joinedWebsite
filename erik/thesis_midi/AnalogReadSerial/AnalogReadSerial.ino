
void setup() {
  Serial.begin(9600);
}


void loop() {
  int sensorValueA = analogRead(A4);
  Serial.print("A");
  Serial.print(sensorValueA);
  Serial.print("A");

  int sensorValueB = analogRead(A1);
  Serial.print("B");
  Serial.print(sensorValueB);
  Serial.print("B");

  int sensorValueC = analogRead(A6);
  Serial.print("C");
  Serial.print(sensorValueC);
  Serial.println("C");
  
  delay(50);
}
