import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);'
        );
        // tx.executeSql(
        //   'Delete from menuitems'
        // );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function saveMenuItems(menuItems) {

  const items = menuItems.map((item) =>`("${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`).join(", ");

  db.transaction((tx) => {
    tx.executeSql(`insert into menuitems (name, price, description, image, category) values ${items}`)
  });
}

/**
 * SQL query to filter the menu by 2 criteria: search keyword and category selected
 *
 */
export async function filterByQueryAndCategories(query, activeCategories) {
  let variables = activeCategories;
  let replacementSymbols = ''
  const length = activeCategories.length;

  for (let i = 0; i < length; i++) {

    replacementSymbols += '?,';
  }

  variables.push(`%${query}%`)

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * from menuitems WHERE category IN (${replacementSymbols.slice(0, -1) }) AND name LIKE ?`, variables, (_, { rows }) => {
        resolve(rows._array);
      }, (a,e) => console.error(e.message));
    });
  });
}
