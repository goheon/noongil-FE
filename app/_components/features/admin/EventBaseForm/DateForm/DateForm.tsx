import DatePicker from 'react-datepicker'
import { Control, Controller } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import { IEventDetail } from '../../type'

interface DateFormProps {
  control: Control<IEventDetail, any>
  fieldName: keyof Pick<IEventDetail, 'operStatDt' | 'operEndDt'>
}

const DateForm: React.FC<DateFormProps> = (props) => {
  const { control, fieldName } = props

  return (
    <div>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => {
          return (
            <div>
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy/MM/dd"
                dropdownMode="select"
              />
            </div>
          )
        }}
      />
    </div>
  )
}

export default DateForm
