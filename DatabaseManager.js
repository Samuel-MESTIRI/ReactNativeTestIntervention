import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("database.db");

export default class DatabaseManager {

  static initializeDatabase() {
      db.transaction(tx => {
          tx.executeSql(
            "create table if not exists\
                intervention (\
                    id integer primary key autoincrement not null,\
                    nom text not null\
            );"
          );
      }, (e) => { console.log("ERREUR + " + e) },
          () => { console.log("=> INIT DB OK  ") }
      );
    }

    static ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
      db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
        (error) => {
            reject(error);
        });
      });
    });

    static async getAllIntervention() {
        let result = [];
        let selectQuery = await this.ExecuteQuery("SELECT * FROM intervention", []);
        
        var rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            result.push({
                nom: item.nom,
                id: item.id
            });
        }
        console.log('get all inter => ', result);
        return result;
    }

    static async createIntervention(intervention) {
      await this.ExecuteQuery("insert into intervention(nom) values(?)", [intervention]);
    }

}