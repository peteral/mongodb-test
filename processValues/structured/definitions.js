var mongo = new Mongo()

var db = mongo.getDB("processValues")

db.dropDatabase()

// 9.600 Datenpunkte, ca. SVW
var PLC_COUNT = 40
var DEVICE_COUNT = 40

for (i = 1; i <= PLC_COUNT; i++) {
  for (j = 1; j <= DEVICE_COUNT; j++) {
    var actual = {
      _id : ObjectId(),
      variable : "PLC"+i+":PV.S01.Device-"+j+".PV[0]",
      type : "actual",
      translation_cn : "体温",
      translation_en : "Temperature",
      translation_de : "Temperatur",
      sensor : "B40",
      unit : "°C",

      plc_name : "PLC"+i,
      plc_translation_de : "SPS " + i,
      plc_translation_en : "PLC " + i,
      plc_translation_cn : "植 " + i,

      device_name : "Device-" + j,
      device_translation_de : "Gerät " + j,
      device_translation_en : "Device " + j,
      device_translation_cn : "设备 " + j,
      cabinet : "S01"

    }
    var target = {
      _id : ObjectId(),
      variable : "PLC"+i+":PV.S01.Device-"+j+".PV[1]",
      type : "target",
      master : actual._id
    }
    var hh = {
      _id : ObjectId(),
      variable : "PLC"+i+":PV.S01.Device-"+j+".PV[2]",
      type : "hh",
      master : actual._id
    }
    var h = {
      _id : ObjectId(),
      variable : "PLC"+i+":PV.S01.Device-"+j+".PV[3]",
      type : "h",
      master : actual._id
    }
    var l = {
      _id : ObjectId(),
      variable : "PLC"+i+":PV.S01.Device-"+j+".PV[4]",
      type : "l",
      master : actual._id
    }
    var ll = {
      _id : ObjectId(),
      variable : "PLC"+i+":PV.S01.Device-"+j+".PV[5]",
      type : "ll",
      master : actual._id
    }

    db.pvs.insert(actual)
    db.pvs.insert(target)
    db.pvs.insert(hh)
    db.pvs.insert(h)
    db.pvs.insert(l)
    db.pvs.insert(ll)

  }
}
