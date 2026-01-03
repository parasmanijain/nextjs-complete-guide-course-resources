import sql from 'better-sqlite3';

const db = sql('meals.db');

const delay = (ms = 2000) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const getMeals = async () => {
  await delay();
  return db.prepare('SELECT * FROM meals').all();
};
