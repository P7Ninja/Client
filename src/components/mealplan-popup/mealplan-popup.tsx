import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import '../styling/mealplan-popup.scss';
import { MealPlan, days } from '../../Services/MealPlanService';

interface MealplanPopupProps {
  mealplan: MealPlan;
}

const MealplanPopup: React.FC<MealplanPopupProps> = (props) => {
  const { mealplan } = props;
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const currentDate = new Date();

  return (
    <Popup
      trigger={
        <button className="button">
          {`${mealplan.startDate} to ${mealplan.endDate} ${
            currentDate >= new Date(mealplan.startDate) && currentDate <= new Date(mealplan.endDate)
              ? '(Active)'
              : ''
          }`}
        </button>
      }
      modal
      nested
      contentStyle={{
        padding: '20px',
        borderRadius: '30px',
      }}
    >
      {(close: any): React.ReactNode => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="dropdown">
            <label>Select a day:</label>
            <select
              value={selectedDay === null ? '' : selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
            >
              <option value="" disabled>
                Select a day
              </option>
              {mealplan.days.map((day: days, index: number) => (
                <option key={index} value={index}>
                  Day {index + 1}
                </option>
              ))}
            </select>
          </div>
          {selectedDay !== null && mealplan.days[selectedDay] && (
            <div className="mealplanlist">
              <p>Total Calories: {mealplan.days[selectedDay].totalCalories}</p>
              <p>Total Protein: {mealplan.days[selectedDay].totalProtein}</p>
              <p>Total Carbohydrates: {mealplan.days[selectedDay].totalCarbohydrates}</p>
              <p>Total Fat: {mealplan.days[selectedDay].totalFat}</p>
            </div>
          )}
        </div>
      )}
    </Popup>
  );
};

export default MealplanPopup;
