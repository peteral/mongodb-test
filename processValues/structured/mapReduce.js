db = new Mongo().getDB("processValues");

var pv = db.pvs.find({plc_name : "PLC21", device_name : "Device-20", type : "actual"}).next()

var fromTs = new Date(2015, 11, 21)
var toTs = new Date(2015,11,21,10)

db.values.mapReduce (
  function() {
    emit( this.ts.getFullYear() + "-" + (this.ts.getMonth() + 1) + "-" + this.ts.getDate() + " " + this.ts.getHours(),
          this.value)
  },
  function (key, values) {
    return Array.avg( values )
  },
  {
    query : { "pv" : pv._id, ts : {$gt : fromTs, $lt: toTs}},
    out : "totals"
  }
)

var cursor = db.totals.find()

while (cursor.hasNext()) {
  var entry = cursor.next()
  printjson(entry);
}
