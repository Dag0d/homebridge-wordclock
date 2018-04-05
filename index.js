"use strict";

var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory("homebridge-wordclock", "Wordclock", Wordclock);
}

function Wordclock(log, config) {
  this.log = log;
  this.name = config.name;
  this.ip = config.ip;
  this.port = config.port || 2424;
  this.stateful = config.stateful;
  this.reverse = config.reverse;
  this.manufacturer = config.manufacturer || 'Mikrocontroller.net';
  this.model = config.model;
  this.serial = config.serial || 1;

}

Wordclock.prototype.getServices = function() {
      var informationService = new Service.AccessoryInformation();

    informationService
      .setCharacteristic(Characteristic.FirmwareRevision, '1.0.6a')
      .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
      .setCharacteristic(Characteristic.Model, this.model)
      .setCharacteristic(Characteristic.SerialNumber, this.serial);

var wordclockLightService = new Service.Lightbulb(this.name);

    wordclockLightService
      .getCharacteristic(Characteristic.On);

    wordclockLightService
      .addCharacteristic(new Characteristic.Hue());

    wordclockLightService
      .addCharacteristic(new Characteristic.Saturation());

    wordclockLightService
      .addCharacteristic(new Characteristic.Brightness());

var wordclockTempService = new Service.TemperatureSensor(this.name);

    wordclockTempService
      .getCharacteristic(Characteristic.CurrentTemperature);

      return [informationService, wordclockLightService, wordclockTempService];
}

Wordclock.prototype._setOn = function(on, callback) {
}
