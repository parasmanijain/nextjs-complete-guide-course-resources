import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMeal } from '@/lib/meals';
import { MealItemProps, MealSlugParams } from '@/models';
import classes from './page.module.scss';

export async function generateMetadata({
  params,
}: MealSlugParams): Promise<Metadata> {
  const { mealSlug } = await params;
  const meal = getMeal(mealSlug) as MealItemProps;

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({
  params,
}: MealSlugParams) {
  const { mealSlug } = await params;
  const meal = getMeal(mealSlug) as MealItemProps;

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://paras-jain-my-bucket.s3.us-east-1.amazonaws.com/public/images/${meal.image}`}
            alt={meal.title}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            priority
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        />
      </main>
    </>
  );
}
