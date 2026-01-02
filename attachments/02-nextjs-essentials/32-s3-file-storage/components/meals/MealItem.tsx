import Link from 'next/link';
import Image from 'next/image';
import classes from './MealItem.module.scss';
import { MealItemProps } from '@/models';

export const MealItem = ({
  title,
  slug,
  image,
  summary,
  creator,
}: MealItemProps) => {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://paras-jain-my-bucket.s3.us-east-1.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
