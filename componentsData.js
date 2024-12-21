const componentsData = [
    {
      name: 'LED Controller',
      description: 'Code to control an LED.',
      code: `
        int ledPin = 13;
  
        void setup() {
          pinMode(ledPin, OUTPUT);
        }
  
        void loop() {
          digitalWrite(ledPin, HIGH);
          delay(1000); // LED ON for 1 second
          digitalWrite(ledPin, LOW);
          delay(1000); // LED OFF for 1 second
        }
      `,
      instructions: [
        'Connect the LED to pin 13 on the Arduino.',
        'Upload the provided code to your Arduino board.',
        'The LED will blink at 1-second intervals.',
      ],
    },
    {
      name: 'Servo Motor',
      description: 'Code to control a servo motor.',
      code: `
        #include <Servo.h>
        Servo myServo;
  
        void setup() {
          myServo.attach(9); // Attach servo to pin 9
        }
  
        void loop() {
          myServo.write(0);   // Move to 0 degrees
          delay(1000);        // Wait 1 second
          myServo.write(90);  // Move to 90 degrees
          delay(1000);        // Wait 1 second
        }
      `,
      instructions: [
        'Connect the servo signal wire to pin 9.',
        'Connect power and ground to the servo motor.',
        'Upload the provided code to your Arduino board.',
        'The servo will alternate between 0° and 90° every second.',
      ],
    },
    {
      name: 'DHT11 Sensor',
      description: 'Code to read temperature and humidity.',
      code: `
        #include <DHT.h>
        #define DHTPIN 2
        #define DHTTYPE DHT11
        DHT dht(DHTPIN, DHTTYPE);
  
        void setup() {
          Serial.begin(9600);
          dht.begin();
        }
  
        void loop() {
          float temp = dht.readTemperature();
          float humidity = dht.readHumidity();
          Serial.print("Temperature: ");
          Serial.print(temp);
          Serial.print("°C, Humidity: ");
          Serial.print(humidity);
          Serial.println("%");
          delay(2000); // Read every 2 seconds
        }
      `,
      instructions: [
        'Connect the DHT11 data pin to pin 2.',
        'Install the DHT library in your Arduino IDE.',
        'Upload the provided code to your Arduino board.',
        'Open the Serial Monitor to view temperature and humidity readings.',
      ],
    },
  ];
  
  export default componentsData;
  