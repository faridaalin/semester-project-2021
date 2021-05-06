import { DefaultInput } from '../input/Input';
import Textera from '../textarea/Textarea';
import Button from '../../button/Button';
import styles from './hotelForm.module.css';

const HotelForm = () => {
  return (
    <>
      <h2>Update </h2>
      <form className={styles.form}>
        <div className={styles.flex}>
          <DefaultInput
            type='text'
            name='title'
            placeholder='Hotel Name'
            label='Hotel name'
            customContainer={styles.customContainer}
          />
          <DefaultInput
            type='text'
            name='address'
            placeholder='Hotel Address'
            label='Hotel Address'
            customContainer={styles.customContainer}
          />
          <DefaultInput
            type='number'
            name='rating'
            placeholder=''
            label='Rating'
            customContainer={styles.customContainer}
          />
          <DefaultInput
            type='number'
            name='price'
            placeholder=''
            label='Price'
            customContainer={styles.customContainer}
          />
          <Textera
            placeholder='Description'
            name='description'
            label='Description'
            customContainer={styles.customContainer}
          />

          <DefaultInput
            type='url'
            name='mainImage'
            placeholder='Main Image'
            label='Main Image'
            customContainer={styles.customContainer}
          />
          <DefaultInput
            type='text'
            name='category'
            placeholder='Category'
            label='Category'
            customContainer={styles.customContainer}
          />
        </div>
        <div className={styles.flex}>
          <div>
            <p className={styles.title}>Images</p>
            <DefaultInput type='url' name='images' placeholder='Image url' />
            <DefaultInput type='url' name='images' placeholder='Image url' />
            <DefaultInput type='url' name='images' placeholder='Image url' />
            <DefaultInput type='url' name='images' placeholder='Image url' />
          </div>

          <div>
            <p className={styles.title}>Room Types</p>
            <div>
              <p className={styles.roomType}>Standard Room</p>
              <DefaultInput
                type='text'
                name='roomType'
                placeholder='Room Type'
              />
              <DefaultInput type='number' name='Sleeps' placeholder='Sleeps' />
              <DefaultInput
                type='number'
                name='Price'
                placeholder='Room Price'
              />
            </div>
            <div>
              <p className={styles.roomType}>Standard Room</p>
              <DefaultInput
                type='text'
                name='roomType'
                placeholder='Room Type'
              />
              <DefaultInput type='number' name='Sleeps' placeholder='Sleeps' />
              <DefaultInput
                type='number'
                name='Price'
                placeholder='Room Price'
              />
            </div>
            <div>
              <p className={styles.roomType}>Standard Room</p>
              <DefaultInput
                type='text'
                name='roomType'
                placeholder='Room Type'
              />
              <DefaultInput type='number' name='Sleeps' placeholder='Sleeps' />
              <DefaultInput
                type='number'
                name='Price'
                placeholder='Room Price'
              />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button btnType='search'>Update</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default HotelForm;
