db = new Mongo().getDB("processValues");

var pv = db.pvs.find({plc_name : "PLC20", device_name : "Device-20", type : "actual"}).next()

var fromTs = new Date(2015, 11, 21)
var toTs = new Date(2015,11,21,10)

var cursor = db.values.find({ "pv" : pv._id, ts : {$gt : fromTs, $lt: toTs}})

while (cursor.hasNext()) {
  var entry = cursor.next()
  print(entry.ts + " -> " + entry.value);
}

// ohne Index 23s in-mem, 75 secs after start, 12 GB
// mit Index, DB running 0.3s
