db = new Mongo().getDB("processValues");

printjson(db.pvs.find({plc_name : "PLC2"}).explain());
