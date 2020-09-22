import { PouchyRX } from "../PouchRX/PouchyRX";
export const db$ = new PouchyRX("penguin_podcasts");

// db$.put({ _id: "ddf234wedrt", tags: ["test1"] }).subscribe();

db$
  .bulkDocs([
    { _id: "asdfasdf", tags: ["asdfasdf", "test3"] },
    { _id: "ddf234wedrt", tags: ["iojasdf"] },
  ])
  .subscribe();
