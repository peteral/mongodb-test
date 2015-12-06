db = new Mongo().getDB("processValues");

var pv = db.pvs.find({plc_name : "PLC21", device_name : "Device-20", type : "actual"}).next()

var fromTs = new Date(2015, 11, 21)
var toTs = new Date(2015,11,21,10)

var cursor = db.values.aggregate( [
    { $match : { "pv" : pv._id, ts : {$gt : fromTs, $lt: toTs}} },
    { $project : {
           hour: { $dateToString: {format: "%Y-%m-%d %H", date: "$ts"}},
           value : 1
         }
    },
    { $group: {_id: "$hour", avg : { $avg: "$value"}}},
    { $sort: { _id : 1 }}
])

// Problem - $dateToString - UTC

while (cursor.hasNext()) {
  var entry = cursor.next()
  printjson(entry);
}
