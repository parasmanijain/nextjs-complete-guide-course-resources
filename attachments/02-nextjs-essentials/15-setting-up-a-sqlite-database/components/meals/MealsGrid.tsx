import { MealItemProps } from './models';
import { MealItem } from './MealItem';
import classes from './MealsGrid.module.scss';

export const MealsGrid = ({ meals }: { meals: MealItemProps[] }) => {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};
