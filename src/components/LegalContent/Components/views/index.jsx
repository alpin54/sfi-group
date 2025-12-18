// -- styles
import style from '@components/LegalContent/Components/styles/style.module.scss';

// -- utils
import formatDate from '@utils/formatDate';

const LegalContentView = ({ data, parentClass = '' }) => (
  <section className={`${style.legalcontent} ${parentClass}`}>
    <div className='container'>
      <div className={style.legalcontent__inner}>
        <div className={style.legalcontent__header}>
          <p className={style.legalcontent__date}>
            Last Updated {formatDate(data.updated_at ? data.updated_at : data.created_at)}
          </p>
          <h3 className={style.legalcontent__title}>{data.title}</h3>
          <p className={style.legalcontent__description}>{data.description}</p>
        </div>

        <div className={style.legalcontent__body} dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
    </div>
  </section>
);

export default LegalContentView;
