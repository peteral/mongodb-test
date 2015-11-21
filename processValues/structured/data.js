var mongo = new Mongo()

var db = mongo.getDB("processValues")

// 60 * 2,4 Mio = 144 Mio
var PLC_COUNT = 40
var DEVICE_COUNT = 40
var DAYS = 60

simulate = function(pv, day) {
  var stepInMinutes = ("actual".localeCompare(pv.type) == 0 ? 3 : 60)

  var ts = new Date(day.getFullYear(), day.getMonth(), day.getDate())
  print("Generating " + pv.variable + " [" + ts + "] every " + stepInMinutes + " [min]")

  var ts = ts.getTime();
  var endOfDay = ts + 24*60*60*1000;


  for (; ts < endOfDay; ts += stepInMinutes*60*1000) {
    db.values.insert({ "ts" : new Date(ts), "pv" : pv._id, value : Math.random() * 1000 })
  }
}

// actual value every 3 minutes
// other types once an hour
// 1 day = (24*20 + 5*24) * 40 * 100 = 2.4 Mio
var cursor = db.pvs.find();

while (cursor.hasNext()) {
  var pv = cursor.next()

  // TODO simulate multiple days
  simulate(pv, new Date())
}
