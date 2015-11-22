{
  collectionName : "values",
  findQuery : {
    pv : { $oid : $P{pvid} },
    ts : { $gt : $P{StartDate}, $lt : $P{EndDate}}
  }
}
