import { FC } from "react";

type StepBarProps = {
    current: number;
    width?: number;
    steps: string[];
    onSelectStep?: (step: number) => void;
    render:(step:string)=>JSX.Element;
  }
  
  const StepBar: FC<StepBarProps> = ({ steps, current, width, onSelectStep ,render}) => {
    const handleOnSelectStep = (step: number) => {
      if (onSelectStep) {
        onSelectStep(step);
      }
    }
    return (
      <div className="row bs-wizard border-bottom-0 justify-content-center">
        {steps.map((step, index) => {
          const classNameStatus = (index + 1) === current ? 'active' : (index + 1) < current ? 'complete' : 'disabled';
          return (
            <div className={`col-${width || 4} bs-wizard-step ${classNameStatus}`} key={index}>
              <div className="text-center bs-wizard-stepnum">
                {render(step)}
              </div>
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <button
                disabled={current <= (index + 1)}
                className="btn bs-wizard-dot p-0 border-0"
                onClick={() => handleOnSelectStep(index + 1)}
              />
            </div>
          )
        })}
      </div>
    );
  }
  

  export default StepBar;