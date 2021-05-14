import { object, string, date, number, ref } from 'yup';

const searchSchema = object({
  search: string().optional().max(100),
  check_in: date().required('Required').nullable().min(new Date()),
  check_out: date()
    .required('Required')
    .nullable()
    .min(ref('check_in'), "Check out can't be before check in"),
  children: number().optional().integer().positive().min(0).max(8),
  adults: number().required('Required').integer().positive().min(1).max(8),
});

export default searchSchema;
