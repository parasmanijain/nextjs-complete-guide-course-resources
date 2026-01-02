import { S3 } from '@aws-sdk/client-s3';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { MealDB, MealInput } from '@/models';

const s3 = new S3({
  region: 'us-east-1',
});
const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal: MealInput) {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: 'paras-jain-my-bucket',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  const mealForDB: MealDB = {
    title: meal.title,
    summary: meal.summary,
    instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
    image: fileName,
    slug,
  };

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(mealForDB);
}
