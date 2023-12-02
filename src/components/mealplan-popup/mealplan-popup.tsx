
import Popup from 'reactjs-popup';
import '../styling/mealplan-popup.scss'

interface MealplanPopupProps {
    dateRange: string;
}


const MealplanPopup: React.FC<MealplanPopupProps> = ({dateRange}) => {
    return(
        <Popup 
            trigger={<button className="button">{dateRange}</button>}
            modal
            nested
            contentStyle={{
                padding: '20px',
                borderRadius: '30px',
            }}
        >
            {(close: any) => (
                <div className="modal">
                    <button className='close' onClick={close}>
                        &times;
                    </button>
                    <div className="mealplanlist">
                        {' '}
                        sample text
                    </div>
                </div>
            )}
        </Popup>
    );
}

export default MealplanPopup;