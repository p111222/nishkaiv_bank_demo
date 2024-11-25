// import React, { useState } from 'react';
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // Main style file
// import 'react-date-range/dist/theme/default.css'; // Theme CSS file

// const DateRangePickerComponent = ({ onDateRangeChange }) => {
//   const [range, setRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: 'selection',
//     },
//   ]);

//   const handleSelect = (ranges) => {
//     setRange([ranges.selection]);
//     onDateRangeChange(ranges.selection); // Pass the selected range back to the parent component
//   };

//   return (
//     <div>
//       <DateRange
//         ranges={range}
//         onChange={handleSelect}
//         moveRangeOnFirstSelection={false}
//       />
//     </div>
//   );
// };

// export default DateRangePickerComponent;


import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file

const DateRangePickerComponent = ({ onDateRangeChange, onClose }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    onDateRangeChange(ranges.selection);
  };

  return (
    <div className="absolute z-10 bg-white border shadow-md p-3">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
      <div className="text-right mt-2">
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DateRangePickerComponent;
