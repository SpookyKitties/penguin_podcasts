import PouchDB from "pouchdb";
import { forkJoin, Observable, of } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";
import { DBItem } from "./DBItem";
// import { mergeMap$ } from './main';
export class PouchyRX<T extends DBItem> {
  public db: Observable<PouchDB.Database<DBItem>>;

  public get = (_id: string) => {
    return this.db.pipe(
      map(
        async (db): Promise<T | undefined> => {
          try {
            return (await db.get(_id)) as T;
          } catch (error) {
            return undefined;
          }
        }
      ),
      mergeMap((o) => o)
    );
  };

  public rev = (_id: string) => {
    return this.get(_id).pipe(map((val) => (val ? val._id : undefined)));
  };

  public put = (doc: T) => {
    return forkJoin(this.rev(doc._id), this.db).pipe(
      map(async ([_rev, db]) => {
        try {
          doc._rev = _rev;

          return await db.put(doc);
        } catch (error) {
          return undefined;
        }
      }),
      mergeMap((o) => o)
    );
  };

  // createIndex = (i: { index: { fields: string[] } }) => {
  //   return this.db.pipe(
  //     map((db) => {
  //       return db.createIndex(i);
  //     }),
  //     mergeMap((o) => o)
  //   );
  // };
  constructor(
    dbName: string,
    options?:
      | PouchDB.Configuration.DatabaseConfiguration
      | PouchDB.Configuration.CommonDatabaseConfiguration
      | PouchDB.Configuration.LocalDatabaseConfiguration
      | PouchDB.Configuration.RemoteDatabaseConfiguration
  ) {
    const db = new PouchDB<DBItem>(dbName, options);
    // PouchDB.plugin(require("pouchdb-find"));
    this.db = of(db);
  }

  // init = () => {
  //   return this.createIndex({ index: { fields: ["tags"] } });
  // };
  allDocs = (opts?: PouchDB.Core.AllDocsOptions) => {
    return this.db.pipe(
      filter((o) => o !== undefined),
      map(async (db) => {
        return (await db.allDocs(opts ? opts : { skip: undefined })).rows
          .map((d) => {
            console.log(d);

            return d.doc as DBItem;
          })
          .filter((o) => o?.tags !== undefined);
      }),
      mergeMap((o) => o)
    );
  };

  findByTags = (tags: string[]) => {
    return this.allDocs({ include_docs: true }).pipe(
      map((docs) =>
        docs.filter((doc) => {
          return (
            tags.filter((tag) => doc.tags.includes(tag)).length === tags.length
          );
        })
      )
    );
  };

  bulkDocs = (docs: DBItem[]) => {
    return this.db.pipe(
      map(async (db) => {
        try {
          const allDocs = (await db.allDocs()).rows.map((doc) => {
            return { id: doc.id, rev: doc.value.rev };
          });

          docs.map(
            (doc) => (doc._rev = allDocs.find((d) => d.id === doc._id)?.rev)
          );

          return db.bulkDocs(docs);
        } catch (error) {
          return undefined;
        }
      }),
      mergeMap((o) => o)
    );
  };

  bulkGet = (ids: { id: string }[]) => {
    return this.db.pipe(
      map(async (db) => {
        const docs = await db.bulkGet({ docs: ids });
        return docs.results
          .filter((doc) => {
            return (doc.docs[0] as any)?.ok !== undefined;
          })
          .map((doc) => doc.docs[0]["ok"] as DBItem);
      }),
      mergeMap((o) => o)
    );
  };

  remove = (doc: DBItem & { _rev: string }) => {
    return this.db.pipe(
      map((db) => db.remove(doc)),
      mergeMap((o) => o)
    );
  };

  private setRev = (docs: DBItem[], allDocs: { id: string; rev: string }[]) => {
    return of(
      docs.map((doc) => {
        const oldDoc = allDocs.find((allDoc) => allDoc.id === doc._id);
        doc._rev = oldDoc?.rev;
      })
    );
  };

  init = () => {};
}
