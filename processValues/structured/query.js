db = new Mongo().getDB("processValues");

var pv = db.pvs.find({plc_name : "PLC20", device_name : "Device-20", type : "actual"}).next()

var fromTs = new Date(new Date().getTime() - 3600000)
var toTs = new Date()

var cursor = db.values.find({ "pv" : pv._id, ts : {$gt : fromTs, $lt: toTs}})

while (cursor.hasNext()) {
  var entry = cursor.next()
  print(entry.ts + " -> " + entry.value);
}
