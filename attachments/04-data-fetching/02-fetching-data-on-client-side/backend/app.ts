import express, { Request, Response } from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import { NewsItem } from './models/index.js';

/**
 * Dummy data
 */
const DUMMY_NEWS: NewsItem[] = [
  {
    id: 'n1',
    slug: 'will-ai-replace-humans',
    title: 'Will AI Replace Humans?',
    image: 'ai-robot.jpg',
    date: '2021-07-01',
    content:
      'Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans...',
  },
  {
    id: 'n2',
    slug: 'beaver-plague',
    title: 'A Plague of Beavers',
    image: 'beaver.jpg',
    date: '2022-05-01',
    content:
      'Beavers are taking over the world. They are building dams everywhere...',
  },
  {
    id: 'n3',
    slug: 'couple-cooking',
    title: 'Spend more time together!',
    image: 'couple-cooking.jpg',
    date: '2024-03-01',
    content:
      'Cooking together is a great way to spend more time with your partner...',
  },
  {
    id: 'n4',
    slug: 'hiking',
    title: 'Hiking is the best!',
    image: 'hiking.jpg',
    date: '2024-01-01',
    content:
      'Hiking is a great way to get some exercise and enjoy the great outdoors...',
  },
  {
    id: 'n5',
    slug: 'landscape',
    title: 'The beauty of landscape',
    image: 'landscape.jpg',
    date: '2022-07-01',
    content:
      'Landscape photography is a great way to capture the beauty of nature...',
  },
];

/**
 * Database
 */
const db = new Database('data.db');

function initDb(): void {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE,
      title TEXT,
      content TEXT,
      date TEXT,
      image TEXT
    )
  `
  ).run();

  const stmt = db.prepare<[], { count: number }>(
    'SELECT COUNT(*) as count FROM news'
  );

  const row = stmt.get();
  if (row && row.count === 0) {
    const insert = db.prepare(
      'INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)'
    );

    for (const news of DUMMY_NEWS) {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
    }
  }
}

/**
 * Express app
 */
const app = express();

app.use(cors());
app.use(express.json());

app.get('/news', (_req: Request, res: Response) => {
  const news = db.prepare('SELECT * FROM news').all();
  res.json(news);
});

initDb();

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
