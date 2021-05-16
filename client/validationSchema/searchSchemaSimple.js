import { object, string, date, number, ref } from 'yup';

const searchSchemaSimple = object({
  search: string().optional().max(100),
  dates: date(),
  guest: number().required('Required').integer().positive().min(1).max(8),
});

export default searchSchemaSimple;
