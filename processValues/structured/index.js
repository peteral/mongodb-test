db = new Mongo().getDB("processValues")

db.values.createIndex({pv : 1, ts : 1})

// index creation took 258 s
// index size = 4 GB
